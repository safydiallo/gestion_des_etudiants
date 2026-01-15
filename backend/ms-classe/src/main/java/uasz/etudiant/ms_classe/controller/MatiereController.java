package uasz.etudiant.ms_classe.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import uasz.etudiant.ms_classe.model.Matiere;
import uasz.etudiant.ms_classe.service.MatiereService;

import java.util.List;

@RestController
@RequestMapping("/api/matieres")
@RequiredArgsConstructor
public class MatiereController {

    private final MatiereService service;

    // POST /api/matieres
    @PostMapping
    public Matiere create(@Valid @RequestBody Matiere m) {
        return service.create(m);
    }

    // GET /api/matieres/{id}
    @GetMapping("/{id}")
    public Matiere get(@PathVariable Long id) {
        return service.getById(id);
    }

    // GET /api/matieres
    @GetMapping
    public List<Matiere> getAll() {
        return service.getAll();
    }

    @GetMapping("/by-ids")
    public List<Matiere> getByIds(@RequestParam("ids") List<Long> ids) {
        return service.getByIds(ids);
    }

    // PUT /api/matieres/{id}
    @PutMapping("/{id}")
    public Matiere update(@PathVariable Long id, @Valid @RequestBody Matiere matiere) {
        return service.update(id, matiere);
    }

    // DELETE /api/matieres/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ========== ENDPOINTS POUR LA LIAISON CLASSE-MATIERE ==========

    // GET /api/matieres/classe/{classeId}
    // Récupérer toutes les matières d'une classe spécifique
    @GetMapping("/classe/{classeId}")
    public List<Matiere> getMatieresByClasse(@PathVariable Long classeId) {
        return service.getMatieresByClasseId(classeId);
    }

    // POST /api/matieres/{matiereId}/classe/{classeId}
    // Associer une matière existante à une classe
    @PostMapping("/{matiereId}/classe/{classeId}")
    public Matiere assignToClasse(
            @PathVariable Long matiereId,
            @PathVariable Long classeId) {
        return service.assignToClasse(matiereId, classeId);
    }

    // DELETE /api/matieres/{matiereId}/classe
    // Dissocier une matière de sa classe
    @DeleteMapping("/{matiereId}/classe")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeFromClasse(@PathVariable Long matiereId) {
        service.removeFromClasse(matiereId);
    }

    // GET /api/matieres/sans-classe
    // Récupérer toutes les matières non affectées à une classe
    @GetMapping("/sans-classe")
    public List<Matiere> getMatieresWithoutClasse() {
        return service.getMatieresWithoutClasse();
    }

}
