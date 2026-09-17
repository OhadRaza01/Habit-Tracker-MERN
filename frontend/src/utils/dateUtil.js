const HABIT_TIME_ZONE = "Asia/Karachi"

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: HABIT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

export const getDateKey = (date) => {
    const parts = dateFormatter.formatToParts(new Date(date))
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
    return `${values.year}-${values.month}-${values.day}`
}

export const getLocalISOString = (date = new Date()) => {
    const localDate = new Date(date)
    const year = localDate.getFullYear()
    const month = String(localDate.getMonth() + 1).padStart(2, "0")
    const day = String(localDate.getDate()).padStart(2, "0")
    const hours = String(localDate.getHours()).padStart(2, "0")
    const minutes = String(localDate.getMinutes()).padStart(2, "0")
    const seconds = String(localDate.getSeconds()).padStart(2, "0")
    const milliseconds = String(localDate.getMilliseconds()).padStart(3, "0")
    const offsetMinutes = -localDate.getTimezoneOffset()
    const sign = offsetMinutes >= 0 ? "+" : "-"
    const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0")
    const offsetRemainder = String(Math.abs(offsetMinutes) % 60).padStart(2, "0")

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetRemainder}`
}

export const getWeekDateKeys = () => {
    const todayKey = getDateKey(new Date())
    const [year, month, day] = todayKey.split("-").map(Number)
    const today = new Date(Date.UTC(year, month - 1, day, 12))
    const daysSinceMonday = (today.getUTCDay() + 6) % 7

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(Date.UTC(year, month - 1, day - daysSinceMonday + index, 12))
        return getDateKey(date)
    })
}
