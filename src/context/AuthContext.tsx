import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
