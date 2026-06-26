import useProfile from "@/hooks/useProfile";
import useServices from "@/hooks/Services/useServices";
import ServiceSummary from "@/hooks/ServiceSummary";
import { Link } from "react-router-dom";
import TechStack from "@/hooks/TechStack";
import HomeSidebar from "@/components/HomeSidebar";
import ServiceCard from "@/hooks/ServiceCard";


const style = {
    header: "text-3xl lg:text-4xl font-bold tracking-wide mt-2",
    paragraph: "text-sm text-slate-400 mt-2",
    book: "border border-orange-400/50 hover:border-orange-500 bg-orange-400/20 hover:bg-orange-500/30 rounded-lg px-4 py-2 hover:scale-[1.03] duration-200 text-sm",
    browse: "border border-gray-600 hover:border-orange-400 hover:bg-orange-500/20 rounded-lg px-4 py-2 hover:scale-[1.03] duration-200 text-sm",
    card: "flex border border-orange-400/40 bg-orange-400/5 border-l-4 border-l-orange-400 rounded-xl px-5 py-4 justify-between gap-5 hover:bg-orange-400/10 transition-all duration-200",
};

const Home = () => {
    const { userName } = useProfile();
    const { data } = useServices();


    const newThisMonth = data.filter((d) => {
        const created = new Date(d.createdAt);
        const now = new Date();
        return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
        );
    });

    return (
        <>
            <div className="flex min-h-screen bg-background text-foreground">

                <HomeSidebar />

                {/* Main scrollable content */}
                <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 pb-24 lg:pb-10 overflow-y-auto">

                    {/* Welcome */}
                    <h1 className={style.header}>Welcome back, {userName}</h1>
                    <p className={style.paragraph}>Here's what's happening with your account today.</p>

                    <div className="flex flex-row gap-3 mt-5">

                        < a href="https://wa.me/9779863034097"
                            target="_blank"
                            rel="noreferrer"
                            className={style.book}>
                            Book a Free Consultation
                        </a>
                        <Link to="/services" className={style.browse}>
                            Browse Services
                        </Link>
                    </div>

                    {/* Stats summary */}
                    <div className="mt-8">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Overview</p>
                        <ServiceSummary />
                    </div>

                   <div className="mt-8">
                        <p className="text-lg text-orange-400 uppercase font-bold text-center tracking-widest mb-3">Our Services</p>
                        <ServiceCard/>
                    </div>


                    {/* New this month */}
                        {newThisMonth.length > 0 && (
                            <div className="mt-8">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">New This Month</p>
                                <div className="flex flex-col gap-3">
                                    {newThisMonth.map((item) => (
                                        <div key={item.id} className={style.card}>
                                            <div className="flex flex-col">
                                                <p className="border border-orange-400/50 bg-orange-400/5 text-[11px] w-fit px-3 py-1 text-orange-400 rounded-full">
                                                    NEW THIS MONTH
                                                </p>
                                                <div className="text-base lg:text-lg font-semibold mt-3 mb-1">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs lg:text-sm text-slate-500">
                                                    {item.shortDescription}
                                                </div>
                                            </div>
                                            <div className="items-center flex shrink-0">
                                                <Link to="/services" className={`${style.book} text-xs`}>
                                                    View details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tech stack */}
                    <div className="mt-8">
                        <TechStack />
                    </div>

                    {/* CTA */}
                    <div className="mt-8">
                        <div className={`${style.card} border-r-4 border-r-orange-400`}>
                            <div>
                                <h2 className="font-semibold text-base">Ready to start your project?</h2>
                                <p className="text-sm text-slate-400 mt-1">Let's build something great together.</p>
                            </div>
                            <Link to="/contact" className={`${style.book} text-xs items-center flex shrink-0 h-9`}>
                                Contact us
                            </Link>
                        </div>
                    </div>

                </main>

            </div>
        </>
    );
};

export default Home;