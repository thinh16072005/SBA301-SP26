const API_BASE = 'http://localhost:8080'
const STORAGE_KEY = 'auth'

const saveAuth = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const getAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (err) {
    return null
  }
}

const clearAuth = () => localStorage.removeItem(STORAGE_KEY)

const decodeToken = (token) => {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    return JSON.parse(atob(parts[1]))
  } catch (err) {
    return null
  }
}

const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const data = await response.json()
  saveAuth(data)
  return data
}

const logout = () => clearAuth()

const getToken = () => getAuth()?.token || null

const getRole = () => {
  const storedRole = getAuth()?.accountRole
  const tokenRole = decodeToken(getToken())?.role
  const role = storedRole ?? tokenRole
  return typeof role === 'string' ? Number(role) : role
}

const isAdmin = () => getRole() === 1
const isStaff = () => getRole() === 2

const isAuthenticated = () => Boolean(getToken())

const authFetch = (url, options = {}) => {
  const token = getToken()
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
  return fetch(url.startsWith('http') ? url : `${API_BASE}${url}`, {
    ...options,
    headers
  })
}

const getAccountName = () => getAuth()?.accountName || decodeToken(getToken())?.name || ''

export const accountService = {
  login,
  logout,
  getToken,
  getRole,
  isAdmin,
  isStaff,
  isAuthenticated,
  authFetch,
  getAuth,
  getAccountName,
}
