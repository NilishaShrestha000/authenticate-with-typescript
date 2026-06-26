import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token } = useAuth();

    const storedToken = localStorage.getItem("token");
    const isAuthenticated = !!token || !!storedToken;

    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};
export default ProtectedRoute;