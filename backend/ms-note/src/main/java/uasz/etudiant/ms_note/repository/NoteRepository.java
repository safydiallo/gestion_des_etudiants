package uasz.etudiant.ms_note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uasz.etudiant.ms_note.entity.Note;
import java.util.List;
import java.util.Optional;

// Repository pour l’entité Note
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Récupérer les notes d'un étudiant
    List<Note> findByEtudiantId(Long etudiantId);
    
    // Récupérer les notes d'une matière
    List<Note> findByMatiereId(Long matiereId);
    
    // Récupérer les notes d'un étudiant pour une matière
    List<Note> findByEtudiantIdAndMatiereId(Long etudiantId, Long matiereId);
    
    // Vérifier si une note existe déjà
    Optional<Note> findByEtudiantIdAndMatiereIdAndTypeAndSemestre(
        Long etudiantId, Long matiereId, String type, String semestre);

}
