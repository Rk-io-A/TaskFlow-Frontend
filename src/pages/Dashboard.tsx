import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../api'
import type { Project } from '../types'

export default function Dashboard() {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const qc = useQueryClient()
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => (await api.get<Project[]>('/projects')).data
  })
  const create = useMutation({
    mutationFn: () => api.post('/projects', { name }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); setOpen(false); setName('') }
  })

  if (isLoading) return <div className="text-center py-20">Loading...</div>

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ New</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map(p => (
          <Link key={p.id} to={`/projects/${p.id}`} className="bg-white border rounded-xl p-5 hover:shadow-md">
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 rounded-full" style={{ background: p.color }} />
              <h3 className="font-semibold">{p.name}</h3>
            </div>
            <p className="text-sm text-slate-500 mt-2">{p.description || 'No description'}</p>
          </Link>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={e => { e.preventDefault(); create.mutate() }} className="bg-white rounded-xl p-6 w-full max-w-md space-y-3">
            <h2 className="font-bold text-lg">New Project</h2>
            <input required value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Name" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setOpen(false)} className="px-3 py-2">Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
