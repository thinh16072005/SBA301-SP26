import { useMemo, useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import AccountModal from '../../components/modals/AccountModal.jsx'
import ConfirmModal from '../../components/modals/ConfirmModal'
import {adminService} from "../../services/adminService.js";

const statusVariant = {
  true: 'success',
  false: 'secondary',
}

function AccountManagement() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    let active = true
    adminService.getAllAccounts()
      .then((data) => {
        if (!active) return
        const mapped = (data || []).map((acc) => ({
          id: acc.accountId ?? acc.id,
          name: acc.accountName ?? acc.name ?? '',
          email: acc.accountEmail ?? acc.email ?? '',
          role: acc.accountRole === 1 ? 'Admin' : acc.accountRole === 2 ? 'Staff' : (acc.role ?? 'Unknown'),
          status: acc.status ?? true,
          lastActive: acc.lastActive ?? '',
        }))
        setAccounts(mapped)
        setError('')
      })
      .catch((err) => setError(err.message || 'Failed to load accounts'))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return accounts.filter((account) => {
      const name = (account.name || '').toLowerCase()
      const email = (account.email || '').toLowerCase()
      const role = account.role || ''
      const status = Boolean(account.status)
      const matchesQuery = name.includes(query) || email.includes(query)
      const matchesRole = roleFilter === 'All' || role === roleFilter
      const matchesStatus = statusFilter === 'All' || status === (statusFilter === 'Active')
      return matchesQuery && matchesRole && matchesStatus
    })
  }, [search, roleFilter, statusFilter, accounts])

  const handleAddOrEditAccount = async ({ id, username, email, password, role }) => {
    const roleLabel = role === '1' || role === 1 ? 'Admin' : 'Staff'
    if (id) {
      setAccounts((prev) => prev.map((acc) => (
        acc.id === id
          ? { ...acc, name: username, email, role: roleLabel }
          : acc
      )))
      setEditTarget(null)
      setShowAddModal(false)
      return
    }

    try {
      const created = await adminService.createAccount({ name: username, email, password, role })
      const newAccount = {
        id: created.accountId ?? created.id,
        name: created.accountName ?? username,
        email: created.accountEmail ?? email,
        role: created.accountRole === 1 ? 'Admin' : created.accountRole === 2 ? 'Staff' : roleLabel,
        status: true,
        lastActive: '',
      }
      setAccounts((prevAccounts) => [...prevAccounts, newAccount])
      setError('')
      setShowAddModal(false)
      setEditTarget(null)
    } catch (err) {
      setError(err.message || 'Failed to create account')
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await adminService.deleteAccount(deleteTarget.id)
      setAccounts((prev) => prev.filter((acc) => acc.id !== deleteTarget.id))
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to delete account')
    } finally {
      setDeleteTarget(null)
    }
  }

  if (loading) {
    return <p>Loading accounts...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <>
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">Account Management</h2>
          <p className="text-muted mb-0">Search, review, and manage admin and staff accounts.</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>New account</Button>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="h6">Filters</Card.Title>
              <div className="d-flex flex-column gap-3">
                <InputGroup>
                  <InputGroup.Text>Search</InputGroup.Text>
                  <Form.Control
                    placeholder="Name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
                <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="All">All roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </Form.Select>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="h6 mb-0">Accounts</Card.Title>
                <Badge bg="light" text="primary">{filtered.length} of {accounts.length}</Badge>
              </div>
              <Table responsive hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-end"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((account) => (
                    <tr key={account.id}>
                      <td>
                        <div className="fw-semibold">{account.name}</div>
                        <div className="text-muted small">{account.email}</div>
                      </td>
                      <td>{account.role}</td>
                      <td>
                        <Badge bg={statusVariant[account.status]}>{account.status ? 'Active' : 'Inactive'}</Badge>
                      </td>
                      <td className="text-end text-muted small">{account.lastActive}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Button size="sm" variant="outline-primary" onClick={() => { setEditTarget(account); setShowAddModal(true) }}>Edit</Button>
                          <Button size="sm" variant="outline-secondary">Disable</Button>
                          <Button size="sm" variant="outline-danger">Reset</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => setDeleteTarget(account)}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

    <AccountModal
      show={showAddModal}
      onClose={() => { setShowAddModal(false); setEditTarget(null) }}
      onSubmit={handleAddOrEditAccount}
      initialData={editTarget}
    />

    <ConfirmModal
      show={Boolean(deleteTarget)}
      onClose={() => setDeleteTarget(null)}
      onConfirm={handleConfirmDelete}
      title="Delete account"
      message={`Are you sure you want to delete ${deleteTarget?.name || 'this account'}?`}
      confirmLabel="Delete"
    />
     </>
   )
 }

export default AccountManagement
