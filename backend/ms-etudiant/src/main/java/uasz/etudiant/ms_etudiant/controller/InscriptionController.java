package uasz.etudiant.ms_etudiant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import uasz.etudiant.ms_etudiant.dtos.InscriptionStatusDTO;
import uasz.etudiant.ms_etudiant.model.Etudiant;
import uasz.etudiant.ms_etudiant.model.Inscription;
import uasz.etudiant.ms_etudiant.service.EtudiantService;
import uasz.etudiant.ms_etudiant.service.InscriptionService;

@RestController
@RequestMapping("/api/inscriptions")
public class InscriptionController {

    private final InscriptionService service;

    private final EtudiantService serviceEtudiant;

    public InscriptionController(InscriptionService service, EtudiantService serviceEtudiant) {
        this.service = service;
        this.serviceEtudiant = serviceEtudiant;
    }

    // POST /api/inscriptions?etudiantId=1&classeId=2
    @PostMapping
    public Inscription inscrire(
            @RequestParam Long etudiantId,
            @RequestParam Long classeId) {
        return service.inscrire(etudiantId, classeId);
    }

    // POST /api/inscriptions/by-name?etudiantId=1&className=L2%20Info
    @PostMapping("/by-name")
    public Inscription inscrireByClassName(
            @RequestParam Long etudiantId,
            @RequestParam String className) {
        return service.inscrireByClassName(etudiantId, className);
    }

    // GET /api/inscriptions/etudiant/1
    @GetMapping("/etudiant/{id}")
    public Inscription getByEtudiant(@PathVariable Long id) {
        return service.getByEtudiant(id);
    }

    // DELETE /api/inscriptions/{id}
    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        service.supprimer(id);
    }

    // GET /api/inscriptions
    @GetMapping("/etudiants/classe/{classeId}")
    public List<Etudiant> getEtudiantsParClasse(@PathVariable Long classeId) {
        List<Long> ids = service.getEtudiantIdsByClasse(classeId);
        return serviceEtudiant.getEtudiantsByIds(ids);
    }

    // GET /api/inscriptions/status/{etudiantId}
    @GetMapping("/status/{etudiantId}")
    public InscriptionStatusDTO getStatus(@PathVariable Long etudiantId) {
        return service.getInscriptionStatus(etudiantId);
    }

}
