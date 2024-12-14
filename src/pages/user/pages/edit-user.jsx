import { useParams } from 'react-router';
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

const EditUserPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [batch, setBatch] = useDebounce();
    const { data: users, isLoading: isUserLoading } = useFetch(HTTP_METHODS.FIND, USER_API_URL, {}, [id]);
    const { data: categories, isLoading: isCategoryLoading } = useFetch(HTTP_METHODS.GET, BATCH_API_URL, {}, [['size', 5], ['name', batch]]);
    const { mutateAsync: editUser, isPending } = useFetch(HTTP_METHODS.PUT, USER_API_URL, {}, [id]);

    const handleSubmit = async (body) => {
        try {
            const { message } = await editUser(body);
            toast({ description: message });
            router.back();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    if ((isUserLoading || isCategoryLoading) && batch === '') return <FormLoading />

    const initialValues = {
        id: users?.data?.id,
        name: users?.data?.name,
        email: users?.data?.email,
        phoneNumber: users?.data?.phoneNumber,
        role: users?.data?.role,
        categoryId: users?.data?.category?.id
    }

    return (
        <UserForm
            categories={categories?.data}
            initialValues={initialValues}
            onSearchBatch={setBatch}
            isLoading={isPending}
            onSubmit={handleSubmit}
        />
    );
}

export default EditUserPage;
