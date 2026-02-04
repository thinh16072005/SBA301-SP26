import { accountService } from './accountService'

const BASE = '/categories'

const ensureStaffOrAdmin = () => {
  if (!(accountService.isStaff() || accountService.isAdmin())) {
    throw new Error('Forbidden: staff role required')
  }
}

const getAllCategories = async () => {
  ensureStaffOrAdmin()
  const response = await accountService.authFetch(BASE)
  if (response.status === 404) return []
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to load categories'
    throw new Error(message)
  }
  return response.json()
}

const createCategory = async ({ name, description, isActive = true }) => {
  ensureStaffOrAdmin()
  const payload = {
    categoryName: name,
    categoryDescription: description,
    isActive,
  }
  const response = await accountService.authFetch(`${BASE}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to create category'
    throw new Error(message)
  }
  return response.json()
}

const deleteCategory = async (id) => {
  ensureStaffOrAdmin()
  const response = await accountService.authFetch(`${BASE}/delete/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to delete category'
    throw new Error(message)
  }
  return true
}

const updateCategory = async (id, payload) => {
  ensureStaffOrAdmin()
  const response = await accountService.authFetch(`${BASE}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: staff role required' : 'Failed to update category'
    throw new Error(message)
  }
  return response.json()
}

export const staffCategoryService = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
}
