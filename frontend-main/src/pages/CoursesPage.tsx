export function CoursesPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-pn py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Courses & Programs</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Admissions for 7th to 10th standard with personal attention, consistent practice, and exam-ready preparation.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "7th Standard",
                desc: "Build fundamentals with daily practice and guided homework.",
                points: ["Foundation concepts", "Homework guidance", "Weekly tests"],
                accent: "from-blue-500 to-cyan-500",
              },
              {
                title: "8th–9th Standard",
                desc: "Concept clarity + steady progress with regular revision.",
                points: ["Concept clarity", "Problem practice", "Regular revision"],
                accent: "from-purple-500 to-pink-500",
              },
              {
                title: "10th Standard",
                desc: "Board-focused strategy, test series, and time management.",
                points: ["Board exam strategy", "Test series", "Time management"],
                accent: "from-orange-500 to-red-500",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${c.accent}`} />
                <div className="mt-2 text-lg font-bold text-slate-900">{c.title}</div>
                <div className="mt-2 text-sm text-slate-600">{c.desc}</div>

                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/admission/"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Apply for Admission
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-sm text-slate-700">
            Need help choosing a batch? Visit the{" "}
            <a className="font-semibold text-brand-700 hover:underline" href="/contact">
              contact page
            </a>{" "}
            for timings and guidance.
          </div>
        </div>
      </div>
    </div>
  )
}

