package uasz.etudiant.ms_note.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NoteEtudiantDto {
    @NotNull(message = "L'ID de l'étudiant est obligatoire")
    private Long etudiantId;
    
    @NotNull(message = "La note est obligatoire")
    @DecimalMin(value = "0.0", message = "La note doit être >= 0")
    @DecimalMax(value = "20.0", message = "La note doit être <= 20")
    private Double valeur;
}