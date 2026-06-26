import useMyProfile from "@/hooks/Profile/useMyProfile";
import usePatchMyProfile from "@/hooks/Profile/usePatchMyProfile";
import { FiEdit2, FiX } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";

interface FormState {
    fullName: string;
    email: string;
    phone: string;
}

const Profile = () => {
    const { profile, loading } = useMyProfile();
    const { patchProfile, loading: patching, error: patchError } = usePatchMyProfile();



    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>({
        fullName: "",
        email: "",
        phone: "",
    });

    const openEdit = (): void => {
        if (!profile) return;
        setForm({
            fullName: profile.fullName,
            email: profile.email,
            phone: profile.phone,
        });
        setIsEditing(true);
    };

    const closeEdit = (): void => setIsEditing(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            await patchProfile(form);

        } catch {
            if (!patchError) {
                setIsEditing(false);
                window.location.reload();
            }
        }
    };

    const getInitials = (name: string): string => {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const formatDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">

            {/* Sidebar */}
            <ProfileSidebar />


            {/* Main content */}
            <main className="flex-1 px-4 py-8 lg:px-10 lg:py-10">
                {loading && (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        Loading profile...
                    </div>
                )}

                {!loading && !profile && (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        No profile found.
                    </div>
                )}

                {!loading && profile && (
                    <>
                        {/* Page title */}
                        <div className="flex items-center gap-4 mb-5">
                            <h2 className="text-orange-500 text-lg font-bold">My Profile</h2>
                            <span className="flex grow border-t border-gray-400 dark:border-gray-700"></span>
                        </div>

                        {/* Mobile header card */}
                        <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 flex items-center gap-6 bg-white/5 mb-6 md:hidden">
                            <div className="w-20 h-20 rounded-full border-2 border-gray-400 dark:border-violet-400 bg-violet-400/20 flex items-center justify-center text-violet-400 text-3xl font-bold shrink-0">
                                {getInitials(profile.fullName)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-wide">{profile.fullName}</h1>
                                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                                    <MdAdminPanelSettings className="text-violet-400 text-base" />
                                    <span className="capitalize">{profile.role}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                    Member since {formatDate(profile.createdAt)}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 bg-white/5 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-orange-400">Personal Information</h2>
                                <button
                                    onClick={openEdit}
                                    className="flex items-center gap-2 text-sm border border-gray-600 hover:border-violet-400 hover:text-violet-400 px-3 py-1.5 rounded-lg transition-all duration-200">
                                    <FiEdit2 className="text-sm" />
                                    Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-sm font-medium">{profile.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-sm font-medium">{profile.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-sm font-medium">{profile.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">User Role</p>
                                    <p className="text-sm font-medium capitalize">{profile.role}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Account ID</p>
                                    <p className="text-sm font-medium text-slate-400 truncate">{profile.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Joined</p>
                                    <p className="text-sm font-medium">{formatDate(profile.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 bg-white/5">
                            <h2 className="text-lg font-semibold text-orange-400 mb-6">Account Status</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="border border-gray-400 dark:border-gray-700 hover:border-violet-400/60 rounded-xl p-4 bg-white/5 transition-all duration-200">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                        <span className="text-sm font-medium text-green-400">Active</span>
                                    </div>
                                </div>
                                <div className="border border-gray-400 dark:border-gray-700 hover:border-violet-400/60 rounded-xl p-4 bg-white/5 transition-all duration-200">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Role</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-violet-400 inline-block"></span>
                                        <span className="text-sm font-medium capitalize">{profile.role}</span>
                                    </div>
                                </div>
                                <div className="border border-gray-400 dark:border-gray-700 hover:border-violet-400/60 rounded-xl p-4 bg-white/5 transition-all duration-200">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Member Since</p>
                                    <span className="text-sm font-medium">{formatDate(profile.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>


            {/* Edit Modal */}
            {isEditing && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) closeEdit(); }}>
                    <div className="bg-background border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">

                        {/* Modal header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-orange-400">Edit Profile</h2>
                            <button
                                onClick={closeEdit}
                                className="text-slate-400 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/10">
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-600 focus:border-violet-400 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                                    Email Address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-600 focus:border-violet-400 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                                    Phone Number
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-600 focus:border-violet-400 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                                />
                            </div>

                            {/* Error */}
                            {patchError && (
                                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2">
                                    {patchError}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={closeEdit}
                                    className="flex-1 border border-gray-600 hover:border-gray-400 rounded-lg px-4 py-2 text-sm transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={patching}
                                    className="flex-1 bg-violet-400/20 hover:bg-violet-400/30 border border-violet-400/60 hover:border-violet-400 text-violet-400 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {patching ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;