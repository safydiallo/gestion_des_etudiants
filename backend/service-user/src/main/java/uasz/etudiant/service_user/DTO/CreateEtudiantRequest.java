package uasz.etudiant.service_user.DTO;

import lombok.Data;

@Data   
public class CreateEtudiantRequest {

    private String email;
    private String password;
    private String prenom;
    private String nom;
    private String matricule;
    private String telephone;
    private String adresse;
    private String dateNaissance;
    private String sexe;
    private Long classeId;

    public Object toEtudiantPayload(Long userId, String keycloakId) {
        return new Object(); // à adapter
    }
}
