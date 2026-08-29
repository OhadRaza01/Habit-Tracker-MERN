import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const navItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        end: true,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
            </svg>
        ),
    },
    {
        label: "Habits",
        to: "/dashboard/habits",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 13l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="6" x2="20" y2="6" strokeLinecap="round" />
                <line x1="12" y1="14" x2="20" y2="14" strokeLinecap="round" />
                <line x1="4" y1="19" x2="20" y2="19" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Statistics",
        to: "/dashboard/statistics",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="20" x2="6" y2="12" strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
                <line x1="18" y1="20" x2="18" y2="15" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Settings",
        to: "/dashboard/settings",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
            </svg>
        ),
    },
];

export default function SideBar({ onLogout }) {
    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#eee7db] bg-white">
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 py-6">
                <img src={logo} alt="Habitus logo" className="h-8 w-8 object-contain" />
                <span className="text-lg font-bold text-[#14151a]">Habitus</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-1 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                ? "bg-[#ff5a36]/10 text-[#ff5a36]"
                                : "text-[#6b6b6b] hover:bg-[#faf7f2] hover:text-[#14151a]"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            
            {/*Logout*/}

            <div className="border-t border-[#eee7db] px-4 py-4">
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b6b6b] transition-colors hover:bg-[#fff3ee] hover:text-[#ff5a36]"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
}
