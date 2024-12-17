import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { useRouter } from '@/hooks/use-router.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import ForgotPasswordForm from '@/pages/forgot-password/components/forgot-password-form.jsx';

// API URL
const FORGOT_PASSWORD_API_URL = '/api/user/forgot/email';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useFetch(null, FORGOT_PASSWORD_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { message } = await mutateAsync(body);
            toast({ description: message });
            router.replace('/login');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    return <ForgotPasswordForm isLoading={isPending} onSubmit={handleSubmit} />
}

export default ForgotPasswordPage;
