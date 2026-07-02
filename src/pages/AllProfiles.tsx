
import useGetAllProfile from "@/hooks/Profile/useGetAllProfile";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useNavigate } from "react-router-dom";

const AllProfiles = () => {
    const { data: profiles = [], isLoading: loading } = useGetAllProfile();
    const navigate = useNavigate();

    const formatDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <ProfileSidebar />

            <main className="flex-1 px-4 py-8 lg:px-10 lg:py-10">
                <div className="flex items-center gap-4 mb-5">
                    <h2 className="text-orange-500 text-lg font-bold">All Profiles</h2>
                    <span className="flex grow border-t border-gray-400 dark:border-gray-700"></span>
                </div>

                {loading && (
                    <div className="flex items-center justify-center h-40 text-slate-400">
                        Loading profiles...
                    </div>
                )}

                {!loading && profiles.length === 0 && (
                    <div className="flex items-center justify-center h-40 text-slate-400">
                        No profiles found.
                    </div>
                )}

                {!loading && profiles.length > 0 && (
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
                                {profiles.map((profile) => (
                                    <tr
                                        key={profile.id}
                                        onClick={() => navigate(`/admin/profile?id=${profile.id}`)}
                                        className="border-b border-gray-400/30 dark:border-gray-700/50 hover:bg-violet-400/5 transition-colors">
                                        <td className="px-4 py-3 font-medium">{profile.fullName}</td>
                                        <td className="px-4 py-3 text-slate-400">{profile.email}</td>
                                        <td className="px-4 py-3 text-slate-400">{profile.phone || "—"}</td>
                                        <td className="px-4 py-3 capitalize">{profile.role}</td>
                                        <td className="px-4 py-3 text-slate-400">{formatDate(profile.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllProfiles;