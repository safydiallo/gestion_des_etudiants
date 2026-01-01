package uasz.etudiant.ms_enseignant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

// Entité représentant l'association Enseignant Matière
@Entity

// Table intermédiaire
@Table(
        name = "enseignant_matieres",
        uniqueConstraints = @UniqueConstraint(columnNames = {"enseignant_id", "matiere_id"})
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnseignantMatiere {

    // Clé primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relation vers l’enseignant
    @ManyToOne(optional = false)

    // Colonne de jointure
    @JoinColumn(name = "enseignant_id")
    @JsonIgnore // Evite la sérialisation infinie
    private Enseignant enseignant;

    // ID de la matière venant du service-classe
    @Column(name = "matiere_id", nullable = false)
    private Long matiereId;
}
