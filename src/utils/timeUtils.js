export const PERIODS = {
    AM: 'AM',
    PM: 'PM'
};

export const to24Hour = (hour, minute, period) => {
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (period === PERIODS.PM && h !== 12) h += 12;
    if (period === PERIODS.AM && h === 12) h = 0;
    return h * 60 + m;
};

export const calculateDurationInMinutes = (start, end) => {
    const startMins = to24Hour(start.hour, start.minute, start.period);
    const endMins = to24Hour(end.hour, end.minute, end.period);

    let diff = endMins - startMins;
    if (diff < 0) {
        diff += 24 * 60; // Handle overnight/next day
    }
    return diff;
};

export const formatMinutesToHrsMins = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
};

export const createTime = (hour = '09', minute = '00', period = 'AM') => ({
    hour,
    minute,
    period
});
