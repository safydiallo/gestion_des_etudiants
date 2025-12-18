package uasz.etudiant.ms_classe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import uasz.etudiant.ms_classe.model.Classe;
import uasz.etudiant.ms_classe.service.ClasseService;

@RestController
@RequestMapping("/api/classes")
public class ClasseController {

    private final ClasseService service;

    public ClasseController(ClasseService service) {
        this.service = service;
    }

    // POST /api/classes
    @PostMapping
    public Classe creer(@Valid @RequestBody Classe classe) {
        return service.creerClasse(classe);
    }

    // GET /api/classes/{id}
    @GetMapping("/{id}")
    public Classe get(@PathVariable Long id) {
        return service.getClasse(id);
    }
    //GET /api/classes/{name}
    @GetMapping("/{name}")
    public Classe getByName(@PathVariable String name) {
        return service.getClassesByName(name);
    }

    //GET /api/classes
    @GetMapping
    public java.util.List<Classe> getAllClasses() {
        return service.getAllClasses();
    }

    //Ajouter un etudiant à une classe
    // POST /classes/{id}/etudiants/{etudiantId}
    @PostMapping("/{id}/etudiants/{etudiantId}")
    public Classe ajouterEtudiant(
            @PathVariable Long idClasse,
            @PathVariable Long etudiantId) {
        return service.ajouterEtudiant(idClasse, etudiantId);
    }

}

