package uasz.etudiant.service_user.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

    // ✅ CORRIGÉ: utilisez "app.keycloak" au lieu de "keycloak"
    @Value("${app.keycloak.server-url}")
    private String serverUrl;

    @Value("${app.keycloak.realm}")
    private String realm;

    @Value("${app.keycloak.admin-username}")
    private String adminUsername;

    @Value("${app.keycloak.admin-password}")
    private String adminPassword;

    // ✅ CORRIGÉ: utilisez une valeur par défaut
    @Value("${app.keycloak.admin-client-id:admin-cli}")
    private String clientId;



    @Bean
    public Keycloak keycloakAdmin() {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm("master")  // Realm admin = master
                .username(adminUsername)
                .password(adminPassword)
                .clientId(clientId)
                .build();
    }
}