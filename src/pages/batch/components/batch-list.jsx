import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button.jsx';
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import { EmptyList } from '@/components/common/empty-list.jsx';
import { SearchComponent } from '@/components/common/search.jsx';
import {ConfirmDialog} from '@/components/common/confirm-dialog.jsx';
import { TableHeadSort } from '@/components/common/table-head-sort.jsx';
import { PaginationComponent } from '@/components/common/pagination.jsx';
import AddBatchSheet from '@/pages/batch/components/add-batch-sheet.jsx';
import EditBatchSheet from '@/pages/batch/components/edit-batch-sheet.jsx';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BatchList = ({ data, onDelete, onPage, direction, onSort, search, onSearch }) => {
    if (!data) return <EmptyList href='/dashboard/batch/add' />

    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>Batch Management</h1>
            <div className='flex items-center gap-4'>
                <SearchComponent placeholder='Search Batch...' value={search} onSubmit={onSearch}/>
                <AddBatchSheet>
                    <Button variant='outline' className='ml-auto'>
                        <CirclePlus className='mr-2 h-4 w-4'/> Add Batch
                    </Button>
                </AddBatchSheet>
            </div>
            <Table>
                <TableCaption>
                    <div className='space-y-4'>
                        <span className='text-sm'>Showing {data.data.length} of {data.page.totalItems} batch</span>
                        <PaginationComponent page={data.page} onPage={onPage}/>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>No</TableHead>
                        <TableHeadSort name='Batch' field='name' direction={direction} onSort={onSort}/>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='font-medium'>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className='text-right space-x-4'>
                                <EditBatchSheet batch={item}>
                                    <Button variant='outline'>
                                        <Pencil className='h-4 w-4'/>
                                        Edit
                                    </Button>
                                </EditBatchSheet>
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

BatchList.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onPage: PropTypes.func,
    direction: PropTypes.object,
    onSort: PropTypes.func,
    search: PropTypes.string,
    onSearch: PropTypes.func
}

export default BatchList;
