package uasz.etudiant.service_user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-enseignant")  // Nom du service Eureka
public interface EnseignantClient {
    
    @PostMapping("/api/enseignants")
    void createEnseignant(@RequestBody Object payload);
}