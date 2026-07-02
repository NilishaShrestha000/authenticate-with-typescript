import { createBrowserRouter } from "react-router-dom";

// pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ContactUs from "@/pages/ContactUs";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Yenya from "@/pages/Yenya";
import Detail from "@/pages/ServiceDetail";
import Logout from "@/pages/Logout";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import GuestRoute from "@/Routes/GuestRoute";
import Layout from "./Layout";
// import PatchServices from "@/hooks/Services/DisplayPatchServices";
import ErrorPage from "@/components/ErrorPage";
import Queries from "@/pages/Querries";
// import QueryDetail from "@/pages/QuerryDetail";
import Profile from "@/pages/Profile";
import AllProfile from "@/pages/AllProfiles";
import ProfileDetail from "@/pages/ProfileDetail";
import AdminMangeAervice from "@/pages/AdminManageServices";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Yenya /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "logout", element: <Logout /> },
            { path: "home", element: <Home /> },
            { path: "services", element: <Services /> },
            { path: "contact", element: <ContactUs /> },
            { path: "service", element: <Detail /> },
            { path: "/admin/querries", element: <Queries /> },
            {
                path: "login",
                element: <GuestRoute><Login /></GuestRoute>,
            },
            {
                path: "register",
                element: <GuestRoute><Register /></GuestRoute>,
            },

            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "settings",
                element: <Settings />,
            },

            {
                path: "admin/allprofile",
                element: <ProtectedRoute><AllProfile /></ProtectedRoute>,
            },
            {
                path: "admin/profile",
                element: <ProtectedRoute><ProfileDetail /></ProtectedRoute>,
            },
            {
                path: "admin/mangeservices",
                element: <ProtectedRoute><AdminMangeAervice /></ProtectedRoute>,
            },


        ],
    },
]);

export default router;