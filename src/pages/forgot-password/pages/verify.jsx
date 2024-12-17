import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useRouter } from '@/hooks/use-router.js';
import { Navigate, useSearchParams } from 'react-router';
import { Loading } from '@/components/common/loading.jsx';
import { getErrorMessage } from '@/lib/get-error-message.js';
import CreateNewPasswordForm from '@/pages/forgot-password/components/create-new-password-form.jsx';

// API URL
const VERIFY_API_URL = '/api/user/verify';
const NEW_PASSWORD_API_URL = '/api/user/forgot';

const VerifyPage = () => {
    const router = useRouter();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { isLoading, isSuccess, isError } = useFetch(HTTP_METHODS.FIND, VERIFY_API_URL, {}, [code]);
    const { mutateAsync: createNewPassword, isPending } = useFetch(HTTP_METHODS.POST, NEW_PASSWORD_API_URL);

    const handleSubmit = async ({ password }) => {
        try {
            const { message } = await createNewPassword({ newPassword: password, code });
            toast({ description: message });
            router.replace('/login');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }
    
    if (isLoading) return <Loading />;
    if (isSuccess) return <CreateNewPasswordForm onSubmit={handleSubmit} isLoading={isPending} />;
    if (isError) return <Navigate to='/invalid-code' replace />;
}

export default VerifyPage;
