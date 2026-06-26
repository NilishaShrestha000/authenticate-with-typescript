import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Api from "@/Api/api";

interface ProfileResponse {
    fullName: string;
}

interface UseProfileReturn {
    userName: string;
}

const useProfile = (): UseProfileReturn => {
    const [userName, setUserName] = useState<string>("Guest");
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchProfile = async (): Promise<void> => {
                try {
                    const res = await Api.get<ProfileResponse>("/api/auth/profile");
                    setUserName(res.data.fullName);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchProfile();
        }
    }, [isAuthenticated]);

    return { userName };
};

export default useProfile;