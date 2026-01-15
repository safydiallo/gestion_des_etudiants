import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/auth/authService";
import { tokenManager, StoredUser } from "../utils/tokenManager";

interface JwtPayload {
  sub: string;
  role?: string;
  roles?: string[];
  realm_access?: {
    roles: string[];
  };
  resource_access?: Record<string, { roles: string[] }>;
}

interface AuthContextType {
  user: StoredUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StoredUser | null>(tokenManager.getUser());
  const [loading, setLoading] = useState(true);

  // Calculé dynamiquement à partir de l'état user
  const isAuthenticated = !!user && !!tokenManager.getAccessToken();

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log("🔐 Tentative de connexion pour:", username);

      const tokenResponse = await authService.login({ username, password });
      
      // Stocker l'access token
      tokenManager.setAccessToken(tokenResponse.access_token);
      
      // Stocker le refresh token s'il existe
      if (tokenResponse.refresh_token) {
        tokenManager.setRefreshToken(tokenResponse.refresh_token);
      }

      const decoded = jwtDecode<JwtPayload>(tokenResponse.access_token);

      // Extraction des rôles Keycloak (realm_access.roles)
      let role = "UNKNOWN";
      const roles = decoded.realm_access?.roles || decoded.roles || [];

      if (roles.includes("ADMIN")) role = "ADMIN";
      else if (roles.includes("ENSEIGNANT")) role = "ENSEIGNANT";
      else if (roles.includes("ETUDIANT")) role = "ETUDIANT";
      else if (typeof decoded.role === "string") role = decoded.role;

      const storedUser: StoredUser = {
        username: decoded.sub,
        role,
      };

      tokenManager.setUser(storedUser);
      setUser(storedUser);

      console.log("✅ Utilisateur connecté:", storedUser);
    } catch (error) {
      console.error("❌ Erreur de connexion:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (refreshToken) {
        await authService.logout({ refreshToken });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      tokenManager.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};