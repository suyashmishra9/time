import React from 'react';
import TimePicker from './TimePicker';
import './BreakItem.css';

const BreakItem = ({ index, breakData, onChange, onRemove }) => {
    const handleTypeChange = (newType) => {
        onChange(breakData.id, { ...breakData, type: newType });
    };

    const handleTimeChange = (field, newTime) => {
        onChange(breakData.id, { ...breakData, [field]: newTime });
    };

    const handleMinutesChange = (e) => {
        const val = parseInt(e.target.value, 10) || 0;
        onChange(breakData.id, { ...breakData, minutes: val });
    };

    return (
        <div className={`break-item glass-panel slide-in`}>
            <div className="break-header">
                <span className="break-title">Break {index + 1}</span>
                <button className="remove-btn" onClick={() => onRemove(breakData.id)} aria-label="Remove break">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="break-type-toggle">
                <button
                    className={breakData.type === 'range' ? 'active' : ''}
                    onClick={() => handleTypeChange('range')}
                >
                    Time Range
                </button>
                <button
                    className={breakData.type === 'duration' ? 'active' : ''}
                    onClick={() => handleTypeChange('duration')}
                >
                    Duration (mins)
                </button>
            </div>

            <div className="break-content">
                {breakData.type === 'range' ? (
                    <div className="range-inputs">
                        <TimePicker
                            time={breakData.start}
                            onChange={(t) => handleTimeChange('start', t)}
                            compact
                            label="Start"
                        />
                        <div className="arrow">→</div>
                        <TimePicker
                            time={breakData.end}
                            onChange={(t) => handleTimeChange('end', t)}
                            compact
                            label="End"
                        />
                    </div>
                ) : (
                    <div className="duration-input-wrapper">
                        <label>Minutes</label>
                        <input
                            type="number"
                            min="0"
                            value={breakData.minutes}
                            onChange={handleMinutesChange}
                            className="duration-input glass-inner"
                            placeholder="e.g. 30"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BreakItem;
