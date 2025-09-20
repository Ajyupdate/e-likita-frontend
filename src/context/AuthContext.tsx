"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE } from "@/lib/api";

interface User {
  userId: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token and user from localStorage on mount (client-side only)
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem("auth-token");
      const savedUser = localStorage.getItem("auth-user");
      
      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user data:", error);
          // Clear corrupted data
          localStorage.removeItem("auth-token");
          localStorage.removeItem("auth-user");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("auth-token", data.access_token);
        localStorage.setItem("auth-user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          profile: { firstName, lastName }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("auth-token", data.access_token);
        localStorage.setItem("auth-user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
