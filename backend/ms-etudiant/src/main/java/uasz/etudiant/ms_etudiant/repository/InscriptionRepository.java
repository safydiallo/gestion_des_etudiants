package uasz.etudiant.ms_etudiant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.model.Inscription;

public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    Optional<Inscription> findByEtudiantId(Long etudiantId);

    Optional<Inscription> findByClasseId(Long classeId); 
}
