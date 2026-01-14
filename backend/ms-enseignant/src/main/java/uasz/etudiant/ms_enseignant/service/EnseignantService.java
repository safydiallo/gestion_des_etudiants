package uasz.etudiant.ms_enseignant.service;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uasz.etudiant.ms_enseignant.client.MatiereClient;
import uasz.etudiant.ms_enseignant.dto.CreateEnseignantDto;
import uasz.etudiant.ms_enseignant.dto.MatiereDto;
import uasz.etudiant.ms_enseignant.entity.Enseignant;
import uasz.etudiant.ms_enseignant.entity.EnseignantMatiere;
import uasz.etudiant.ms_enseignant.exception.BadRequestException;
import uasz.etudiant.ms_enseignant.exception.ServiceUnavailableException;
import uasz.etudiant.ms_enseignant.repository.EnseignantMatiereRepository;
import uasz.etudiant.ms_enseignant.repository.EnseignantRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnseignantService {

    private final EnseignantRepository enseignantRepository;
    private final EnseignantMatiereRepository enseignantMatiereRepository;

    // Client vers ms-classe
    private final MatiereClient matiereClient;
    // Client vers service-user (Keycloak)
    private final uasz.etudiant.ms_enseignant.client.AuthServiceClient authServiceClient;

    public Enseignant create(CreateEnseignantDto dto) {
        // 1. Créer l'utilisateur dans Keycloak via service-user
        uasz.etudiant.ms_enseignant.dto.CreateUserRequest userRequest = new uasz.etudiant.ms_enseignant.dto.CreateUserRequest();
        userRequest.setUsername(dto.getEmail()); // Username = Email
        userRequest.setEmail(dto.getEmail());
        userRequest.setFirstName(dto.getPrenom());
        userRequest.setLastName(dto.getNom());
        userRequest.setPassword(dto.getPassword());
        userRequest.setRole("ENSEIGNANT");

        authServiceClient.createUser(userRequest);

        // 2. Sauvegarder l'enseignant localement
        Enseignant enseignant = Enseignant.builder()
                .matriculeEns(dto.getMatriculeEns())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .specialite(dto.getSpecialite())
                .build();

        return enseignantRepository.save(enseignant);
    }

    public Enseignant getById(Long id) {
        return enseignantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enseignant introuvable"));
    }

    public List<Enseignant> getAll() {
        return enseignantRepository.findAll();
    }

    @Transactional
    public List<Long> affectMatieres(Long enseignantId, List<Long> matiereIds) {

        if (matiereIds == null || matiereIds.isEmpty()) {
            throw new BadRequestException("La liste des matières est vide");
        }

        // Déduplication propre (évite doublons)
        List<Long> uniqueIds = matiereIds.stream()
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // 1) VALIDATION auprès de ms-classe
        List<MatiereDto> found;
        try {
            found = matiereClient.getMatieresByIds(uniqueIds);
        } catch (FeignException e) {
            // ms-classe down / erreur réseau / timeout / 5xx
            throw new ServiceUnavailableException("ms-classe est indisponible : impossible de valider les matières");
        }

        Set<Long> foundIds = found.stream()
                .map(MatiereDto::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        List<Long> missing = uniqueIds.stream()
                .filter(id -> !foundIds.contains(id))
                .toList();

        if (!missing.isEmpty()) {
            throw new BadRequestException("Matières inexistantes (IDs) : " + missing);
        }

        // 2) Sauvegarde de l’association
        Enseignant enseignant = getById(enseignantId);

        for (Long matiereId : uniqueIds) {
            boolean exists = enseignantMatiereRepository
                    .existsByEnseignant_IdEnseignantAndMatiereId(enseignantId, matiereId);

            if (!exists) {
                EnseignantMatiere link = EnseignantMatiere.builder()
                        .enseignant(enseignant)
                        .matiereId(matiereId)
                        .build();

                enseignantMatiereRepository.save(link);
            }
        }

        return uniqueIds;
    }

    public uasz.etudiant.ms_enseignant.dto.EnseignantDetailsDto getDetails(Long id) {

        Enseignant e = getById(id);

        List<Long> ids = e.getMatieres().stream()
                .map(link -> link.getMatiereId())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // Mode dégradé : si ms-classe down -> on renvoie ids seulement
        try {
            List<MatiereDto> matieres = ids.isEmpty() ? List.of() : matiereClient.getMatieresByIds(ids);

            return new uasz.etudiant.ms_enseignant.dto.EnseignantDetailsDto(
                    e.getIdEnseignant(),
                    e.getMatriculeEns(),
                    e.getNom(),
                    e.getPrenom(),
                    e.getEmail(),
                    e.getTelephone(),
                    e.getSpecialite(),
                    matieres,
                    ids,
                    true);

        } catch (Exception ex) {
            return new uasz.etudiant.ms_enseignant.dto.EnseignantDetailsDto(
                    e.getIdEnseignant(),
                    e.getMatriculeEns(),
                    e.getNom(),
                    e.getPrenom(),
                    e.getEmail(),
                    e.getTelephone(),
                    e.getSpecialite(),
                    List.of(),
                    ids,
                    false);
        }
    }

    // Modifier un enseignant (avec synchronisation Keycloak)
    public Enseignant update(Long id, CreateEnseignantDto dto) {
        Enseignant enseignant = getById(id);
        String oldEmail = enseignant.getEmail();

        // 1. Mise à jour dans Keycloak
        uasz.etudiant.ms_enseignant.dto.CreateUserRequest userRequest = new uasz.etudiant.ms_enseignant.dto.CreateUserRequest();
        userRequest.setUsername(dto.getEmail());
        userRequest.setEmail(dto.getEmail());
        userRequest.setFirstName(dto.getPrenom());
        userRequest.setLastName(dto.getNom());
        userRequest.setPassword(dto.getPassword());
        userRequest.setRole("ENSEIGNANT");

        try {
            authServiceClient.updateUser(oldEmail, userRequest);
        } catch (Exception ex) {
            System.err.println("Erreur lors de la mise à jour Keycloak : " + ex.getMessage());
        }

        // 2. Mise à jour locale
        enseignant.setMatriculeEns(dto.getMatriculeEns());
        enseignant.setNom(dto.getNom());
        enseignant.setPrenom(dto.getPrenom());
        enseignant.setEmail(dto.getEmail());
        enseignant.setTelephone(dto.getTelephone());
        enseignant.setSpecialite(dto.getSpecialite());

        return enseignantRepository.save(enseignant);
    }

    // Supprimer un enseignant (avec synchronisation Keycloak)
    public void delete(Long id) {
        Enseignant enseignant = getById(id);

        // Supprimer le compte Keycloak
        try {
            authServiceClient.deleteUser(enseignant.getEmail());
        } catch (Exception ex) {
            System.err.println("Erreur lors de la suppression Keycloak : " + ex.getMessage());
        }

        // Supprimer localement
        enseignantRepository.deleteById(id);
    }

}
