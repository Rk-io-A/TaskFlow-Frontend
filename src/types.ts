export interface User { id: string; email: string; firstName: string; lastName: string; roles: string[] }
export interface AuthResponse { accessToken: string; refreshToken: string; user: User }
export interface Project { id: string; name: string; description?: string; color: string; memberCount: number; taskCount: number }
export interface Task { id: string; title: string; description?: string; status: string; priority: string; projectId: string }
