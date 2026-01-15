import { api } from "../../utils/apiConfig";

/* =======================
   TYPES
======================= */

export interface EtudiantDTO {
  matricule?: string;
  nom?: string;
  prenom?: string;
  date_naissance?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  sexe?: "M" | "F";
  password?: string;
}

export interface Etudiant extends EtudiantDTO {
  id: number;
}

export interface Inscription {
  id: number;
  etudiantId: number;
  classeId: number;
}

export interface InscriptionStatus {
  etudiantId: number;
  statut: string;
  classeId?: number;
  classeNom?: string;
}

/* =======================
   SERVICE
======================= */

export const etudiantService = {
  // ---- Étudiants ----

  async creerEtudiant(data: EtudiantDTO): Promise<Etudiant> {
    const res = await api.post<Etudiant>("/api/etudiants", data);
    return res.data;
  },

  async getAllEtudiants(): Promise<Etudiant[]> {
    const res = await api.get<Etudiant[]>("/api/etudiants/all");
    return res.data;
  },

  async getEtudiantById(id: number): Promise<Etudiant> {
    const res = await api.get<Etudiant>(`/api/etudiants/id/${id}`);
    return res.data;
  },

  async getEtudiantByMatricule(matricule: string): Promise<Etudiant> {
    const res = await api.get<Etudiant>(`/api/etudiants/matricule/${matricule}`);
    return res.data;
  },

  async updateEtudiant(id: number, data: EtudiantDTO): Promise<Etudiant> {
    const res = await api.put<Etudiant>(`/api/etudiants/${id}`, data);
    return res.data;
  },

  async deleteEtudiant(id: number): Promise<void> {
    await api.delete(`/api/etudiants/${id}`);
  },

  // ---- Inscriptions ----

  async inscrire(etudiantId: number, classeId: number): Promise<Inscription> {
    const res = await api.post<Inscription>(
      "/api/inscriptions",
      null,
      { params: { etudiantId, classeId } }
    );
    return res.data;
  },

  async inscrireParNomClasse(
    etudiantId: number,
    className: string
  ): Promise<Inscription> {
    const res = await api.post<Inscription>(
      "/api/inscriptions/by-name",
      null,
      { params: { etudiantId, className } }
    );
    return res.data;
  },

  async getInscriptionStatus(
    etudiantId: number
  ): Promise<InscriptionStatus> {
    const res = await api.get<InscriptionStatus>(
      `/api/inscriptions/status/${etudiantId}`
    );
    return res.data;
  },

  async getInscriptionByEtudiant(
    etudiantId: number
  ): Promise<Inscription> {
    const res = await api.get<Inscription>(
      `/api/inscriptions/etudiant/${etudiantId}`
    );
    return res.data;
  },

  async getEtudiantsParClasse(
    classeId: number
  ): Promise<Etudiant[]> {
    const res = await api.get<Etudiant[]>(
      `/api/inscriptions/etudiants/classe/${classeId}`
    );
    return res.data;
  },

  async deleteInscription(id: number): Promise<void> {
    await api.delete(`/api/inscriptions/${id}`);
  },
};
