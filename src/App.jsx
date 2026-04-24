import { useState } from 'react'
import './App.css'

function App() {
  // 1. State for Conditional Rendering example
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. Data for Lists and Keys example
  const techStack = [
    { id: 101, name: "React", type: "Library" },
    { id: 102, name: "Vite", type: "Build Tool" },
    { id: 103, name: "JavaScript", type: "Language" },
  ];

  return (
    <div className="container">
      {/* JSX vs HTML: Notice 'className' instead of 'class' */}
      <header className="header">
        <h1>My React Learning Journey</h1>
      </header>

      {/* Conditional Rendering using Ternary Operator */}
      <section>
        {isLoggedIn ? (
          <p>Welcome back, Developer! ✅</p>
        ) : (
          <p>Please log in to see your progress. 🔒</p>
        )}
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </section>

      <hr />

      {/* Rendering Lists and Keys */}
      <section>
        <h3>Tech Stack (List Example):</h3>
        <ul>
          {techStack.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.type}
            </li>
          ))}
        </ul>
      </section>

      {/* JSX Self-closing tag example */}
      <br />
      <footer style={{ marginTop: '20px', fontStyle: 'italic' }}>
        Built with JSX & Vite
      </footer>
    </div>
  )
}

export default App