import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useRouter } from '@/hooks/use-router.js';
import { Button } from '@/components/ui/button.jsx';
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import { EmptyList } from '@/components/common/empty-list.jsx';
import { SearchComponent } from '@/components/common/search.jsx';
import { ConfirmDialog } from '@/components/common/confirm-dialog.jsx';
import { TableHeadSort } from '@/components/common/table-head-sort.jsx';
import { PaginationComponent } from '@/components/common/pagination.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';

const TestList = ({ data, onDelete, onPreview, onPage, direction, onSort, search, onSearch, onStatusChange }) => {
    const router = useRouter();

    if (data?.data?.length === 0) return <EmptyList href='/dashboard/test/add' />
    
    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>Test Management</h1>
            <div className='flex items-center gap-4'>
                <SearchComponent placeholder='Search Test...' value={search} onSubmit={onSearch} />
                <Button variant='outline' className='ml-auto' onClick={() => router.push('/dashboard/test/add')}>
                    <CirclePlus className='mr-2 h-4 w-4'/> Add Test
                </Button>
            </div>
            <Table>
                <TableCaption>
                    <div className='space-y-4'>
                        <span className='text-sm'>Showing {data.data.length} of {data.page.totalItems} users</span>
                        <PaginationComponent page={data.page} onPage={onPage} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>No</TableHead>
                        <TableHeadSort name='Client' field='client' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHead className='w-[150px]'>Admin</TableHead>
                        <TableHeadSort name='Deadline' field='deadlineAt' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHeadSort name='Status' field='status' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHead className='w-[150px]'>File</TableHead>
                        <TableHead className='w-[150px]'>Trainees</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium'>{index + 1}</TableCell>
                            <TableCell>{item.client}</TableCell>
                            <TableCell>{item.admin}</TableCell>
                            <TableCell>{format(new Date(item.deadlineAt), 'yyyy-MM-dd')}</TableCell>
                            <TableCell>
                                <Select onValueChange={(value) => onStatusChange(item.id, value)} value={item.status}>
                                    <SelectTrigger className='w-28'>
                                        <SelectValue placeholder='Select Status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Pending'>Pending</SelectItem>
                                        <SelectItem value='Finish'>Finish</SelectItem>
                                        <SelectItem value='Awaiting' className='hidden'>Awaiting</SelectItem>
                                        <SelectItem value='Cancel'>Cancel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Button variant='outline' onClick={() => onPreview(item.file?.urlFile)}>Open File</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='outline' onClick={() => router.push(`/dashboard/test/trainees/${item.id}`)}>Show Trainees</Button>
                            </TableCell>
                            <TableCell className='text-right space-x-4'>
                                <Button variant='outline' onClick={() => router.push(`/dashboard/test/edit/${item.id}`)}>
                                    <Pencil className='h-4 w-4'/>
                                    Edit
                                </Button>
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

TestList.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onPreview: PropTypes.func,
    onPage: PropTypes.func,
    direction: PropTypes.object,
    onSort: PropTypes.func,
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onStatusChange: PropTypes.func
}

export default TestList;
