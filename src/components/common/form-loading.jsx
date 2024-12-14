import { Skeleton } from '@/components/ui/skeleton.jsx';

export const FormLoading = () => (
    <div className='flex flex-col gap-6'>
        <Skeleton className='w-full max-w-sm h-10'/>
        <div className='space-y-4'>
            <Skeleton className='w-32 h-4'/>
            <Skeleton className='w-full h-10'/>
        </div>
        <div className='space-y-4'>
            <Skeleton className='w-32 h-4'/>
            <Skeleton className='w-full h-10'/>
        </div>
        <div className='space-y-4'>
            <Skeleton className='w-32 h-4'/>
            <Skeleton className='w-full h-10'/>
        </div>
        <Skeleton className='w-32 h-10'/>
    </div>
);
