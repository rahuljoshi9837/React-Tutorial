// ============================================================
// FilterBar.jsx — FILTER BUTTONS COMPONENT
// TOPICS COVERED:
//   - Props (active filter + onChange + total received from App)
//   - Events (onClick on each button)
//   - Conditional rendering (active button gets different style)
//   - Lists + keys (.map() over filter config array)
// ============================================================

import styles from './FilterBar.module.css'

const FILTERS = [
  { value: 'all',       label: 'All'           },
  { value: 'active',    label: 'Active'        },
  { value: 'completed', label: 'Completed'     },
  { value: 'high',      label: 'High priority' },
]

export default function FilterBar({ active, onChange, total }) {
  return (
    <div className={styles.bar}>
      <div className={styles.buttons}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`${styles.btn} ${active === f.value ? styles.active : ''}`}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {total > 0 && (
        <span className={styles.count}>
          {total} task{total !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
