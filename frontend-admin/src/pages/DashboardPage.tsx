import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { api } from '../lib/api'
import { clearAuth, getAuth } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type Student = {
  _id: string
  fullName: string
  classLevel: '7th' | '8th' | '9th' | '10th'
  schoolName: string
  parentName: string
  phoneNumber: string
  email: string
  address: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

type Analytics = {
  byStatus: Record<string, number>
  byClassLevel: Record<string, number>
}

export function DashboardPage() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [items, setItems] = useState<Student[]>([])
  const [total, setTotal] = useState(0)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<string>('')
  const [classLevel, setClassLevel] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  const fetchList = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/api/students/students', {
        params: {
          q: q || undefined,
          status: status || undefined,
          classLevel: classLevel || undefined,
          limit: 100,
        },
      })
      setItems(res.data?.items || [])
      setTotal(res.data?.total || 0)
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/api/students/students/analytics/summary')
      setAnalytics(res.data)
    } catch {
      // Non-blocking
    }
  }

  useEffect(() => {
    void fetchList()
    void fetchAnalytics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLogout = () => {
    clearAuth()
    navigate('/login')
  }

  const updateStatus = async (id: string, next: 'approved' | 'rejected') => {
    setError(null)
    try {
      await api.patch(`/api/students/students/${id}/status`, { status: next })
      await fetchList()
      await fetchAnalytics()
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || 'Failed to update status')
    }
  }

  const chartData = useMemo(() => {
    const labels = ['7th', '8th', '9th', '10th']
    const data = labels.map((l) => analytics?.byClassLevel?.[l] || 0)
    return {
      labels,
      datasets: [
        {
          label: 'Applications by Class',
          data,
          backgroundColor: 'rgba(94, 51, 255, 0.7)',
        },
      ],
    }
  }, [analytics])

  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-pn py-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-slate-900">Admin Dashboard</div>
            <div className="text-sm text-slate-600">
              Logged in as {auth?.email || 'admin'} ({auth?.role || 'admin'})
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Website
            </a>
            <button
              onClick={onLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-pn py-8">
        {error ? (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-slate-900">Applications</div>
                <div className="text-sm text-slate-600">Total: {total}</div>
              </div>
              <button
                onClick={() => void fetchList()}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <input
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                placeholder="Search name / phone / email"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <select
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              >
                <option value="">All classes</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>

            <div className="mt-3">
              <button
                onClick={() => void fetchList()}
                className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Search
              </button>
            </div>

            <div className="mt-6 overflow-auto rounded-2xl border border-slate-200">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Class</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {items.map((s) => (
                    <tr key={s._id} className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{s.fullName}</div>
                        <div className="text-xs text-slate-600">{new Date(s.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3">{s.classLevel}</td>
                      <td className="px-4 py-3">
                        <div>{s.phoneNumber}</div>
                        <div className="text-xs text-slate-600">{s.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                            s.status === 'approved'
                              ? 'bg-green-50 text-green-700'
                              : s.status === 'rejected'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-amber-50 text-amber-700',
                          ].join(' ')}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => void updateStatus(s._id, 'approved')}
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                            disabled={s.status === 'approved'}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => void updateStatus(s._id, 'rejected')}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                            disabled={s.status === 'rejected'}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-slate-600" colSpan={5}>
                        No applications found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-lg font-bold text-slate-900">Analytics</div>
            <div className="mt-2 text-sm text-slate-600">Applications by class level</div>
            <div className="mt-5">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>

            <div className="mt-6 grid gap-3">
              {(['pending', 'approved', 'rejected'] as const).map((st) => (
                <div key={st} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-600">{st}</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">
                    {analytics?.byStatus?.[st] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

