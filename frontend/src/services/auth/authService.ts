import { api } from "../../utils/apiConfig";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateUserRequest {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// Interface pour la réponse Keycloak
export interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<KeycloakTokenResponse> {
    console.log("🚀 Envoi de la requête de connexion:", {
      url: "/api/auth/login",
      data: { username: data.username, password: "***" }
    });
    
    try {
      const response = await api.post<KeycloakTokenResponse>("/api/auth/login", data);
      
      console.log("📦 Réponse complète:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      return response.data; // Objet avec access_token, refresh_token, etc.
    } catch (error: any) {
      console.error("❌ Erreur détaillée:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  async logout(data: LogoutRequest): Promise<void> {
    await api.post("/api/auth/logout", data);
  },

  async createUser(data: CreateUserRequest): Promise<void> {
    await api.post("/api/auth/users", data);
  },

  async updateUser(username: string, data: CreateUserRequest): Promise<void> {
    await api.put(`/api/auth/users/${username}`, data);
  },

  async deleteUser(username: string): Promise<void> {
    await api.delete(`/api/auth/users/${username}`);
  },
};