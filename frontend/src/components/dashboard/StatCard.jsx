
export default function StatCard({ label, value, icon, accent }) {
    return (
        <div className="rounded-2xl border border-[#eee7db] bg-white p-6">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#6b6b6b]">{label}</span>
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent ? "bg-[#ff5a36]/10 text-[#ff5a36]" : "bg-[#14151a]/5 text-[#14151a]"
                        }`}
                >
                    {icon}
                </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-[#14151a]">{value}</p>
        </div>
    );
}