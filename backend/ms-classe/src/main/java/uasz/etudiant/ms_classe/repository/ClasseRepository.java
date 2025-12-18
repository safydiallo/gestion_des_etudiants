package uasz.etudiant.ms_classe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uasz.etudiant.ms_classe.model.Classe;


public interface ClasseRepository extends JpaRepository<Classe, Long> {
    
    //Rechercher une classe par son nom
    Classe findByNom(String nom);
}
