import useSort from '@/hooks/use-sort.js';
import { toast } from '@/hooks/use-toast.js';
import useSearch from '@/hooks/use-search.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { usePagination } from '@/hooks/use-pagination.js';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { ListLoading } from '@/components/common/list-loading.jsx';
import ClientList from '@/pages/client/components/client-list.jsx';

// API URL
const CLIENT_API_URL = '/api/client';

const ClientPage = () => {
    useBlockAccess(['SuperAdmin']);
    const { page, handlePage } = usePagination();
    const { search, handleSearch } = useSearch('name');
    const { sortBy, direction, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, CLIENT_API_URL, {}, [['page', page], ['sortBy', sortBy], ['name', search]]);
    const { mutateAsync: deleteClient } = useFetch(HTTP_METHODS.DELETE, CLIENT_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteClient(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) return <ListLoading />;

    return (
        <ClientList
            data={data}
            refetch={refetch}
            onDelete={handleDelete}
            onPage={handlePage}
            direction={direction}
            onSort={handleSort}
            search={search}
            onSearch={handleSearch}
        />
    );
}

export default ClientPage;
