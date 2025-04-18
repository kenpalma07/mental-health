import * as React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import { MoreHorizontal, Edit2, Printer } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import type { MasterPatient } from '@/types/modules/mental-health';
import type { BreadcrumbItem } from '@/types';
import { UserPlus  } from 'lucide-react'; 

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Patients', href: '/patients' },
];

const PatientIndex: React.FC = () => {
  const { patients, filters, pagination } = usePage<
    PageProps<{
      patients: MasterPatient[];
      filters: any;
      pagination: any;
    }>
  >().props;

  const { data, setData, get } = useForm({
    search: filters.search || '',
    sex: filters.sex || '',
    page: pagination.current_page || 1,
  });

  const [sorting, setSorting] = React.useState([]);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setData('search', value);
    setData('page', 1); // Reset to page 1 when searching

    if (timeout.current) clearTimeout(timeout.current); // Clear the previous timeout

    timeout.current = setTimeout(() => {
      // Send empty string if the search bar is cleared, else send the search term
      get('/patients', {
        preserveState: true,
        data: {
          search: value.trim() || '', // If search is empty, pass an empty string
          sex: filters.sex, // Preserve the sex filter
          page: 1, // Always go to page 1 on a new search
        },
      });
    }, 300);
  };

  const handleSexFilter = (value: string) => {
    setData('sex', value);
    setData('page', 1); // Reset to page 1 when filtering by sex
    get('/patients', { preserveState: true });
  };

  const handleClearFilters = () => {
    // Reset all filters to their initial values
    setData('search', '');
    setData('sex', '');
    setData('page', 1);

    // Re-fetch the patients with no filters
    get('/patients', { preserveState: true });
  };

  const columns = React.useMemo<ColumnDef<MasterPatient>[]>(() => [
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
    {
      id: 'actions',
      enableHiding: false,
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/patients/${patient.id}/edit`} className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/patients/${patient.id}/consent`} className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Patient Consent
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/patients/${patient.id}/print-itr`} target="_blank" className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print ITR
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: patients,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: pagination.last_page,
  });

  const goToPage = (page: number) => {
    setData('page', page);
    get('/patients', { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patients" />
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/patients/create"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> {/* Add UserPlus icon here */}
            Add Patient
          </Link>
          <Link
            href="/consultations"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> {/* Add UserPlus icon here */}
            Patient Consultation
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <Input
            value={data.search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search patients..."
            className="w-full sm:w-1/3"
          />
          {/* Clear Filters Button */}
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="px-4 py-2 border border-gray-400"
          >
            Clear Filters
          </Button>
        </div>

        <div className="overflow-x-auto bg-white border rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 border-b">
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

        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => goToPage(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span>
            Page {pagination.current_page} of {pagination.last_page}
          </span>
          <Button
            onClick={() => goToPage(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientIndex;
