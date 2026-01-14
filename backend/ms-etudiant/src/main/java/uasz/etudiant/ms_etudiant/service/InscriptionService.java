package uasz.etudiant.ms_etudiant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uasz.etudiant.ms_etudiant.model.Inscription;
import uasz.etudiant.ms_etudiant.repository.InscriptionRepository;

@Service
public class InscriptionService {

    private final InscriptionRepository repository;
    private final uasz.etudiant.ms_etudiant.clients.ClasseClient classeClient;

    public InscriptionService(InscriptionRepository repository,
            uasz.etudiant.ms_etudiant.clients.ClasseClient classeClient) {
        this.repository = repository;
        this.classeClient = classeClient;
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

    // Inscrire un étudiant par nom de classe
    public Inscription inscrireByClassName(Long etudiantId, String className) {
        // Récupérer la classe par son nom via Feign
        uasz.etudiant.ms_etudiant.clients.ClasseDTO classe = classeClient.getClasseByName(className);
        if (classe == null || classe.getId() == null) {
            throw new RuntimeException("Classe non trouvée : " + className);
        }
        return inscrire(etudiantId, classe.getId());
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

    // Obtenir le statut d'inscription d'un étudiant
    public uasz.etudiant.ms_etudiant.dtos.InscriptionStatusDTO getInscriptionStatus(Long etudiantId) {
        var inscription = repository.findByEtudiantId(etudiantId);

        if (inscription.isPresent()) {
            Inscription insc = inscription.get();
            // Essayer de récupérer le nom de la classe via Feign
            String classeNom = null;
            try {
                uasz.etudiant.ms_etudiant.clients.ClasseDTO classe = classeClient.getClasseByName(""); // On pourrait
                                                                                                       // améliorer ça
                // Idéalement, il faudrait un getClasseById dans ClasseClient
            } catch (Exception e) {
                // Ignore si ms-classe est down
            }

            return new uasz.etudiant.ms_etudiant.dtos.InscriptionStatusDTO(
                    etudiantId,
                    "INSCRIT",
                    insc.getClasseId(),
                    classeNom);
        } else {
            return new uasz.etudiant.ms_etudiant.dtos.InscriptionStatusDTO(
                    etudiantId,
                    "NON_INSCRIT",
                    null,
                    null);
        }
    }

}