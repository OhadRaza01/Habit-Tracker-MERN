export default function StatCard({ label, value, detail, accent }) {
    return (
        <div className="rounded-2xl border border-[#eee7db] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a8a8a] sm:text-xs">{label}</p>
            <p className={`mt-2 text-xl font-extrabold sm:mt-3 sm:text-2xl ${accent ? "text-[#ff5a36]" : "text-[#14151a]"}`}>
                {value}
            </p>
            <p className="mt-1 text-xs text-[#8a8a8a] sm:mt-2 sm:text-sm">{detail}</p>
        </div>
    );
}
