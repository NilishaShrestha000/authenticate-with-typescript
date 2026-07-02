
import { Formik, Form, type FormikHelpers } from "formik";
import { FaRegUser } from "react-icons/fa";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "@/validation/authSchema";
import { ToastContainer, toast } from "react-toastify";
import Api from "@/Api/api";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface LoginValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (
        values: LoginValues,
        { resetForm }: FormikHelpers<LoginValues>
    ): Promise<void> => {
        try {
            const res = await Api.post<{ accessToken: string }>("/api/auth/login", {
                email: values.email,
                password: values.password,
            });
            login(res.data.accessToken);
            toast("Logged in successfully");
            setTimeout(() => navigate("/home"), 1000);
            resetForm();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Invalid credentials");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="bg-background">
            <div className="flex items-center justify-center h-screen transition-all">
                <div className="flex w-full h-full md:h-3/4 md:w-3/5 md:border-3 border-gray-500 rounded-2xl">

                    {/* Left panel */}
                    <div className="hidden md:block">
                        <div className="bg-orange-600/50 flex h-full items-center justify-center tracking-wide px-10 rounded-l-2xl">
                            <div className="flex flex-col items-center text-center">
                                <img src="/security.png" className="h-30 w-30 mb-5" alt="Security" />
                                <h1 className="font-semibold text-2xl mb-5">Welcome Back!</h1>
                                <p className="text-xl">Login to your account to continue to your dashboard.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="w-full md:w-3/4 flex flex-col items-center justify-center md:rounded-r-2xl mt-5">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex text-orange-600 items-center justify-center w-15 h-15 bg-orange-400/50 rounded-full">
                                <FaRegUser className="text-2xl" />
                            </div>
                            <h1 className="text-2xl font-bold">Login</h1>
                            <p className="text-lg text-gray-500">
                                Enter your credentials{" "}
                                <span className="hidden sm:block">to access your account</span>
                            </p>
                        </div>

                        <Formik<LoginValues>
                            initialValues={{ email: "", password: "", rememberMe: false }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}>
                            <Form className="p-4 w-full md:w-3/4 mx-auto mt-5">
                                <div>
                                    <FormInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-5">
                                    <FormInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-5 justify-between flex">
                                    <Checkbox name="rememberMe" className="cursor-pointer">
                                        Remember Me
                                    </Checkbox>
                                    <Link to="/forgot-password" className="text-orange-400 hover:text-red-500">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="mt-5">
                                    <button
                                        type="submit"
                                        className="w-full border rounded px-4 py-2 bg-orange-600/50 hover:bg-orange-500 text-white">
                                        Login
                                    </button>
                                    <ToastContainer />
                                </div>

                                <div className="mt-5 flex gap-3 justify-center">
                                    <p>Don't have an account?</p>
                                    <Link to="/register" className="text-orange-400 hover:text-red-500">
                                        Register
                                    </Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;