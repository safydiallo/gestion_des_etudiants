package uasz.etudiant.service_user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-etudiant")  // Nom du service Eureka
public interface EtudiantClient {
    
    @PostMapping("/api/etudiants")
    void CreateEtudiant(@RequestBody Object payload);
}
