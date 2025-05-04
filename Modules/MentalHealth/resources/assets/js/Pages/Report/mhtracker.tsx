import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import type { MasterPatient } from '@/types/modules/mental-health';
import type { PageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mental Health Tracker',
    href: '/mhtracker',
  },
];

const trackerindex: React.FC = () => {
  const { patients=[]} = usePage<PageProps<{ patients: MasterPatient[] }>>().props;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sexFilter, setSexFilter] = React.useState('');
  const [sorting, setSorting] = React.useState([]);

  const filteredPatients = React.useMemo(() => {
      return patients.filter((patient) => {
        const fullName = `${patient.pat_fname} ${patient.pat_mname ?? ''} ${patient.pat_lname}`.toLowerCase();
        const facility = patient.facility_name?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
  
        const matchesSearch = fullName.includes(search) || facility.includes(search);
        const matchesSex = sexFilter ? patient.sex_code === sexFilter : true;
  
        return matchesSearch && matchesSex;
      });
    }, [patients, searchTerm, sexFilter]);

    const columns = React.useMemo<ColumnDef<MasterPatient>[]>(() => [
      {
        accessorKey: 'master_patient_perm_id',
        header: 'Patient ID',
      },
      {
        accessorKey: 'fullname',
        header: 'Name',
        cell: ({ row }) => {
          const p = row.original;
          return `${p.pat_lname}, ${p.pat_fname} ${p.pat_mname || ''}`;
        },
      },
      {
        accessorKey: 'sex_code',
        header: 'Sex',
        cell: ({ row }) => {
          const sex = row.original.sex_code;
          return sex === 'M' ? 'Male' : sex === 'F' ? 'Female' : '';
        },
      },    
      {
        accessorKey: 'pat_birthDate',
        header: 'Birthdate',
      },
      {
        accessorKey: 'facility_name',
        header: 'Facility',
      },
      {
        accessorKey: 'provider_name',
        header: 'Provider',
      },
      {
        accessorKey: 'patient_address',
        header: 'Address',
      },
      {
        accessorFn: row => row.pat_mobile || row.pat_landline,
        id: 'contact',
        header: 'Contact',
      },     
    ], []);

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 20,    // ← default rows per page
      });

      const table = useReactTable({
          data: filteredPatients,
          columns,
          state: {
            sorting,
            pagination,
          },
          onSortingChange: setSorting,
          onPaginationChange: setPagination,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

  return (
    <AppLayout>
      <Head title="Mental Health Tracker" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Mental Health Tracker</h1>

        <div className="flex gap-4">
                  <Input
                    placeholder="Search by name or facility..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/3"
                  />
                </div>

        <div className="overflow-x-auto bg-white border rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-black text-xs text-white border-b">
              {table.getHeaderGroups().map(headerGroup => (
                              <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                  <th key={header.id} className="px-6 py-3">
                                    {header.isPlaceholder ? null : (
                                      <div
                                        className="cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                      >
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
                              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                                No patients found.
                              </td>
                            </tr>
                          ) : (
                            table.getRowModel().rows.map(row => (
                              <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                                {row.getVisibleCells().map(cell => (
                                  <td key={cell.id} className="px-6 py-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
          </table>
        </div>
         {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
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
    </AppLayout>
  );
};

export default trackerindex;
