package uasz.etudiant.ms_etudiant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import uasz.etudiant.ms_etudiant.exception.EtudiantNotFoundException;
import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.repository.EtudiantRepository;

@Service
public class EtudiantService {
    private final EtudiantRepository repository;

    public EtudiantService(EtudiantRepository repository) {
        this.repository = repository;
    }

    // Créer un étudiant
    public Etudiant creerEtudiant(@Valid Etudiant etudiant) {
        if (repository.findByMatricule(etudiant.getMatricule()).isPresent()) {
            throw new IllegalArgumentException("Matricule déjà existant");
        }
        return repository.save(etudiant);
    }

    //Afficher tous les étudiants
    public List<Etudiant> getAllEtudiants() {
        return repository.findAll();
    }

    // Modifier
    public Etudiant modifierEtudiant(Long id,@Valid Etudiant etudiant) {
        Etudiant e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etudiant introuvable"));
        e.setNom(etudiant.getNom());
        e.setPrenom(etudiant.getPrenom());
        e.setMatricule(etudiant.getMatricule());
        e.setDate_naissance(etudiant.getDate_naissance());
        e.setEmail(etudiant.getEmail());
        e.setTelephone(etudiant.getTelephone());
        e.setAdresse(etudiant.getAdresse());
        e.setSexe(etudiant.getSexe());
        return repository.save(e);
    }

    // Supprimer
    public void supprimerEtudiant(Long id) {
        repository.deleteById(id);
    }

    // Rechercher par ID
    public Etudiant getEtudiant(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EtudiantNotFoundException(id));
    }
    //Rechercher par matricule
    public Etudiant getByMatricule(String matricule) {
        return repository.findByMatricule(matricule)
                .orElseThrow(() -> new EtudiantNotFoundException(matricule));
    }

    // Rechercher par classe
    public List<Etudiant> getByClasse(String classe) {
        return repository.findByClasse(classe);
    }
    
}
