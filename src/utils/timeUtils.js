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

export const addMinutesToTime = (start, minutesToAdd) => {
    const startMins = to24Hour(start.hour, start.minute, start.period);
    let totalMins = startMins + minutesToAdd;

    // Normalize to 24h (0-1439)
    totalMins = totalMins % (24 * 60);
    if (totalMins < 0) totalMins += 24 * 60; // handle negatives if any

    let h = Math.floor(totalMins / 60);
    const m = totalMins % 60;

    // Convert back to 12h format
    let period = 'AM';
    if (h >= 12) {
        period = 'PM';
        if (h > 12) h -= 12;
    }
    if (h === 0) {
        h = 12;
    }

    return {
        hour: h.toString().padStart(2, '0'),
        minute: m.toString().padStart(2, '0'),
        period
    };
};

export const createTime = (hour = '09', minute = '00', period = 'AM') => ({
    hour,
    minute,
    period
});
