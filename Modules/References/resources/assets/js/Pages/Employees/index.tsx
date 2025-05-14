import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Employee, PageProps } from '@/types';
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
import { Edit2, MoreHorizontal, PlusCircleIcon } from 'lucide-react';
import React from 'react';
import AddEmployee from '../Employees/AddEmployee';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'Employees', href: '/references/employees' },
];

const EmployeeIndex: React.FC = () => {
    const { employees = [] }: { employees?: Employee[] } = usePage<PageProps<{ employees?: Employee[] }>>().props;

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
    const [view, setView] = React.useState<'table' | 'grid'>('table');
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

    const filteredEmployees = React.useMemo(() => {
        const term = searchTerm.toLowerCase();
        return employees.filter((emp) =>
            [emp.emp_id, emp.emp_fname, emp.emp_mname, emp.emp_lname, emp.emp_position, emp.emp_status].some((field) =>
                field?.toLowerCase().includes(term),
            ),
        );
    }, [employees, searchTerm]);

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        console.log('Active Employee: ', employee);
        setIsEditModalOpen(true);
    };

    const columns = React.useMemo<ColumnDef<Employee>[]>(
        () => [
            { accessorKey: 'emp_id', header: 'Employee ID' },
            {
                header: 'Full Name',
                accessorFn: (row) => {
                    const middle = row.emp_mname ? ` ${row.emp_mname}` : '';
                    return `${row.emp_lname}, ${row.emp_fname}${middle}`.trim();
                },
                id: 'full_name',
            },
            { accessorKey: 'emp_position', header: 'Position' },
            { accessorKey: 'emp_status', header: 'Status' },
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
        data: filteredEmployees,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handlePagination = (newPage: number) => {
        const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
        const pageSize = pagination.pageSize;
        const page = newPage ? `&page=${newPage}` : '';
        window.location.href = `/references/employees?${searchQuery}${page}&per_page=${pageSize}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search Employees"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md"
                        />
                        <Button onClick={() => setIsAddModalOpen(true)} className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            Add Employee
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
                                                    {header.column.getIsSorted() === 'asc'
                                                        ? ' 🔼'
                                                        : header.column.getIsSorted() === 'desc'
                                                          ? ' 🔽'
                                                          : ''}
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
                                        No employees found.
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
                        Page {pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="text-sm text-gray-600">Total Employees: {filteredEmployees.length}</div>

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
                        <Button variant="outline" size="sm" onClick={() => handlePagination(1)} disabled={pagination.pageIndex === 0}>
                            First
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination(pagination.pageIndex - 1)}
                            disabled={pagination.pageIndex === 0}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination(pagination.pageIndex + 1)}
                            disabled={pagination.pageIndex === table.getPageCount() - 1}
                        >
                            Next
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination(table.getPageCount() - 1)}
                            disabled={pagination.pageIndex === table.getPageCount() - 1}
                        >
                            Last
                        </Button>
                    </div>
                </div>
            </div>

            <AddEmployee
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={(data) =>
                    router.post('/references/employees', data, {
                        onSuccess: () => {
                            setIsAddModalOpen(false);
                            router.reload({ only: ['facility', 'pagination', 'filters'] });
                        },
                    })
                }
            />
        </AppLayout>
    );
};

export default EmployeeIndex;
