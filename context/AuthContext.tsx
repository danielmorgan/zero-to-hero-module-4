import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "@/utils/api";

const JWT_KEY = "jwt-key";

type AuthProps = {
  token: string | null;
  userId: number | null;
  onRegister: (email: string, password: string, name?: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
  initialized: boolean;
};

interface DecodedToken {
  id: number;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(JWT_KEY);
      if (storedToken) {
        console.log("Load Stored Token:", storedToken);
        processToken(storedToken);
      }
      setInitialized(true);
    };
    loadToken();
  }, []);

  const processToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("Decoded Token:", decodedToken);
      setToken(token);
      setUserId(decodedToken.id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    processToken(result.data);
    await SecureStore.setItemAsync(JWT_KEY, result.data);
    return result;
  };

  const handleRegister = async (email: string, password: string, name?: string) => {
    const result = await registerUser(email, password, name);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    return result;
  };

  const handleLogout = async () => {
    setToken(null);
    setUserId(null);
    await SecureStore.deleteItemAsync(JWT_KEY);
    axios.defaults.headers.common["Authorization"] = null;
  };

  const value = {
    initialized,
    token,
    userId,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
