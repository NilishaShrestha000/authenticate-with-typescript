
import { useNavigate, useSearchParams } from "react-router-dom";
import useServices, { type Service } from "@/hooks/Services/useServices";
import useServiceId from "@/hooks/Services/useServiceId";

const Detail = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { data } = useServices();
    const { service, loading } = useServiceId();
    const navigate = useNavigate();

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen text-slate-400">
            Loading...
        </div>
    );

    if (!service) return (
        <div className="flex items-center justify-center min-h-screen text-slate-400">
            Service not found.
        </div>
    );

    return (
        <div className="p-10">

            {/* Selected service */}
            <div className="border border-gray-700 rounded-2xl p-5 lg:flex lg:gap-8">
                <img
                    src={`https://auth.durlavparajuli.com.np/public/${service.image}`}
                    className="w-full h-200 lg:w-1/2 rounded-xl object-cover"
                    alt={service.title}
                />
                <div className="mt-4 lg:mt-0"><fieldset></fieldset>
                    <div className="font-bold text-3xl lg:text-4xl sm:mt-2">
                        {service.title}
                    </div>
                    <div className="text-lg sm:text-xl mt-3 text-slate-400">
                        {service.description}
                    </div>
                    <div className="text-base mt-3">
                        Price:{" "}
                        <span className="font-semibold text-orange-400">
                            {service.price} {service.currency}
                        </span>
                    </div>
                    <div className="mt-4">
                        <div className="text-base font-semibold mb-2">
                            Tools & Technologies
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {service.tags?.map((tag: string, index: number) => (
                                <li
                                    key={index}
                                    className="border border-gray-600 rounded-full px-3 py-1 text-sm text-slate-300">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Explore more */}
            <div className="text-lg lg:text-2xl m-5 text-center font-bold">
                Explore More Services
            </div>
            <div className="flex gap-4 px-5 py-2 transition-all overflow-x-auto scrollbar-none">
                {data
                    .filter((item: Service) => item.id !== (id))
                    .map((item: Service) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/service?id=${item.id}`)}
                            className="group w-64 sm:w-72 lg:w-80 shrink-0 bg-white/10 hover:bg-violet-400/15 border border-gray-500 hover:border-violet-400/60 hover:text-violet-400 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.05] px-4 py-3">
                            <img
                                src={`http://192.168.150.169:3000/public/${item.image}`}
                                className="w-full h-36 lg:h-44 rounded-lg object-cover"
                                alt={item.title}
                            />
                            <div className="font-bold text-base mt-2">{item.title}</div>
                            <p className="text-sm text-slate-400">{item.shortDescription}</p>
                            <div className="text-xs text-slate-500 group-hover:text-violet-400 pt-2 flex items-center gap-1">
                                View Details →
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Detail;