import { Skeleton } from '@/components/ui/skeleton';

export const ListLoading = () => (
    <div className='w-full space-y-4'>
        <div className='flex items-center'>
            <Skeleton className='w-full max-w-sm h-10' />
            <Skeleton className='w-24 h-10 ml-auto' />
        </div>
        <div className='grid gap-4'>
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
        </div>
    </div>
);
