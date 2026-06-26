import { useState } from "react";
import Api from "@/Api/api";

interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface PostContactReturn {
    submit: (values: ContactFormValues) => Promise<void>;
    success: boolean;
    error: string | null;
}

const usePostContact = (): PostContactReturn => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (values: ContactFormValues): Promise<void> => {
        setError(null);
        setSuccess(false);
        try {
            await Api.post("/api/contact", values);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Failed to send message");
            throw err;
        }
    };

    return { submit, success, error };
};

export default usePostContact;