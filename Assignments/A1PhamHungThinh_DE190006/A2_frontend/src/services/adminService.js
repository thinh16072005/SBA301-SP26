import { accountService } from './accountService'

const getAllAccounts = async () => {
  // Ensure caller is admin before hitting API
  if (!accountService.isAdmin()) {
    throw new Error('Forbidden: admin role required')
  }

  const response = await accountService.authFetch('/accounts')
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: admin role required' : 'Failed to load accounts'
    throw new Error(message)
  }
  return response.json()
}

const deleteAccount = async (accountId) => {
  if (!accountService.isAdmin()) {
    throw new Error('Forbidden: admin role required')
  }
  const current = accountService.getAuth()
  if (current?.accountId === accountId) {
    throw new Error('You cannot delete your own account')
  }

  const response = await accountService.authFetch(`/accounts/${accountId}`, { method: 'DELETE' })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: admin role required' : 'Failed to delete account'
    throw new Error(message)
  }
  return true
}

const createAccount = async ({ name, email, password, role }) => {
  if (!accountService.isAdmin()) {
    throw new Error('Forbidden: admin role required')
  }
  const payload = {
    accountName: name,
    accountEmail: email,
    accountPassword: password,
    accountRole: Number(role),
  }
  const response = await accountService.authFetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const message = response.status === 403 ? 'Forbidden: admin role required' : 'Failed to create account'
    throw new Error(message)
  }
  return response.json()
}

export const adminService = {
  getAllAccounts,
  deleteAccount,
  createAccount,
}
