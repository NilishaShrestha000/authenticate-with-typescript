import { Formik, Form } from "formik";
import { FaLock } from "react-icons/fa";
import FormInput from "@/components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ForgotSchema } from "@/validation/authSchema";
import { ToastContainer, toast } from "react-toastify";
import Api from "@/Api/api";
import axios from "axios";

interface ForgotValues {
    email: string;
}

const ForgotPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values: ForgotValues): Promise<void> => {
        try {
            const res = await Api.post<{ resetLink: string }>("/api/auth/forgot-password", {
                email: values.email,
            });
            toast("You can change your password now.");
            navigate('/')
            // setTimeout(() => {
            //     window.location.href = res.data.resetLink;
            // }, 2000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Not valid");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-screen transition-all">
                <div className="w-full h-full md:h-3/4 md:w-3/5 md:rounded-2xl md:border border-gray-500 flex">
                    <div className="w-full flex flex-col items-center justify-center rounded-r-2xl">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex text-orange-600 items-center justify-center w-15 h-15 bg-orange-200/50 rounded-full"><FaLock className="text-2xl" /></div>
                            <h1 className="text-2xl font-bold">Change Password?</h1>
                            <p className="text-lg text-gray-500">Enter your email address <span className="hidden md:block">and we will allow you to reset your password.</span></p>
                        </div>

                        <Formik<ForgotValues>
                            initialValues={{ email: "" }}
                            validationSchema={ForgotSchema}
                            onSubmit={handleSubmit}>
                            <Form className="md:p-5 p-4 w-full md:w-3/4 mx-auto mt-5">
                                <div>
                                    <FormInput label="Email" type="email" name="email" placeholder="Enter your email" className="mt-2" />
                                </div>
                                <div className="mt-5">
                                    <button className="w-full border rounded px-4 py-2 bg-orange-600/50 hover:bg-orange-800/50 text-white">Send Reset Link</button>
                                    <ToastContainer />
                                </div>
                                <div className="mt-5 justify-center flex">
                                    <Link to="/login" className="text-orange-400 hover:text-red-500">Back to Login</Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    <div className="hidden md:flex bg-orange-400/50 w-1/2 items-center justify-center rounded-r-2xl">
                        <img src="/forgot.png" className="h-100" alt="Forgot password illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;