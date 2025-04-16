import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, PlusCircleIcon } from 'lucide-react';
import * as React from 'react';

import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import TableSortHeader from '@/components/data-table/data-table-sort-header.jsx';
import TableToolbar from '@/components/data-table/data-table-toolbar.jsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import useDebouncedSearch from '@/hooks/use-debounced-search';
import useSorting from '@/hooks/use-sorting';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/iam/users',
    },
];

export default function User() {
    const { data: users, links, meta } = usePage().props.users;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const { filters, roles } = usePage().props;
    const { params, setParams, setTimeDebounce } = useDebouncedSearch('/iam/users', filters);
    const { sort } = useSorting(filters, setParams);

    const columns: ColumnDef<User>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'full_name',
            header: ({ column }) => (
                <TableSortHeader
                    title="Full Name"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('full_name');
                    }}
                    sort={params.col === 'full_name' ? params.sort : null}
                />
            ),
            //cell: ({ row }) => <div className="capitalize">{row.getValue('full_name')}</div>,
        },
        {
            accessorKey: 'username',
            header: ({ column }) => (
                <TableSortHeader
                    title="Username"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('username');
                    }}
                    sort={params.col === 'username' ? params.sort : null}
                />
            ),
            //cell: ({ row }) => <div className="capitalize">{row.getValue('email')}</div>,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <TableSortHeader
                    title="Email"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('email');
                    }}
                    sort={params.col === 'email' ? params.sort : null}
                />
            ),
            //cell: ({ row }) => <div className="capitalize">{row.getValue('email')}</div>,
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: users,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="w-full space-y-4 p-4">
                <div className="flex items-center gap-2">
                    <TableToolbar
                        placeholder="Search user"
                        search={params?.search}
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                    />
                    <Button className="h-8 px-2 lg:px-3">
                        <PlusCircleIcon className="h-4 w-4" />
                        Add
                    </Button>
                    {/* <Input
                        placeholder="Filter user..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    /> */}
                    <DataTableViewOptions table={table} />
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination
                    table={table}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                    links={links}
                    meta={meta}
                />
                {/* <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Next
                            </Button>
                        </div>
                    </div> */}
            </div>
        </AppLayout>
    );
}
