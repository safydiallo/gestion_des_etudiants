package uasz.etudiant.ms_note.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import uasz.etudiant.ms_note.dto.ClasseDto;
import uasz.etudiant.ms_note.dto.EtudiantDto;
import uasz.etudiant.ms_note.dto.MatiereDto;

import java.util.List;

@FeignClient(name = "ms-classe")
public interface ClasseClient {
    
    // Récupérer une classe par son ID
    @GetMapping("/api/classes/{id}")
    ClasseDto getClasseById(@PathVariable("id") Long id);
    
    // Récupérer tous les étudiants d'une classe
    @GetMapping("/api/classes/{id}/etudiants")
    List<EtudiantDto> getEtudiantsByClasseId(@PathVariable("id") Long id);

    // ===== MATIERES =====

    // Retourner MatiereDto au lieu de Object
    @GetMapping("/api/matieres/{id}")
    MatiereDto getMatiereById(@PathVariable("id") Long id);

    // Batch pour récupérer plusieurs matières
    @GetMapping("/api/matieres/by-ids")
    List<MatiereDto> getMatieresByIds(@RequestParam("ids") List<Long> ids);
}