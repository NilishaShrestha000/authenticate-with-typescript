import { useState } from "react";
import Api from "@/Api/api";

interface UserProfileUpdateValues {
    fullName: string;
    email: string;
    phone: string;
    role: string;
}

interface UsePatchUserProfileReturn {
    patchProfile: (values: UserProfileUpdateValues) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const usePatchUserProfile = (id: string | null): UsePatchUserProfileReturn => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const patchProfile = async (values: UserProfileUpdateValues): Promise<void> => {
        if (!id) {
            setError("No id provided")
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await Api.patch(`/api/admin/users/${id}`, values );
        } catch (err) {
            console.error(err);
            setError("Failed to update user profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { patchProfile, loading, error };
};

export default usePatchUserProfile;