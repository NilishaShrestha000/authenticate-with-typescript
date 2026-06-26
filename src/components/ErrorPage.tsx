import { useNavigate, useRouteError } from "react-router-dom";

interface RouteError {
    status?: number;
    statusText?: string;
    code?: {
        message?: string;
    };
}

const style = {
    button: "border bg-gray-400/40 px-2 py-1 rounded hover:bg-gray-400/50 cursor-pointer hover:scale-[1.05] duration-300",
};

const ErrorPage = () => {
    const error = useRouteError() as RouteError;
    const navigate = useNavigate();

    return (
        <div className="items-center justify-center flex flex-col min-h-screen gap-5">
            <div className="border border-red-500 rounded-full text-2xl text-red-500 bg-red-500/50 h-10 w-10 items-center justify-center flex font-bold">!</div>
            <h1 className="text-5xl">{error?.status}</h1>
            <p className="text-2xl">{error?.statusText || error?.code?.message}</p>
            <h1 className="text-gray-500">There seems to be an error. Try again or go back to the home page.</h1>
            <div className="flex gap-10">
                <button onClick={() => navigate("/")} className={style.button}>Go back Home</button>
                <button onClick={() => window.location.reload()} className={style.button}>Reload</button>
            </div>
        </div>
    );
};

export default ErrorPage;