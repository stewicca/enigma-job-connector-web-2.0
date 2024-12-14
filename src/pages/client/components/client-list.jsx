import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button.jsx';
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import { SearchComponent } from '@/components/common/search.jsx';
import { ConfirmDialog } from '@/components/common/confirm-dialog.jsx';
import { TableHeadSort } from '@/components/common/table-head-sort.jsx';
import { PaginationComponent } from '@/components/common/pagination.jsx';
import AddClientSheet from '@/pages/client/components/add-client-sheet.jsx';
import EditClientSheet from '@/pages/client/components/edit-client-sheet.jsx';
import { EmptyClientList } from '@/pages/client/components/empty-client-list.jsx';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ClientList = ({ data, onDelete, onPage, direction, onSort, search, onSearch }) => {
    if (!data) return <EmptyClientList />

    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>Client Management</h1>
            <div className='flex items-center gap-4'>
                <SearchComponent placeholder='Search Client...' value={search} onSubmit={onSearch} />
                <AddClientSheet>
                    <Button variant='outline' className='ml-auto'>
                        <CirclePlus className='mr-2 h-4 w-4'/> Add Client
                    </Button>
                </AddClientSheet>
            </div>
            <Table>
                <TableCaption>
                    <div className='space-y-4'>
                        <span className='text-sm'>Showing {data.data.length} of {data.page.totalItems} client</span>
                        <PaginationComponent page={data.page} onPage={onPage}/>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>No</TableHead>
                        <TableHeadSort name='Client' field='name' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHeadSort name='Address' field='address' direction={direction} onSort={onSort} />
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='font-medium'>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell className='text-right space-x-4'>
                                <EditClientSheet client={item}>
                                    <Button variant='outline'>
                                        <Pencil className='h-4 w-4'/>
                                        Edit
                                    </Button>
                                </EditClientSheet>
                                <ConfirmDialog onConfirm={() => onDelete(item.id)}>
                                    <Button variant='outline'>
                                        <Trash className='h-4 w-4'/>
                                        Delete
                                    </Button>
                                </ConfirmDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

ClientList.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onPage: PropTypes.func,
    direction: PropTypes.object,
    onSort: PropTypes.func,
    search: PropTypes.string,
    onSearch: PropTypes.func
}

export default ClientList;
