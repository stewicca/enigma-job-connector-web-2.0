import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableHead } from '@/components/ui/table.jsx';

export const TableHeadSort = ({ name, field, direction, onSort }) => {
    return (
        <TableHead onClick={() => onSort(field)} className='flex items-center gap-1 cursor-pointer'>
            <span>{name}</span>
            {direction.field === field && direction.direction === 'asc' && <ArrowDown size='16' />}
            {direction.field === field && direction.direction === 'desc' && <ArrowUp size='16' />}
        </TableHead>
    );
}

TableHeadSort.propTypes = {
    name: PropTypes.string,
    field: PropTypes.string,
    direction: PropTypes.object,
    onSort: PropTypes.func
}
