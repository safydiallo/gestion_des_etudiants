package uasz.etudiant.ms_note.dto;

import lombok.Data;

@Data
public class EtudiantDto {
    private Long id;
    private String nom;
    private String prenom;
    private String matricule;
    private String email;
}