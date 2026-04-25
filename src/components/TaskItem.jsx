// ============================================================
// TaskItem.jsx — SINGLE TASK COMPONENT
// TOPICS COVERED:
//   - Props (task object + 3 handler functions)
//   - Events (onClick, onChange, onDoubleClick, onBlur, onKeyDown)
//   - Conditional rendering (strikethrough, edit mode, priority badge)
//   - useState (local edit mode + editText — stays here, not App)
//   - Controlled inputs (edit input value + onChange)
// ============================================================

import { useState } from 'react'
import styles from './TaskItem.module.css'

// Priority config — maps priority value to display label + CSS class
const PRIORITY = {
  high:   { label: 'High',   cls: styles.priHigh   },
  medium: { label: 'Med',    cls: styles.priMed    },
  low:    { label: 'Low',    cls: styles.priLow    },
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Local state — edit mode only affects this single TaskItem.
  // It would be wasteful to lift this up to App since no sibling needs it.
  const [isEditing, setIsEditing] = useState(false)
  const [editText,  setEditText]  = useState(task.text)

  const handleEditSave = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed)   // lift updated text up to App
    } else {
      setEditText(task.text)     // revert if empty or unchanged
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter')  handleEditSave()
    if (e.key === 'Escape') { setEditText(task.text); setIsEditing(false) }
  }

  const pri = PRIORITY[task.priority] || PRIORITY.medium

  return (
    <li className={`${styles.item} ${task.completed ? styles.done : ''}`}>

      {/* Checkbox — controlled by task.completed prop */}
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {/* Conditional rendering: show checkmark only when completed */}
        {task.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Conditional rendering: show input OR text based on edit mode */}
      {isEditing ? (
        <input
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}  // controlled input
          onBlur={handleEditSave}
          onKeyDown={handleEditKeyDown}
          autoFocus
          maxLength={120}
        />
      ) : (
        <span
          className={styles.text}
          onDoubleClick={() => !task.completed && setIsEditing(true)}
          title={task.completed ? '' : 'Double-click to edit'}
        >
          {task.text}
        </span>
      )}

      {/* Priority badge — conditional class based on priority value */}
      <span className={`${styles.priority} ${pri.cls}`}>
        {pri.label}
      </span>

      {/* Delete button — passes task.id up via onDelete prop */}
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" />
        </svg>
      </button>

    </li>
  )
}
