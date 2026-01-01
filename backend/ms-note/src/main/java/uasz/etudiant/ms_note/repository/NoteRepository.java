package uasz.etudiant.ms_note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uasz.etudiant.ms_note.entity.Note;
import java.util.List;

// Repository pour l’entité Note
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Récupère toutes les notes d’un étudiant
    List<Note> findByEtudiantId(Long etudiantId);
}
