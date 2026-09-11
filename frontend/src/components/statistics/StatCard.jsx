export default function StatCard({ label, value, detail, accent }) {
    return (
        <div className="rounded-2xl border border-[#eee7db] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8a8a]">{label}</p>
            <p className={`mt-3 text-2xl font-extrabold ${accent ? "text-[#ff5a36]" : "text-[#14151a]"}`}>
                {value}
            </p>
            <p className="mt-2 text-sm text-[#8a8a8a]">{detail}</p>
        </div>
    );
}
