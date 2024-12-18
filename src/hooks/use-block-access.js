import { useEffect } from 'react';
import { useRouter } from '@/hooks/use-router.js';
import { useJwtDecode } from '@/hooks/use-jwt-decode.js';
import {toast} from "@/hooks/use-toast.js";

export const useBlockAccess = (reqRoles) => {
    const { role } = useJwtDecode();
    const router = useRouter();

    useEffect(() => {
        if (!role) {
            toast({ variant: 'destructive', description: 'Forbidden.' });
            router.push('/login');
            return;
        }

        const isAuthorized = reqRoles.includes(role);
        if (!isAuthorized) {
            toast({ variant: 'destructive', description: 'Forbidden.' });
            router.push('/login');
        }
    }, [role, router, reqRoles]);
};
