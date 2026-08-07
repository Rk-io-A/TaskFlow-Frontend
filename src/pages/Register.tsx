import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../store'
import type { AuthResponse } from '../types'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' })
  const [err, setErr] = useState('')
  const setAuth = useAuth(s => s.setAuth)
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr('')
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', form)
      setAuth(data.user, data.accessToken)
      nav('/')
    } catch (ex: any) {
      setErr(ex.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <div className="grid grid-cols-2 gap-2">
          <input required placeholder="First" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="border rounded-lg px-3 py-2" />
          <input required placeholder="Last" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="border rounded-lg px-3 py-2" />
        </div>
        <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
        <input type="password" required minLength={6} placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Register</button>
        <p className="text-center text-sm"><Link to="/login" className="text-blue-600">Sign in</Link></p>
      </form>
    </div>
  )
}
