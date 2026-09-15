import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

const navItems = [
    { label: "Overview", icon: "◉", active: true },
    { label: "My habits", icon: "♨", section: "my-habits" },
]

export default function DashboardSidebar({ user, activeSection, onNavigate, onLogout, onSettings }) {
    const displayName = user?.fullName || user?.username || "Account"
    const initials = displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
    return (
        <aside className="fixed inset-x-0 bottom-0 z-20 flex h-16 border-t border-[#ece8e2] bg-white lg:inset-y-0 lg:right-auto lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:border-t-0">
            <div className="hidden items-center gap-3 px-8 py-8 lg:flex">
                <Link to="/" className="flex items-center gap-3" aria-label="Habitly home"><img src={logo} alt="Habitly" className="h-9 w-9 rounded-lg object-cover shadow-sm" /><span className="text-xl font-bold tracking-tight">habitly</span></Link>
            </div>
            <nav className="flex flex-1 items-center justify-around px-2 lg:mt-7 lg:block lg:px-4">
                {navItems.map((item) => (
                    <button key={item.label} type="button" onClick={() => onNavigate(item.section || "overview")} className={`flex items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:mb-2 lg:w-full ${(item.section || "overview") === activeSection ? "bg-[#fff0ea] text-[#ed6334]" : "text-[#837c75] hover:bg-[#fbf6f1] hover:text-[#ed6334]"}`}>
                        <span className="w-5 text-center text-lg leading-none">{item.icon}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                    </button>
                ))}
                <div className="group relative hidden lg:mt-auto lg:block">
                    <button type="button" className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#837c75] transition hover:bg-[#fbf6f1] hover:text-[#ed6334]">
                        <span className="w-5 text-center text-lg">⚙</span><span>Settings</span>
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
        </aside>
    )
}