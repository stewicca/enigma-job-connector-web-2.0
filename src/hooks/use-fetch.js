import axios, { AxiosError } from 'axios';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useAuthClient } from '@/hooks/use-auth-client.js';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useFetch = (method, url, conf, deps = []) => {
    if (!method) {
        return useMutation({
            mutationFn: async (request) => {
                try {
                    const { data } = await axios.post(url, request, { ...conf });
                    return data;
                } catch (error) {
                    if (error instanceof AxiosError) {
                        throw error;
                    }
                    throw new Error('An error occurred.');
                }
            },
        });
    }

    const authClient = useAuthClient();

    switch (method) {
        case HTTP_METHODS.GET:
            return useQuery({
                queryKey: [url, ...deps],
                queryFn: async () => {
                    try {
                        const params = deps.reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {});
                        const { data } = await authClient.get(url, { ...conf, params });
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
        case HTTP_METHODS.GET_FILE:
            return useMutation({
                mutationFn: async (urlFile) => {
                    try {
                        const { data } = await authClient.get(urlFile, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                }
            });
        case HTTP_METHODS.FIND:
            return useQuery({
                queryKey: [url, ...deps],
                queryFn: async () => {
                    try {
                        const id = deps[0];
                        const params = deps.slice(1).reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {});
                        const { data } = await authClient.get(`${url}/${id}`, { ...conf, params });
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
        case HTTP_METHODS.FIND_FILE:
            return useMutation({
                mutationFn: async () => {
                    try {
                        const id = deps[0];
                        const { data } = await authClient.get(`${url}/${id}`, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                }
            });
        case HTTP_METHODS.POST:
            return useMutation({
                mutationFn: async (request) => {
                    try {
                        const { data } = await authClient.post(url, request, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
        case HTTP_METHODS.PUT:
            return useMutation({
                mutationFn: async (request) => {
                    try {
                        const id = deps[0];
                        const { data } = await authClient.put(`${url}/${id}`, request, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
        case HTTP_METHODS.PUT_DYNAMIC:
            return useMutation({
                mutationFn: async ({ id, request }) => {
                    try {
                        const { data } = await authClient.put(`${url}/${id}`, request, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
        case HTTP_METHODS.DELETE:
            return useMutation({
                mutationFn: async (id) => {
                    try {
                        const { data } = await authClient.delete(`${url}/${id}`, conf);
                        return data;
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            throw error;
                        }
                        throw new Error('An error occurred.');
                    }
                },
            });
    }
};
