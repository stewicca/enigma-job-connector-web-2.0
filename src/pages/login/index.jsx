import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { useRouter } from '@/hooks/use-router.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import LoginForm from '@/pages/login/components/login-form.jsx';

// API URL
const LOGIN_API_URL = '/api/auth/login';

const LoginPage = () => {
    const router = useRouter();
    const { mutateAsync: login, isPending } = useFetch(null, LOGIN_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { data, message } = await login(body);
            localStorage.setItem('accessToken', data.accessToken);
            toast({ description: message });
            router.replace('/');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }
    
    return <LoginForm isLoading={isPending} onSubmit={handleSubmit} />
}

export default LoginPage;
