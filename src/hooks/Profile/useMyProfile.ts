import { useQuery } from "@tanstack/react-query";
import Api from "@/Api/api";
import { type Profile } from "@/typscript/interfaces&types";


const useMyProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => Api.get<Profile>("/api/profile").then(res => res.data)
    });
};

export default useMyProfile;