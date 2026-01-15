package uasz.etudiant.ms_note.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import uasz.etudiant.ms_note.dto.*;
import uasz.etudiant.ms_note.entity.Note;
import uasz.etudiant.ms_note.service.NotesService;

import java.util.List;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NotesController {

    private final NotesService notesService;

    // Saisir une note individuelle
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note create(@Valid @RequestBody CreateNoteDto dto) {
        return notesService.create(dto);
    }

    // Saisir les notes pour toute une classe (via la matière)
    @PostMapping("/classe")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Note> createNotesForClasse(@Valid @RequestBody SaisieNotesClasseDto dto) {
        return notesService.createNotesForClasse(dto);
    }

    // Récupérer les notes d'un étudiant
    @GetMapping("/etudiant/{id}")
    public List<Note> getNotesEtudiant(@PathVariable Long id) {
        return notesService.getNotesEtudiant(id);
    }

    // Récupérer les notes d'une matière (toute la classe)
    @GetMapping("/matiere/{id}")
    public List<NotesParMatiereDto> getNotesParMatiere(@PathVariable Long id) {
        return notesService.getNotesParMatiere(id);
    }

    // Générer le bulletin d'un étudiant
    @GetMapping("/bulletin/{id}")
    public BulletinDto getBulletin(@PathVariable Long id) {
        return notesService.getBulletin(id);
    }
}