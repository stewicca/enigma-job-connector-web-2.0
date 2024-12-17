import useSort from '@/hooks/use-sort.js';
import { toast } from '@/hooks/use-toast.js';
import useSearch from '@/hooks/use-search.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { usePagination } from '@/hooks/use-pagination.js';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import UserList from '@/pages/user/components/user-list.jsx';
import { ListLoading } from '@/components/common/list-loading.jsx';

// API URL
const USER_API_URL = '/api/user';

const UserPage = () => {
    useBlockAccess(['SuperAdmin']);
    const { page, handlePage } = usePagination();
    const { search, handleSearch } = useSearch('name');
    const { sortBy, direction, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, USER_API_URL, {}, [['page', page], ['sortBy', sortBy], ['name', search]]);
    const { mutateAsync: deleteUser } = useFetch(HTTP_METHODS.DELETE, USER_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteUser(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) return <ListLoading />;

    return (
        <UserList
            data={data}
            onDelete={handleDelete}
            onPage={handlePage}
            direction={direction}
            onSort={handleSort}
            search={search}
            onSearch={handleSearch}
        />
    );
}

export default UserPage;
