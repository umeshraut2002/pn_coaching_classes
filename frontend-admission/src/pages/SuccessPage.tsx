import { Link, useParams } from 'react-router-dom'

export function SuccessPage() {
  const { id } = useParams()

  return (
    <div className="min-h-full bg-slate-50">
      <div className="container-pn py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            Submitted successfully
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Application Received</h1>
          <p className="mt-2 text-slate-600">
            Thank you! We received your admission application. We will contact you soon.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
            <div className="font-semibold text-slate-900">Your Application ID</div>
            <div className="mt-1 font-mono text-slate-700">{id}</div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Back to Website
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Submit Another Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

