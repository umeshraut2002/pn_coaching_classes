import { Navigate } from 'react-router-dom'
import { getAuth } from '../lib/auth'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = getAuth()
  if (!auth?.token) return <Navigate to="/login" replace />
  return <>{children}</>
}

