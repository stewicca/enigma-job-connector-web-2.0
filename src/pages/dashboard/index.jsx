import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { useBlockAccess } from '@/hooks/use-block-access.js';

// API URL
const GET_ME_API_URL = '/api/user/me';

// TODO: TOTAL USER, BATCH, CLIENT
const DashboardPage = () => {
    useBlockAccess(['SuperAdmin', 'Admin']);
    const { data, isLoading } = useFetch(HTTP_METHODS.GET, GET_ME_API_URL);

    if (isLoading) {
        return <Skeleton className='w-64 h-10' />;
    }

    return <h1 className='md:text-lg font-semibold'>Welcome Back! {data.data?.name}</h1>;
}

export default DashboardPage;
