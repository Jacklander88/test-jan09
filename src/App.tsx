import React, { useEffect, useState } from 'react'
import { Workout } from './types'
import Stats from './components/Stats'
import WorkoutList from './components/WorkoutList'
import LogForm from './components/LogForm'

const SAMPLE: Workout[] = [
  { id: 1, type: 'Run', duration: 30, calories: 320, date: 'Today' },
  { id: 2, type: 'Yoga', duration: 40, calories: 180, date: 'Today' },
  { id: 3, type: 'Bike', duration: 22, calories: 150, date: 'Yesterday' }
]

export default function App() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const raw = localStorage.getItem('ft.workouts')
      return raw ? JSON.parse(raw) as Workout[] : SAMPLE
    } catch {
      return SAMPLE
    }
  })

  useEffect(() => {
    localStorage.setItem('ft.workouts', JSON.stringify(workouts))
  }, [workouts])

  function addWorkout(w: Omit<Workout, 'id' | 'date'>) {
    const item: Workout = { ...w, id: Date.now(), date: 'Today' }
    setWorkouts(prev => [...prev, item])
  }

  function removeWorkout(id: number) {
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  function resetWorkouts() {
    localStorage.removeItem('ft.workouts')
    setWorkouts(SAMPLE.slice())
  }

  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#9ccf6a"/><stop offset="1" stopColor="#5b8a3e"/></linearGradient></defs><circle cx="24" cy="24" r="22" fill="url(#g)"/><path d="M14 30c4-8 8-12 16-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none"/></svg>
            <span className="logo-text">FitTrack</span>
          </div>
          <nav className="nav">
            <a href="#dashboard">Dashboard</a>
            <a href="#log">Log Workout</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>Track your progress. Stay motivated.</h1>
              <p>Beautiful, focused metrics and a simple logging flow to help you build healthy habits every day.</p>
              <div className="hero-cta">
                <a className="btn" href="#log">Add workout</a>
                <a className="btn ghost" href="#dashboard">View dashboard</a>
              </div>
            </div>
            <div className="hero-card">
              <Stats workouts={workouts} />
              <div className="mini-graph" aria-hidden="true">
                <svg viewBox="0 0 200 50" preserveAspectRatio="none"><polyline points="0,40 30,32 60,18 90,22 120,12 150,6 180,10 200,8" stroke="#5b8a3e" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard" className="container dashboard">
          <h2>Recent workouts</h2>
          <WorkoutList workouts={workouts} onDelete={removeWorkout} />
        </section>

        <section id="log" className="container log">
          <h2>Log a workout</h2>
          <LogForm onAdd={addWorkout} onReset={resetWorkouts} />
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">Made with ❤️ · FitTrack · Simple demo</div>
      </footer>
    </div>
  )
}
