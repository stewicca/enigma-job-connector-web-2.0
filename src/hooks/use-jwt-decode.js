import { jwtDecode } from 'jwt-decode';

export const useJwtDecode = () => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    return jwtDecode(accessToken);
}
