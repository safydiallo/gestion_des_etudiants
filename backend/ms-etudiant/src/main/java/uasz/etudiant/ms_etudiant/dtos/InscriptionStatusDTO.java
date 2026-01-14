package uasz.etudiant.ms_etudiant.dtos;

public class InscriptionStatusDTO {
    private Long etudiantId;
    private String statut; // "INSCRIT" ou "NON_INSCRIT"
    private Long classeId;
    private String classeNom;

    public InscriptionStatusDTO() {
    }

    public InscriptionStatusDTO(Long etudiantId, String statut, Long classeId, String classeNom) {
        this.etudiantId = etudiantId;
        this.statut = statut;
        this.classeId = classeId;
        this.classeNom = classeNom;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Long getClasseId() {
        return classeId;
    }

    public void setClasseId(Long classeId) {
        this.classeId = classeId;
    }

    public String getClasseNom() {
        return classeNom;
    }

    public void setClasseNom(String classeNom) {
        this.classeNom = classeNom;
    }
}
