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
import { UserPlus } from 'lucide-react';
import PatientConsent from '../Forms/patientconsent'; // Corrected import path

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

  const [sorting, setSorting] = React.useState([]);
  const [isConsentModalOpen, setIsConsentModalOpen] = React.useState(false); // State to control modal visibility
  const [selectedPatient, setSelectedPatient] = React.useState<MasterPatient | null>(null); // State for selected patient

  const openConsentModal = (patient: MasterPatient) => {
    setSelectedPatient(patient);
    setIsConsentModalOpen(true); // Show the modal
  };

  const closeConsentModal = () => {
    setIsConsentModalOpen(false); // Close the modal
    setSelectedPatient(null); // Reset selected patient
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

  const table = useReactTable({
    data: patients,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patients" />
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/patients/create"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Patient
          </Link>
          <Link
            href="/consultations"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Patient Consultation
          </Link>
        </div>

        {/* Search and Filter Section */}

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

        {/* Conditionally render the PatientConsent modal */}
        {isConsentModalOpen && selectedPatient && (
          <PatientConsent
            patient={selectedPatient}
            onClose={closeConsentModal} // Close function
          />
        )}

      </div>
    </AppLayout>
  );
};

export default PatientIndex;
