import { RiLockPasswordLine } from "react-icons/ri";
import { LuLogOut, LuMessageSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import useMyProfile from "@/hooks/Profile/useMyProfile";

interface SidebarLink {
    label: string;
    to: string;
    icon: React.ReactNode;
}

const getInitials = (name: string): string => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const ProfileSidebar = () => {
    const { profile } = useMyProfile();
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    const sidebarLinks: SidebarLink[] = [
        { label: "My Profile", to: "/profile", icon: <FaRegUser /> },
        { label: "Settings", to: "/settings", icon: <RiLockPasswordLine /> },
        ...(user?.role === "admin" ? [
            { label: "Queries", to: "/admin/querries", icon: <LuMessageSquare /> },
            { label: "All Profiles", to: "/admin/allprofile", icon: <FaRegUser /> },
        ] : []),
        ...(isAuthenticated ? [
            { label: "Logout", to: "/logout", icon: <LuLogOut /> },] : []),
    ];

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col lg:w-64 shrink-0 border-r border-gray-700 px-4 py-8 gap-2">
                {profile && (
                    <div className="flex flex-col items-center gap-3 pb-6 mb-4 border-b border-gray-700">
                        <div className="w-14 h-14 rounded-full border-2 border-violet-400 bg-violet-400/20 flex items-center justify-center text-violet-400 text-xl font-bold">
                            {getInitials(profile.fullName)}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold truncate max-w-40">{profile.fullName}</p>
                            <p className="text-xs text-slate-500 capitalize">{profile.role}</p>
                        </div>
                    </div>
                )}
                {sidebarLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    const isLogout = link.to === "/logout";
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isLogout
                                    ? "text-red-400 hover:bg-red-400/10 hover:border hover:border-red-400/40"
                                    : isActive
                                        ? "bg-violet-400/15 border border-violet-400/60 text-violet-400"
                                        : "text-slate-400 hover:bg-white/5 hover:text-foreground"
                                }`}>
                            <span className="text-base">{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}
            </aside>

            {/* Mobile bottom nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-background flex justify-around px-2 py-3 z-50">
                {sidebarLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    const isLogout = link.to === "/logout";
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex flex-col items-center gap-1 text-xs transition-all duration-200
                                ${isLogout
                                    ? "text-red-400"
                                    : isActive
                                        ? "text-violet-400"
                                        : "text-slate-500 hover:text-foreground"
                                }`}>
                            <span className="text-lg">{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};

export default ProfileSidebar;