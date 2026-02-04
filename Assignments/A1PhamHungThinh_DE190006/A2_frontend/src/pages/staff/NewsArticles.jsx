import { useMemo, useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Row, Table, Alert } from 'react-bootstrap'
import ArticleModal from '../../components/modals/ArticleModal.jsx'
import ConfirmModal from '../../components/modals/ConfirmModal'
import { staffService } from '../../services/staffService.js'

const statusVariant = {
  true: 'success',
  false: 'secondary',
}

function NewsArticles() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [articles, setArticles] = useState([])
  const [editTarget, setEditTarget] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    staffService.getAllArticles()
      .then((data) => {
        if (!active) return
        const mapped = (data || []).map((art) => ({
          id: art.newsId ?? art.id,
          newsTitle: art.newsTitle ?? art.title ?? '',
          headline: art.headline ?? '',
          createdDate: art.createdDate,
          newsContent: art.newsContent ?? art.content ?? '',
          newsSource: art.newsSource ?? 'Staff',
          category: art.category ? { id: art.category.categoryId ?? art.category.id, categoryName: art.category.categoryName ?? art.category.name } : null,
          newsStatus: art.newsStatus ?? art.status ?? true,
          modifiedDate: art.modifiedDate,
        }))
        setArticles(mapped)
        setError('')
      })
      .catch((err) => setError(err.message || 'Failed to load articles'))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const categories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category?.categoryName || article.category?.name))).filter(Boolean)
      .map((name) => ({ id: name, name })),
    [articles],
  )

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return articles.filter((article) => {
      const title = article.newsTitle || article.title || ''
      const headline = article.headline || ''
      const matchesQuery = title.toLowerCase().includes(query) || headline.toLowerCase().includes(query)
      const matchesStatus = status === 'All' || (article.newsStatus ?? article.status) === (status === 'Published')
      return matchesQuery && matchesStatus
    })
  }, [search, status, articles])

  const handleAddOrEditArticle = async ({ id, title, categoryId, content }) => {
    const payload = {
      newsTitle: title,
      headline: content?.slice(0, 120) || '',
      newsContent: content,
      newsSource: 'Staff',
      newsStatus: true,
      category: { categoryId: Number(categoryId) || categoryId },
    }

    const categoryName = categories.find((category) => (category.id ?? category.value) === categoryId)?.name || 'Uncategorized'

    if (id) {
      try {
        const updated = await staffService.updateArticle(id, payload)
        setArticles((prev) => prev.map((article) => (
          article.id === id
            ? {
                ...article,
                newsTitle: updated.newsTitle ?? title,
                headline: updated.headline ?? payload.headline,
                category: updated.category ? { id: updated.category.categoryId ?? categoryId, categoryName: updated.category.categoryName ?? categoryName } : { id: categoryId, categoryName },
                newsContent: updated.newsContent ?? content,
                newsStatus: updated.newsStatus ?? article.newsStatus,
                modifiedDate: updated.modifiedDate ?? article.modifiedDate,
              }
            : article
        )))
        setError('')
      } catch (err) {
        setError(err.message || 'Failed to update article')
      }
    } else {
      try {
        const created = await staffService.createArticle(payload)
        const newArticle = {
          id: created.newsId ?? created.id,
          newsTitle: created.newsTitle ?? title,
          headline: created.headline ?? payload.headline,
          createdDate: created.createdDate ?? new Date().toISOString(),
          newsContent: created.newsContent ?? content,
          newsSource: created.newsSource ?? 'Staff',
          category: created.category ? { id: created.category.categoryId ?? categoryId, categoryName: created.category.categoryName ?? categoryName } : { id: categoryId, categoryName },
          newsStatus: created.newsStatus ?? true,
          modifiedDate: created.modifiedDate ?? new Date().toISOString(),
        }
        setArticles((prevArticles) => [...prevArticles, newArticle])
        setError('')
      } catch (err) {
        setError(err.message || 'Failed to create article')
      }
    }
    setEditTarget(null)
    setShowAddModal(false)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await staffService.deleteArticle(deleteTarget.id)
      setArticles((prev) => prev.filter((article) => article.id !== deleteTarget.id))
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to delete article')
    } finally {
      setDeleteTarget(null)
    }
  }

  if (loading) {
    return <p>Loading articles...</p>
  }

  return (
    <div className="d-flex flex-column gap-3">
      {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">News Articles</h2>
          <p className="text-muted mb-0">Draft, review, and publish stories.</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>New article</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="g-3 align-items-end mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control
                  placeholder="Headline"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">All statuses</option>
                <option value="Published">Published</option>
                <option value="Revoked">Revoked</option>
              </Form.Select>
            </Col>
            <Col md={3} className="text-md-end">
              <Button variant="outline-secondary">Bulk actions</Button>
            </Col>
          </Row>

          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Headline</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-end">Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr key={article.id}>
                  <td className="fw-semibold">{article.newsTitle || article.title}</td>
                  <td className="text-muted small">{article.headline || '—'}</td>
                  <td className="text-muted">{article.category?.categoryName || article.category || 'Uncategorized'}</td>
                  <td>
                    <Badge bg={statusVariant[article.newsStatus ?? article.status] || 'secondary'}>{(article.newsStatus ?? article.status) ? 'Published' : 'Revoked'}</Badge>
                  </td>
                  <td className="text-end text-muted small">{article.createdDate ? new Date(article.createdDate).toLocaleString() : '—'}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => { setEditTarget(article); setShowAddModal(true) }}>Edit</Button>
                      <Button size="sm" variant="outline-success">Publish</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => setDeleteTarget(article)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ArticleModal
        show={showAddModal}
        onClose={() => { setShowAddModal(false); setEditTarget(null) }}
        onSubmit={handleAddOrEditArticle}
        categories={categories}
        initialData={editTarget ? {
          id: editTarget.id,
          title: editTarget.newsTitle || editTarget.title,
          categoryId: editTarget.category?.id || editTarget.category,
          content: editTarget.newsContent || editTarget.content,
        } : undefined}
      />
      <ConfirmModal
        show={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete article"
        message={`Are you sure you want to delete ${deleteTarget?.title || 'this article'}?`}
        confirmLabel="Delete"
      />
     </div>
   )
 }

export default NewsArticles
