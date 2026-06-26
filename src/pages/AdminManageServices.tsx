
import PostServices from "@/hooks/Services/PostServices";
import { useAuth } from "@/context/AuthContext";
import PatchService from "@/hooks/Services/PatchService";
import HomeSidebar from "@/components/HomeSidebar";


const AdminMangeAervice = () => {

    const { user } = useAuth();



    return (
        <>
            <div className="flex min-h-screen bg-background text-foreground">

                <HomeSidebar />

                {/* Main scrollable content */}
                <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 pb-24 lg:pb-10 overflow-y-auto">

                    {/* Admin section */}
                    {user?.role === "admin" && (
                        <div className="mt-8 ">

                            <div className="flex md:flex-col gap-8 max-w-4xl mx-auto">
                                <PostServices />
                                <PatchService />
                            </div>
                        </div>
                    )}
                </main>

            </div>
        </>
    );
};

export default AdminMangeAervice;