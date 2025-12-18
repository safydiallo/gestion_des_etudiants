package uasz.etudiant.ms_classe.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import uasz.etudiant.ms_classe.DTO.EtudiantDTO;
import uasz.etudiant.ms_classe.FeignClient.EtudiantClient;
import uasz.etudiant.ms_classe.exception.ClasseNotFoundException;
import uasz.etudiant.ms_classe.model.Classe;
import uasz.etudiant.ms_classe.repository.ClasseRepository;

@Service
public class ClasseService {

    private final ClasseRepository repository;


    private final EtudiantClient etudiantClient;

    public ClasseService(ClasseRepository repository, EtudiantClient etudiantClient) {
        this.repository = repository;
        this.etudiantClient = etudiantClient;
    }

    // Créer une classe
    public Classe creerClasse(Classe classe) {
        return repository.save(classe);
    }

    //Afficher toutes les classes
    public List<Classe> getAllClasses() {
        return repository.findAll();
    }

    //Rechercher une classe par nom
    public Classe getClassesByName(String name) {
        return repository.findByNom(name);
    }

    //Modifier une classe
    public Classe updateClasse(Long id, Classe updatedClasse) {
        Classe existingClasse = getClasse(id);
        existingClasse.setLibelle(updatedClasse.getLibelle());
        return repository.save(existingClasse);
    }

    //Afficher les etudiants d'une classe   
    public List<EtudiantDTO> getEtudiantsDeClasse(Long classeId) {
        Classe classe = getClasse(classeId);
        List<EtudiantDTO> etudiants = new ArrayList<>();
        for (Long etudiantId : classe.getEtudiantIds()) {
            // Utiliser le client Feign pour récupérer les détails de l'étudiant
            EtudiantDTO etudiant = etudiantClient.getEtudiant(etudiantId);
            etudiants.add(etudiant);
        }
        return etudiants;
    }

    // Récupérer une classe
    public Classe getClasse(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ClasseNotFoundException(id));
    }

    // Affecter un étudiant à une classe
    public Classe ajouterEtudiant(Long classeId, Long etudiantId) {
        Classe classe = getClasse(classeId);
        classe.getEtudiantIds().add(etudiantId);
        return repository.save(classe);
    }
}
