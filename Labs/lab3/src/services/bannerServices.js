import axios from 'axios';

import {
    fetchBannersApi
} from '../api/bannerApi.js';

export const getAllBanners = async () => {
    try {
        const response = await axios.get(fetchBannersApi);
        return response.data;
    } catch (error) {
        console.error("Error fetching banners:", error);
        throw error;
    }
}