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

const EditBatchSheet = ({ children, batch }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: editBatch } = useFetch(HTTP_METHODS.PUT, BATCH_API_URL, {}, [batch.id]);

    const handleSubmit = async (body) => {
        try {
            const { message } = await editBatch(body);
            toast({ description: message });
            await queryClient.invalidateQueries({queryKey: [BATCH_API_URL]});
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <BatchForm batch={batch} onSubmit={handleSubmit} />
        </Sheet>
    );
}

EditBatchSheet.propTypes = {
    children: PropTypes.node,
    batch: PropTypes.object
}

export default EditBatchSheet;
