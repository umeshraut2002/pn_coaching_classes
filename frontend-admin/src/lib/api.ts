import axios from 'axios'
import { getAuth, clearAuth } from './auth'

export const api = axios.create({
  baseURL: '/',
  timeout: 20000,
})

api.interceptors.request.use((config) => {
  const auth = getAuth()
  if (auth?.token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      clearAuth()
    }
    return Promise.reject(err)
  },
)

