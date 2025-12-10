import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app-container">
      <div className="background-glow"></div>

      <main>
        <header className="hero-section">
          <h1 className="gradient-text animate-float">Master Your Time</h1>
          <p className="subtitle">
            Experience the future of temporal management.
            Precision, elegance, and performance in one place.
          </p>

          <div className="clock-display glass-panel">
            <span className="time-text">
              {time.toLocaleTimeString([], { hour12: false })}
            </span>
            <span className="date-text">
              {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div className="actions">
            <button className="btn-primary" onClick={() => setCount(c => c + 1)}>
              Interactions: {count}
            </button>
          </div>
        </header>

        <section className="features-grid">
          <div className="feature-card glass-panel">
            <h3>Precision</h3>
            <p>Atomic accuracy for your daily schedule.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3>Analytics</h3>
            <p>Visualize your time usage with beautiful charts.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3>Focus</h3>
            <p>Distraction-free environment for deep work.</p>
          </div>
        </section>
      </main>

    </div>
  )
}

export default App
