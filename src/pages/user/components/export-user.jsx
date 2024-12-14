import PropTypes from 'prop-types';
import { toast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import { ConfirmExportDialog } from '@/pages/user/components/confirm-export-dialog.jsx';

// API URL
const EXPORT_USER_API_URL = '/api/user/data/export';

const ExportUser = ({ children }) => {
    const { mutateAsync } = useFetch(HTTP_METHODS.GET_FILE, '', { responseType: 'blob' });

    const handleExport = async () => {
        try {
            const blob = await mutateAsync(EXPORT_USER_API_URL);

            console.log(blob);

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'export_user.xlsx');

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    return (
        <ConfirmExportDialog onConfirm={() => handleExport()}>
            {children}
        </ConfirmExportDialog>
    );
}

ExportUser.propTypes = {
    children: PropTypes.node
}

export default ExportUser;
