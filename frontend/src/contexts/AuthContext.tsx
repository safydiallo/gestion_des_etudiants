import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/auth/authService";
import { tokenManager, StoredUser } from "../utils/tokenManager";

interface JwtPayload {
  sub: string;
  role?: string;
  roles?: string[];
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
  const isAuthenticated = !!tokenManager.getAccessToken();

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const token = await authService.login({ username, password });

    tokenManager.setAccessToken(token);

    const decoded = jwtDecode<JwtPayload>(token);
    const role =
      decoded.role ||
      (decoded.roles && decoded.roles[0]) ||
      "UNKNOWN";

    const storedUser: StoredUser = {
      username: decoded.sub,
      role,
    };

    tokenManager.setUser(storedUser);
    setUser(storedUser);
  };

  const logout = async () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      await authService.logout({ refreshToken });
    }
    tokenManager.clear();
    setUser(null);
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
