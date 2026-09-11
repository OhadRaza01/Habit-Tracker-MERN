export default function ProgressRow({ label, value, total }) {
    const percentage = total > 0 ? Math.min(Math.round((value / total) * 100), 100) : 0;

    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-sm text-[#8a8a8a]">
                <span>{label}</span>
                <span className="font-medium text-[#14151a]">{value}/{total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#f3ede4]">
                <div
                    className="h-full rounded-full bg-[#ff5a36]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
