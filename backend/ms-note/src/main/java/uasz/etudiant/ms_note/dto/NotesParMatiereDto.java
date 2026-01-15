package uasz.etudiant.ms_note.dto;

import lombok.Data;


@Data
public class NotesParMatiereDto {
    private Long etudiantId;
    private String etudiantNom;
    private String etudiantPrenom;
    private Double note;
    private String type;
}