import { Skeleton } from '@/components/ui/skeleton.jsx';

const DashboardSkeleton = () => (
    <div className='space-y-6'>
        <Skeleton className='w-64 h-10' />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className='h-32' />
            ))}
        </div>
    </div>
);

export default DashboardSkeleton;
