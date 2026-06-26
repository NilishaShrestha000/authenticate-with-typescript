import useServices from "./Services/useServices";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiDocumentDelete } from "react-icons/ti";
import { IoRocketOutline } from "react-icons/io5";

const style = {
    flashservicelist: "grid grid-cols-4 gap-4 lg:gap-6 mt-3",
    border: "border border-gray-500 hover:border-violet-400/60 shadow-lg hover:shadow-2xl items-center rounded-lg p-2 bg-white/10 hover:bg-violet-400/15",
    icon: "text-xl lg:text-2xl text-violet-400",
    text: "font-bold text-xl lg:text-2xl mt-2 mb-2",
    names: "lg:text-lg text-[10px]",
};

const ServiceSummary = () => {
    const { data } = useServices();

    return (
        <>
            {data && (
                <div className={style.flashservicelist}>
                    <div className={style.border}>
                        <div className={style.icon}><LuLayoutDashboard /></div>
                        <div className={style.text}>{data.length}</div>
                        <div className={style.names}>TOTAL SERVICES</div>
                    </div>
                    <div className={style.border}>
                        <div className={style.icon}><FaRegCircleCheck /></div>
                        <div className={style.text}>{data.length}</div>
                        <div className={style.names}>AVAILABLE NOW</div>
                    </div>
                    <div className={style.border}>
                        <div className={style.icon}><TiDocumentDelete /></div>
                        <div className={style.text}>{[...new Set(data.flatMap((d) => d.tags))].length}</div>
                        <div className={style.names}>TOTAL TECH STACK</div>
                    </div>
                    <div className={style.border}>
                        <div className={style.icon}><IoRocketOutline /></div>
                        <div className={style.text}>
                            {data.filter((d) => {
                                const created = new Date(d.createdAt);
                                const now = new Date();
                                return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                            }).length}
                        </div>
                        <div className={style.names}>NEW THIS MONTH</div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ServiceSummary;