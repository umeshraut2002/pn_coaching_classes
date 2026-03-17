export type AuthState = {
  token: string
  email?: string
  role?: string
}

const KEY = 'pn_admin_auth_v1'

export function getAuth(): AuthState | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthState
  } catch {
    return null
  }
}

export function setAuth(state: AuthState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearAuth() {
  localStorage.removeItem(KEY)
}

