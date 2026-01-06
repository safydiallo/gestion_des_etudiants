package uasz.etudiant.ms_etudiant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.model.Inscription;
import uasz.etudiant.ms_etudiant.repository.InscriptionRepository;

@Service
public class InscriptionService {

    private final InscriptionRepository repository;

    public InscriptionService(InscriptionRepository repository) {
        this.repository = repository;
    }

    // Inscrire un étudiant
    public Inscription inscrire(Long etudiantId, Long classeId) {

        // Vérifier si l'étudiant est déjà inscrit
        repository.findByEtudiantId(etudiantId).ifPresent(i -> {
            throw new IllegalStateException("Cet étudiant est déjà inscrit dans une classe");
        });

        Inscription inscription = new Inscription();
        inscription.setEtudiantId(etudiantId);
        inscription.setClasseId(classeId);

        return repository.save(inscription);
    }

    // Obtenir l'inscription d'un étudiant
    public Inscription getByEtudiant(Long etudiantId) {
        return repository.findByEtudiantId(etudiantId)
                .orElseThrow(() -> new RuntimeException("Aucune inscription trouvée"));
    }

    // Supprimer une inscription
    public void supprimer(Long id) {
        repository.deleteById(id);
    }

    // Rechercher par classe
    public List<Long> getEtudiantIdsByClasse(Long classeId) {
    return repository.findByClasseId(classeId)
            .stream()
            .map(Inscription::getEtudiantId)
            .toList();
    }
    
}