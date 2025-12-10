import React from 'react';
import './TimePicker.css';

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const TimePicker = ({ time, onChange, label, compact = false }) => {
    const handleChange = (field, value) => {
        onChange({ ...time, [field]: value });
    };

    return (
        <div className={`time-picker ${compact ? 'compact' : ''}`}>
            {label && <label className="time-label">{label}</label>}
            <div className="time-inputs glass-inner">
                <select
                    value={time.hour}
                    onChange={(e) => handleChange('hour', e.target.value)}
                    className="time-select"
                >
                    {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <span className="separator">:</span>
                <select
                    value={time.minute}
                    onChange={(e) => handleChange('minute', e.target.value)}
                    className="time-select"
                >
                    {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <div className="period-toggle">
                    <button
                        className={`period-btn ${time.period === 'AM' ? 'active' : ''}`}
                        onClick={() => handleChange('period', 'AM')}
                    >
                        AM
                    </button>
                    <button
                        className={`period-btn ${time.period === 'PM' ? 'active' : ''}`}
                        onClick={() => handleChange('period', 'PM')}
                    >
                        PM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimePicker;
