import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { Sheet, SheetTrigger } from '@/components/ui/sheet.jsx';
import BatchForm from '@/pages/batch/components/batch-form.jsx';

// API URL
const BATCH_API_URL = '/api/user/category';

const AddBatchSheet = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutateAsync: addBatch, isPending } = useFetch(HTTP_METHODS.POST, BATCH_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { message } = await addBatch(body);
            toast({ description: message });
            await queryClient.invalidateQueries({queryKey: [BATCH_API_URL]});
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        } finally {
            setIsOpen(false);
        }
    };
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <BatchForm onSubmit={handleSubmit} isLoading={isPending} />
        </Sheet>
    );
}

AddBatchSheet.propTypes = {
    children: PropTypes.node
}

export default AddBatchSheet;
