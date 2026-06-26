import Api from "@/Api/api";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface DeleteQueryProps {
    id: number;
}

const DeleteQuery = ({ id }: DeleteQueryProps) => {
    const navigate = useNavigate();

    const handleDelete = async (): Promise<void> => {
        try {
            await Api.delete(`/api/contact/${id}`);
            toast("Deleted Successfully");
            navigate("/admin/queries");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message ?? "Failed to delete");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleDelete}
                className="border rounded-md flex items-center gap-2 px-2 py-1 text-md bg-gray-400 hover:bg-red-400 hover:scale-[1.05] duration-300">
                <MdDelete /> Delete
            </button>
            <ToastContainer />
        </>
    );
};

export default DeleteQuery;