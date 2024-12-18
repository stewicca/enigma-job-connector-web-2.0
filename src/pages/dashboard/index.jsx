import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import Stats from '@/pages/dashboard/components/stats.jsx';
import { useBlockAccess } from '@/hooks/use-block-access.js';
import DashboardSkeleton from '@/pages/dashboard/components/dashboard-skeleton.jsx';

// API URL
const GET_ME_API_URL = '/api/user/me';
const BATCH_API_URL = '/api/user/category';
const USER_API_URL = '/api/user';
const CLIENT_API_URL = '/api/client';

const DashboardPage = () => {
    useBlockAccess(['SuperAdmin', 'Admin']);
    const { data: me, isLoading: isMeLoading } = useFetch(HTTP_METHODS.GET, GET_ME_API_URL);
    const { data: batchData, isLoading: isBatchLoading } = useFetch(HTTP_METHODS.GET, BATCH_API_URL);
    const { data: userData, isLoading: isUserLoading } = useFetch(HTTP_METHODS.GET, USER_API_URL);
    const { data: clientData, isLoading: isClientLoading } = useFetch(HTTP_METHODS.GET, CLIENT_API_URL);

    if (isMeLoading || isBatchLoading || isUserLoading || isClientLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className='space-y-6'>
            <h1 className='md:text-lg font-semibold'>Welcome Back! {me.data?.name}</h1>
            <Stats batch={batchData.page?.totalItems} user={userData.page?.totalItems} client={clientData.page?.totalItems} />
        </div>
    );
}

export default DashboardPage;
