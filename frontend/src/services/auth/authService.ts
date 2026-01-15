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

export const authService = {
  async login(data: LoginRequest): Promise<string> {
    const response = await api.post<string>("/api/auth/login", data);
    return response.data; // token JWT
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
