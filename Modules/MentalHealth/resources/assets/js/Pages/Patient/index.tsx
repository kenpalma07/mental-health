import * as React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
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
import { MoreHorizontal, Edit2, Printer, UserPlus, Eye, Stethoscope} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import type { MasterPatient } from '@/types/modules/mental-health';
import type { BreadcrumbItem } from '@/types';
import PatientConsent from '../Forms/patientconsent';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Patients', href: '/patients' },
];

const PatientIndex: React.FC = () => {
  const { patients } = usePage<PageProps<{ patients: MasterPatient[] }>>().props;

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sexFilter, setSexFilter] = React.useState('');
  const [sorting, setSorting] = React.useState([]);
  const [isConsentModalOpen, setIsConsentModalOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<MasterPatient | null>(null);

  const openConsentModal = (patient: MasterPatient) => {
    setSelectedPatient(patient);
    setIsConsentModalOpen(true);
  };

  const closeConsentModal = () => {
    setIsConsentModalOpen(false);
    setSelectedPatient(null);
  };

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
              <Link href={`/patients/${patient.id}/view`} className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/patients/${patient.id}/edit`} className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  onClick={() => openConsentModal(patient)}
                  className="flex items-center gap-2 bg-transparent text-black hover:bg-gray-100"
                >
                  <Printer className="w-4 h-4" />
                  Patient Consent
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  // after your other useState calls
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
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patients" />
      <div className="p-6 space-y-6">
        <div className="flex">
          <Link
            href="/patients/create"
            className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center gap-2 rounded-l-lg"
          >
            <UserPlus className="w-4 h-4" />
            Add Patient
          </Link>
          <Link
            href="/consultations"
            className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center gap-2 rounded-r-lg -ml-px"
          >
            <Stethoscope className="w-4 h-4" />
            Patient Consultation
          </Link>
        </div>
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

        {/* PatientConsent modal */}
        {isConsentModalOpen && selectedPatient && (
          <PatientConsent
            patient={selectedPatient}
            onClose={closeConsentModal}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default PatientIndex;
