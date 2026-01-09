import React, { useEffect, useRef, useState } from 'react'
import { Workout } from '../types'

function useAnimatedNumber(value: number, duration = 500) {
  const [display, setDisplay] = useState(value)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const startValRef = useRef(value)

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startValRef.current = display
    startRef.current = null
    function step(now: number) {
      if (!startRef.current) startRef.current = now
      const progress = Math.min((now - startRef.current) / duration, 1)
      const cur = Math.round(startValRef.current + (value - startValRef.current) * progress)
      setDisplay(cur)
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return display
}

export default function Stats({ workouts }: { workouts: Workout[] }) {
  const totalCal = workouts.reduce((s, w) => s + w.calories, 0)
  const totalMins = workouts.reduce((s, w) => s + w.duration, 0)
  const steps = Math.round(totalMins * 100)

  const cal = useAnimatedNumber(totalCal, 550)
  const mins = useAnimatedNumber(totalMins, 550)
  const st = useAnimatedNumber(steps, 700)

  return (
    <div>
      <div className="stats-grid">
        <div className="stat">
          <div className={`stat-value`}>{st.toLocaleString()}</div>
          <div className="stat-label">Steps Today</div>
        </div>
        <div className="stat">
          <div className={`stat-value`}>{cal}</div>
          <div className="stat-label">Calories</div>
        </div>
        <div className="stat">
          <div className={`stat-value`}>{mins}</div>
          <div className="stat-label">Active Minutes</div>
        </div>
      </div>
    </div>
  )
}
