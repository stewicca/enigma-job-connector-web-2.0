import { useState } from 'react';
import { useRouter } from '@/hooks/use-router.js';
import ImportUser from '@/pages/user/components/import-user.jsx';
import ExportUser from '@/pages/user/components/export-user.jsx';
import { ChevronDown, CirclePlus, Download, Import } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';

const UserMenu = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [showImportDialog, setShowImportDialog] = useState(false);

    const handleImportClick = (e) => {
        e.preventDefault();
        setIsOpen(false); // Close the dropdown
        setShowImportDialog(true); // Open the import dialog
    };

    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className='flex items-center gap-2 h-9 ml-auto px-4 text-sm border rounded-md'>
                    User Menu
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onSelect={() => router.push('/dashboard/user/add')}>
                        <CirclePlus className='mr-2 h-4 w-4'/>
                        Add User
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleImportClick}>
                        <Import className='mr-2 h-4 w-4'/>
                        Import User
                    </DropdownMenuItem>
                    <ExportUser>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Download className='mr-2 h-4 w-4'/>
                            Export User
                        </DropdownMenuItem>
                    </ExportUser>
                </DropdownMenuContent>
            </DropdownMenu>
            <ImportUser isOpen={showImportDialog} onOpenChange={setShowImportDialog} />
        </>
    );
}

export default UserMenu;
