package uasz.etudiant.ms_classe.exception;

public class ClasseNotFoundException extends RuntimeException {

    // Constructor for ID not found
    public ClasseNotFoundException(Long id) {
        super("Classe avec id " + id + " introuvable");
    }

    // Constructor for custom message (e.g., class name not found)
    public ClasseNotFoundException(String message) {
        super(message);
    }

}
