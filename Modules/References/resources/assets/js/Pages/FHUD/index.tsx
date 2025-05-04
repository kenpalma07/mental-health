import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types'; // Removed as PageProps is not exported
import type { FHUD } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Edit2, MoreHorizontal, PlusCircleIcon } from 'lucide-react';
import * as React from 'react';
import AddFacility from '../FHUD/AddFacility';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'FHUD', href: '/references/fhud' },
];

const FHUDIndex: React.FC = () => {
    const { facility } = usePage<PageProps<{ facility: FHUD[] }>>().props;
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);

    //const [sorting, setSorting] = React.useState([]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
    const [view, setView] = React.useState<'table' | 'grid'>('table');

    const filteredFacilities = React.useMemo(() => {
        return facility.filter((fac: FHUD) => fac.fhudcode?.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [facility, searchTerm]);

    const columns = React.useMemo<ColumnDef<FHUD>[]>(
        () => [
            { accessorKey: 'fhudcode', header: 'Code' },
            { accessorKey: 'facility_name', header: 'Facility Name' },
            {
                accessorKey: 'date_mod',
                header: 'Date Added',
                cell: ({ row }) => {
                    const value = row.original.date_mod;
                    return dayjs(value).format('YYYY-MM-DD');
                },
            },
            { accessorKey: 'faccode', header: 'Facility Code' },
            {
                accessorKey: 'facility_stat',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.getValue('facility_stat');
                    return status === 'A' ? 'Active' : status === 'I' ? 'Inactive' : status;
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                header: 'Actions',
                cell: ({ row }) => {
                    const fhud = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/references/fhud/${fhud.id}/edit`}>
                                        <Edit2 className="h-4 w-4" />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    const table = useReactTable({
        data: filteredFacilities,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FHUD Facilities" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search by facility code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/1"
                        />
                        <Button onClick={() => setIsModalOpen(true)} className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="h-4 w-4" /> Add
                        </Button>
                    </div>

                    <Toggle pressed={view === 'grid'} onPressedChange={() => setView(view === 'table' ? 'grid' : 'table')}>
                        Toggle View
                    </Toggle>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="border-b bg-black text-xs text-white">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-6 py-2">
                                            {header.isPlaceholder ? null : (
                                                <div className="cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getIsSorted() === 'asc' && ' 🔼'}
                                                    {header.column.getIsSorted() === 'desc' && ' 🔽'}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                                        No facilities found.
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-t transition hover:bg-gray-50">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-2 text-xs">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>

                    <div className="flex gap-2">
                        <Select
                            value={pagination.pageSize.toString()}
                            onValueChange={(value) => setPagination((p) => ({ ...p, pageSize: Number(value) }))}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Rows per page" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 50, 100].map((size) => (
                                    <SelectItem key={size} value={size.toString()}>
                                        {size} rows
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                            First
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Prev
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            Last
                        </Button>
                    </div>
                </div>
            </div>
            <AddFacility
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => {
                    router.post('/references/fhud', data, {
                        onSuccess: () => setIsModalOpen(false),
                        onError: () => {
                            /* you could display errors here */
                        },
                    });
                }}
            />
        </AppLayout>
    );
};

export default FHUDIndex;
