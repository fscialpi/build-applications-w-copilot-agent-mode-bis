import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigationItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-brand">
          <img
            src="/docs/octofitapp-small.png"
            className="app-logo"
            alt="OctoFit Tracker logo"
          />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Modern multi-tier fitness dashboard</h1>
            <p className="hero-copy">
              Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to
              route requests to your Codespaces backend. If it is missing, the
              app falls back to <code>localhost:8000</code>.
            </p>
          </div>
        </div>

        <nav className="nav-pills flex-wrap gap-2" aria-label="Primary">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-panel">
        <Routes>
          <Route index element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
