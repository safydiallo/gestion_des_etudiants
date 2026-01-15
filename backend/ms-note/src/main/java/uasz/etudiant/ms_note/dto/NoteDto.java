package uasz.etudiant.ms_note.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private Long id;
    private Long etudiantId;
    private Long matiereId;
    private String matiereNom;
    private Double valeur;
    private String type;
    private String semestre;
    private Integer coefficient;
}