import Api from "@/Api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ProfileUpdateValues } from "@/typscript/interfaces&types";


const usePatchMyProfile = () => {
    const queryClient = useQueryClient();
       return useMutation({
            mutationFn: (values: ProfileUpdateValues) => Api.patch("/api/profile", values),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
            },
            onError: () => {
                console.error("Failed to update profile");
            }
        });
    };

export default usePatchMyProfile;