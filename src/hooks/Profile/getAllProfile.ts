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

interface GetAllProfileReturn {
    profiles: Profile[];
    loading: boolean;
}

const getAllProfile = (): GetAllProfileReturn => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfiles = async (): Promise<void> => {
            try {
                const res = await Api.get<Profile[]>("/api/admin/users");
                setProfiles(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    return { profiles, loading };
};

export default getAllProfile;