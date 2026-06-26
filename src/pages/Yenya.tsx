import Api from "@/Api/api";
import { useNavigate } from "react-router-dom";
import useServices from "@/hooks/Services/useServices";
import ServiceSummary from "@/hooks/ServiceSummary";
import TechStack from "@/hooks/TechStack";
// import { GLSLHills } from "@/components/ui/glsl-hills";

const style = {
    wrapper: "px-7 py-5 lg:px-13 lg:py-10 min-h-full w-full",
    header: "text-3xl lg:text-5xl font-bold tracking-wide mt-5",
    paragraph: "text-[12px] lg:text-lg tracking-wide text-orange-400",
    services: "group bg-white/10 hover:bg-violet-400/15 border border-gray-500 hover:border-violet-400/60 hover:text-violet-400 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.05] px-4 py-3",
};

const Yenya = () => {
    const navigate = useNavigate();
    const { data } = useServices();

    return (
        <div className={style.wrapper}>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                {/* <GLSLHills /> */}
                <div className="space-y-6 pointer-events-none z-10 text-center absolute">
                    <h1 className="font-semibold text-7xl whitespace-pre-wrap">
                        <span className="italic text-6xl font-thin">Services That Does Wonders <br /></span>
                        Better Than Most
                    </h1>
                    <p className="text-sm text-primary/60">
                        We provide amazing services and user-friendly experiences that <br /> help your brand stand out and connect with your audience.
                    </p>
                </div>
            </div>

            <div className="text-sm text-slate-400 mt-2">
                Explore our services and find the right solution for your project
            </div>

            <div className={`${style.paragraph} mt-5`}>
                HERE'S WHAT WE OFFER
            </div>

            <ServiceSummary />

            <div className="text-lg lg:text-2xl m-5 text-center font-bold text-orange-400">
                List of Services
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 transition-all mt-3">
                {data.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/service?id=${item.id}`)}
                        className={style.services}>
                        <img src={`http://192.168.150.169:3000/public/${item.image}`} className="w-full h-100" alt={item.title} />
                        <div className="font-bold text-base">{item.title}</div>
                        <p className="text-sm text-slate-400">{item.shortDescription}</p>
                        <div className="text-xs text-slate-500 group-hover:text-violet-400 pt-2 flex items-center gap-1">
                            View Details
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <TechStack />
            </div>
        </div>
    );
};
export default Yenya;