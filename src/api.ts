import axios from 'axios'
import { useAuth } from './store'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })
api.interceptors.request.use((c) => {
  const t = useAuth.getState().accessToken
  if (t) c.headers.Authorization = `Bearer ${t}`
  return c
})
export default api
