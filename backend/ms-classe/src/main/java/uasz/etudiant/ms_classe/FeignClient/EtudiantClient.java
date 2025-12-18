package uasz.etudiant.ms_classe.FeignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import uasz.etudiant.ms_classe.DTO.EtudiantDTO;

@FeignClient(name = "ms-etudiant")
public interface EtudiantClient {

    @GetMapping("/api/etudiants/{id}")
    EtudiantDTO getEtudiant(@PathVariable Long id);
}

