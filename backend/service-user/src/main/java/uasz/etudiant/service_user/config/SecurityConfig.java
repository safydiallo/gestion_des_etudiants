package uasz.etudiant.service_user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())  // Désactive CSRF pour permettre POST d'Eureka
            .authorizeHttpRequests(auth -> auth
                // Permettre l'accès libre à Eureka et aux endpoints Actuator
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/eureka/**").permitAll()
                // Tout le reste nécessite authentification
                .requestMatchers("/api/**").authenticated()
                .anyRequest().authenticated()
            )
            // Activation JWT Keycloak pour sécuriser les autres endpoints
            .oauth2ResourceServer(oauth -> oauth.jwt());

        return http.build();
    }
}
