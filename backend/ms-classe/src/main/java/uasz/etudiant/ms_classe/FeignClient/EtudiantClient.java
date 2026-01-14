package uasz.etudiant.ms_classe.FeignClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import uasz.etudiant.ms_classe.DTO.EtudiantDTO;

@FeignClient(name = "ms-etudiant")
public interface EtudiantClient {

    @GetMapping("/api/inscriptions/etudiants/classe/{classeId}")
    List<EtudiantDTO> getEtudiantsParClasse(
            @org.springframework.web.bind.annotation.PathVariable("classeId") Long classeId);
}
