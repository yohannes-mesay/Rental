"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, UserRole } from "@/lib/types";
import { users as allUsers } from "@/lib/dummy-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  register: (role: UserRole, firstName: string, lastName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, string> = {
  tenant: "u3",
  landlord: "u2",
  admin: "u1",
  dara_agent: "u6",
  system_admin: "u10",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("rental_auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((role: UserRole) => {
    const demoUserId = DEMO_USERS[role];
    const found = allUsers.find((u) => u.id === demoUserId);
    if (found) {
      setUser(found);
      localStorage.setItem("rental_auth_user", JSON.stringify(found));
    }
  }, []);

  const register = useCallback(
    (role: UserRole, firstName: string, lastName: string) => {
      const newUser: User = {
        id: `u_new_${Date.now()}`,
        firstName: firstName || "New",
        lastName: lastName || "User",
        email: `${(firstName || "new").toLowerCase()}@example.com`,
        phone: "+251900000000",
        role,
        createdAt: new Date().toISOString().split("T")[0],
        isVerified: false,
        address: "Addis Ababa",
      };
      setUser(newUser);
      localStorage.setItem("rental_auth_user", JSON.stringify(newUser));
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("rental_auth_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
