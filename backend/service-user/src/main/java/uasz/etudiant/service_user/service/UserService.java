package uasz.etudiant.service_user.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import uasz.etudiant.service_user.DTO.CreateEnseignantRequest;
import uasz.etudiant.service_user.DTO.CreateEtudiantRequest;
import uasz.etudiant.service_user.client.EnseignantClient;
import uasz.etudiant.service_user.client.EtudiantClient;
import uasz.etudiant.service_user.model.User;
import uasz.etudiant.service_user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final KeycloakAdminService keycloakService;
    private final EtudiantClient etudiantClient;
    private final EnseignantClient enseignantClient;

    @Transactional
    public void createEtudiant(CreateEtudiantRequest req) {

        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email déjà utilisé");

        String keycloakId = keycloakService.createUser(
                req.getEmail(),
                req.getPassword(),
                "ETUDIANT"
        );

        User user = new User();
        user.setEmail(req.getEmail());
        user.setRole("ETUDIANT");
        user.setKeycloakId(keycloakId);

        userRepository.save(user);

        etudiantClient.CreateEtudiant(req.toEtudiantPayload(user.getId(), keycloakId));
    }

    @Transactional
    public void createEnseignant(CreateEnseignantRequest req) {

        String keycloakId = keycloakService.createUser(
                req.getEmail(),
                req.getPassword(),
                "ENSEIGNANT"
        );

        User user = new User();
        user.setEmail(req.getEmail());
        user.setRole("ENSEIGNANT");
        user.setKeycloakId(keycloakId);

        userRepository.save(user);

        enseignantClient.createEnseignant(req.toEnseignantPayload(user.getId(), keycloakId));
    }
}

