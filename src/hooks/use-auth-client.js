import axios from 'axios';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { useRouter } from '@/hooks/use-router.js';

export const useAuthClient = () => {
    const router = useRouter();
    const authClient = axios.create({ withCredentials: true });
    const { mutateAsync: refreshToken } = useFetch(null, '/api/auth/refresh-token', { withCredentials: true });

    useEffect(() => {
        const requestInterceptor = authClient.interceptors.request.use(
            (config) => {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        )

        const responseInterceptor = authClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const { data } = await refreshToken();
                        localStorage.setItem('accessToken', data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                        return authClient.request(originalRequest);
                    } catch (refreshError) {
                        toast({ variant: 'destructive', description: 'Token expired, please login' });
                        router.replace('/login');
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        )

        return () => {
            authClient.interceptors.request.eject(requestInterceptor);
            authClient.interceptors.response.eject(responseInterceptor);
        };
    }, [authClient, refreshToken, router]);

    return authClient;
}
