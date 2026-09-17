const HABIT_TIME_ZONE = "Asia/Karachi";

const getLocalISOString = (date = new Date()) => {
    const localDate = new Date(date);
    const offsetMinutes = -localDate.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");
    const offsetRemainder = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");

    return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}T${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")}.${String(localDate.getMilliseconds()).padStart(3, "0")}${sign}${offsetHours}:${offsetRemainder}`;
};

const getDateKey = (date) => {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: HABIT_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date(date));
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return `${values.year}-${values.month}-${values.day}`;
};

const isDateKey = (dateKey) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;

    const date = new Date(`${dateKey}T12:00:00.000Z`);
    return date.toISOString().startsWith(`${dateKey}T`);
};

// Keep date-only completions at a stable midday instant across timezone conversions.
const getDateForKey = (dateKey) => new Date(`${dateKey}T12:00:00.000Z`);

const getDateRangeForKey = (dateKey) => {
    const start = new Date(`${dateKey}T00:00:00+05:00`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    return { $gte: start, $lt: end };
};

export { getDateKey, getDateForKey, getDateRangeForKey, getLocalISOString, isDateKey };