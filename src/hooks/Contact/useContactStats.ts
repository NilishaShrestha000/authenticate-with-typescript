import { useEffect, useState } from "react";
import Api from "@/Api/api";

interface ContactStats {
    total: number;
    unread: number;
}

interface UseContactStatsReturn {
    stats: ContactStats | null;
    loading: boolean;
}

const useContactStats = (): UseContactStatsReturn => {
    const [stats, setStats] = useState<ContactStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async (): Promise<void> => {
            try {
                const res = await Api.get<ContactStats>("/api/contact/stats");
                setStats(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return { stats, loading };
};

export default useContactStats;