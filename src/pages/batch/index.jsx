import useSort from '@/hooks/use-sort.js';
import { toast } from '@/hooks/use-toast.js';
import useSearch from '@/hooks/use-search.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { usePagination } from '@/hooks/use-pagination.js';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import BatchList from '@/pages/batch/components/batch-list.jsx';
import { ListLoading } from '@/components/common/list-loading.jsx';

// API URL
const BATCH_API_URL = '/api/user/category';

const BatchPage = () => {
    useBlockAccess(['SuperAdmin']);
    const { page, handlePage } = usePagination();
    const { search, handleSearch } = useSearch('name');
    const { sortBy, direction, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, BATCH_API_URL, {}, [['page', page], ['sortBy', sortBy], ['name', search]]);
    const { mutateAsync: deleteBatch } = useFetch(HTTP_METHODS.DELETE, BATCH_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteBatch(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) return <ListLoading />;
    
    return (
        <BatchList
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

export default BatchPage;
