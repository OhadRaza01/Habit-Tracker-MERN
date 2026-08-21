const getDateKey = (date) => {
    return new Date(date).toLocaleDateString("en-CA", {
        timeZone: "Asia/Karachi",
    });
};

export {getDateKey}