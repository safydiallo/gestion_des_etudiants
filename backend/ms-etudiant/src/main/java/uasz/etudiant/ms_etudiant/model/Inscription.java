package uasz.etudiant.ms_etudiant.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(
    name = "inscription",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"etudiantId"})
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "L'étudiant est obligatoire")
    @Column(nullable = false, unique = true)
    private Long etudiantId;   // ID Etudiant (local)

    @NotNull(message = "La classe est obligatoire")
    @Column(nullable = false)
    private Long classeId;     // ID Classe (microservice classe)
}
