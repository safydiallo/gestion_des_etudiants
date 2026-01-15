package uasz.etudiant.ms_note.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import uasz.etudiant.ms_note.entity.Note;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulletinDto {
    private Long etudiantId;
    private Double moyenneGenerale;
    private List<Note> notes;
}
