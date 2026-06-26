import Api from "@/Api/api";
import { useEffect, useState } from "react";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface UseContactReturn {
    data: Contact[] | null;
    loading: boolean;
}

const useContact = (): UseContactReturn => {
    const [data, setData] = useState<Contact[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContact = async (): Promise<void> => {
            try {
                const res = await Api.get<Contact[]>("/api/contact");
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchContact();
    }, []);

    return { data, loading };
};

export default useContact;