import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import DashboardNavBar from "../components/dashboard/DashboardNavBar";

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {

        navigate("/login");
    };

    return (
            <div className="flex h-screen overflow-hidden bg-[#faf7f2]">
                <SideBar onLogout={handleLogout} />

                <div className="flex flex-1 flex-col overflow-hidden">
                    <DashboardNavBar />
                    <main className="flex-1 overflow-y-auto p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
    );
}
