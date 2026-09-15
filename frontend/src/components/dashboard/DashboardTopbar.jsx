import logo from "../../assets/logo.png"

export default function DashboardTopbar({ onAddHabit }) {
    return (
        <header className="flex h-20 items-center justify-between border-b border-[#ece8e2] bg-white px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3 lg:hidden">
                <img src={logo} alt="Habitly" className="h-8 w-8 rounded-lg object-cover" />
                <span className="text-lg font-bold tracking-tight">habitly</span>
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center">
                <button type="button" onClick={onAddHabit} className="flex items-center gap-2 rounded-lg bg-[#f26b3a] px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(242,107,58,0.22)] transition hover:bg-[#df5c2d]"><span className="text-lg leading-none">+</span> Add habit</button>
            </div>
        </header>
    )
}