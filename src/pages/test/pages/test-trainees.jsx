import { useParams } from 'react-router';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { ListLoading } from '@/components/common/list-loading.jsx';
import TestTraineeList from '@/pages/test/components/test-trainee-list.jsx';

// API_URL
const TEST_API_URL = '/api/test';
const TEST_DETAIL_API_URL = '/api/test/detail/update';
const ZIP_FILE_API_URL = '/api/test/file';

const TestTraineesPage = () => {
    const { id } = useParams();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.FIND, TEST_API_URL, {}, [id]);
    const { mutateAsync: updateStatus, isPending: isFetchingTest } = useFetch(HTTP_METHODS.PUT_DYNAMIC, TEST_DETAIL_API_URL);
    const { mutateAsync: downloadFile, isPending: isFetchingFile } = useFetch(HTTP_METHODS.GET_FILE, '', { responseType: 'blob' });
    const { mutateAsync: downloadZip, isPending: isFetchingZip } = useFetch(HTTP_METHODS.FIND_FILE, ZIP_FILE_API_URL, { responseType: 'blob' }, [id]);

    const handleStatusChange = async (id, body) => {
        try {
            const { message } = await updateStatus({ id, request: { status: body } });
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    const handleDownload = async (urlFile, fileName) => {
        try {
            const blob = await downloadFile(urlFile);

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch {
            toast({ variant: 'destructive', description: 'Failed to download file' });
        }
    }

    const handleZip = async (fileName) => {
        try {
            const blob = await downloadZip();

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch {
            toast({ variant: 'destructive', description: 'Failed to download all submission' });
        }
    }

    if (isLoading || isFetchingTest || isFetchingFile || isFetchingZip) {
        return <ListLoading />
    }

    return <TestTraineeList data={data?.data} onStatusChange={handleStatusChange} onDownload={handleDownload} onZip={handleZip} />
}

export default TestTraineesPage;
