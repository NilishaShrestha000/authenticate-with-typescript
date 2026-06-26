import { useState } from "react";
import Api from "@/Api/api";

interface ProfileUpdateValues {
    fullName: string;
    email: string;
    phone: string;
}

interface UsePatchMyProfileReturn {
    patchProfile: (values: ProfileUpdateValues) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const usePatchMyProfile = (): UsePatchMyProfileReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const patchProfile = async (values: ProfileUpdateValues): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await Api.patch("/api/profile", {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone
            });
        } catch (err) {
            console.error(err);
            setError("Failed to update profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { patchProfile, loading, error };
};

export default usePatchMyProfile;