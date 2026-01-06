package uasz.etudiant.ms_note.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO utilisé pour la saisie d’une note
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNoteDto {

    // Identifiant de l’étudiant
    @NotNull
    private Long etudiantId;

    // Identifiant de la matière
    @NotNull
    private Long matiereId;

    // Valeur de la note
    @NotNull
    private Double valeurNote;

    // Type de la note
    @NotBlank
    private String typeNote;
}
