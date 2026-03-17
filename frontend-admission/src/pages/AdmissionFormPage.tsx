import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  classLevel: z.enum(['7th', '8th', '9th', '10th']),
  schoolName: z.string().min(2, 'School name is required'),
  parentName: z.string().min(2, 'Parent name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(5, 'Address is required'),
})

type FormValues = z.infer<typeof schema>

function Field({
  label,
  children,
  error,
}: {
  label: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="mt-2">{children}</div>
      {error ? <div className="mt-1 text-sm text-red-600">{error}</div> : null}
    </label>
  )
}

export function AdmissionFormPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [docs, setDocs] = useState<FileList | null>(null)

  const defaultValues = useMemo<FormValues>(
    () => ({
      fullName: '',
      classLevel: '7th',
      schoolName: '',
      parentName: '',
      phoneNumber: '',
      email: '',
      address: '',
    }),
    [],
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, v))
    if (docs) Array.from(docs).forEach((f) => fd.append('documents', f))

    try {
      const res = await api.post('/api/students/students', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const id = res.data?.id as string | undefined
      if (!id) throw new Error('Invalid server response')
      navigate(`/success/${id}`)
    } catch (e: any) {
      setServerError(e?.response?.data?.error || e?.message || 'Submission failed')
    }
  }

  return (
    <div className="bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-pn py-5 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-900">Admission Portal</div>
            <div className="text-sm text-slate-600">Pranita Nasare Coaching Classes</div>
          </div>
          <a
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Back to Website
          </a>
        </div>
      </header>

      <main className="container-pn py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-2xl font-bold text-slate-900">Student Registration</h1>
          <p className="mt-2 text-slate-600">
            Fill the admission form carefully. Documents are optional (max 3 files).
          </p>

          {serverError ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {serverError}
            </div>
          ) : null}

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <Field label="Full Name" error={errors.fullName?.message}>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                placeholder="Student full name"
                {...register('fullName')}
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Class" error={errors.classLevel?.message}>
                <select
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                  {...register('classLevel')}
                >
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                </select>
              </Field>

              <Field label="School Name" error={errors.schoolName?.message}>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                  placeholder="School name"
                  {...register('schoolName')}
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Parent Name" error={errors.parentName?.message}>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                  placeholder="Parent/Guardian name"
                  {...register('parentName')}
                />
              </Field>

              <Field label="Phone Number" error={errors.phoneNumber?.message}>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                  placeholder="e.g. 9876543210"
                  {...register('phoneNumber')}
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email?.message}>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                placeholder="student@example.com"
                {...register('email')}
              />
            </Field>

            <Field label="Address" error={errors.address?.message}>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-600"
                placeholder="Full address"
                {...register('address')}
              />
            </Field>

            <Field label="Upload Documents (optional)">
              <input
                type="file"
                multiple
                onChange={(e) => setDocs(e.target.files)}
                className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-700"
              />
              <div className="mt-2 text-xs text-slate-500">Accepted: images, PDF, DOC/DOCX (max 10MB each)</div>
            </Field>

            <button
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              type="submit"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

