package uasz.etudiant.ms_note.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import uasz.etudiant.ms_note.dto.BulletinDto;
import uasz.etudiant.ms_note.dto.CreateNoteDto;
import uasz.etudiant.ms_note.entity.Note;
import uasz.etudiant.ms_note.service.NotesService;


import java.util.List;

// Contrôleur REST du service-notes
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NotesController {

    // Injection du service métier
    private final NotesService notesService;

    // Endpoint pour saisir une note
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note create(@Valid @RequestBody CreateNoteDto dto) {
        return notesService.create(dto);
    }

    // Endpoint pour récupérer les notes d’un étudiant
    @GetMapping("/etudiant/{id}")
    public List<Note> getNotes(@PathVariable Long id) {
        return notesService.getNotesEtudiant(id);
    }

    // Endpoint pour générer le bulletin d’un étudiant
    @GetMapping("/bulletin/{id}")
    public BulletinDto bulletin(@PathVariable Long id) {
        return notesService.getBulletin(id);
    }
}
