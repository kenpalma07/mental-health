import { Dispatch, SetStateAction } from 'react';

interface SortParams {
    col?: string;
    sort?: 'asc' | 'desc';
    [key: string]: any; // allows additional optional fields
}

export default function useSorting(initialParams: SortParams, setParams: Dispatch<SetStateAction<SortParams>>) {
    const sort = (column: string) => {
        setParams((prevParams) => ({
            ...prevParams,
            col: column,
            sort: prevParams.sort === 'asc' ? 'desc' : 'asc',
        }));
    };

    return { sort };
}
