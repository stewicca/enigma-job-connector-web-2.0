import useSort from '@/hooks/use-sort.js';
import { toast } from '@/hooks/use-toast.js';
import useSearch from '@/hooks/use-search.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { usePagination } from '@/hooks/use-pagination.js';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import TestList from '@/pages/test/components/test-list.jsx';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { ListLoading } from '@/components/common/list-loading.jsx';

// API URL
const TEST_API_URL = '/api/test';
const TEST_STATUS_API_URL = '/api/test/status';

const TestPage = () => {
    useBlockAccess(['Admin']);
    const { page, handlePage } = usePagination();
    const { search , handleSearch } = useSearch('name');
    const { sortBy, direction, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, TEST_API_URL, {}, [['name', search], ['page', page], ['sortBy', sortBy]]);
    const { mutateAsync: deleteTest } = useFetch(HTTP_METHODS.DELETE, TEST_API_URL);
    const { mutateAsync: getFile } = useFetch(HTTP_METHODS.GET_FILE, '', { responseType: 'blob' });
    const { mutateAsync: updateStatus } = useFetch(HTTP_METHODS.PUT_DYNAMIC, TEST_STATUS_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteTest(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    const handlePreview = async (urlFile) => {
        try {
            const blob = await getFile(urlFile);
            const url = window.URL.createObjectURL(new Blob([blob]));

            window.open(url, '_blank', 'noopener,noreferrer');

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    const handleStatusChange = async (id, body) => {
        try {
            const { message } = await updateStatus({ id, request: { status: body } });
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) {
        return <ListLoading />
    }

    return (
        <TestList
            data={data}
            onDelete={handleDelete}
            onPreview={handlePreview}
            onPage={handlePage}
            direction={direction}
            onSort={handleSort}
            search={search}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
        />
    );
}

export default TestPage;
