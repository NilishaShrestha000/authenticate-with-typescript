import Api from "@/Api/api";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

interface DeleteUserProps {
    id: string;
}

const DeleteUser = ({ id }: DeleteUserProps) => {

    const [isConfirming, setIsConfirming] = useState<boolean>(false);
    const handleDelete = async (): Promise<void> => {


        try {
            await Api.delete(`/api/admin/users/${id}`);
            toast.success("User Deleted !")
            setIsConfirming(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                toast.error("User not Deleted");
                console.error(err);
            }
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsConfirming(true)}
                className="border border-red-400 rounded-md bg-red-400/30 hover:bg-red-400 hover:scale-[1.05] duration-300 font-semibold items-center justify-center flex p-2 gap-1 text-lg" >
                <MdDelete /> Delete
            </button>
            {isConfirming && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) setIsConfirming(false); }}>
                    <div className="bg-background border border-gray-700 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
                        <h2 className="text-lg font-semibold text-red-400 mb-2">Delete this item?</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsConfirming(false)}
                                className="flex-1 border border-gray-600 hover:border-gray-400 rounded-lg px-4 py-2 text-sm transition-colors">
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 bg-red-400/20 hover:bg-red-400/30 border border-red-400/60 hover:border-red-400 text-red-400 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            < ToastContainer />
        </>
    );
};

export default DeleteUser;