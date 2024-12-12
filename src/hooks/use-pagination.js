import { useSearchParams } from 'react-router';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') || '1';
    const size = searchParams.get('size') || '5';

    const handlePage = (page) => {
        searchParams.set('page', page);
        setSearchParams(searchParams);

        if (page === '1') {
            deletePage();
        }
    }

    const handleSize = (size) => {
        searchParams.set('size', size);
        setSearchParams(searchParams);
    }

    const deletePage = () => {
        searchParams.delete('page');
        setSearchParams(searchParams);
    }

    return { page, size, handlePage, handleSize };
}
