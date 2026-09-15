import { useState } from "react"

export default function AddHabitModal({ onClose, onSubmit, habit = null }) {
    const [form, setForm] = useState(() => ({
        name: habit?.name || "",
        description: habit?.description || "",
        category: habit?.category || "Health",
        frequency: habit?.frequency || "daily",
        target: habit?.target || 1,
        startDate: habit?.startDate ? habit.startDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
    }))

    const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

    const handleSubmit = (event) => {
        event.preventDefault()
        if (form.name.trim()) onSubmit({ ...form, name: form.name.trim() })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#252321]/35 px-5 py-8" role="dialog" aria-modal="true" aria-labelledby="add-habit-title">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26b3a]">Build your routine</p><h2 id="add-habit-title" className="mt-2 text-xl font-bold">{habit ? "Edit habit" : "Add a habit"}</h2></div><button type="button" onClick={onClose} aria-label="Close habit dialog" className="text-2xl text-[#928b83]">×</button></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2 text-xs font-bold text-[#756e67]">Habit name<input autoFocus required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="e.g. Stretch in the morning" className="mt-2 w-full rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label>
                    <label className="sm:col-span-2 text-xs font-bold text-[#756e67]">Description<textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="What does this habit help you do?" rows="2" className="mt-2 w-full resize-none rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label>
                    <label className="text-xs font-bold text-[#756e67]">Category<select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]"><option>Health</option><option>Mindset</option><option>Productivity</option><option>Mindfulness</option></select></label>
                    <label className="text-xs font-bold text-[#756e67]">Frequency<select value={form.frequency} onChange={(event) => updateField("frequency", event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] bg-white px-3 py-2.5 text-sm capitalize outline-none focus:border-[#f26b3a]"><option value="daily">Daily</option><option value="weekly">Weekly</option></select></label>
                    <label className="text-xs font-bold text-[#756e67]">Target<input type="number" min="1" required value={form.target} onChange={(event) => updateField("target", event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label>
                    <label className="sm:col-span-2 text-xs font-bold text-[#756e67]">Start date<input type="date" required value={form.startDate} onChange={(event) => updateField("startDate", event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label>
                </div>
                <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#756e67] hover:bg-[#fbf6f1]">Cancel</button><button type="submit" className="rounded-lg bg-[#f26b3a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#df5c2d]">{habit ? "Save changes" : "Create habit"}</button></div>
            </form>
        </div>
    )
}
