package uasz.etudiant.ms_note.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// Client Feign pour communiquer avec le ms-etudiant
@FeignClient(name = "ms-etudiant")
public interface EtudiantClient {

    // Vérifie l’existence d’un étudiant par son ID
    @GetMapping("/students/{id}")
    Object getStudentById(@PathVariable("id") Long id);
}
