import PropTypes from 'prop-types';
import { useRouter } from '@/hooks/use-router.js';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const ButtonAction = ({ id, onDelete }) => {
    const router = useRouter();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='p-2'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/batch/edit/${id}`)}>
                    <Pencil className='mr-2 h-4 w-4'/>
                    Edit
                </DropdownMenuItem>
                <ConfirmDialog onConfirm={() => onDelete(id)}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash className='mr-2 h-4 w-4'/>
                        Delete
                    </DropdownMenuItem>
                </ConfirmDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

ButtonAction.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func
}
