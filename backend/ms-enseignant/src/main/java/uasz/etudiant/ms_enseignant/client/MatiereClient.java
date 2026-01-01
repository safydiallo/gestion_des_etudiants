package uasz.etudiant.ms_enseignant.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import uasz.etudiant.ms_enseignant.dto.MatiereDto;

import java.util.List;

@FeignClient(name = "ms-classe")
public interface MatiereClient {

    @GetMapping("/api/matieres/by-ids")
    List<MatiereDto> getMatieresByIds(@RequestParam("ids") List<Long> ids);
}
