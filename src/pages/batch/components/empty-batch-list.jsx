import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddBatchSheet from '@/pages/batch/components/add-batch-sheet.jsx';

export const EmptyBatchList = () => {
    return (
        <div className='text-center py-10'>
            <h3 className='mt-2 font-semibold text-gray-900'>No items</h3>
            <p className='mt-1 text-sm text-gray-500'>Get started by creating a new item.</p>
            <div className='mt-6'>
                <AddBatchSheet>
                    <Button>
                        <CirclePlus className='mr-2 h-4 w-4' />
                        Add item
                    </Button>
                </AddBatchSheet>
            </div>
        </div>
    );
}
