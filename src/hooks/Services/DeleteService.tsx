import Api from "@/Api/api";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface DeleteServiceProps {
    id: string;
}

const DeleteService = ({ id }: DeleteServiceProps) => {


    const handleDelete = async (): Promise<void> => {
        try {
            await Api.delete(`/api/services/${id}`);
            toast.success("Service Deleted !")
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                toast.error("Service not Deleted");
                console.error(err);
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleDelete}
                className="border border-red-400 rounded-md bg-red-400/30 hover:bg-red-400 hover:scale-[1.05] duration-300 font-semibold items-center justify-center flex p-2 gap-1 text-lg">
                <MdDelete /> Delete
            </button>
            <ToastContainer />
        </>
    );
};

export default DeleteService;