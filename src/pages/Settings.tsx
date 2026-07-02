
import ProfileSidebar from "@/components/ProfileSidebar";
import { Formik, Form } from "formik";
import { useAuth } from "@/context/AuthContext";
import { LuLock } from "react-icons/lu";
import { ChangePsswordSchema } from "@/validation/authSchema";
import { type ChangePasswordValues } from "@/typscript/interfaces&types";
import useChangePassword from "@/hooks/Profile/useChangePassword";
import FormInput from "@/components/FormInput";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const style = {
    sectionWrapper: "bg-background border border-gray-300 rounded-2xl p-6 mb-6",
    sectionHeader: "flex items-center gap-2 text-lg font-semibold mb-1",
    sectionDesc: "text-sm text-gray-500 mb-5 ",
    label: "text-xl lg:text-2xl font-medium block mb-1.5",
    input: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm bg-background transition-colors",
    error: "text-xs text-red-500 mt-1",
    button: "bg-orange-400 text-white hover:bg-orange-500 font-semibold px-5 py-2 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
    success: "text-sm text-green-600 mt-2",
    dangerSection: "border border-red-300 rounded-2xl p-6 mb-6",
    dangerButton: "bg-red-500 text-white hover:bg-red-600 font-semibold px-5 py-2 rounded-xl text-sm transition-colors disabled:opacity-50",
};

const initialPasswordValues: ChangePasswordValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const SecuritySection = () => {
    const { user } = useAuth();
    const { mutate, isPending } = useChangePassword();

    return (
        <div className={style.sectionWrapper}>
            <div className={style.sectionHeader}>
                <LuLock size={18} />
                Security
            </div>
            <p className={style.sectionDesc}>Manage your email and password.</p>

            <div className="mb-5">

                <label className={style.label}>Email</label>
                <input className={style.input} value={user?.email ?? ""} disabled />
                <p className="text-xs text-gray-500 mt-1">
                    Contact support to change your email address.
                </p>
            </div>

            <div className="border-t border-gray-300 pt-5">
                <Formik
                    initialValues={initialPasswordValues}
                    validationSchema={ChangePsswordSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        mutate(values, {
                            onSuccess: () => {
                                toast.success("Password changed successfully!");
                                resetForm();
                            },
                            onError: (err: any) => {
                                toast.error(err?.response?.data?.message ?? "Failed to change password");
                            },
                            onSettled: () => setSubmitting(false),
                        })
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            < FormInput
                                label="Current Password"
                                name="currentPassword"
                                type="password" />

                            < FormInput
                                label="New Password"
                                name="newPassword"
                                type="password" />

                            < FormInput
                                label="Confirm Password"
                                name="confirmNewPassword"
                                type="password" />

                            <div className="justify-between flex">
                                <button type="submit" disabled={isSubmitting || isPending} className={`${style.button} mt-4`}>
                                    {isSubmitting || isPending ? "Updating..." : "Update password"}
                                </button>

                                <Link to="/forgot-password" className={`${style.button} mt-4`}>Forgot Password</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    );
};

const DangerZoneSection = () => {
    const { user } = useAuth();

    if (user?.role === "admin") {
        return null;
    }

    return (
        <div className={style.dangerSection}>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className={style.sectionDesc}>
                        Want to delete your account? Deleting your account is permanent and cannot be undone. Conatct Us to delete your account.
                    </p>
                </div>
                <Link to="/contact" className="border border-red-400 rounded-md bg-red-400/30 hover:bg-red-400 hover:scale-[1.05] duration-300 font-semibold items-center justify-center flex p-2 gap-1 text-sm shrink-0" >
                    Contact Admin
                </Link>
            </div>
        </div>

    );
};

const Settings = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <div className="min-h-screen bg-background text-foreground flex">

                {/* Sidebar */}
                <ProfileSidebar />

                {!isAuthenticated &&
                    <div className="items-center justify-center flex flex-1 min-h-screen text-slate-400 flex-col gap-3">
                        <p>Login to have access</p>
                        <Link to="/login" className="text-orange-400 hover:text-orange-500 font-medium">
                            Go to Login
                        </Link>
                    </div>
                }
                {isAuthenticated &&
                    < main className="w-full max-w-6xl mx-auto px-4 py-10 text-foreground">
                        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                        <SecuritySection />
                        <DangerZoneSection />
                    </main>
                }
            </div >
        </>
    );
};

export default Settings;