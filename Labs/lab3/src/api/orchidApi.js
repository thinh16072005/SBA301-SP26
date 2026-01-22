const API_URL = 'http://localhost:8080';

export const fetchOrchidsApi = API_URL + '/orchids';
export const fetchOrchidByIdApi = (id) => `${API_URL}/orchids/${id}`;
export const createOrchidApi = API_URL + '/orchids';
export const updateOrchidApi = (id) => `${API_URL}/orchids/${id}`;
export const deleteOrchidApi = (id) => `${API_URL}/orchids/${id}`;