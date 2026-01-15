package uasz.etudiant.ms_classe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import uasz.etudiant.ms_classe.model.Classe;
import uasz.etudiant.ms_classe.model.Matiere;
import uasz.etudiant.ms_classe.repository.ClasseRepository;
import uasz.etudiant.ms_classe.repository.MatiereRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatiereService {

    private final MatiereRepository matiereRepository;
    private final ClasseRepository classeRepository;

    public Matiere create(Matiere m) {
        return matiereRepository.save(m);
    }

    public Matiere getById(Long id) {
        return matiereRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matière introuvable"));
    }

    public List<Matiere> getAll() {
        return matiereRepository.findAll();
    }

    public List<Matiere> getByIds(List<Long> ids) {
        if (ids == null || ids.isEmpty())
            return List.of();
        return matiereRepository.findByIdIn(ids);
    }

    public Matiere update(Long id, Matiere matiere) {
        Matiere existing = getById(id);
        existing.setNom(matiere.getNom());
        existing.setCoefficient(matiere.getCoefficient());
        existing.setClasse(matiere.getClasse());
        return matiereRepository.save(existing);
    }

    public void delete(Long id) {
        Matiere matiere = getById(id);
        matiereRepository.deleteById(matiere.getId());
    }

    // ========== MÉTHODES POUR LA LIAISON CLASSE-MATIERE ==========

    // Récupérer toutes les matières d'une classe spécifique
    public List<Matiere> getMatieresByClasseId(Long classeId) {
        // Vérifier que la classe existe
        if (!classeRepository.existsById(classeId)) {
            throw new RuntimeException("Classe avec l'ID " + classeId + " introuvable");
        }
        return matiereRepository.findByClasseId(classeId);
    }

    // Assigner une matière à une classe
    public Matiere assignToClasse(Long matiereId, Long classeId) {
        Matiere matiere = getById(matiereId);
        Classe classe = classeRepository.findById(classeId)
                .orElseThrow(() -> new RuntimeException(
                        "Classe avec l'ID " + classeId + " introuvable"));
        
        matiere.setClasse(classe);
        return matiereRepository.save(matiere);
    }

    // Dissocier une matière de sa classe
    public void removeFromClasse(Long matiereId) {
        Matiere matiere = getById(matiereId);
        matiere.setClasse(null);
        matiereRepository.save(matiere);
    }

    // Récupérer toutes les matières non affectées à une classe
    public List<Matiere> getMatieresWithoutClasse() {
        return matiereRepository.findByClasseIsNull();
    }
}
