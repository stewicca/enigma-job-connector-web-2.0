import { useState } from 'react';
import { useSearchParams } from 'react-router';

function useSort() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [direction, setDirection] = useState({ field: '', direction: '' });

    const handleSort = (field) => {
        if (!field) return;

        let newDirection = '';

        if (direction.field !== field || direction.direction === '') {
            newDirection = 'asc';
        } else if (direction.direction === 'asc') {
            newDirection = 'desc';
        } else if (direction.direction === 'desc') {
            newDirection = '';
        }

        setDirection({field, direction: newDirection});
        const sortParam = newDirection === 'asc' ? field : `-${field}`;

        if (newDirection === '') {
            deleteSort()
        } else {
            handleChangeSort(sortParam);
        }
    }

    const deleteSort = () => {
        searchParams.delete('sortBy');
        setSearchParams(searchParams);
    }

    const handleChangeSort = (field) => {
        searchParams.set('sortBy', field);
        setSearchParams(searchParams);
    }

    return {
        sortBy: searchParams.get('sortBy'),
        direction,
        handleSort
    }
}

export default useSort;
