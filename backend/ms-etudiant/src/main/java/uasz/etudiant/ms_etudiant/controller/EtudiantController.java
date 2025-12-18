package uasz.etudiant.ms_etudiant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.service.EtudiantService;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    private final EtudiantService service;

    public EtudiantController(EtudiantService service) {
        this.service = service;
    }

    // POST api/etudiants
    @PostMapping
    public Etudiant creer(@RequestBody Etudiant etudiant) {
        return service.creerEtudiant(etudiant);
    }

    // GET api/etudiants/{id}
    @GetMapping("/{id}")
    public Etudiant get(@PathVariable Long id) {
        return service.getEtudiant(id);
    }

    //GET /etudiants
    @GetMapping("/all")
    public List<Etudiant> getAllEtudiants() {
        return service.getAllEtudiants();
    }

    // GET /etudiants/matricule/{matricule}
    @GetMapping("/{matricule}")
    public Etudiant getByMatricule(@PathVariable String matricule) {
        return service.getByMatricule(matricule);
    }

    // GET /etudiants?classe=6A
    @GetMapping
    public List<Etudiant> getByClasse(@RequestParam(required = false) String classe) {
        return service.getByClasse(classe);
    }

    // PUT api/etudiants/{id}
    @PutMapping("/{id}")
    public Etudiant modifier(@PathVariable Long id, @RequestBody Etudiant etudiant) {
        return service.modifierEtudiant(id, etudiant);
    }

    // DELETE api/etudiants/{id}
    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        service.supprimerEtudiant(id);
    }
}