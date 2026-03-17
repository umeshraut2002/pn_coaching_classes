export function ContactPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-pn py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Contact</h1>
          <p className="mt-3 text-slate-700">Reach out for admissions, batches, timings, and queries.</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-white p-5 border border-slate-200">
                  <div className="text-xs font-semibold uppercase text-slate-600">Phone</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">+91-XXXXXXXXXX</div>
                  <div className="mt-1 text-sm text-slate-600">Call for timings and seat availability.</div>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200">
                  <div className="text-xs font-semibold uppercase text-slate-600">Email</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">contact@pncoaching.local</div>
                  <div className="mt-1 text-sm text-slate-600">We respond as early as possible.</div>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200">
                  <div className="text-xs font-semibold uppercase text-slate-600">Address</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">Add your coaching address here</div>
                  <div className="mt-1 text-sm text-slate-600">Near landmark (optional).</div>
                </div>
              </div>

              <a
                href="/admission/"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Fill admission form
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="rounded-2xl bg-white p-5 border border-slate-200">
                <div className="text-sm font-semibold text-slate-900">Timings (sample)</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex justify-between">
                    <span className="font-medium">Mon–Fri</span>
                    <span>5:00 PM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Sat–Sun</span>
                    <span>10:00 AM – 1:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-5 border border-slate-200">
                <div className="text-sm font-semibold text-slate-900">Map</div>
                <div className="mt-3 rounded-2xl bg-slate-100 p-8 text-sm text-slate-600">
                  Replace this with an embedded Google Map iframe for your actual location.
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 p-5">
                <div className="text-sm font-semibold text-brand-800">Tip</div>
                <div className="mt-1 text-sm text-brand-900/80">
                  For production, update phone/email/address and add your Google Maps embed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

