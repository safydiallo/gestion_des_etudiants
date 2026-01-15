// import { api } from "../../utils/apiConfig";

// /* =====================
//    TYPES
// ===================== */

// export interface CreateNoteDto {
//   etudiantId: number;
//   matiereId: number;
//   valeurNote: number;
//   typeNote: string;
// }

// export interface Note {
//   idNote: number;
//   etudiantId: number;
//   matiereId: number;
//   valeurNote: number;
//   typeNote: string;
//   dateSaisie: string;
// }

// export interface NoteDto {
//   matiereId: number;
//   valeurNote: number;
//   typeNote: string;
// }

// export interface Bulletin {
//   etudiantId: number;
//   moyenne: number;
//   notes: NoteDto[];
//   moyennePonderee: boolean;
//   matieresDisponibles: boolean;
// }

// /* =====================
//    SERVICE
// ===================== */

// export const noteService = {
//   async createNote(data: CreateNoteDto): Promise<Note> {
//     const res = await api.post<Note>("/notes", data);
//     return res.data;
//   },

//   async getNotesByEtudiant(etudiantId: number): Promise<Note[]> {
//     const res = await api.get<Note>(`/notes/etudiant/${etudiantId}`);
//     return res.data as unknown as Note[];
//   },

//   async getBulletin(etudiantId: number): Promise<Bulletin> {
//     const res = await api.get<Bulletin>(`/notes/bulletin/${etudiantId}`);
//     return res.data;
//   },
// };


import { api } from "../../utils/apiConfig";

/* =====================
   TYPES
===================== */

export interface CreateNoteDto {
  etudiantId: number;
  matiereId: number;
  valeurNote: number;
  typeNote: string;
}

export interface Note {
  idNote: number;
  etudiantId: number;
  matiereId: number;
  valeurNote: number;
  typeNote: string;
  dateSaisie: string;
}

export interface NoteDto {
  matiereId: number;
  valeurNote: number;
  typeNote: string;
}

export interface Bulletin {
  etudiantId: number;
  moyenne: number;
  notes: NoteDto[];
  moyennePonderee: boolean;
  matieresDisponibles: boolean;
}

/* =====================
   SERVICE
===================== */

export const noteService = {
  async createNote(data: CreateNoteDto): Promise<Note> {
    const res = await api.post<Note>("/notes", data);
    return res.data;
  },

  async getNotesByEtudiant(etudiantId: number): Promise<Note[]> {
    const res = await api.get<Note[]>(`/notes/etudiant/${etudiantId}`);
    return res.data;
  },

  async getBulletin(etudiantId: number): Promise<Bulletin> {
    const res = await api.get<Bulletin>(`/notes/bulletin/${etudiantId}`);
    return res.data;
  },
};
