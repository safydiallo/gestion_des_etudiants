package uasz.etudiant.ms_etudiant.exception;

public class EtudiantNotFoundException extends RuntimeException {
    // Constructor for ID not found
    public EtudiantNotFoundException(Long id) {
        super("Etudiant avec id " + id + " introuvable");
    }
    // Constructor for matricule not found
    public EtudiantNotFoundException(String matricule) {
        super("Etudiant avec matricule " + matricule + " introuvable");
    }
    
}
