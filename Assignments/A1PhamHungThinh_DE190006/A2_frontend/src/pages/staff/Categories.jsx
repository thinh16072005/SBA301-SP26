import { useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Form, Row, Table, Alert } from 'react-bootstrap'
import ConfirmModal from '../../components/modals/ConfirmModal'
import { staffCategoryService } from '../../services/staffCategoryService.js'

function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    staffCategoryService.getAllCategories()
      .then((data) => {
        if (!active) return
        const mapped = (data || []).map((cat) => ({
          id: cat.categoryId ?? cat.id,
          name: cat.categoryName ?? cat.name ?? '',
          description: cat.categoryDescription ?? cat.description ?? '',
          status: cat.isActive ?? cat.status ?? true,
          articles: cat.articlesCount ?? 0,
        }))
        setCategories(mapped)
        setError('')
      })
      .catch((err) => setError(err.message || 'Failed to load categories'))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const handleAdd = async (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    if (!name.trim() || !description.trim()) return
    try {
      const created = await staffCategoryService.createCategory({ name: name.trim(), description: description.trim(), isActive: true })
      const newCategory = {
        id: created.categoryId ?? created.id,
        name: created.categoryName ?? name.trim(),
        description: created.categoryDescription ?? description.trim(),
        status: created.isActive ?? true,
        articles: created.articlesCount ?? 0,
      }
      setCategories((prev) => [...prev, newCategory])
      setName('')
      setDescription('')
      setSubmitAttempted(false)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to create category')
    }
  }

  const handleToggle = async (category) => {
    const nextStatus = !category.status
    try {
      const updated = await staffCategoryService.updateCategory(category.id, {
        categoryName: category.name,
        categoryDescription: category.description,
        isActive: nextStatus,
      })
      setCategories((prev) => prev.map((cat) => cat.id === category.id ? {
        ...cat,
        status: updated.isActive ?? nextStatus,
        name: updated.categoryName ?? cat.name,
        description: updated.categoryDescription ?? cat.description,
      } : cat))
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to update category')
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await staffCategoryService.deleteCategory(deleteTarget.id)
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteTarget.id))
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to delete category')
    } finally {
      setDeleteTarget(null)
    }
  }

  if (loading) {
    return <p>Loading categories...</p>
  }

  return (
    <div className="d-flex flex-column gap-3">
      {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">Category Management</h2>
          <p className="text-muted mb-0">Add new categories and review their article counts.</p>
        </div>
      </div>

      <Row className="g-3">
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="h6">Create category</Card.Title>
              <Form onSubmit={handleAdd} className="d-flex flex-column gap-3">
                <Form.Group controlId="categoryName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Health"
                    isInvalid={submitAttempted && !name.trim()}
                  />
                  <Form.Control.Feedback type="invalid">Please enter a category name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="categoryDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional short description"
                    isInvalid={submitAttempted && !description.trim()}
                  />
                  <Form.Control.Feedback type="invalid">Please enter a description.</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">Add category</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="h6 mb-0">Existing categories</Card.Title>
                <Badge bg="light" text="primary">{categories.length} total</Badge>
              </div>
              {categories.length === 0 ? (
                <p className="mb-0 text-muted">No categories yet.</p>
              ) : (
                <Table responsive hover className="mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <div className="fw-semibold">{category.name}</div>
                          <div className="text-muted small">{category.description}</div>
                        </td>
                        <td>
                          <Badge bg={category.status ? 'success' : 'secondary'}>{category.status ? 'Active' : 'Hidden'}</Badge>
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Button size="sm" variant="outline-secondary" onClick={() => handleToggle(category)}>
                              {category.status ? 'Hide' : 'Show'}
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => setDeleteTarget(category)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete category"
        message={`Are you sure you want to delete ${deleteTarget?.name || 'this category'}?`}
        confirmLabel="Delete"
      />
    </div>
  )
}

export default Categories
