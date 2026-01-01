package uasz.etudiant.ms_note.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

// Entité représentant une note d’un étudiant
@Entity

// Nom de la table en base
@Table(name = "notes")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    // Clé primaire
    @Id

    // Génération automatique de l’ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNote;

    // ID de l’étudiant (venant du service-etudiant)
    private Long etudiantId;

    // ID de la matière (venant du service-classe)
    private Long matiereId;

    // Valeur de la note (ex : 15.5)
    private Double valeurNote;

    // Type de note (DS, EXAM, TP, etc.)
    private String typeNote;

    // Date de saisie de la note
    private LocalDateTime dateSaisie;
}
