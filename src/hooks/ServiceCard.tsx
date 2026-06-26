import { useNavigate } from "react-router-dom";
import useServices from "./Services/useServices";
import { type Service } from "@/hooks/Services/useServices";

const style = {
    services: "group bg-white/10 hover:bg-violet-400/15 border border-gray-500 hover:border-violet-400/60 hover:text-violet-400 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] flex flex-col gap-2",
};


const ServiceCard = () => {
    const navigate = useNavigate();
    const { data } = useServices();
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 transition-all">
            {data.map((item: Service) => (
                <div
                    key={item.id}
                    onClick={() => navigate(`/service?id=${item.id}`)}
                    className={style.services}>
                    <img
                        src={`http://192.168.150.169:3000/public/${item.image}`}
                        className=" rounded-t-lg object-cover h-100 "
                        alt={item.title}
                    />
                    <div className="px-3 py-2">
                        <div className="font-bold text-base mt-1">{item.title}</div>
                        <p className="text-sm text-slate-400">{item.shortDescription}</p>
                        <div className="text-xs text-slate-500 group-hover:text-violet-400 pt-1 flex items-center gap-1 mt-auto">
                            View Details →
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ServiceCard;