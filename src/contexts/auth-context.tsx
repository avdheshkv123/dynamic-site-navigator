
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "customer" | "administrator" | "supplier";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<UserRole, User> = {
  administrator: {
    id: "admin-1",
    name: "John Doe",
    email: "admin@invenflow.com",
    role: "administrator",
    avatar: "JD",
  },
  customer: {
    id: "customer-1",
    name: "Jane Smith",
    email: "customer@invenflow.com",
    role: "customer",
  },
  supplier: {
    id: "supplier-1",
    name: "Mike Johnson",
    email: "supplier@invenflow.com",
    role: "supplier",
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("invenflow-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers[role];
        setUser(user);
        localStorage.setItem("invenflow-user", JSON.stringify(user));
        setIsLoading(false);
        navigate("/dashboard");
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("invenflow-user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
