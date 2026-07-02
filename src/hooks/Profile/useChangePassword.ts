import Api from "@/Api/api";
import { useMutation } from "@tanstack/react-query";
import { type ChangePasswordValues } from "@/typscript/interfaces&types";
import { toast } from "react-toastify";
const useChangePassword = () => {
    return useMutation(
        {

            mutationFn: (values: ChangePasswordValues) => 
                Api.patch("/api/profile/change-password", values),
            onSuccess: () => {
                toast.success("Password changed Successfully.")
            },
            onError: () => {
                toast.error("Failed to change password");
            }
        }
    )
};

export default useChangePassword;