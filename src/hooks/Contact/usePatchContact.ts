import { useState } from "react";
import Api from "@/Api/api";

interface PatchContactReturn {
    markAsRead: (id: number) => Promise<void>;
    error: boolean;
}

const usePatchContact = (): PatchContactReturn => {
    const [error, setError] = useState<boolean>(false);

    const markAsRead = async (id: number): Promise<void> => {
        setError(false);
        try {
            await Api.patch(`/api/contact/${id}/read`, { isRead: true });
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    return { markAsRead, error };
};

export default usePatchContact;