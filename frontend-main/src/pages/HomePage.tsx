export function HomePage() {
  const features = [
    { title: "Personal Attention", desc: "Small batches with dedicated doubt-solving." },
    { title: "Weekly Tests", desc: "Consistent evaluation and progress tracking." },
    { title: "Structured Notes", desc: "Exam-focused, easy-to-revise material." },
    { title: "Parent Updates", desc: "Regular communication and transparency." },
  ]

  const classes = [
    { 
      title: "7th Standard", 
      desc: "Strong fundamentals + daily practice.",
      color: "from-blue-500 to-cyan-500",
      subjects: ["Mathematics", "Science", "English"]
    },
    { 
      title: "8th–9th Standard", 
      desc: "Concept building + exam preparation.",
      color: "from-purple-500 to-pink-500",
      subjects: ["Mathematics", "Science", "Social Studies"]
    },
    { 
      title: "10th Standard", 
      desc: "Board-focused strategy + test series.",
      color: "from-orange-500 to-red-500",
      subjects: ["All Subjects", "Board Prep", "Mock Tests"]
    },
  ]

  const stats = [
    { label: "Students Enrolled", value: "500+" },
    { label: "Years of Excellence", value: "12+" },
    { label: "Success Rate", value: "95%" },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -top-10 right-[-120px] h-[360px] w-[360px] rounded-full bg-brand-200 blur-3xl opacity-25" />
        <div className="absolute -bottom-24 left-[-120px] h-[360px] w-[360px] rounded-full bg-brand-300 blur-3xl opacity-20" />

        <div className="container-pn relative py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-xs font-semibold text-brand-700 shadow-sm">
                Admissions open for 7th–10th • Limited seats
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Pranita Nasare <span className="text-brand-700">Coaching Classes</span>
              </h1>

              <p className="mt-4 max-w-xl text-lg text-slate-700">
                Strong fundamentals, consistent practice, and personal attention—designed to build confidence and deliver results.
              </p>

              <div className="mt-7 grid max-w-xl grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center shadow-sm">
                    <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/admission/"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
                >
                  Apply for admission
                </a>
                <a
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-white"
                >
                  View courses
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Weekly tests
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Doubt solving
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Parent updates
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-500 to-brand-800 blur-2xl opacity-20" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <img
                  src={new URL("../assets/hero-illustration.svg", import.meta.url).toString()}
                  alt="Coaching class illustration"
                  className="w-full"
                  loading="lazy"
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {features.map((f) => (
                    <div key={f.title} className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">{f.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES SECTION */}
      <section className="container-pn py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900">
            Classes Offered
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Choose the right batch tailored to your academic level. Each class is designed with curriculum experts.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {classes.map((c, index) => (
            <div
              key={c.title}
              className="group relative rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
            >
              {/* Gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${c.color} rounded-t-3xl`} />
              
              {/* Content */}
              <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {index === 0 ? "📘" : index === 1 ? "📗" : "📕"}
              </div>
              
              <div className="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-600 group-hover:to-brand-800 group-hover:bg-clip-text transition-all">
                {c.title}
              </div>

              <div className="mt-3 text-slate-600 leading-relaxed">
                {c.desc}
              </div>

              {/* Subjects */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-700 mb-2">Subjects:</div>
                <div className="flex flex-wrap gap-2">
                  {c.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-slate-400">Starting soon</span>
                <div className="text-sm font-semibold text-brand-600 group-hover:translate-x-2 transition-transform">
                  Learn More <span className="inline-block ml-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/courses"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold group"
          >
            <span>View all courses and schedules</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-pn py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Meet your teacher</h2>
              <p className="mt-3 text-slate-700">
                A calm, structured teaching approach with focus on concepts, practice, and exam strategy—so students learn with confidence.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Method", v: "Concept → Practice → Test → Review" },
                  { k: "Batches", v: "Small groups for attention" },
                  { k: "Support", v: "Doubt clearing and guidance" },
                  { k: "Communication", v: "Regular parent updates" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-semibold uppercase text-slate-600">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Talk to us
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <img
                src={new URL("../assets/teacher-profile.svg", import.meta.url).toString()}
                alt="Teacher profile"
                className="w-full"
                loading="lazy"
              />
              <div className="mt-4 text-center">
                <div className="text-sm font-semibold text-slate-900">Pranita Nasare</div>
                <div className="text-sm text-slate-600">Teacher • Mentor • Guide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pn py-16 sm:py-20">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-600 to-brand-800 p-10 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Ready to apply?</h2>
              <p className="mt-2 text-white/90">
                Fill the admission form in a few minutes. We’ll confirm your application and contact you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="/admission/"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-white/90"
              >
                Admission form
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}