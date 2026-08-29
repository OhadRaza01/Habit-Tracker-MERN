import { useAuth } from "../../contexts/AuthContext";
import LoadingScreen from "../shared/LoadingScreen";

export default function DashboardNavBar({ title = "Dashboard", userName = "Jane Doe" }) {

  const { user, loading } = useAuth()

  if (loading) {
    <LoadingScreen />
  }

  return (
    <header className="flex items-center justify-between border-b border-[#eee7db] bg-white px-8 py-5">
      <div>
        <h1 className="text-xl font-bold text-[#14151a]">{title}</h1>
        <p className="text-sm text-[#8a8a8a]">Welcome back, {user?.fullName}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#faf7f2] hover:text-[#14151a]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5a36] text-xs font-semibold text-white overflow-hidden">
          <img src={user?.avatar} className="w-full h-full object-cover" alt="avatar" />
        </div>
      </div>
    </header>
  );
}
