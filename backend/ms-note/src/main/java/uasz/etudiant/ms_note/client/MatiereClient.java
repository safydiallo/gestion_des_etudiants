package uasz.etudiant.ms_note.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import uasz.etudiant.ms_note.dto.MatiereDto;

import java.util.List;

@FeignClient(name = "ms-classe")
public interface MatiereClient {

    // Vérifie l’existence d’une matière par son ID
    @GetMapping("/api/matieres/{id}")
    Object getMatiereById(@PathVariable("id") Long id);

    // Batch pour récupérer plusieurs matières
    @GetMapping("/api/matieres/by-ids")
    List<MatiereDto> getMatieresByIds(@RequestParam("ids") List<Long> ids);
}
