package uasz.etudiant.ms_enseignant.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// DTO pour affecter des matières à un enseignant
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AffectMatieresDto {

    // Liste des IDs des matières
    @NotEmpty
    private List<Long> matiereIds;
}
