package uasz.etudiant.ms_enseignant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uasz.etudiant.ms_enseignant.entity.EnseignantMatiere;
// Repository pour l’association enseignant-matière
public interface EnseignantMatiereRepository
        extends JpaRepository<EnseignantMatiere, Long> {

    // Vérifie si une matière est déjà affectée à un enseignant
    boolean existsByEnseignant_IdEnseignantAndMatiereId(
            Long enseignantId,
            Long matiereId
    );
}
