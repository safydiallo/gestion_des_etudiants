package uasz.etudiant.ms_classe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String nom; // ex: L2 Info, M1 GL

    @NotBlank(message = "Le niveau est obligatoire")
    private String niveau; // ex: L1, L2, M1, M2

    @NotBlank(message = "L'année est obligatoire")
    private String annee; // ex: 2023, 2024

}
