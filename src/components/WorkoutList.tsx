import React from 'react'
import { Workout } from '../types'

export default function WorkoutList({ workouts, onDelete }: { workouts: Workout[], onDelete: (id: number) => void }) {
  return (
    <div className="workouts" aria-live="polite">
      {workouts.slice().reverse().map(w => (
        <div className="workout-card" key={w.id} data-id={w.id}>
          <div>
            <strong>{w.type}</strong>
            <div className="workout-meta">{w.duration} min • {w.calories} cal • {w.date}</div>
          </div>
          <div className="card-actions">
            <div>{w.duration}m</div>
            <button className="del" onClick={() => onDelete(w.id)} title="Delete">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}
