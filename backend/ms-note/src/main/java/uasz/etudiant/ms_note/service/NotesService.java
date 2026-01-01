package uasz.etudiant.ms_note.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uasz.etudiant.ms_note.client.EtudiantClient;
import uasz.etudiant.ms_note.dto.BulletinDto;
import uasz.etudiant.ms_note.dto.NoteDto;
import uasz.etudiant.ms_note.dto.CreateNoteDto;
import uasz.etudiant.ms_note.entity.Note;
import uasz.etudiant.ms_note.repository.NoteRepository;

import java.time.LocalDateTime;
import java.util.List;

// Classe contenant la logique métier des notes
@Service
@RequiredArgsConstructor
public class NotesService {

    // Accès à la base de données des notes
    private final NoteRepository noteRepository;

    // Client Feign vers le service-etudiant
    private final EtudiantClient etudiantClient;

    // Création et enregistrement d’une note
    public Note create(CreateNoteDto dto) {

        // Vérification que l’étudiant existe
        etudiantClient.getStudentById(dto.getEtudiantId());

        // Construction de l’objet Note
        Note note = Note.builder()
                .etudiantId(dto.getEtudiantId())
                .matiereId(dto.getMatiereId())
                .valeurNote(dto.getValeurNote())
                .typeNote(dto.getTypeNote())
                .dateSaisie(LocalDateTime.now())
                .build();

        // Sauvegarde de la note en base
        return noteRepository.save(note);
    }

    // Récupération des notes d’un étudiant
    public List<Note> getNotesEtudiant(Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }

    // Génération du bulletin d’un étudiant
    public BulletinDto getBulletin(Long etudiantId) {

        // Récupération des notes
        List<Note> notes = getNotesEtudiant(etudiantId);

        // Calcul de la moyenne
        double moyenne = notes.stream()
                .mapToDouble(Note::getValeurNote)
                .average()
                .orElse(0.0);

        // Conversion Entity -> DTO
        List<NoteDto> noteDtos = notes.stream()
                .map(n -> new NoteDto(
                        n.getMatiereId(),
                        n.getValeurNote(),
                        n.getTypeNote()
                ))
                .toList();

        // Retour du bulletin
        return new BulletinDto(etudiantId, moyenne, noteDtos);
    }
}
