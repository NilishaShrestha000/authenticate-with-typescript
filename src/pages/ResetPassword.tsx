import { Formik, Form } from "formik";
import { FaLock } from "react-icons/fa";
import FormInput from "@/components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ResetSchema } from "@/validation/authSchema";
import { ToastContainer, toast } from "react-toastify";
import Api from "@/Api/api";
import axios from "axios";

interface ResetValues {
    newPassword: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const handleSubmit = async (values: ResetValues): Promise<void> => {
        try {
            if (!token) {
                toast.error("You need a token to reset your password");
                return;
            }
            await Api.post("/api/auth/reset-password", {
                token,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            });
            toast("Password updated!");
            navigate("/login");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Not valid");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className=" min-h-screen">
            <div className="flex items-center justify-center h-screen transition-all">
                <div className="flex w-full h-full md:h-3/4 md:w-3/5 md:border-3 rounded-2xl">
                    <div className="w-full h-full flex flex-col items-center justify-center md:rounded-r-2xl">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex text-orange-600 items-center justify-center w-15 h-15 bg-orange-200/50 rounded-full"><FaLock className="text-2xl" /></div>
                            <h1 className="text-2xl font-bold">Reset Password</h1>
                            <p className="text-lg text-gray-500">Enter your new password below</p>
                        </div>

                        <Formik<ResetValues>
                            initialValues={{ newPassword: "", confirmPassword: "" }}
                            validationSchema={ResetSchema}
                            onSubmit={handleSubmit}>
                            <Form className="p-10 w-full mx-auto mt-5">
                                <div>
                                    <FormInput label="New Password" type="password" name="newPassword" placeholder="Enter new password" className="mt-2 " />
                                </div>
                                <div className="mt-5">
                                    <FormInput label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm new password" className="mt-2" />
                                </div>
                                <div className="mt-5">
                                    <button className="w-full border rounded px-4 py-2 bg-orange-600/50 hover:bg-orange-800/50 text-white cursor-pointer">Reset Password</button>
                                    <ToastContainer />
                                </div>
                                <div className="mt-5 flex justify-between">
                                    <Link to="/login" className="text-orange-400 hover:text-red-500">Back to Login</Link>
                                    <Link to="/forgot-password" className="text-orange-400 hover:text-red-500">Click here to get the Reset Password Token</Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    <div className="hidden md:block">
                        <div className="w-80 h-full flex items-center justify-center">
                            <img src="/forgot.png" alt="Reset password illustration" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResetPassword;