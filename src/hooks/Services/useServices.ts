import { useState, useEffect } from "react";
import Api from "@/Api/api";

export interface Service {
    id: string;
    image: string;
    service: string;
    title: string;
    description: string;
    shortDescription: string;
    tags: string[];
    createdAt: string;
    price: number;
    currency: string;
    isActive: boolean;
}

interface UseServicesReturn {
    data: Service[];
}

const useServices = (): UseServicesReturn => {
    const [data, setData] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async (): Promise<void> => {
            try {
                const res = await Api.get<Service[]>("/api/services");
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchServices();
    }, []);

    return { data };
};
export default useServices;