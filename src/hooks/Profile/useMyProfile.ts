import { useEffect, useState } from "react";
import Api from "@/Api/api";

interface Profile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

interface UseMyProfileReturn {
    profile: Profile | null;
    loading: boolean;
}

const useMyProfile = (): UseMyProfileReturn => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async (): Promise<void> => {
            try {
                const res = await Api.get<Profile>("/api/profile");
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return { profile, loading };
};

export default useMyProfile;