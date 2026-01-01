package uasz.etudiant.ms_enseignant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnseignantDetailsDto {
    private Long idEnseignant;
    private String matriculeEns;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String specialite;

    // détails matières (peut être vide si ms-classe indisponible)
    private List<MatiereDto> matieres;

    // ids toujours disponibles
    private List<Long> matiereIds;

    // indique si on a pu enrichir
    private boolean detailsMatieresDisponibles;
}
