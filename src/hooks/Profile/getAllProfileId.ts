import { useSearchParams } from "react-router-dom";
import Api from "@/Api/api";
import { useQuery } from "@tanstack/react-query";

interface ProfileId {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

const getProfileId = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    return useQuery({
        queryKey: ["profileid"],
        queryFn: () => Api.get<ProfileId>(`/api/admin/users/${id}`).then(res => res.data)
    })

};

export default getProfileId;