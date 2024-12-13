import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableHead } from '@/components/ui/table.jsx';

export const TableHeadSort = ({ name, field, direction, onSort }) => {
    return (
        <TableHead onClick={() => onSort(field)} className='cursor-pointer'>
            <div className='relative w-fit'>
                <span>{name}</span>
                {direction.field === field && direction.direction === 'asc' && <ArrowDown size='16' className='absolute -right-5 top-1/2 -translate-y-1/2' />}
                {direction.field === field && direction.direction === 'desc' && <ArrowUp size='16' className='absolute -right-5 top-1/2 -translate-y-1/2' />}
            </div>
        </TableHead>
    );
}

TableHeadSort.propTypes = {
    name: PropTypes.string,
    field: PropTypes.string,
    direction: PropTypes.object,
    onSort: PropTypes.func
}
