package uasz.etudiant.ms_etudiant.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-classe")
public interface ClasseClient {

    @GetMapping("/api/classes/name/{name}")
    ClasseDTO getClasseByName(@PathVariable("name") String name);
}
