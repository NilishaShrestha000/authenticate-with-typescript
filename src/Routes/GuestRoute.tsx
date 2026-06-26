import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

interface GuestRouteProps {
    children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/home" /> : <>{children}</>;
};
export default GuestRoute;