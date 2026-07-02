import Api from "@/Api/api";
import { useQuery } from "@tanstack/react-query";
import { type Profiles } from "@/typscript/interfaces&types";

const useGetAllProfile = () => {
    return useQuery({
        queryKey: ["profiles"],
        queryFn: () => Api.get<Profiles>("/api/admin/users").then(res => res.data)
    });
};

export default useGetAllProfile;