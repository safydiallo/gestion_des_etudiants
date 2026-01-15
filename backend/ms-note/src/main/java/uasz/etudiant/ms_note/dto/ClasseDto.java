package uasz.etudiant.ms_note.dto;

import lombok.Data;

@Data
public class ClasseDto {
    private Long id;
    private String nom;
    private String niveau;
    private String annee;
}