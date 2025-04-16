import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

const RowsPerPageSelect = ({ limit, setLimit, setParams, params, setTimeDebounce }) => (
    <Select
        value={limit}
        onValueChange={(value) => {
            setLimit(value);
            setTimeDebounce(50);
            setParams({ ...params, limit: value });
        }}
    >
        <SelectTrigger className="mr-2 h-8 w-[70px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none">
            <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent side="down">
            {[10, 25, 50, 100].map((limit) => (
                <SelectItem key={limit} value={`${limit}`} className="cursor-pointer focus:bg-gray-200/50">
                    {limit}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const SearchInput = ({ placeholder, search, setParams, params, setTimeDebounce }) => {
    const handleReset = () => {
        setParams({
            ...params,
            search: '',
            page: 1,
        });
        setTimeDebounce(0); // instantly apply the reset
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder={placeholder || 'Search'}
                className="h-8 w-full text-xs lg:w-[250px]"
                value={search || ''}
                onChange={(e) => {
                    setParams({ ...params, search: e.target.value });
                    setTimeDebounce(500);
                }}
            />

            {params.search && (
                <Button type="button" variant="ghost" size="icon" onClick={handleReset} className="px-2" title="Clear search">
                    <XIcon className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
};

export default function TableToolbar({ placeholder, params, setParams, setTimeDebounce, search }) {
    const [limit, setLimit] = useState((params.limit || 10).toString());

    return (
        <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
                <p className="text-xs font-medium hidden mr-1 sm:block">Rows per page</p>
                <RowsPerPageSelect
                    limit={limit}
                    setLimit={setLimit}
                    setParams={setParams}
                    params={params}
                    setTimeDebounce={setTimeDebounce}
                />
            </div> */}

            <SearchInput placeholder={placeholder} search={search} setParams={setParams} params={params} setTimeDebounce={setTimeDebounce} />
        </div>
    );
}
