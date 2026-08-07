import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../api'
import type { Task } from '../types'

const cols = ['Todo', 'InProgress', 'InReview', 'Done'] as const

export default function ProjectBoard() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const qc = useQueryClient()
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => (await api.get<Task[]>(`/projects/${id}/tasks`)).data,
    enabled: !!id
  })
  const create = useMutation({
    mutationFn: () => api.post(`/projects/${id}/tasks`, { title }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tasks', id] }); setOpen(false); setTitle('') }
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Board</h1>
        <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Task</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cols.map(col => (
          <div key={col} className="bg-slate-100 rounded-xl p-3 min-h-[300px]">
            <h3 className="font-semibold text-sm mb-3">{col}</h3>
            <div className="space-y-2">
              {tasks.filter(t => t.status === col || (col === 'Todo' && !cols.includes(t.status as any))).map(t => (
                <div key={t.id} className="bg-white rounded-lg p-3 shadow-sm text-sm">
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{t.priority}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={e => { e.preventDefault(); create.mutate() }} className="bg-white rounded-xl p-6 w-full max-w-sm space-y-3">
            <h2 className="font-bold">New Task</h2>
            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" autoFocus />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setOpen(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
