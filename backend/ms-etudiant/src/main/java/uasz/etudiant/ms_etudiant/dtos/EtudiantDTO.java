package uasz.etudiant.ms_etudiant.dtos;

import lombok.Data;
import uasz.etudiant.ms_etudiant.model.Etudiant;

@Data
public class EtudiantDTO {
    private String matricule;
    private String nom;
    private String prenom;
    private String date_naissance;
    private String email;
    private String telephone;
    private String adresse;
    private String sexe;
    private String password; // Ce champ manquait !

    public Etudiant toEntity() {
        Etudiant e = new Etudiant();
        e.setMatricule(this.matricule);
        e.setNom(this.nom);
        e.setPrenom(this.prenom);
        e.setDate_naissance(this.date_naissance);
        e.setEmail(this.email);
        e.setTelephone(this.telephone);
        e.setAdresse(this.adresse);
        e.setSexe(this.sexe);
        return e;
    }
}
