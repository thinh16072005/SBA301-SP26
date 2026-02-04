import { accountService } from './accountService'

const BASE = '/news'

const ensureStaff = () => {
  if (!accountService.isStaff()) {
    throw new Error('Forbidden: staff role required')
  }
}

const getAllArticles = async () => {
  ensureStaff()
  const response = await accountService.authFetch(BASE)
  if (response.status === 404) {
    return []
  }
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to load articles'
    throw new Error(message)
  }
  return response.json()
}

const createArticle = async (payload) => {
  ensureStaff()
  const response = await accountService.authFetch(`${BASE}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to create article'
    throw new Error(message)
  }
  return response.json()
}

const updateArticle = async (id, payload) => {
  ensureStaff()
  const response = await accountService.authFetch(`${BASE}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to update article'
    throw new Error(message)
  }
  return response.json()
}

const deleteArticle = async (id) => {
  ensureStaff()
  const response = await accountService.authFetch(`${BASE}/delete/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to delete article'
    throw new Error(message)
  }
  return true
}

export const staffService = {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
}
