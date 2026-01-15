import { api } from "../../utils/apiConfig";

/* =====================
   TYPES
===================== */

export interface CreateEnseignantDto {
  matriculeEns: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  specialite?: string;
  password: string;
}

export interface Enseignant {
  idEnseignant: number;
  matriculeEns: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  specialite?: string;
}

export interface MatiereDto {
  id: number;
  nom: string;
  coefficient: number;
}

export interface EnseignantDetails {
  idEnseignant: number;
  matriculeEns: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  specialite?: string;
  matieres: MatiereDto[];
  matiereIds: number[];
}

export interface AffectMatieresDto {
  matiereIds: number[];
}

/* =====================
   SERVICE
===================== */

export const enseignantService = {
  async getAll(): Promise<Enseignant[]> {
    const res = await api.get<Enseignant[]>("/teachers");
    return res.data;
  },

  async getById(id: number): Promise<Enseignant> {
    const res = await api.get<Enseignant>(`/teachers/${id}`);
    return res.data;
  },

  async create(data: CreateEnseignantDto): Promise<Enseignant> {
    const res = await api.post<Enseignant>("/teachers", data);
    return res.data;
  },

  async update(id: number, data: CreateEnseignantDto): Promise<Enseignant> {
    const res = await api.put<Enseignant>(`/teachers/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/teachers/${id}`);
  },

  async affectMatieres(
    enseignantId: number,
    data: AffectMatieresDto
  ): Promise<number[]> {
    const res = await api.post<number[]>(
      `/teachers/${enseignantId}/matieres`,
      data
    );
    return res.data;
  },

  async getDetails(id: number): Promise<EnseignantDetails> {
    const res = await api.get<EnseignantDetails>(
      `/teachers/${id}/details`
    );
    return res.data;
  },
};
