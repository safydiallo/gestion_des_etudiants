package uasz.etudiant.ms_classe.FeignClient;

import lombok.extern.slf4j.Slf4j;
import uasz.etudiant.ms_classe.DTO.CreateUserRequest;
import uasz.etudiant.ms_classe.exception.ServiceUnavailableException2;

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
