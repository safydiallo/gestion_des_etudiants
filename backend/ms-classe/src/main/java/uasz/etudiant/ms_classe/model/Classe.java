package uasz.etudiant.ms_classe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le libelle est obligatoire")
    private String libelle; // ex: L2 Info, M1 GL

    @ElementCollection
    private List<Long> etudiantIds; // IDs venant du ms-etudiant
}
