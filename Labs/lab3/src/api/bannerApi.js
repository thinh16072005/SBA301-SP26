const API_URL = 'http://localhost:8080';

export const fetchBannersApi = API_URL + '/banners';
export const updateBannerApi = (id) => `${API_URL}/banners/${id}`;
export const deleteBannerApi = (id) => `${API_URL}/banners/${id}`;