import { api } from "../../utils/apiConfig";

/* =====================
   TYPES
===================== */

export interface Classe {
  id?: number;
  nom: string;
  niveau: string;
  annee: string;
}

export interface Matiere {
  id?: number;
  nom: string;
  coefficient: number;
}

export interface EtudiantClasseDTO {
  id: number;
  nom: string;
  prenom: string;
  matricule: string;
}

/* =====================
   SERVICE
===================== */

export const classeService = {
  /* -------- CLASSES -------- */

  async getAllClasses(): Promise<Classe[]> {
    const res = await api.get<Classe[]>("/api/classes");
    return res.data;
  },

  async getClasseById(id: number): Promise<Classe> {
    const res = await api.get<Classe>(`/api/classes/id/${id}`);
    return res.data;
  },

  async getClasseByName(name: string): Promise<Classe> {
    const res = await api.get<Classe>(`/api/classes/name/${name}`);
    return res.data;
  },

  async createClasse(data: Classe): Promise<Classe> {
    const res = await api.post<Classe>("/api/classes", data);
    return res.data;
  },

  async updateClasse(id: number, data: Classe): Promise<Classe> {
    const res = await api.put<Classe>(`/api/classes/${id}`, data);
    return res.data;
  },

  async deleteClasse(id: number): Promise<void> {
    await api.delete(`/api/classes/${id}`);
  },

  async getEtudiantsByClasseId(id: number): Promise<EtudiantClasseDTO[]> {
    const res = await api.get<EtudiantClasseDTO[]>(`/api/classes/${id}/etudiants`);
    return res.data;
  },

  async getEtudiantsByClasseName(name: string): Promise<EtudiantClasseDTO[]> {
    const res = await api.get<EtudiantClasseDTO[]>(`/api/classes/name/${name}/etudiants`);
    return res.data;
  },

  /* -------- MATIERES -------- */

  async getAllMatieres(): Promise<Matiere[]> {
    const res = await api.get<Matiere[]>("/api/matieres");
    return res.data;
  },

  async getMatiereById(id: number): Promise<Matiere> {
    const res = await api.get<Matiere>(`/api/matieres/${id}`);
    return res.data;
  },

  async getMatieresByIds(ids: number[]): Promise<Matiere[]> {
    const res = await api.get<Matiere[]>("/api/matieres/by-ids", {
      params: { ids },
    });
    return res.data;
  },

  async createMatiere(data: Matiere): Promise<Matiere> {
    const res = await api.post<Matiere>("/api/matieres", data);
    return res.data;
  },

  async updateMatiere(id: number, data: Matiere): Promise<Matiere> {
    const res = await api.put<Matiere>(`/api/matieres/${id}`, data);
    return res.data;
  },

  async deleteMatiere(id: number): Promise<void> {
    await api.delete(`/api/matieres/${id}`);
  },
};
