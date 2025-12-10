import { useState, useMemo } from 'react'
import TimePicker from './components/TimePicker'
import BreakItem from './components/BreakItem'
import { createTime, calculateDurationInMinutes, formatMinutesToHrsMins } from './utils/timeUtils'
import './App.css'

function App() {
  const [startTime, setStartTime] = useState(createTime('09', '00', 'AM'))
  const [endTime, setEndTime] = useState(createTime('05', '00', 'PM'))

  const [breaks, setBreaks] = useState([
    {
      id: Date.now(),
      type: 'range', // 'range' | 'duration'
      start: createTime('01', '00', 'PM'),
      end: createTime('01', '30', 'PM'),
      minutes: 30
    }
  ])

  const addBreak = () => {
    setBreaks([...breaks, {
      id: Date.now(),
      type: 'range',
      start: createTime('01', '00', 'PM'),
      end: createTime('01', '30', 'PM'),
      minutes: 30
    }])
  }

  const updateBreak = (id, updatedBreak) => {
    setBreaks(breaks.map(b => b.id === id ? updatedBreak : b))
  }

  const removeBreak = (id) => {
    setBreaks(breaks.filter(b => b.id !== id))
  }

  // Calculations
  const results = useMemo(() => {
    // 1. Total Shift Duration
    const totalShiftMins = calculateDurationInMinutes(startTime, endTime)

    // 2. Total Break Duration
    let totalBreakMins = 0
    breaks.forEach(b => {
      if (b.type === 'duration') {
        totalBreakMins += b.minutes
      } else {
        totalBreakMins += calculateDurationInMinutes(b.start, b.end)
      }
    })

    // 3. Total Working Hours
    // If breaks exceed shift, we clamp to 0 or allow negative? Standard is clamp to 0 roughly to avoid UI weirdness, or just show math.
    const workingMins = Math.max(0, totalShiftMins - totalBreakMins)

    return {
      workingHours: formatMinutesToHrsMins(workingMins),
      totalHours: formatMinutesToHrsMins(totalShiftMins),
      breakMinutes: totalBreakMins
    }
  }, [startTime, endTime, breaks])

  return (
    <div className="app-container">
      <div className="background-glow"></div>

      <main className="calculator-layout">
        <header className="app-header">
          <h1 className="gradient-text">Time Calculator</h1>
          <p className="subtitle">Optimize your schedule efficiently.</p>
        </header>

        <div className="grid-container">
          {/* Input Section */}
          <div className="input-section">

            {/* Main Work Hours */}
            <div className="card glass-panel section-card">
              <h2 className="section-title">
                <span className="icon">⏰</span> Work Hours
              </h2>
              <div className="time-row">
                <TimePicker
                  label="Start Time"
                  time={startTime}
                  onChange={setStartTime}
                />
                <div className="arrow-divider">→</div>
                <TimePicker
                  label="End Time"
                  time={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>

            {/* Breaks Section */}
            <div className="card glass-panel section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="icon">☕</span> Breaks
                </h2>
                <button className="add-btn" onClick={addBreak}>
                  + Add Break
                </button>
              </div>

              <div className="breaks-list">
                {breaks.length === 0 && (
                  <div className="empty-state">No breaks added.</div>
                )}
                {breaks.map((b, index) => (
                  <BreakItem
                    key={b.id}
                    index={index}
                    breakData={b}
                    onChange={updateBreak}
                    onRemove={removeBreak}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="results-section">
            <div className="results-card glass-panel sticky-card">
              <h2 className="section-title">Summary</h2>

              <div className="result-item primary">
                <span className="label">Total Working Hours</span>
                <span className="value animate-pop">{results.workingHours} <span className="unit">hrs</span></span>
              </div>

              <div className="divider"></div>

              <div className="result-row">
                <div className="result-item">
                  <span className="label">Total Duration</span>
                  <span className="value">{results.totalHours} <span className="unit">hrs</span></span>
                </div>
                <div className="result-item">
                  <span className="label">Total Break</span>
                  <span className="value">{results.breakMinutes} <span className="unit">mins</span></span>
                </div>
              </div>

              {/* Visual Indicator/Progress Bar */}
              <div className="visual-bar-container">
                <div className="visual-bar-track">
                  <div
                    className="visual-bar-fill"
                    style={{
                      width: `${Math.min(100, (calculateDurationInMinutes(startTime, endTime) > 0 ? (1 - results.breakMinutes / calculateDurationInMinutes(startTime, endTime)) * 100 : 0))}%`
                    }}
                  ></div>
                </div>
                <span className="visual-caption">Productivity Ratio</span>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
