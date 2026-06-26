import useServices from "./Services/useServices";

const style = {
    circle: "w-2 h-2 rounded-full bg-violet-400 inline-block",
    techborder: "border border-gray-500 hover:border-violet-400/60 shadow-lg hover:shadow-2xl items-center rounded-md px-5 bg-white/10 hover:bg-violet-400/15 flex gap-2",
};

const TechStack = () => {
    const { data } = useServices();

    return (
        <div className="border border-gray-500 shadow-lg hover:shadow-xl items-center rounded-xl p-2 bg-white/10 mt-10">
            {data && (
                <div>
                    <div className="flex justify-between mt-5 px-5 text-orange-400">
                        <div className="text-lg lg:text-2xl font-bold">Tech Stack</div>
                        <div className="text-sm lg:text-xl font-medium">
                            {[...new Set(data.flatMap((d) => d.tags))].length} technologies
                        </div>
                    </div>

                    <div className="flex gap-4 transition-all flex-wrap p-9">
                        {[...new Set(data.flatMap((d) => d.tags))].map((tag, index) => (
                            <div key={index} className={style.techborder}>
                                <span className={style.circle}></span>
                                <div className="text-md lg:text-xl">{tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TechStack;