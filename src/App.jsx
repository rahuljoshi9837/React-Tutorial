// ============================================================
// App.jsx — ROOT COMPONENT
// TOPICS COVERED:
//   - useState (tasks array + filter state)
//   - Lifting state up (all state lives here)
//   - Props (passing data + handlers down to children)
//   - Conditional rendering (filter logic)
//   - Lists + derived state
// ============================================================

import { useState } from 'react'
import TaskForm  from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList  from './components/TaskList'
import StatsBar  from './components/StatsBar'
import styles    from './App.module.css'

// Seed data so the app isn't empty on first load
const INITIAL_TASKS = [
  { id: 1, text: 'Set up Vite + React project', priority: 'high',   completed: true  },
  { id: 2, text: 'Build TaskForm component',     priority: 'high',   completed: false },
  { id: 3, text: 'Learn useState hook',          priority: 'medium', completed: true  },
  { id: 4, text: 'Style with CSS Modules',       priority: 'low',    completed: false },
  { id: 5, text: 'Push project to GitHub',       priority: 'medium', completed: false },
]

export default function App() {
  // ── STATE ──────────────────────────────────────────────────
  // All state lives here so child components can share it.
  // This is the "Lifting State Up" pattern.
  const [tasks,  setTasks]  = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')   // 'all' | 'active' | 'completed' | 'high'

  // ── HANDLERS ──────────────────────────────────────────────
  // addTask: called by TaskForm via props (data flows up)
  const addTask = (text, priority) => {
    const newTask = {
      id:        Date.now(),   // unique id — used as key in list
      text,
      priority,
      completed: false,
    }
    // Never mutate state directly — always create a new array
    setTasks(prev => [...prev, newTask])
  }

  // toggleTask: flip completed true ↔ false
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }  // spread to create new object
          : task
      )
    )
  }

  // deleteTask: remove task by id
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  // editTask: update text of existing task
  const editTask = (id, newText) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  // ── DERIVED STATE ─────────────────────────────────────────
  // filteredTasks is computed from state — not stored separately.
  // This avoids state duplication and keeps data in sync.
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active')    return !task.completed
    if (filter === 'completed') return  task.completed
    if (filter === 'high')      return  task.priority === 'high'
    return true  // 'all'
  })

  // ── RENDER ────────────────────────────────────────────────
  return (
    <div className={styles.layout}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Task manager</h1>
            <p className={styles.subtitle}>
              Manage your task
            </p>
          </div>
          {/* StatsBar receives tasks via props (read-only) */}
          <StatsBar tasks={tasks} />
        </header>

        {/* TaskForm: onAdd is a callback prop — child → parent data flow */}
        <TaskForm onAdd={addTask} />

        {/* FilterBar: active filter + onChange handler passed as props */}
        <FilterBar active={filter} onChange={setFilter} total={tasks.length} />

        {/* TaskList: receives filtered tasks + handlers as props */}
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

      </div>
    </div>
  )
}
