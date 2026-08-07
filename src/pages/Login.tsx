import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../store'
import type { AuthResponse } from '../types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuth(s => s.setAuth)
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
      setAuth(data.user, data.accessToken)
      nav('/')
    } catch (ex: any) {
      setErr(ex.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">TaskFlow</h1>
        {err && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{err}</p>}
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg px-3 py-2" />
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-3 py-2" />
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50">{loading ? '...' : 'Sign In'}</button>
        <p className="text-center text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  )
}
