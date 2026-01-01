package uasz.etudiant.ms_enseignant.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import uasz.etudiant.ms_enseignant.dto.AffectMatieresDto;
import uasz.etudiant.ms_enseignant.dto.CreateEnseignantDto;
import uasz.etudiant.ms_enseignant.entity.Enseignant;
import uasz.etudiant.ms_enseignant.service.EnseignantService;
import uasz.etudiant.ms_enseignant.dto.EnseignantDetailsDto;

import java.util.List;

// Contrôleur REST du service Enseignant
@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class EnseignantController {

    // Injection du service métier
    private final EnseignantService enseignantService;

    // Endpoint pour créer un enseignant
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Enseignant create(@Valid @RequestBody CreateEnseignantDto dto) {
        return enseignantService.create(dto);
    }

    // Endpoint pour récupérer tous les enseignants
    @GetMapping
    public List<Enseignant> getAll() {
        return enseignantService.getAll();
    }

    // Endpoint pour affecter des matières à un enseignant
    @PostMapping("/{id}/matieres")
    public List<Long> affectMatieres(
            @PathVariable Long id,
            @Valid @RequestBody AffectMatieresDto dto) {
        return enseignantService.affectMatieres(id, dto.getMatiereIds());
    }

    // Endpoint pour récupérer un enseignant
    @GetMapping("/{id}")
    public Enseignant get(@PathVariable Long id) {
        return enseignantService.getById(id);
    }

    
    @GetMapping("/{id}/details")
    public EnseignantDetailsDto getDetails(@PathVariable Long id) {
        return enseignantService.getDetails(id);
    }

}
