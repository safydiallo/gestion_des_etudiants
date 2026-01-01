package uasz.etudiant.ms_note.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// DTO représentant un bulletin de notes
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulletinDto {

    // Identifiant de l’étudiant
    private Long etudiantId;

    // Moyenne générale
    private Double moyenne;

    // Liste des notes (DTO simples, pas Entity)
    private List<NoteDto> notes;
}
