import usePrevious from '@/hooks/use-previous';
import { router } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

type Params = Record<string, any>;

export default function useDebouncedSearch(url: string, initialParams: Params, initialTimeDebounce = 50) {
    const [params, setParams] = useState<Params>(initialParams);
    const [timeDebounce, setTimeDebounce] = useState<number>(initialTimeDebounce);
    const prevParams = usePrevious<Params>(params);

    const search = useCallback(
        debounce((params: Params) => {
            router.get(url, pickBy(params), {
                replace: true,
                preserveScroll: true,
                preserveState: true,
                queryStringArrayFormat: 'indices',
            });
        }, timeDebounce),
        [timeDebounce, url],
    );

    useEffect(() => {
        if (prevParams) {
            search(params);
        }
    }, [params, prevParams, search]);

    return { params, setParams, setTimeDebounce };
}
