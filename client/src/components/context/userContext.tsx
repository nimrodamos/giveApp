import React, { createContext, useContext, useState, useMemo } from "react";
import { api } from "@/api";
import { User } from "@/types/userTypes";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserDetails: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("users/me", { withCredentials: true });
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      logout,
      fetchUserDetails,
    }),
    [user, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
