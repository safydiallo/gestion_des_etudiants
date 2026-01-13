package uasz.etudiant.ms_note.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import uasz.etudiant.ms_note.dto.CreateUserRequest;




@FeignClient(name = "service-user", fallback = AuthServiceFallback.class)
public interface AuthServiceClient {

    @PostMapping("/api/auth/users")
    void createUser(@RequestBody CreateUserRequest request);

    @DeleteMapping("/api/auth/users/{username}")
    void deleteUser(@PathVariable String username);
}