import useContact from "@/hooks/Contact/useContact";
import { useNavigate } from "react-router-dom";
import usePatchContact from "@/hooks/Contact/usePatchContact";
import { useEffect, useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const style = {
    wrapper: "px-7 py-5 lg:px-13 lg:py-10 min-h-full w-full",
    header: "text-3xl lg:text-5xl font-bold tracking-wide mt-5",
    new: "border border-green-500 bg-green-400/10 text-green-400 rounded px-1 py-1 text-sm",
    border: "border border-orange-400/50 bg-orange-400/10 hover:bg-orange-500/30 hover:scale-[1.05] rounded-lg px-5 py-4 m-5 overflow-hidden cursor-pointer duration-300",
};

const Queries = () => {
    const { data } = useContact();
    const navigate = useNavigate();
    const { markAsRead } = usePatchContact();
    const [messages, setMessages] = useState<Contact[]>([]);

    useEffect(() => {
        if (data) setMessages(data);
    }, [data]);

    const handleMarkAsRead = async (
        e: React.MouseEvent,
        id: number
    ): Promise<void> => {
        e.stopPropagation();
        await markAsRead(id);
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, isRead: true } : msg
            )
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">

            {/* Sidebar */}
            <ProfileSidebar />


            {/* Main content */}
            <main className="flex-1 px-4 py-8 lg:px-10 lg:py-10">

                <div className={style.header}>Contact Messages</div>

                {/* Stats */}
                <div className="flex items-center gap-10 m-5">
                    <div className="border p-2 border-orange-500 bg-orange-500/15 rounded-lg">
                        <p className="text-xl">Total Messages</p>
                        <span className="font-bold text-green-500">{messages.length}</span>
                    </div>
                    <div className="border p-2 border-orange-500 bg-orange-500/15 rounded-lg">
                        <p className="text-xl">Unread Messages</p>
                        <span className="font-bold text-red-500">
                            {messages.filter((msg: Contact) => !msg.isRead).length}
                        </span>
                    </div>
                </div>

                {/* Message list */}
                {messages.map((msg: Contact) => (
                    <div
                        key={msg.id}
                        className={style.border}
                        onClick={() => navigate(`/admin/query?id=${msg.id}`)}>
                        <div className="justify-between flex">
                            <div>
                                <p className="font-semibold">{msg.name} ({msg.email})</p>
                                <p className="text-sm text-gray-500">{msg.subject}</p>
                                <p>{msg.message}</p>
                            </div>
                            <div className="text-gray-500 flex sm:flex-col gap-2 md:flex-row">
                                {!msg.isRead && <span className={style.new}>New</span>}
                                <p>{new Date(msg.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="border-b m-2" />

                        <div className="flex flex-row gap-5">

                            < a href={`https://mail.google.com/mail/?view=cm&to=${msg.email}&su=Re: ${encodeURIComponent(msg.subject)}`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="border rounded-md flex items-center gap-2 px-2 py-1 text-sm bg-gray-400 hover:bg-green-400/50 hover:scale-[1.05] duration-300">
                                Send an Email
                            </a>
                            {!msg.isRead && (
                                <button
                                    type="button"
                                    onClick={(e: React.MouseEvent) => handleMarkAsRead(e, msg.id)}
                                    className="border rounded-md flex items-center gap-2 px-2 py-1 text-sm bg-gray-400/30 hover:bg-violet-400/30 hover:scale-[1.05] duration-300">
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Queries;