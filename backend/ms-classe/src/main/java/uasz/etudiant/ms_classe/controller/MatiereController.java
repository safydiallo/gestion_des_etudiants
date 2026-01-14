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
}
