package uasz.etudiant.ms_enseignant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uasz.etudiant.ms_enseignant.entity.Enseignant;
// Repository pour l’entité Enseignant
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {

    // Recherche d’un enseignant par matricule
    Enseignant findByMatriculeEns(String matriculeEns);
}
