import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from '../Modal'

function ArticleModal({ show, onClose, onSubmit, categories = [], initialData = {} }) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [content, setContent] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)

  useEffect(() => {
    if (!show) return
    setSubmitAttempted(false)
    setTitle(initialData?.title || '')
    setCategoryId(initialData?.categoryId || '')
    setContent(initialData?.content || '')
  }, [show, initialData])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    if (!title.trim() || !categoryId || !content.trim()) return
    onSubmit({ id: initialData?.id, title, categoryId, content })
  }

  const formId = 'add-article-form'

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={initialData?.id ? 'Edit Article' : 'Add Article'}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form={formId}>Save</Button>
        </>
      )}
    >
      <Form id={formId} onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="articleTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter title"
            isInvalid={submitAttempted && !title.trim()}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="articleCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            isInvalid={submitAttempted && !categoryId}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id ?? category.value} value={category.id ?? category.value}>
                {category.name ?? category.label ?? category.id}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="articleContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your article content"
            isInvalid={submitAttempted && !content.trim()}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter content.</Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal>
  )
}

export default ArticleModal
