import { useNavigate, useSearchParams } from "react-router-dom";
import getAllProfile from "@/hooks/Profile/getAllProfile";
import getProfileId from "@/hooks/Profile/getAllProfileId";
import { MdAdminPanelSettings } from "react-icons/md";
import { FiEdit2, FiX } from "react-icons/fi";
import { useState } from "react";
import usePatchUserProfile from "@/hooks/Profile/usePatchUserProfileId";
import DeleteUser from "@/hooks/Profile/useDeleteProfileId";



const ProfileDetail = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { profiles } = getAllProfile();
    const { profileid, loading } = getProfileId();
    const { patchProfile, loading: patching, error: patchError } = usePatchUserProfile(id);
    const navigate = useNavigate();



    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
    });

    const openEdit = (): void => {
        if (!profileid) return;
        setForm({
            fullName: profileid.fullName,
            email: profileid.email,
            phone: profileid.phone ?? "",
            role: profileid.role
        });
        setIsEditing(true);
    };

    const closeEdit = (): void => setIsEditing(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-400">
                Loading...
            </div>
        );
    }

    if (!profileid) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-400">
                Profile not found.
            </div>
        );
    }

    return (
        <div className="p-10">
            <main className="flex-1 px-4 py-8 lg:px-10 lg:py-10">
                {/* Page title */}
                <div className="flex items-center gap-4 mb-5">
                    <h2 className="text-orange-500 text-lg font-bold">Profile Details</h2>
                    <span className="flex grow border-t border-gray-400 dark:border-gray-700"></span>
                </div>

                {/* Header card */}
                <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 flex items-center gap-6 bg-white/5 mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-gray-400 dark:border-violet-400 bg-violet-400/20 flex items-center justify-center text-violet-400 text-3xl font-bold shrink-0">
                        {getInitials(profileid.fullName)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-wide">{profileid.fullName}</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                            <MdAdminPanelSettings className="text-violet-400 text-base" />
                            <span className="capitalize">{profileid.role}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                            Member since {formatDate(profileid.createdAt)}
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 bg-white/5 mb-6">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-orange-400 mb-6">Personal Information</h2>

                        <div className="flex gap-4">
                            <button
                                onClick={openEdit}
                                className="flex items-center gap-2 text-sm border border-gray-600 hover:border-violet-400 hover:text-violet-400 px-2 py-1 rounded-lg transition-all duration-200">
                                <FiEdit2 className="text-sm" />
                                Edit
                            </button>
                            {id && <DeleteUser id={id} />}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
                            <p className="text-lg font-medium">{profileid.fullName}</p>
                        </div>
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-lg font-medium">{profileid.email}</p>
                        </div>
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">Phone Number</p>
                            <p className="text-lg font-medium">{profileid.phone || "—"}</p>
                        </div>
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">User Role</p>
                            <p className="text-lg font-medium capitalize">{profileid.role}</p>
                        </div>
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">Account ID</p>
                            <p className="text-lg font-medium text-slate-400 truncate">{profileid.id}</p>
                        </div>
                        <div>
                            <p className="text-md text-slate-500 uppercase tracking-widest mb-1">Joined</p>
                            <p className="text-lg font-medium">{formatDate(profileid.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Account Status */}
                <div className="border border-gray-400 dark:border-gray-700 rounded-2xl p-6 bg-white/5">
                    <h2 className="text-xl font-semibold text-orange-400 mb-6">Account Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border border-gray-400 dark:border-gray-700 rounded-xl p-4 bg-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Status</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                <span className="text-lg font-medium text-green-400">Active</span>
                            </div>
                        </div>
                        <div className="border border-gray-400 dark:border-gray-700 rounded-xl p-4 bg-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Role</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-400 inline-block"></span>
                                <span className="text-lg font-medium capitalize">{profileid.role}</span>
                            </div>
                        </div>
                        <div className="border border-gray-400 dark:border-gray-700 rounded-xl p-4 bg-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Member Since</p>
                            <span className="text-lg font-medium">{formatDate(profileid.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Other profiles table */}
            <div className="text-xl lg:text-2xl m-5 text-center font-bold">
                Other Profiles
            </div>

            <div className="border border-gray-400 dark:border-gray-700 rounded-2xl overflow-hidden bg-white/5">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-400 dark:border-gray-700 text-left">
                            <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest">Full Name</th>
                            <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest">Email</th>
                            <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest">Phone</th>
                            <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest">Role</th>
                            <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles
                            .filter((item) => item.id !== id)
                            .map((item) => (
                                <tr
                                    key={item.id}
                                    onClick={() => navigate(`/admin/profile?id=${item.id}`)}
                                    className="border-b border-gray-400/30 dark:border-gray-700/50 hover:bg-violet-400/5 cursor-pointer transition-colors">
                                    <td className="px-4 py-3 font-medium">{item.fullName}</td>
                                    <td className="px-4 py-3 text-slate-400">{item.email}</td>
                                    <td className="px-4 py-3 text-slate-400">{item.phone || "—"}</td>
                                    <td className="px-4 py-3 capitalize">{item.role}</td>
                                    <td className="px-4 py-3 text-slate-400">{formatDate(item.createdAt)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>


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
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                                    Role
                                </label>
                                <input
                                    name="role"
                                    value={form.role}
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

export default ProfileDetail;