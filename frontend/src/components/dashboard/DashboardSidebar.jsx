import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

function SidebarIcon({ type }) {
    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-5 w-5",
        "aria-hidden": true,
    }

    switch (type) {
        case "overview":
            return (
                <svg {...commonProps}>
                    <path d="M3 11.5 12 4l9 7.5" />
                    <path d="M5 9.5V19h14v-9.5" />
                    <path d="M9 19v-6h6v6" />
                </svg>
            )
        case "habits":
            return (
                <svg {...commonProps}>
                    <path d="M6 18.5V7.8A2.8 2.8 0 0 1 8.8 5h6.4A2.8 2.8 0 0 1 18 7.8v10.7" />
                    <path d="M6 15.5h12" />
                    <path d="M9 10.5h6" />
                    <path d="M9 13.5h6" />
                </svg>
            )
        case "settings":
            return (
                <svg {...commonProps}>
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M19.4 15a1.8 1.8 0 0 0 .35 1.94l.05.05a2 2 0 0 1-2.83 2.83l-.06-.05A1.8 1.8 0 0 0 15 19.4a1.8 1.8 0 0 0-1.07 1.64V21a2 2 0 1 1-4 0v-.08A1.8 1.8 0 0 0 8.86 19.4a1.8 1.8 0 0 0-1.94.35l-.05.05A2 2 0 1 1 4 16.97l.05-.06A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.64-1.07H2.9a2 2 0 1 1 0-4h.08A1.8 1.8 0 0 0 4.6 8.86a1.8 1.8 0 0 0-.35-1.94l-.05-.05A2 2 0 1 1 7.03 4l.06.05A1.8 1.8 0 0 0 9 4.6a1.8 1.8 0 0 0 1.07-1.64V2.9a2 2 0 1 1 4 0v.08A1.8 1.8 0 0 0 15.14 4.6a1.8 1.8 0 0 0 1.94-.35l.05-.05A2 2 0 0 1 19.97 7l-.05.06A1.8 1.8 0 0 0 19.4 9a1.8 1.8 0 0 0 1.64 1.07h.08a2 2 0 0 1 0 4h-.08A1.8 1.8 0 0 0 19.4 15Z" />
                </svg>
            )
        default:
            return null
    }
}

const navItems = [
    { label: "Overview", icon: "overview", active: true },
    { label: "My habits", icon: "habits", section: "my-habits" },
]

export default function DashboardSidebar({ user, activeSection, onNavigate, onLogout, onSettings, isOpen = false, onClose }) {
    const displayName = user?.fullName || user?.username || "Account"
    const initials = displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

    const handleNavigate = (section) => {
        onNavigate(section)
        if (onClose) onClose()
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-[#2b241f]/20 transition-opacity duration-200 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-[#ece8e2] bg-white transition-transform duration-200 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="flex items-center justify-between gap-3 px-6 py-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-3" aria-label="Habitly home"><img src={logo} alt="Habitly" className="h-9 w-9 rounded-lg object-cover shadow-sm" /><span className="text-xl font-bold tracking-tight">habitly</span></Link>
                    <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-8 w-8 items-center justify-center rounded-lg text-[#605a55] transition hover:bg-[#fbf6f1] hover:text-[#ed6334] lg:hidden">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-1 flex-col px-4 pb-4 lg:mt-2">
                    {navItems.map((item) => (
                        <button key={item.label} type="button" onClick={() => handleNavigate(item.section || "overview")} className={`flex items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:mb-2 ${((item.section || "overview") === activeSection) ? "bg-[#fff0ea] text-[#ed6334]" : "text-[#837c75] hover:bg-[#fbf6f1] hover:text-[#ed6334]"}`}>
                            <span className="flex h-5 w-5 items-center justify-center"><SidebarIcon type={item.icon} /></span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                    <div className="group relative mt-auto hidden lg:block">
                        <button type="button" className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#837c75] transition hover:bg-[#fbf6f1] hover:text-[#ed6334]">
                            <span className="flex h-5 w-5 items-center justify-center"><SidebarIcon type="settings" /></span><span>Settings</span>
                        </button>
                        <div className="invisible absolute left-0 top-full z-30 w-full translate-y-1 rounded-xl border border-[#ece8e2] bg-white p-1 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <button type="button" onClick={onSettings} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#756e67] hover:bg-[#fff0ea] hover:text-[#ed6334]">Change password</button>
                        </div>
                    </div>
                </nav>
                <div className="hidden items-center gap-3 border-t border-[#f0ece7] px-7 py-5 lg:flex">
                    {user?.avatar ? <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9c4a9] text-xs font-bold text-[#9b4b2b]">{initials}</span>}
                    <div className="min-w-0"><p className="truncate text-sm font-bold">{displayName}</p><p className="text-xs text-[#a39d95]">Free plan</p></div>
                    <button type="button" onClick={onLogout} aria-label="Log out" className="ml-auto text-xs font-bold text-[#837c75] hover:text-[#ed6334]">Log out</button>
                </div>
                <div className="mt-auto space-y-2 border-t border-[#f0ece7] px-4 py-4 lg:hidden">
                    <button type="button" onClick={onSettings} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#837c75] transition hover:bg-[#fbf6f1] hover:text-[#ed6334]">
                        <span className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center"><SidebarIcon type="settings" /></span>Settings</span>
                        <span className="text-xs">›</span>
                    </button>
                    <button type="button" onClick={onLogout} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#837c75] transition hover:bg-[#fff0ea] hover:text-[#ed6334]">
                        <span className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <path d="M16 17l5-5-5-5" />
                                <path d="M21 12H9" />
                            </svg>
                        </span>Log out</span>
                        <span className="text-xs">›</span>
                    </button>
                </div>
            </aside>
        </>
    )
}