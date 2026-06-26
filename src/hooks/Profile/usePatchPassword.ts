import { useState } from "react";
import Api from "@/Api/api";

interface ChangePasswordValues {
    oldPassword: string;
    newPassword: string;
}

interface UsePatchPasswordReturn {
    changePassword: (values: ChangePasswordValues) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const usePatchPassword = (): UsePatchPasswordReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async (values: ChangePasswordValues): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await Api.patch("/api/profile/change-password", values);
        } catch (err) {
            console.error(err);
            setError("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error };
};

export default usePatchPassword;