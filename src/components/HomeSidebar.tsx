import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard, LuBriefcase, LuMessageSquare, LuUser, LuShield } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

interface SidebarLink {
    label: string;
    to: string;
    icon: React.ReactNode;
}


const HomeSidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const sidebarLinks: SidebarLink[] = [
        { label: "Dashboard", to: "/home", icon: <LuLayoutDashboard /> },
        { label: "Services", to: "/services", icon: <LuBriefcase /> },
        { label: "Profile", to: "/profile", icon: <LuUser /> },
        { label: "Security", to: "/security", icon: <LuShield /> },
        ...(user?.role === "admin" ? [
            { label: " Manges Services", to: "/admin/mangeservices", icon: <LuBriefcase /> },
            { label: "Queries", to: "/admin/querries", icon: <LuMessageSquare /> }
        ] : []),
    ];
    return (
        <>
            <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-700 py-8 px-3 gap-1 min-h-screen sticky top-0">
                <p className="text-xs text-slate-500 uppercase tracking-widest px-4 mb-3">Home</p>
                {sidebarLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                            ${isActive
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
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex flex-col items-center gap-1 text-xs transition-all duration-200
                                ${isActive
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

export default HomeSidebar;