package uasz.etudiant.ms_etudiant.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "etudiant")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le matricule est obligatoire")
    @Size(min = 5, max = 20, message = "Le matricule doit contenir entre 5 et 20 caractères")
    @Column(unique = true)
    private String matricule;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotNull(message = "La date de naissance est obligatoire")
    private String date_naissance;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @Pattern(
        regexp = "^(\\+221|00221)?[0-9]{9}$",
        message = "Numéro de téléphone invalide"
    )
    private String telephone;

    @NotBlank(message = "L'adresse est obligatoire")
    private String adresse;

    @NotBlank(message = "Le sexe est obligatoire")
    @Pattern(
        regexp = "M|F",
        message = "Le sexe doit être 'M' ou 'F'"
    )
    private String sexe;

    private Long classeId; // référence vers service-classe
}
