import { useEffect } from 'react';
import { useRouter } from '@/hooks/use-router.js';
import { useJwtDecode } from '@/hooks/use-jwt-decode.js';

export const useBlockAccess = (reqRoles) => {
    const { role } = useJwtDecode();
    const router = useRouter();

    useEffect(() => {
        if (!role) {
            router.push('/login');
            return;
        }

        const isAuthorized = reqRoles.includes(role);
        if (!isAuthorized) {
            router.push('/login');
        }
    }, [role, router, reqRoles]);
};
