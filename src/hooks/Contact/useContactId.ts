import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "@/Api/api";

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface UseContactIdReturn {
    contact: Contact | null;
    loading: boolean;
}

const useContactId = (): UseContactIdReturn => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContactById = async (): Promise<void> => {
            try {
                const res = await Api.get<Contact>(`/api/contact/${id}`);
                setContact(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchContactById();
    }, [id]);

    return { contact, loading };
};

export default useContactId;