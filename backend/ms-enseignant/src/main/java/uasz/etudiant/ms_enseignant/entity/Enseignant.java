package uasz.etudiant.ms_enseignant.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

// Entité représentant la table enseignant
@Entity

// Nom de la table dans la base de données
@Table(name = "enseignants")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enseignant {

    // Clé primaire
    @Id

    // Génération automatique de l’ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEnseignant;

    // Matricule unique de l’enseignant
    @Column(nullable = false, unique = true)
    private String matriculeEns;

    // Nom de l’enseignant
    @Column(nullable = false)
    private String nom;

    // Prénom de l’enseignant
    @Column(nullable = false)
    private String prenom;

    // Email (unique)
    @Column(unique = true)
    private String email;

    // Numéro de téléphone
    private String telephone;

    // Spécialité
    private String specialite;

    // Relation Enseignant → Matières (via table intermédiaire)
    @OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL, orphanRemoval = true)

    // Initialisation automatique
    @Builder.Default
    private Set<EnseignantMatiere> matieres = new HashSet<>();
}
