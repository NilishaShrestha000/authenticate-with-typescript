import useServices from "@/hooks/Services/useServices";
import { type Service } from "@/hooks/Services/useServices";
import ServiceCard from "@/hooks/ServiceCard";
import {Link } from "react-router-dom";
import HomeSidebar from "@/components/HomeSidebar";

const style = {
    wrapper: "px-6 py-8 lg:px-13 lg:py-10 min-h-full w-full",
    text: "text-sm text-orange-400 text-center font-semibold tracking-widest uppercase",
    header: "text-3xl lg:text-5xl font-medium tracking-wide mt-3 text-center",
    paragraph: "text-sm text-slate-400 mt-3 text-center max-w-xl mx-auto",
    statNumber: "text-3xl lg:text-4xl font-bold text-orange-400",
    statLabel: "text-sm text-slate-400 mt-1",
    contact: "border border-gray-500 hover:border-orange-400 bg-gray-400/10 hover:bg-orange-500/20 rounded-lg px-4 py-2 duration-200 text-sm",
    services: "group bg-white/10 hover:bg-violet-400/15 border border-gray-500 hover:border-violet-400/60 hover:text-violet-400 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] flex flex-col gap-2",
    cta: "flex border border-orange-400/50 bg-orange-400/10 border-l-4 border-l-orange-400 rounded-xl px-5 py-5 justify-between gap-5 items-center",
    ctaBtn: "border border-orange-400/50 hover:border-orange-500 bg-orange-400/20 hover:bg-orange-500/30 rounded-lg px-4 py-2 hover:scale-[1.03] duration-200 text-sm shrink-0",
};

const Services = () => {
    const { data } = useServices();


    const newThisMonth: number = data.filter((d: Service) => {
        const created = new Date(d.createdAt);
        const now = new Date();
        return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
        );
    }).length;

    const uniqueTags: string[] = [...new Set(data.flatMap((d: Service) => d.tags))];

    return (
        <div className="flex min-h-screen bg-background text-foreground">

            <HomeSidebar />

            {/* Main scrollable content */}
            <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 pb-24 lg:pb-10 overflow-y-auto">


                {/* Hero */}
                <p className={style.text}>What We Offer</p>
                <h1 className={style.header}>Our Services</h1>
                <p className={style.paragraph}>
                    We build fast, scalable, and responsive products — from web apps to mobile experiences.
                </p>

                {/* Stats */}
                <div className="mt-10 flex flex-row gap-10 lg:gap-20 items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                        <span className={style.statNumber}>{data.length}</span>
                        <span className={style.statLabel}>Services Offered</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className={style.statNumber}>{uniqueTags.length}</span>
                        <span className={style.statLabel}>Tools & Technologies</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className={style.statNumber}>{newThisMonth}</span>
                        <span className={style.statLabel}>New This Month</span>
                    </div>
                </div>

                {/* Contact button */}
                <div className="mt-8 flex justify-center">
                    <Link to="/contact" className={style.contact}>
                        Contact Us
                    </Link>
                </div>

                <div className="border-b border-gray-700 mt-8 mb-8"></div>

                {/* Services grid */}
                <ServiceCard />


                <div className="mt-8">
                    <div className={style.cta}>
                        <div>
                            <h2 className="font-semibold text-base">Ready to start your project?</h2>
                            <p className="text-sm text-slate-400 mt-1">Want to inquire about anything?</p>
                        </div>
                        <a
                            href="https://wa.me/9779863034097"
                            target="_blank"
                            rel="noreferrer"
                            className={style.ctaBtn}>
                            Contact Us
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;