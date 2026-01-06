package uasz.etudiant.ms_note.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulletinDto {
    private Long etudiantId;
    private Double moyenne;
    private List<NoteDto> notes;

    private boolean moyennePonderee;
    private boolean matieresDisponibles;
}
