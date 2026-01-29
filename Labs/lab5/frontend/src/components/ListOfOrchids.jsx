import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, FormGroup, Image, Modal } from 'react-bootstrap'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


export default function ListOfOrchids() {
    const baseUrl = import.meta.env.VITE_API_URL
    const [orchidApi, setOrchidAPI] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}`);
            const orchids = Array.isArray(response.data)
                ? response.data : response.data?.content ?? [];
            const sorted = orchids.sort((a, b) => Number(b.id) - Number(a.id));
            setOrchidAPI(sorted);
        } catch (error) {
            console.error('Error fetching orchids data:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/${id}`);
            await fetchData();
            toast.success("Orchid deleted successfully!");
        }
        catch (error) {
            toast.error("Error deleting orchid!");
            console.log("Error deleting orchid:", error);
        }
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${baseUrl}`, data, {
                headers:  {'Content-Type': 'application/json'}
            });
            setShow(false);
            await fetchData();
            reset();
            setValue('');
            toast.success("Orchid added successfully!");
        }
        catch (error) {
            toast.error("Error adding orchid!");
            console.log("Error adding orchid:", error);
        }
    }

    return (
        <Container>
            <Toaster />
            <div className="d-flex justify-content-end mb-3">
                <Button as={Link} to="/orchids/new" variant="primary">
                    Add New Orchid
                </Button>
            </div>
            <Table striped bordered hover className="my-5">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Natural</th>
                    <th>Highlight</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orchidApi.map((orchid) => {
                    const orchidId = orchid.id ?? orchid.orchidId;
                    return (
                        <tr key={orchidId}>
                            <td>{orchid.orchidName}</td>
                            <td>
                                <Image src={orchid.orchidUrl} roundedCircle width={64} height={64} />
                            </td>
                            <td>{orchid.category?.name ?? 'Uncategorized'}</td>
                            <td>{orchid.isNatural ? <span className="badge bg-success">Natural</span>
                                : <span className="badge bg-danger">Industry</span>}
                            </td>
                            <td>{orchid.isAttractive ? <span className="badge bg-success">Highlight</span> : null}</td>
                            <td className="d-flex justify-content-center gap-2">
                                <Link to={`/orchids/${orchidId}/edit`} className="btn btn-sm btn-outline-primary">
                                    Edit </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(orchidId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            {/* Modal code remains unchanged */}
        </Container>
    );
}