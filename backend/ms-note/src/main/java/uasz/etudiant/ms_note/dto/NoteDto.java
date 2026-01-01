package uasz.etudiant.ms_note.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO simple représentant une note
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {

    // Identifiant de la matière
    private Long matiereId;

    // Valeur de la note
    private Double valeurNote;

    // Type de la note
    private String typeNote;
}
