import { jwtDecode } from 'jwt-decode';

export const useJwtDecode = () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
        return { role: null };
    }

    try {
        return jwtDecode(JSON.parse(accessToken));
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return { role: null };
    }
};
