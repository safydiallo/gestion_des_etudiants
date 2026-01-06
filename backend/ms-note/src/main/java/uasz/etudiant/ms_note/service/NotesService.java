package uasz.etudiant.ms_note.service;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uasz.etudiant.ms_note.client.EtudiantClient;
import uasz.etudiant.ms_note.client.MatiereClient;
import uasz.etudiant.ms_note.dto.BulletinDto;
import uasz.etudiant.ms_note.dto.CreateNoteDto;
import uasz.etudiant.ms_note.dto.MatiereDto;
import uasz.etudiant.ms_note.dto.NoteDto;
import uasz.etudiant.ms_note.entity.Note;
import uasz.etudiant.ms_note.exception.BadRequestException;
import uasz.etudiant.ms_note.exception.ServiceUnavailableException;
import uasz.etudiant.ms_note.repository.NoteRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotesService {

    private final NoteRepository noteRepository;
    private final EtudiantClient etudiantClient;
    private final MatiereClient matiereClient;

    public Note create(CreateNoteDto dto) {

        // 1) vérifier étudiant existe (ms-etudiant)
        try {
            etudiantClient.getStudentById(dto.getEtudiantId());
        } catch (FeignException.NotFound e) {
            throw new BadRequestException("Étudiant introuvable (id=" + dto.getEtudiantId() + ")");
        } catch (FeignException e) {
            throw new ServiceUnavailableException("ms-etudiant indisponible : impossible de valider l'étudiant");
        }

        // 2) vérifier matière existe (ms-classe)
        try {
            matiereClient.getMatiereById(dto.getMatiereId());
        } catch (FeignException.NotFound e) {
            throw new BadRequestException("Matière introuvable (id=" + dto.getMatiereId() + ")");
        } catch (FeignException e) {
            throw new ServiceUnavailableException("ms-classe indisponible : impossible de valider la matière");
        }

        // 3) sauvegarder la note
        Note note = Note.builder()
                .etudiantId(dto.getEtudiantId())
                .matiereId(dto.getMatiereId())
                .valeurNote(dto.getValeurNote())
                .typeNote(dto.getTypeNote())
                .dateSaisie(LocalDateTime.now())
                .build();

        return noteRepository.save(note);
    }

    public List<Note> getNotesEtudiant(Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }

    // Bulletin pondéré + fallback
    public BulletinDto getBulletin(Long etudiantId) {

        List<Note> notes = getNotesEtudiant(etudiantId);

        List<NoteDto> noteDtos = notes.stream()
                .map(n -> new NoteDto(n.getMatiereId(), n.getValeurNote(), n.getTypeNote()))
                .toList();

        // moyenne simple (fallback)
        double moyenneSimple = notes.stream()
                .mapToDouble(Note::getValeurNote)
                .average()
                .orElse(0.0);

        if (notes.isEmpty()) {
            return new BulletinDto(etudiantId, 0.0, noteDtos, false, true);
        }

        // Essai moyenne pondérée
        try {
            List<Long> matiereIds = notes.stream()
                    .map(Note::getMatiereId)
                    .filter(Objects::nonNull)
                    .distinct()
                    .toList();

            List<MatiereDto> matieres = matiereClient.getMatieresByIds(matiereIds);

            Map<Long, Integer> coefMap = matieres.stream()
                    .filter(m -> m != null && m.getId() != null && m.getCoefficient() != null)
                    .collect(Collectors.toMap(MatiereDto::getId, MatiereDto::getCoefficient, (a, b) -> a));

            double sumNoteCoef = 0.0;
            int sumCoef = 0;

            for (Note n : notes) {
                Integer coef = coefMap.get(n.getMatiereId());
                if (coef == null || coef <= 0) {
                    // fallback moyenne simple si matières incohérentes
                    return new BulletinDto(etudiantId, moyenneSimple, noteDtos, false, true);
                }
                sumNoteCoef += n.getValeurNote() * coef;
                sumCoef += coef;
            }

            double moyennePonderee = (sumCoef == 0) ? moyenneSimple : (sumNoteCoef / sumCoef);

            return new BulletinDto(etudiantId, moyennePonderee, noteDtos, true, true);

        } catch (FeignException e) {
            // ms-classe down => fallback
            return new BulletinDto(etudiantId, moyenneSimple, noteDtos, false, false);
        } catch (Exception e) {
            return new BulletinDto(etudiantId, moyenneSimple, noteDtos, false, false);
        }
    }
}
