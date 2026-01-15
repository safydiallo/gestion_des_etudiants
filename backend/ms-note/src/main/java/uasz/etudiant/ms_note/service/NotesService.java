package uasz.etudiant.ms_note.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uasz.etudiant.ms_note.client.ClasseClient;
import uasz.etudiant.ms_note.dto.*;
import uasz.etudiant.ms_note.entity.Note;
import uasz.etudiant.ms_note.repository.NoteRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotesService {
    
    private final NoteRepository noteRepository;
    private final ClasseClient classeClient;
    
    // Créer une note individuelle
    public Note create(CreateNoteDto dto) {
        // Vérifier que la matière existe
        MatiereDto matiere = classeClient.getMatiereById(dto.getMatiereId());
        if (matiere == null) {
            throw new RuntimeException("Matière avec l'ID " + dto.getMatiereId() + " introuvable");
        }
        
        // Vérifier que l'étudiant appartient à la classe de la matière
        if (matiere.getClasse() == null) {
            throw new RuntimeException("La matière n'est pas affectée à une classe");
        }
        
        List<EtudiantDto> etudiants = classeClient.getEtudiantsByClasseId(matiere.getClasse().getId());
        boolean etudiantExiste = etudiants.stream()
                .anyMatch(e -> e.getId().equals(dto.getEtudiantId()));
        
        if (!etudiantExiste) {
            throw new RuntimeException("L'étudiant n'appartient pas à la classe de cette matière");
        }
        
        // Vérifier si une note existe déjà pour ce type et semestre
        noteRepository.findByEtudiantIdAndMatiereIdAndTypeAndSemestre(
                dto.getEtudiantId(), dto.getMatiereId(), dto.getType(), dto.getSemestre()
        ).ifPresent(n -> {
            throw new RuntimeException("Une note existe déjà pour cet étudiant, cette matière, ce type et ce semestre");
        });
        
        Note note = new Note();
        note.setEtudiantId(dto.getEtudiantId());
        note.setMatiereId(dto.getMatiereId());
        note.setValeur(dto.getValeur());
        note.setType(dto.getType());
        note.setSemestre(dto.getSemestre());
        
        return noteRepository.save(note);
    }
    
    // Saisir les notes pour tous les étudiants d'une classe (via la matière)
    public List<Note> createNotesForClasse(SaisieNotesClasseDto dto) {
        // Récupérer la matière et sa classe
        MatiereDto matiere = classeClient.getMatiereById(dto.getMatiereId());
        if (matiere == null || matiere.getClasse() == null) {
            throw new RuntimeException("Matière introuvable ou non affectée à une classe");
        }
        
        // Récupérer les étudiants de la classe
        List<EtudiantDto> etudiants = classeClient.getEtudiantsByClasseId(matiere.getClasse().getId());
        Map<Long, EtudiantDto> etudiantsMap = etudiants.stream()
                .collect(Collectors.toMap(EtudiantDto::getId, e -> e));
        
        List<Note> notes = new ArrayList<>();
        
        for (NoteEtudiantDto noteDto : dto.getNotes()) {
            // Vérifier que l'étudiant appartient à la classe
            if (!etudiantsMap.containsKey(noteDto.getEtudiantId())) {
                throw new RuntimeException("L'étudiant " + noteDto.getEtudiantId() + 
                        " n'appartient pas à la classe de cette matière");
            }
            
            // Vérifier si une note existe déjà
            noteRepository.findByEtudiantIdAndMatiereIdAndTypeAndSemestre(
                    noteDto.getEtudiantId(), dto.getMatiereId(), dto.getType(), dto.getSemestre()
            ).ifPresent(n -> {
                throw new RuntimeException("Une note existe déjà pour l'étudiant " + 
                        noteDto.getEtudiantId() + " pour ce type et semestre");
            });
            
            Note note = new Note();
            note.setEtudiantId(noteDto.getEtudiantId());
            note.setMatiereId(dto.getMatiereId());
            note.setValeur(noteDto.getValeur());
            note.setType(dto.getType());
            note.setSemestre(dto.getSemestre());
            
            notes.add(noteRepository.save(note));
        }
        
        return notes;
    }
    
    // Récupérer les notes d'un étudiant
    public List<Note> getNotesEtudiant(Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }
    
    // Récupérer les notes d'une matière (toute la classe)
    public List<NotesParMatiereDto> getNotesParMatiere(Long matiereId) {
        // Récupérer la matière
        MatiereDto matiere = classeClient.getMatiereById(matiereId);
        if (matiere == null || matiere.getClasse() == null) {
            throw new RuntimeException("Matière introuvable ou non affectée à une classe");
        }
        
        // Récupérer les notes
        List<Note> notes = noteRepository.findByMatiereId(matiereId);
        
        // Récupérer les étudiants
        List<EtudiantDto> etudiants = classeClient.getEtudiantsByClasseId(matiere.getClasse().getId());
        Map<Long, EtudiantDto> etudiantsMap = etudiants.stream()
                .collect(Collectors.toMap(EtudiantDto::getId, e -> e));
        
        return notes.stream().map(note -> {
            NotesParMatiereDto dto = new NotesParMatiereDto();
            dto.setEtudiantId(note.getEtudiantId());
            
            EtudiantDto etudiant = etudiantsMap.get(note.getEtudiantId());
            if (etudiant != null) {
                dto.setEtudiantNom(etudiant.getNom());
                dto.setEtudiantPrenom(etudiant.getPrenom());
            }
            
            dto.setNote(note.getValeur());
            dto.setType(note.getType());
            
            return dto;
        }).collect(Collectors.toList());
    }
    
    // Générer le bulletin d'un étudiant
    public BulletinDto getBulletin(Long etudiantId) {
        List<Note> notes = noteRepository.findByEtudiantId(etudiantId);
        
        if (notes.isEmpty()) {
            throw new RuntimeException("Aucune note trouvée pour cet étudiant");
        }
        
        // Récupérer les matières
        List<Long> matiereIds = notes.stream()
                .map(Note::getMatiereId)
                .distinct()
                .collect(Collectors.toList());
        
        List<MatiereDto> matieres = classeClient.getMatieresByIds(matiereIds);
        Map<Long, MatiereDto> matieresMap = matieres.stream()
                .collect(Collectors.toMap(MatiereDto::getId, m -> m));
        
        // Calculer les moyennes par matière
        Map<Long, List<Note>> notesParMatiere = notes.stream()
                .collect(Collectors.groupingBy(Note::getMatiereId));
        
        double sommeCoefficients = 0;
        double sommePonderee = 0;
        
        BulletinDto bulletin = new BulletinDto();
        bulletin.setEtudiantId(etudiantId);
        bulletin.setNotes(notes);
        
        for (Map.Entry<Long, List<Note>> entry : notesParMatiere.entrySet()) {
            Long matiereId = entry.getKey();
            List<Note> notesMatiere = entry.getValue();
            
            double moyenne = notesMatiere.stream()
                    .mapToDouble(Note::getValeur)
                    .average()
                    .orElse(0.0);
            
            MatiereDto matiere = matieresMap.get(matiereId);
            if (matiere != null) {
                int coefficient = matiere.getCoefficient();
                sommeCoefficients += coefficient;
                sommePonderee += moyenne * coefficient;
            }
        }
        
        double moyenneGenerale = sommeCoefficients > 0 ? sommePonderee / sommeCoefficients : 0.0;
        bulletin.setMoyenneGenerale(moyenneGenerale);
        
        return bulletin;
    }
}