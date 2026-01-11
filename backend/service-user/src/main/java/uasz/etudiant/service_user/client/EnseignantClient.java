package uasz.etudiant.service_user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "ms-enseignant")
public interface EnseignantClient {

    @PostMapping("/teachers")
    void createEnseignant(@RequestBody Object request);
}
