import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { setAuth } from '../lib/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@pncoaching.local')
  const [password, setPassword] = useState('Admin@12345')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.post('/api/auth/login', { email, password })
      const token = res.data?.token as string | undefined
      const admin = res.data?.admin as { email?: string; role?: string } | undefined
      if (!token) throw new Error('Invalid login response')
      setAuth({ token, email: admin?.email, role: admin?.role })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full grid place-items-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-600 text-white grid place-items-center font-bold">
            PN
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">Admin Login</div>
            <div className="text-sm text-slate-600">Pranita Nasare Coaching Classes</div>
          </div>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Email</div>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="block">
            <div className="text-sm font-semibold text-slate-900">Password</div>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          <button
            disabled={loading}
            className="mt-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            type="submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600 flex items-center justify-between">
          <a className="hover:text-slate-900" href="/">
            Back to Website
          </a>
          <span className="text-xs">JWT-based authentication</span>
        </div>
      </div>
    </div>
  )
}

