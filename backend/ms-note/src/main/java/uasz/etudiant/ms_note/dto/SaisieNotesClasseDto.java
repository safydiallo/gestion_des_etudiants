package uasz.etudiant.ms_note.dto;

import lombok.Data;
import java.util.List;

@Data
public class SaisieNotesClasseDto {
    private Long matiereId;
    private String type; // "CC", "Examen", "TP"
    private String semestre;
    private List<NoteEtudiantDto> notes;
}