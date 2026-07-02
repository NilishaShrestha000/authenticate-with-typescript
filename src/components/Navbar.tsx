import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import NavLinks from "./NavLinks";
import { useTheme } from "@/context/ThemeContext";
import { useRef, useState } from "react";
import { CiUser } from "react-icons/ci";

interface NavbarProps {
    setSlide: (value: boolean) => void;
}

const getInitials = (name: string): string => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const style = {
    wrapper: "bg-background text-foreground h-16 w-full shadow-lg px-2 flex justify-between items-center border dark:border-b-gray-700",
    text: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10",
    button: "flex text-foreground hover:text-orange-400 font-semibold items-center cursor-pointer border border-gray-300 hover:border-orange-400 rounded-2xl px-4 py-5 h-10 lg:hidden",
    dropdownMenu: "absolute right-0 mt-2 w-44 bg-background border border-gray-300 rounded-xl shadow-lg flex flex-col overflow-hidden z-50",
    dropdownItem: "px-4 py-2 text-sm text-foreground hover:bg-orange-400/15 hover:text-orange-400 cursor-pointer",
    avatar: "w-10 h-10 rounded-full border-2 border-violet-400 bg-violet-400/20 hover:bg-violet-400/30 text-violet-400 font-bold text-sm flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.05]",
};

const Navbar = ({ setSlide }: NavbarProps) => {
    const { isAuthenticated, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const initials = user?.email ? getInitials(user.email.split("@")[0]) : "?";

    return (
        <div className={style.wrapper}>
            <Link to="/" className="flex items-center text-lg font-bold">
                Authenticate
            </Link>

            <div className="hidden lg:flex gap-6">
                <NavLinks />
            </div>

            <button className={style.button} onClick={() => setSlide(true)}>
                Menu
            </button>

            <div className="flex gap-2 lg:gap-5 items-center">
                <button onClick={toggleTheme} className="text-foreground hover:text-orange-400">
                    {theme === "dark" ? "☀️" : "🌑"}
                </button>

                {!isAuthenticated ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className={style.avatar}
                            title={user?.email ?? "Account"}>
                            <CiUser />
                        </button>

                        {menuOpen && (
                            <div className={style.dropdownMenu}>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>Login</Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>Register</Link>
                            </div>
                        )}
                    </div>

                ) : (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className={style.avatar}
                            title={user?.email ?? "Account"}>
                            {initials}
                        </button>

                        {menuOpen && (
                            <div className={style.dropdownMenu}>
                                <div className="px-4 py-3 border-b border-gray-300 text-sm font-semibold text-orange-400 truncate">
                                    {user?.email}
                                </div>
                                <Link to="/profile" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>Profile</Link>
                                <Link to="/settings" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>

                                    Account Settings
                                </Link>

                                {user?.role === "admin" && (
                                    <>
                                        <div className="border-t border-gray-300 my-1" />
                                        <Link to="/admin/allprofile" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>
                                            Admin Dashboard
                                        </Link>
                                    </>
                                )}


                                <div className="border-t border-gray-300 my-1" />
                                <Link to="/logout" onClick={() => setMenuOpen(false)} className={style.dropdownItem}>Logout</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;



