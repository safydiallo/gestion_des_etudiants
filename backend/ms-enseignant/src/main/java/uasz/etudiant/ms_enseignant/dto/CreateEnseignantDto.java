package uasz.etudiant.ms_enseignant.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO utilisé pour la création d'un enseignant
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEnseignantDto {

    // Matricule obligatoire
    @NotBlank
    private String matriculeEns;

    // Nom obligatoire
    @NotBlank
    private String nom;

    // Prénom obligatoire
    @NotBlank
    private String prenom;

    // Email (optionnel)
    private String email;

    // Téléphone (optionnel)
    private String telephone;

    // Spécialité de l’enseignant
    private String specialite;
}
