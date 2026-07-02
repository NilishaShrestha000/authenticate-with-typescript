import { useState, useEffect } from "react";
import Api from "@/Api/api";

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    image: string;
    price: number;
    currency: string;
    isActive: boolean;
    order: string;
    tags: string[];
    createdAt: string;
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