export function AboutPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-pn py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">About</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Pranita Nasare Coaching Classes focuses on strong fundamentals, daily practice, and exam-ready preparation.
            The teaching approach emphasizes concept clarity, consistency, and confidence through testing and feedback.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Concept Clarity", desc: "Clear explanation with practical examples and step-by-step methods." },
              { title: "Regular Testing", desc: "Weekly tests with performance tracking and actionable improvement tips." },
              { title: "Personal Guidance", desc: "Attention to each student with doubt solving and learning support." },
            ].map((x) => (
              <div key={x.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-lg font-bold text-slate-900">{x.title}</div>
                <div className="mt-2 text-sm text-slate-600">{x.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-50 to-white p-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="text-sm font-semibold text-brand-700">Teaching philosophy</div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Simple, structured, and result-focused</h2>
                <p className="mt-3 text-slate-700">
                  We follow a clear process: teach concepts, practice daily, test regularly, and review mistakes—so students improve steadily.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Daily practice", "Doubt solving", "Revision plan", "Exam strategy"].map((t) => (
                    <span key={t} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="text-sm font-semibold text-slate-900">What parents appreciate</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-500" />
                    Consistent follow-up and discipline
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-500" />
                    Transparent communication and updates
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-500" />
                    Improvement-focused guidance
                  </li>
                </ul>
                <a
                  href="/admission/"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Apply for admission
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

