import { useState, useEffect } from "react";
import Api from "@/Api/api";
import { useSearchParams } from "react-router-dom";

interface Service {
    id: number;
    image: string;
    service: string;
    title: string;
    description: string;
    shortDescription: string;
    tags: string[];
    createdAt: string;
    price: number;
    currency: string;
}

interface UseServiceIdReturn {
    service: Service | null;
    loading: boolean;
}

const useServiceId = (): UseServiceIdReturn => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchById = async (): Promise<void> => {
            try {
                const res = await Api.get<Service>(`/api/services/${id}`);
                setService(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchById();
    }, [id]);

    return { service, loading };
};

export default useServiceId;