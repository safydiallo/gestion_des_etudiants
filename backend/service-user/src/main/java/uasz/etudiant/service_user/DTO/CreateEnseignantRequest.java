package uasz.etudiant.service_user.DTO;

import lombok.Data;

@Data
public class CreateEnseignantRequest {
    private String email;
    private String password;
    private String prenom;
    private String nom;
    private String telephone;
    private String matricule;
    private String specialite;
    public Object toEnseignantPayload(Long userId, String keycloakId) {
        return new Object(); // à adapter
    }
}
