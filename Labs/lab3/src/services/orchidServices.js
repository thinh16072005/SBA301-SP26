import axios from 'axios';

import {
    fetchOrchidsApi, 
    fetchOrchidByIdApi,
    createOrchidApi,
    updateOrchidApi,
    deleteOrchidApi
} from '../api/orchidApi.js';

// Get all orchids
export const getAllOrchids = async () => {
    try {
        const response = await axios.get(fetchOrchidsApi);
        return response.data;
    } catch (error) {
        console.error("Error fetching orchids:", error);
        throw error;
    }
};

// Get a single orchid by ID
export const getOrchidById = async (id) => {
    try {
        const response = await axios.get(fetchOrchidByIdApi(id));
        return response.data;
    } catch (error) {
        console.error(`Error fetching orchid with ID ${id}:`, error);
        throw error;
    }
};

// Create a new orchid
export const createOrchid = async (orchidData) => {
    try {
        const response = await axios.post(createOrchidApi, orchidData);
        return response.data;
    } catch (error) {
        console.error("Error creating orchid:", error);
        throw error;
    }
};

// Update an existing orchid
export const updateOrchid = async (id, orchidData) => {
    try {
        const response = await axios.put(updateOrchidApi(id), orchidData);
        return response.data;
    } catch (error) {
        console.error(`Error updating orchid with ID ${id}:`, error);
        throw error;
    }
};

// Delete an orchid
export const deleteOrchid = async (id) => {
    try {
        const response = await axios.delete(deleteOrchidApi(id));
        return response.data;
    } catch (error) {
        console.error(`Error deleting orchid with ID ${id}:`, error);
        throw error;
    }
};
