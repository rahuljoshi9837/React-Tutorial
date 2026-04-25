// ============================================================
// TaskList.jsx — LIST RENDERING COMPONENT
// TOPICS COVERED:
//   - Lists + keys (.map() with task.id as key)
//   - Props (tasks array + handlers passed through from App)
//   - Conditional rendering (empty state message)
//   - Component composition (renders TaskItem for each task)
// ============================================================

import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {

  // Conditional rendering: show friendly empty state message
  if (tasks.length === 0) {
    const messages = {
      all:       'No tasks yet. Add your first task above.',
      active:    'No active tasks. Everything is done!',
      completed: 'No completed tasks yet. Keep going!',
      high:      'No high priority tasks.',
    }
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>—</span>
        <p className={styles.emptyText}>{messages[filter] || 'No tasks.'}</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {/* Lists + keys: .map() over tasks array, unique key per item */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}          // unique key — uses task.id, NOT index
          task={task}            // pass entire task object as prop
          onToggle={onToggle}    // pass handler down
          onDelete={onDelete}    // pass handler down
          onEdit={onEdit}        // pass handler down
        />
      ))}
    </ul>
  )
}
