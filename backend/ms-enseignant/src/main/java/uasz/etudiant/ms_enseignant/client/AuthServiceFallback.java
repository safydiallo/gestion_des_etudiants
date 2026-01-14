package uasz.etudiant.ms_enseignant.client;

import lombok.extern.slf4j.Slf4j;
import uasz.etudiant.ms_enseignant.dto.CreateUserRequest;
import uasz.etudiant.ms_enseignant.exception.ServiceUnavailableException;

import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthServiceFallback implements AuthServiceClient {

    @Override
    public void createUser(CreateUserRequest request) {
        throw new ServiceUnavailableException(
                "Auth-service indisponible. Réessayer plus tard.");
    }

    @Override
    public void deleteUser(String username) {
        // LOG uniquement — ne pas re-throw
        log.warn("Impossible de supprimer l'utilisateur Keycloak : " + username);
    }

    @Override
    public void updateUser(String username, CreateUserRequest request) {
        throw new ServiceUnavailableException(
                "Impossible de mettre à jour l'utilisateur Keycloak (service indisponible)");
    }
}
