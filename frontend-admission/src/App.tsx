import { Navigate, Route, Routes } from 'react-router-dom'
import { AdmissionFormPage } from './pages/AdmissionFormPage'
import { SuccessPage } from './pages/SuccessPage'

export default function App() {
  return (
    <div className="min-h-full">
      <Routes>
        <Route path="/" element={<AdmissionFormPage />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
