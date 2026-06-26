import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NavLinks from "./NavLinks";
import Footer from "./Footer";

const style = {
    screen: "flex flex-col min-h-screen w-full bg-background",
    slide: "fixed inset-0 z-50 flex flex-col bg-background",
    close: "hover:text-orange-400 text-lg cursor-pointer px-6",
};

const Layout = () => {
 
    const [slide, setSlide] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSlide(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={style.screen}>
            {!slide && <Navbar setSlide={setSlide} />}

            {slide && (
                <div className={style.slide}>
                    <div className="flex justify-between items-center px-6 h-16">
                        <Link to="/" className="flex items-center">
                            <img src="/yenya.png" alt="Logo" />
                        </Link>
                        <button className={style.close} onClick={() => setSlide(false)}>Close</button>
                    </div>
                    <nav className="flex flex-col">
                        <NavLinks closeMenu={() => setSlide(false)} isMobile={true} />
                    </nav>
                </div>
            )}

            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;