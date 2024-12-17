import { jwtDecode } from 'jwt-decode';

export const useJwtDecode = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return { role: null };
    }

    try {
        return jwtDecode(accessToken);
    } catch {
        return { role: null };
    }
};
