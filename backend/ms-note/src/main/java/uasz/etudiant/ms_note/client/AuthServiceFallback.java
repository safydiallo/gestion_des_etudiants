package uasz.etudiant.ms_note.client;

import lombok.extern.slf4j.Slf4j;

import uasz.etudiant.ms_note.dto.CreateUserRequest;
import uasz.etudiant.ms_note.exception.ServiceUnavailableException2;

import org.springframework.stereotype.Component;


@Component
@Slf4j
public class AuthServiceFallback implements AuthServiceClient {

    @Override
    public void createUser(CreateUserRequest request) {
        throw new ServiceUnavailableException2(
                "Auth-service indisponible. Réessayer plus tard.");
    }

    @Override
    public void deleteUser(String username) {
        // LOG uniquement — ne pas re-throw
        log.warn("Impossible de supprimer l'utilisateur Keycloak : " + username);
    }
}
