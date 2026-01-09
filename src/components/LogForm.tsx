import React, { useState } from 'react'
import { Workout } from '../types'

export default function LogForm({ onAdd, onReset }: { onAdd: (w: Omit<Workout,'id'|'date'>) => void, onReset: () => void }) {
  const [type, setType] = useState('Run')
  const [duration, setDuration] = useState(30)
  const [calories, setCalories] = useState(250)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onAdd({ type, duration, calories })
    setType('Run'); setDuration(30); setCalories(250)
  }

  return (
    <form className="form" onSubmit={submit} id="workout-form">
      <div className="form-row">
        <label htmlFor="type">Type</label>
        <select id="type" value={type} onChange={e => setType(e.target.value)} required>
          <option>Run</option>
          <option>Walk</option>
          <option>Bike</option>
          <option>Strength</option>
          <option>Yoga</option>
        </select>
      </div>
      <div className="form-row two">
        <div>
          <label htmlFor="duration">Duration (min)</label>
          <input id="duration" type="number" min={1} value={duration} onChange={e => setDuration(Number(e.target.value))} required />
        </div>
        <div>
          <label htmlFor="calories">Calories</label>
          <input id="calories" type="number" min={0} value={calories} onChange={e => setCalories(Number(e.target.value))} required />
        </div>
      </div>
      <div className="form-row">
        <button className="btn" type="submit">Add workout</button>
        <button className="btn ghost" type="button" onClick={onReset}>Reset</button>
      </div>
    </form>
  )
}
