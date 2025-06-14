import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Edit2, MoreHorizontal, PlusCircleIcon } from 'lucide-react';
import React from 'react';
import AddFacility from '../FHUD/AddFacility';
import EditFacility from '../FHUD/EditFacility';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'FHUD', href: '/references/fhud' },
];

const FHUDIndex: React.FC = () => {
    const { facility, pagination, filters, facilityHealthRoute } =
        usePage<PageProps<{ facility: FHUD[]; pagination: any; filters: any; facilityHealthRoute: string }>>().props;
    const [searchTerm, setSearchTerm] = React.useState(filters?.search || '');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [selectedFacility, setSelectedFacility] = React.useState<FHUD | null>(null);

    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;
    const perPage = pagination.per_page;

    const handleEdit = (fhud: FHUD) => {
        setSelectedFacility(fhud);
        setIsEditModalOpen(true);
    };

    const columns = React.useMemo<ColumnDef<FHUD>[]>(
        () => [
            { accessorKey: 'fhudcode', header: 'Code' },
            { accessorKey: 'facility_name', header: 'Facility Name' },
            { accessorKey: 'provider_name', header: 'Name of the Provider' },
            { accessorKey: 'faccode', header: 'Facility Code' },
            {
                accessorKey: 'date_mod',
                header: 'Date Registered',
                cell: ({ row }) => dayjs(row.original.date_mod).format('MM-DD-YYYY'),
            },
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
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: facility,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        router.get(facilityHealthRoute, { search: value, page: 1 }, { preserveScroll: true, preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FHUD Facilities" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search by facility code..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full max-w-md"
                        />
                        <Button onClick={() => setIsModalOpen(true)} className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="mr-1 h-4 w-4" /> Add
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="border-b bg-black text-xs text-white">
                            {table.getHeaderGroups().map((group) => (
                                <tr key={group.id}>
                                    {group.headers.map((header) => (
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
                        Page {currentPage} of {lastPage}
                    </div>
                    <div className="text-sm text-gray-600">Total Facilities: {pagination.total}</div>

                    <div className="flex gap-2">
                        <Select
                            value={perPage.toString()}
                            onValueChange={(value) =>
                                router.get(
                                    '/references/fhud',
                                    {
                                        search: searchTerm,
                                        page: 1,
                                        per_page: Number(value),
                                    },
                                    { preserveScroll: true },
                                )
                            }
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

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get('/references/fhud', { page: 1, search: searchTerm })}
                            disabled={currentPage === 1}
                        >
                            First
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get('/references/fhud', { page: currentPage - 1, search: searchTerm })}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get('/references/fhud', { page: currentPage + 1, search: searchTerm })}
                            disabled={currentPage === lastPage}
                        >
                            Next
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get('/references/fhud', { page: lastPage, search: searchTerm })}
                            disabled={currentPage === lastPage}
                        >
                            Last
                        </Button>
                    </div>
                </div>
            </div>

            <AddFacility
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) =>
                    router.post('/references/fhud', data, {
                        onSuccess: () => {
                            setIsModalOpen(false);
                            setSearchTerm('');
                            router.reload({ only: ['facility', 'pagination', 'filters'] });
                        },
                    })
                }
            />

            {selectedFacility && (
                <EditFacility
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedFacility(null);
                    }}
                    facility={selectedFacility}
                    onSubmit={(data) =>
                        router.put(`/references/fhud/${selectedFacility.id}`, data, {
                            onSuccess: () => {
                                setIsEditModalOpen(false);
                                setSelectedFacility(null);
                                setSearchTerm('');
                                router.reload({ only: ['facility', 'pagination', 'filters'] });
                            },
                        })
                    }
                />
            )}
        </AppLayout>
    );
};

export default FHUDIndex;
