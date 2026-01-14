package uasz.etudiant.ms_etudiant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uasz.etudiant.ms_etudiant.clients.AuthServiceClient;
import uasz.etudiant.ms_etudiant.dtos.CreateUserRequest;
import uasz.etudiant.ms_etudiant.dtos.EtudiantDTO;
import uasz.etudiant.ms_etudiant.exception.EtudiantNotFoundException;
import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.repository.EtudiantRepository;

@Service
public class EtudiantService {
    private final EtudiantRepository repository;
    private final AuthServiceClient authServiceClient;

    public EtudiantService(EtudiantRepository repository, AuthServiceClient authServiceClient) {
        this.repository = repository;
        this.authServiceClient = authServiceClient;
    }

    // Créer un étudiant (Local + Keycloak)
    public Etudiant creerEtudiant(EtudiantDTO etudiantDTO) {
        if (repository.findByMatricule(etudiantDTO.getMatricule()).isPresent()) {
            throw new IllegalArgumentException("Matricule déjà existant");
        }

        // 1. Créer l'utilisateur dans Keycloak via service-user
        CreateUserRequest userRequest = new CreateUserRequest();
        userRequest.setUsername(etudiantDTO.getEmail()); // Username = Email
        userRequest.setEmail(etudiantDTO.getEmail());
        userRequest.setFirstName(etudiantDTO.getPrenom());
        userRequest.setLastName(etudiantDTO.getNom());
        userRequest.setPassword(etudiantDTO.getPassword());
        userRequest.setRole("ETUDIANT");

        authServiceClient.createUser(userRequest);

        // 2. Sauvegarder l'étudiant localement
        Etudiant etudiant = etudiantDTO.toEntity();
        return repository.save(etudiant);
    }

    // Afficher tous les étudiants
    public List<Etudiant> getAllEtudiants() {
        return repository.findAll();
    }

    // Modifier
    public Etudiant modifierEtudiant(Long id, EtudiantDTO etudiantDTO) {
        Etudiant e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etudiant introuvable"));

        String oldEmail = e.getEmail(); // L'ancien email est le username Keycloak

        // 1. Mise à jour dans Keycloak
        CreateUserRequest userRequest = new CreateUserRequest();
        userRequest.setUsername(etudiantDTO.getEmail());
        userRequest.setEmail(etudiantDTO.getEmail());
        userRequest.setFirstName(etudiantDTO.getPrenom());
        userRequest.setLastName(etudiantDTO.getNom());
        userRequest.setPassword(etudiantDTO.getPassword());
        userRequest.setRole("ETUDIANT");

        try {
            authServiceClient.updateUser(oldEmail, userRequest);
        } catch (Exception ex) {
            System.err.println("Erreur lors de la mise à jour Keycloak : " + ex.getMessage());
            // On continue quand même la mise à jour locale ?
            // Idéalement on devrait rollback ou lancer une exception selon la politique de
            // cohérence.
        }

        // 2. Mise à jour locale
        e.setNom(etudiantDTO.getNom());
        e.setPrenom(etudiantDTO.getPrenom());
        e.setMatricule(etudiantDTO.getMatricule());
        e.setDate_naissance(etudiantDTO.getDate_naissance());
        e.setEmail(etudiantDTO.getEmail());
        e.setTelephone(etudiantDTO.getTelephone());
        e.setAdresse(etudiantDTO.getAdresse());
        e.setSexe(etudiantDTO.getSexe());
        return repository.save(e);
    }

    // Supprimer
    public void supprimerEtudiant(Long id) {
        // Optionnel : supprimer aussi le compte Keycloak ici si besoin
        Etudiant e = getById(id);
        authServiceClient.deleteUser(e.getEmail());
        repository.deleteById(id);
    }

    // Rechercher par ID
    public Etudiant getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EtudiantNotFoundException(id));
    }

    // Rechercher par matricule
    public Etudiant getByMatricule(String matricule) {
        return repository.findByMatricule(matricule)
                .orElseThrow(() -> new EtudiantNotFoundException(matricule));
    }

    public List<Etudiant> getEtudiantsByIds(List<Long> ids) {
        return repository.findAllById(ids);
    }
}
