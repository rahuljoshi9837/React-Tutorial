// ============================================================
// TaskForm.jsx — CONTROLLED INPUT COMPONENT
// TOPICS COVERED:
//   - useState (text + priority — local form state)
//   - Controlled inputs (value + onChange on input + select)
//   - Events (onSubmit, onChange, onKeyDown)
//   - Props (onAdd callback received from App)
//   - Lifting state up (calls onAdd to send data to parent)
//   - Conditional rendering (disabled button when input empty)
// ============================================================

import { useState } from 'react'
import styles from './TaskForm.module.css'

export default function TaskForm({ onAdd }) {
  // Local state — only TaskForm needs this, so it lives here
  const [text,     setText]     = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()             // prevent page reload
    if (!text.trim()) return       // guard: reject empty input

    onAdd(text.trim(), priority)   // lift data up to App.jsx
    setText('')                    // reset input after adding
    // priority keeps its value — UX choice, user likely adds
    // multiple tasks at the same priority level
  }

  const isDisabled = text.trim().length === 0

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {/* Controlled text input — value always matches state */}
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        maxLength={120}
        autoFocus
      />

      {/* Controlled select — value always matches state */}
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Conditional: button disabled when input is empty */}
      <button
        className={styles.button}
        type="submit"
        disabled={isDisabled}
      >
        Add task
      </button>

    </form>
  )
}
