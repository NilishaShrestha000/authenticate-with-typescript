import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "@/Api/api";

interface ProfileId {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

interface GetProfileIdReturn {
    profileid: ProfileId | null;
    loading: boolean;
}

const getProfileId = (): GetProfileIdReturn => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [profileid, setProfileId] = useState<ProfileId | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfileById = async (): Promise<void> => {
            try {
                const res = await Api.get<ProfileId>(`/api/admin/users/${id}`);
                setProfileId(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileById();
    }, [id]);

    return { profileid, loading };
};

export default getProfileId;