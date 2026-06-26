import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import useServices from "@/hooks/Services/useServices";
import { GrPhone, GrMapLocation } from "react-icons/gr";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const style = {
    wrapper: "w-full px-10 py-10 flex flex-wrap justify-between gap-5 border-t dark:border-t-gray-700",
    header: "flex flex-col gap-3 md:px-5 lg:px-15",
    topic: "text-md lg:text-xl text-orange-400 font-bold",
};

const Footer = () => {
    const { data } = useServices();

    return (
        <>
            <div className={style.wrapper}>
                <div className="w-full flex flex-col gap-3 items-center">
                    <Link to="/" className="flex">
                        <img src="/footerlogo.png" alt="Logo" />
                    </Link>
                    <p className="text-md lg:text-2xl text-gray-500 text-center">
                        We provide many services that will help you in your journey of learning and creating your own projects
                    </p>
                </div>

                <div className={style.header}>
                    <div className={style.topic}>Services</div>
                    {data.map((item) => (
                        <Link to={`/services?id=${item.id}`} key={item.id} className="text-lg lg:text-xl font-semibold hover:text-orange-400">
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className={style.header}>
                    <div className={style.topic}>Company</div>
                    <NavLinks />
                </div>

                <div className={style.header}>
                    <div className={style.topic}>Contact Us At</div>
                    <div className="flex flex-col">
                        <p className="flex gap-2 items-center">
                            <GrPhone />
                            <a href="https://wa.me/9779863034097" className="text-lg lg:text-xl hover:text-orange-400 font-semibold" target="_blank" rel="noreferrer">9863034977</a>
                        </p>
                        <p className="flex gap-2 items-center">
                            <GrMapLocation />
                            <a href="https://www.google.com/maps/place/YenyaSoft+Private+Limited" className="text-lg lg:text-xl hover:text-orange-400 font-semibold" target="_blank" rel="noreferrer">Sanepa, Lalitpur</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-5 items-center justify-center text-2xl mb-5">
                <a href="https://github.com/NilishaShrestha000/Authentication-System" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="https://wa.me/9779863034097" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                <a href="https://www.linkedin.com/company/yenya-soft-private-limited/posts/?feedView=all" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            </div>

            <div className={style.wrapper}>
                <p className="text-gray-500">© Yenya Soft. All rights reserved.</p>
                <p className="text-gray-500">2026 AD</p>
            </div>
        </>
    );
};
export default Footer;