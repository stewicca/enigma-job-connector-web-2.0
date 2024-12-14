import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { Dialog } from '@/components/ui/dialog';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/lib/get-error-message.js';
import ImportUserForm from '@/pages/user/components/import-user-form.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog.jsx';

// API URL
const USER_API_URL = '/api/user';
const IMPORT_USER_API_URL = '/api/user/data/import';

const ImportUser = ({ isOpen, onOpenChange }) => {
    const queryClient = useQueryClient();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const { mutateAsync: importUser } = useFetch(HTTP_METHODS.POST, IMPORT_USER_API_URL, { headers: { 'Content-Type': 'multipart/form-data' } });

    const handleSubmit = async (body) => {
        onOpenChange(false);

        try {
            const { message } = await importUser(body);
            toast({ description: message });
            await queryClient.invalidateQueries({ queryKey: [USER_API_URL] });
        } catch (error) {
            const messages = getErrorMessage(error).split(',');
            setErrorMessages(messages);
            setIsAlertOpen(true);
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <ImportUserForm onSubmit={handleSubmit} />
            </Dialog>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Error Importing Users</AlertDialogTitle>
                        <AlertDialogDescription>
                            The following errors occurred during the import process:
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <ul className='pl-6 space-y-1 text-sm font-light'>
                        {errorMessages.map((message, index) => <li key={index}>{message.trim()}</li>)}
                    </ul>
                    <AlertDialogFooter>
                        <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

ImportUser.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired
}

export default ImportUser;
