import PropTypes from 'prop-types';
import UserMenu from '@/pages/user/components/user-menu.jsx';
import { EmptyList } from '@/components/common/empty-list.jsx';
import { SearchComponent } from '@/components/common/search.jsx';
import { ButtonAction } from '@/components/common/button-action.jsx';
import { TableHeadSort } from '@/components/common/table-head-sort.jsx';
import { PaginationComponent } from '@/components/common/pagination.jsx';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserList = ({ data, onDelete, onPage, direction, onSort, search, onSearch }) => {
    if (data?.data?.length === 0) return <EmptyList href='/dashboard/user/add' />

    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>User Management</h1>
            <div className='flex items-center gap-4'>
                <SearchComponent placeholder='Search User...' value={search} onSubmit={onSearch} />
                <UserMenu />
            </div>
            <Table>
                <TableCaption>
                    <div className='space-y-4'>
                        <span className='text-sm'>Showing {data.data.length} of {data.page.totalItems} users</span>
                        <PaginationComponent page={data.page} onPage={onPage}/>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>No</TableHead>
                        <TableHeadSort name='Name' field='name' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHeadSort name='Email' field='email' direction={direction} onSort={onSort} className='w-[200px]' />
                        <TableHeadSort name='Phone Number' field='phoneNumber' direction={direction} onSort={onSort} className='w-[200px]' />
                        <TableHeadSort name='Role' field='role' direction={direction} onSort={onSort} className='w-[100px]' />
                        <TableHeadSort name='Batch' field='userCategory' direction={direction} onSort={onSort} className='w-[150px]' />
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='font-medium'>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>{item.category?.name}</TableCell>
                            <TableCell className='text-right space-x-4'>
                                <ButtonAction id={item.id} href='/dashboard/user/edit' onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

UserList.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onPage: PropTypes.func,
    direction: PropTypes.object,
    onSort: PropTypes.func,
    search: PropTypes.string,
    onSearch: PropTypes.func
}

export default UserList;
