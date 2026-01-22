import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        terms: false
    });

    const [errors, setErrors] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.terms) newErrors.terms = 'You must agree to the terms and conditions';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        console.log('Form submitted:', formData);
        setShowConfirm(false);
        setFormData({ firstName: '', lastName: '', phone: '', email: '', terms: false });
        setErrors({});
        alert('Thank you for contacting us!');
    };

    return (
        <Container className="my-5">
            <h1 className="text-center my-5">Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="I agree to the terms and conditions"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        isInvalid={!!errors.terms}
                        feedback={errors.terms}
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <ConfirmModal
                show={showConfirm}
                title="Confirm Your Information"
                // formData={formData}
                body={
                    <div>
                        <p><strong>First Name:</strong> {formData.firstName}</p>
                        <p><strong>Last Name:</strong> {formData.lastName}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                    </div>
                }
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirm(false)}
            />
        </Container>
    );

}

export default Contact