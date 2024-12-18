import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useRouter } from '@/hooks/use-router.js';
import { useDebounce } from '@/hooks/use-debounce.js';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import TestForm from '@/pages/test/components/test-form.jsx';
import { FormLoading } from '@/components/common/form-loading.jsx';

// API URL
const TEST_API_URL = '/api/test';
const CLIENT_API_URL = '/api/client';
const USER_API_URL = '/api/user';

const AddTestPage = () => {
    useBlockAccess(['Admin']);
    const router = useRouter();
    const [user, setUser] = useDebounce();
    const [client, setClient] = useDebounce();
    const { data: users, isLoading: isUserLoading } = useFetch(HTTP_METHODS.GET, USER_API_URL, {}, [['name', user], ['size', 5], ['role', 'role_trainee']]);
    const { data: clients, isLoading: isClientLoading } = useFetch(HTTP_METHODS.GET, CLIENT_API_URL, {}, [['name', client], ['size', 5]]);
    const { mutateAsync: addTest, isPending: isTestFetching } = useFetch(HTTP_METHODS.POST, TEST_API_URL, { headers: { 'Content-Type': 'multipart/form-data' } });

    const handleSubmit = async (formData) => {
        try {
            const { message } = await addTest(formData);
            toast({ description: message });
            router.push('/dashboard/test');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if ((isUserLoading && user === '') || (isClientLoading && client === '') || isTestFetching) {
        return <FormLoading />
    }

    return (
        <TestForm
            users={users?.data}
            clients={clients?.data}
            onUserSearch={setUser}
            onClientSearch={setClient}
            onSubmit={handleSubmit}
        />
    );
}

export default AddTestPage;
