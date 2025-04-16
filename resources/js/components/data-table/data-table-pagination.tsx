import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo, useState } from 'react';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    params: any;
    setParams: (value: any) => void;
    setTimeDebounce: (value: number) => void;
}

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

export function DataTablePagination<TData>({ table, params, setParams, setTimeDebounce, links, meta }: DataTablePaginationProps<TData>) {
    const [limit, setLimit] = useState((params.limit || 10).toString());

    const currentPage = useMemo(() => meta.current_page ?? 1, [meta]);
    const lastPage = useMemo(() => meta.last_page ?? 1, [meta]);

    const changePage = (page: number) => {
        setParams({
            ...params,
            page,
        });
        setTimeDebounce(0); // Instant navigation
    };

    return (
        <div className="flex items-center justify-between px-2">
            <div className="text-muted-foreground flex-1 text-sm">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    {/* <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}
                    <RowsPerPageSelect limit={limit} setLimit={setLimit} setParams={setParams} params={params} setTimeDebounce={setTimeDebounce} />
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of {lastPage}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => changePage(1)} disabled={currentPage <= 1}>
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => changePage(currentPage - 1)} disabled={currentPage <= 1}>
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => changePage(currentPage + 1)} disabled={currentPage >= lastPage}>
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => changePage(lastPage)}
                        disabled={currentPage >= lastPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
