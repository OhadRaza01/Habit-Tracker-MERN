import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import DashboardNavBar from "../components/dashboard/DashboardNavBar";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        setSidebarOpen(false);
        navigate("/login");
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#faf7f2]">
            <div
                className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <SideBar onLogout={handleLogout} onClose={closeSidebar} />
            </div>

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-30 bg-black/20 md:hidden"
                />
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardNavBar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
