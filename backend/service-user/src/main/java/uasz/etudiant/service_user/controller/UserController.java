package uasz.etudiant.service_user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import uasz.etudiant.service_user.DTO.CreateEnseignantRequest;
import uasz.etudiant.service_user.DTO.CreateEtudiantRequest;
import uasz.etudiant.service_user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@EnableMethodSecurity
public class UserController {

    private final UserService userService;

    @PostMapping("/etudiants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEtudiant(@RequestBody CreateEtudiantRequest request) {
        userService.createEtudiant(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/enseignants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEnseignant(@RequestBody CreateEnseignantRequest request) {
        userService.createEnseignant(request);
        return ResponseEntity.ok().build();
    }
}

