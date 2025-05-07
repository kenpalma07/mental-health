import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, FHUD, PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
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
import { Edit2, PlusCircleIcon } from 'lucide-react';
import React from 'react';
import AddFacility from '../FHUD/AddFacility';
import EditFacility from '../FHUD/EditFacility';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'FHUD', href: '/references/fhud' },
];

const FHUDIndex: React.FC = () => {
    const { facility } = usePage<PageProps<{ facility: FHUD[] }>>().props;

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
    const [view, setView] = React.useState<'table' | 'grid'>('table');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [selectedFacility, setSelectedFacility] = React.useState<FHUD | null>(null);

    const filteredFacilities = React.useMemo(() => {
        const term = searchTerm.toLowerCase();
        return facility.filter((fac: FHUD) => [fac.fhudcode, fac.facility_name, fac.faccode].some((field) => field?.toLowerCase().includes(term)));
    }, [facility, searchTerm]);

    const columns = React.useMemo<ColumnDef<FHUD>[]>(() => [
        { accessorKey: 'fhudcode', header: 'Code' },
        { accessorKey: 'facility_name', header: 'Facility Name' },
        {
            accessorKey: 'date_mod',
            header: 'Date Added',
            cell: ({ row }) => dayjs(row.original.date_mod).format('YYYY-MM-DD'),
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
            header: 'Actions',
            enableHiding: false,
            cell: ({ row }) => {
                const fhud = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-lg font-bold">
                                ...
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedFacility(fhud);
                                    setEditModalOpen(true);
                                }}
                            >
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], []);

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
                            className="w-full max-w-md"
                        />
                        <Button onClick={() => setIsModalOpen(true)} className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="mr-1 h-4 w-4" /> Add
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
                        <Button variant="outline" size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
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
                        onSuccess: () => {
                            setIsModalOpen(false);
                            setSearchTerm('');
                            setPagination({ pageIndex: 0, pageSize: 10 });
                        },
                    });
                }}
            />

            <EditFacility
                isOpen={editModalOpen}
                facility={selectedFacility}
                onClose={() => setEditModalOpen(false)}
                onSubmit={(data) => {
                    if (!selectedFacility) return;
                    router.put(`/references/fhud/${selectedFacility.id}`, data, {
                        onSuccess: () => {
                            setEditModalOpen(false);
                            setSelectedFacility(null);
                            router.visit(window.location.href, {
                                preserveScroll: true,
                                preserveState: true,
                              });
                              
                            setSearchTerm('');
                            setPagination({ pageIndex: 0, pageSize: 10 });
                        },
                    });
                }}
            />
        </AppLayout>
    );
};

export default FHUDIndex;
