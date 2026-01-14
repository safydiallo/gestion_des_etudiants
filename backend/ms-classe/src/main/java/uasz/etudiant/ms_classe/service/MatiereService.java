package uasz.etudiant.ms_classe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uasz.etudiant.ms_classe.model.Matiere;
import uasz.etudiant.ms_classe.repository.MatiereRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatiereService {

    private final MatiereRepository matiereRepository;

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
        return matiereRepository.save(existing);
    }

    public void delete(Long id) {
        Matiere matiere = getById(id);
        matiereRepository.deleteById(matiere.getId());
    }
}
