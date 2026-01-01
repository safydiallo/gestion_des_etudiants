package uasz.etudiant.ms_classe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uasz.etudiant.ms_classe.model.Matiere;

import java.util.List;

public interface MatiereRepository extends JpaRepository<Matiere, Long> {
    List<Matiere> findByIdIn(List<Long> ids);
}
