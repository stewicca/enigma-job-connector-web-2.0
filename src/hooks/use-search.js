import { useSearchParams } from 'react-router';

const useSearch = (param) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (newParam) => {
        searchParams.set(param, newParam);
        setSearchParams(searchParams);

        if (newParam === '') {
            deleteSearch();
        }
    }

    const deleteSearch = () => {
        searchParams.delete(param);
        setSearchParams(searchParams);
    }

    return {
        search: searchParams.get(param),
        handleSearch
    }
}

export default useSearch;
