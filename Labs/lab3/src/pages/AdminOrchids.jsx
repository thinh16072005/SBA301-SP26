import { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Form, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { getAllOrchids, createOrchid, updateOrchid, deleteOrchid } from '../services/orchidServices';

import ConfirmModal from '../components/ConfirmModal';
import FormModal from '../components/FormModal';


function AdminOrchids() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        is_special: false
    });
    const formRef = useRef(null);

    // Fetch all orchids on component mount
    useEffect(() => {
        fetchOrchids();
    }, []);

    const fetchOrchids = async () => {
        try {
            setLoading(true);
            const data = await getAllOrchids();
            setOrchids(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch orchids');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (orchid = null) => {
        if (orchid) {
            setEditingId(orchid.id);
            setFormData({
                name: orchid.name,
                description: orchid.description,
                category: orchid.category,
                image: orchid.image,
                is_special: orchid.is_special || false
            });
        } else {
            setEditingId(null);
            setFormData({
                name: '',
                description: '',
                category: '',
                image: '',
                is_special: false
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            name: '',
            description: '',
            category: '',
            image: '',
            is_special: false
        });
    };

    const handleFormSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateOrchid(editingId, formData);
                setSuccess('Orchid updated successfully');
            } else {
                await createOrchid(formData);
                setSuccess('Orchid created successfully');
            }
            handleCloseModal();
            fetchOrchids();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(editingId ? 'Failed to update orchid' : 'Failed to create orchid');
            console.error(err);
        }
    };

    const handleClickDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = async () => {
        try {
            await deleteOrchid(selectedId);
            setSuccess('Orchid deleted successfully');
            fetchOrchids();
            setTimeout(() => setSuccess(''), 3000);
        }
        catch (err) {
            setError('Failed to delete orchid');
            console.error(err);
        } finally {
            setShowDeleteModal(false);
            setSelectedId(null);
        }
    };

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h1>Admin - Manage Orchids</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        + Add New Orchid
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Special</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orchids.map(orchid => (
                                <tr key={orchid.id}>
                                    <td>{orchid.id}</td>
                                    <td>{orchid.name}</td>
                                    <td>{orchid.category}</td>
                                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                        {orchid.description}
                                    </td>
                                    <td>
                                        <span className={`badge ${orchid.is_special ? 'bg-warning' : 'bg-secondary'}`}>
                                            {orchid.is_special ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>
                                        {orchid.image && (
                                            <img
                                                src={orchid.image}
                                                alt={orchid.name}
                                                style={{ height: '50px', objectFit: 'cover' }}
                                                className="rounded"
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(orchid)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleClickDelete(orchid.id)}
                                        >
                                            Delete
                                        </Button>
                                        <ConfirmModal
                                            show={selectedId === orchid.id && showDeleteModal}
                                            title="Confirm Deletion"
                                            body={`Are you sure you want to delete the orchid "${orchid.name}"? This action cannot be undone.`}
                                            onConfirm={handleDeleteConfirm}
                                            onCancel={() => { setShowDeleteModal(false); setSelectedId(null); }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Add/Edit FormModal */}
            <FormModal
                show={showModal}
                title={editingId ? 'Edit Orchid' : 'Add New Orchid'}
                onConfirm={handleFormSubmit}
                onCancel={handleCloseModal}
                confirmText={editingId ? 'Update Orchid' : 'Create Orchid'}
                confirmVariant="primary"
                size="lg"
            >
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter orchid name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter orchid description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Common, Special"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., images/orchids/phalaenopsis.png"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="is_special"
                            label="Mark as Special Offer"
                            checked={formData.is_special}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </FormModal>
        </Container>
    );
}

export default AdminOrchids;
