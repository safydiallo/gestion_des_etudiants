package uasz.etudiant.ms_etudiant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import uasz.etudiant.ms_etudiant.model.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    Optional<Etudiant> findByMatricule(String matricule);
    List<Etudiant> findByClasseId(Long classeId); 
}
