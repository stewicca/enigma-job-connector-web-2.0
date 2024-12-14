import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useRouter } from '@/hooks/use-router.js';
import { useDebounce } from '@/hooks/use-debounce.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import UserForm from '@/pages/user/components/user-form.jsx';
import { FormLoading } from '@/components/common/form-loading.jsx';

// API URL
const USER_API_URL = '/api/user';
const BATCH_API_URL = '/api/user/category';

const AddUserPage = () => {
    const router = useRouter();
    const [batch, setBatch] = useDebounce();
    const { data, isLoading } = useFetch(HTTP_METHODS.GET, BATCH_API_URL, {}, [['size', 5], ['name', batch]]);
    const { mutateAsync: addUser, isPending } = useFetch(HTTP_METHODS.POST, USER_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { message } = await addUser(body);
            toast({ description: message });
            router.back();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    if (isLoading && batch === '') return <FormLoading />

    return (
        <UserForm
            categories={data?.data}
            onSearchBatch={setBatch}
            isLoading={isPending}
            onSubmit={handleSubmit}
        />
    );
}

export default AddUserPage;
