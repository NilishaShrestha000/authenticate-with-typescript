import { createContext, useContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

interface AuthContextType {
    token: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (jwtToken: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    const user: AuthUser | null = token ? jwtDecode<AuthUser>(token) : null;

    const login = (jwtToken: string): void => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    };

    const logout = (): void => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};