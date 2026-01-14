package uasz.etudiant.service_user.service;

import lombok.RequiredArgsConstructor;
import uasz.etudiant.service_user.DTO.CreateUserRequest;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeycloakAdminService {

    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public void createUser(CreateUserRequest dto) {

        UsersResource users = keycloak.realm(realm).users();

        UserRepresentation user = new UserRepresentation();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEnabled(true);

        users.create(user);

        // récupérer l'utilisateur créé
        UserRepresentation createdUser = users.search(dto.getUsername()).get(0);

        // mot de passe
        CredentialRepresentation pwd = new CredentialRepresentation();
        pwd.setType(CredentialRepresentation.PASSWORD);
        pwd.setValue(dto.getPassword());
        pwd.setTemporary(false);

        users.get(createdUser.getId()).resetPassword(pwd);

        // rôle
        RoleRepresentation role = keycloak
                .realm(realm)
                .roles()
                .get(dto.getRole())
                .toRepresentation();

        users.get(createdUser.getId())
                .roles()
                .realmLevel()
                .add(List.of(role));
    }

    public void deleteUser(String username) {

        UsersResource users = keycloak.realm(realm).users();

        List<UserRepresentation> result = users.search(username);

        if (result.isEmpty()) {
            return; // idempotent (important pour tolérance aux pannes)
        }

        String userId = result.get(0).getId();
        users.get(userId).remove();
    }

    public void updateUser(String oldUsername, CreateUserRequest dto) {
        UsersResource users = keycloak.realm(realm).users();
        List<UserRepresentation> result = users.search(oldUsername);

        if (result.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé dans Keycloak : " + oldUsername);
        }

        UserRepresentation user = result.get(0);
        user.setUsername(dto.getEmail()); // Username = Email
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());

        users.get(user.getId()).update(user);

        // Mise à jour du mot de passe si fourni
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            CredentialRepresentation pwd = new CredentialRepresentation();
            pwd.setType(CredentialRepresentation.PASSWORD);
            pwd.setValue(dto.getPassword());
            pwd.setTemporary(false);
            users.get(user.getId()).resetPassword(pwd);
        }
    }
}