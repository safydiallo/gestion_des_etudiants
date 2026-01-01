package uasz.etudiant.ms_enseignant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatiereDto {
    private Long id;
    private String nom;
    private Integer coefficient;
}
