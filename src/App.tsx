import { Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './store'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProjectBoard from './pages/ProjectBoard'

function Shell() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b h-14 flex items-center justify-between px-6">
        <Link to="/" className="font-bold text-blue-600 text-lg">TaskFlow</Link>
        <div className="flex gap-4 items-center text-sm">
          <span>{user?.firstName}</span>
          <button onClick={() => { logout(); nav('/login') }} className="text-slate-500 hover:text-red-600">Logout</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6"><Outlet /></main>
    </div>
  )
}

function Private({ children }: { children: React.ReactNode }) {
  return useAuth(s => s.isAuthenticated) ? <>{children}</> : <Navigate to="/login" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Private><Shell /></Private>}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:id" element={<ProjectBoard />} />
      </Route>
    </Routes>
  )
}
