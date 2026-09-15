import logo from "../../assets/logo.png"

export default function DashboardTopbar({ onAddHabit, onMenuClick }) {
    return (
        <header className="flex h-20 items-center justify-between border-b border-[#ece8e2] bg-white px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
                <button type="button" onClick={onMenuClick} aria-label="Open navigation menu" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ece8e2] bg-[#fbfaf8] text-[#403a35] transition hover:bg-[#fff0ea] hover:text-[#ed6334] lg:hidden">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Habitly" className="h-8 w-8 rounded-lg object-cover" />
                    <span className="text-lg font-bold tracking-tight">habitly</span>
                </div>
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center">
                <button type="button" onClick={onAddHabit} className="flex items-center gap-2 rounded-lg bg-[#f26b3a] px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(242,107,58,0.22)] transition hover:bg-[#df5c2d]"><span className="text-lg leading-none">+</span> Add habit</button>
            </div>
        </header>
    )
}