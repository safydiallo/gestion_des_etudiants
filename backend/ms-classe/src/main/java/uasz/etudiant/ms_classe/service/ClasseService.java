package uasz.etudiant.ms_classe.service;

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
    

    public ClasseService(ClasseRepository repository , EtudiantClient etudiantClient) {
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

    // Réchercher une classe
    public Classe getClasseById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ClasseNotFoundException(id));
    }

    //Modifier une classe
    public Classe updateClasse(Long id, Classe updatedClasse) {
        Classe existingClasse = getClasseById(id);
        existingClasse.setNom(updatedClasse.getNom());
        existingClasse.setNiveau(updatedClasse.getNiveau());
        existingClasse.setAnnee(updatedClasse.getAnnee());
        return repository.save(existingClasse);
    }

    public List<EtudiantDTO> getEtudiants(Long classeId) {
        // appel vers etudiant-service (Feign ou RestTemplate)
        return etudiantClient.getEtudiantsParClasse(classeId);
    }
    

}
