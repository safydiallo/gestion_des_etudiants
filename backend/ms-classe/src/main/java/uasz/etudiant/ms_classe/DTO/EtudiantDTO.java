package uasz.etudiant.ms_classe.DTO;

import lombok.Data;

@Data
public class EtudiantDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String matricule;
    private String email;
    private String telephone;
    private String adresse;
    private String dateNaissance;
    private String sexe;
}

