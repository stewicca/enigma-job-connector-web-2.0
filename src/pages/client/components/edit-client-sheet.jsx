import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { Sheet, SheetTrigger } from '@/components/ui/sheet.jsx';
import ClientForm from '@/pages/client/components/client-form.jsx';

// API URL
const CLIENT_API_URL = '/api/client';

const EditClientSheet = ({ children, client }) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutateAsync: editClient, isPending } = useFetch(HTTP_METHODS.PUT, CLIENT_API_URL, {}, [client.id]);

    const handleSubmit = async (body) => {
        try {
            const { message } = await editClient(body);
            toast({ description: message });
            await queryClient.invalidateQueries({queryKey: [CLIENT_API_URL]});
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
            <ClientForm onSubmit={handleSubmit} client={client} isLoading={isPending} />
        </Sheet>
    );
}

EditClientSheet.propTypes = {
    children: PropTypes.node,
    client: PropTypes.object
}

export default EditClientSheet;
