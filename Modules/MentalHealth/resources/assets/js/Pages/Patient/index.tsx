import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, MasterPatient, PageProps } from '@/types';
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
import { Edit2, Eye, MoreHorizontal, Printer, Stethoscope, UserPlus } from 'lucide-react';
import * as React from 'react';
import PatientConsent from '../Forms/PatientConsent';
import PatientConsentModal from '../Forms/PatientConsentModal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Patients', href: '/patients' }];

export interface PatientConsentModalProps {
    open: boolean;
    onClose: () => void;
    patientId: number;
}

const PatientIndex: React.FC = () => {
    const { patients = [] }: { patients?: MasterPatient[] } = usePage<PageProps<{ patients: MasterPatient[] }>>().props;

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sexFilter, setSexFilter] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
    const [isConsentModalOpen, setIsConsentModalOpen] = React.useState(false);
    const [selectedPatient, setSelectedPatient] = React.useState<MasterPatient | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [isPatientConsentModalOpen, setIsPatientConsentModalOpen] = React.useState(false);

    const openConsentModal = (patient: MasterPatient) => {
        setSelectedPatient(patient);
        setIsConsentModalOpen(true);
    };

    const closeConsentModal = () => {
        setIsConsentModalOpen(false);
        setSelectedPatient(null);
    };

    const filteredPatients = React.useMemo(() => {
        return patients.filter((patient: MasterPatient) => {
            const fullName = `${patient.pat_fname} ${patient.pat_mname ?? ''} ${patient.pat_lname}`.toLowerCase();
            const facility = patient.facility_name?.toLowerCase() || '';
            const search = searchTerm.toLowerCase();

            const matchesSearch = fullName.includes(search) || facility.includes(search);
            const matchesSex = sexFilter ? patient.sex_code === sexFilter : true;

            return matchesSearch && matchesSex;
        });
    }, [patients, searchTerm, sexFilter]);

    const columns = React.useMemo<ColumnDef<MasterPatient>[]>(
        () => [
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
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/patients/${patient.id}/view`} className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        View Details
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/patients/${patient.id}/edit`} className="flex items-center gap-2">
                                        <Edit2 className="h-4 w-4" />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Button
                                        onClick={() => openConsentModal(patient)}
                                        className="flex items-center gap-2 bg-transparent text-black hover:bg-gray-100"
                                    >
                                        <Printer className="h-4 w-4" />
                                        Patient Consent
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewConsent(patient.id)}>
                                    <Printer className="h-4 w-4" />
                                    Patient Consent
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExportPDF(row.original)}>
                                    <Printer className="h-4 w-4" />
                                    Sample Consent
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

    const handlePagination = (newPage: number) => {
        router.visit(`/patients`, {
            data: {
                page: newPage + 1,
                per_page: pagination.pageSize,
                search: searchTerm || undefined,
            },
            preserveState: true,
        });
    };

    const handleViewConsent = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleExportPDF = (patient: MasterPatient) => {
        const url = `/patients/${patient.id}/consent-pdf`;
        window.open(url, '_blank'); // opens in new tab or starts download
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patients" />
            <div className="space-y-6 p-6">
                <div className="flex">
                    <Link
                        href="/patients/create"
                        className="flex items-center gap-2 rounded-l-lg border border-green-600 px-4 py-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                    >
                        <UserPlus className="h-4 w-4" />
                        Add Patient
                    </Link>
                    <Link
                        href="/patients/create"
                        className="-ml-px flex items-center gap-2 rounded-r-lg border border-green-600 px-4 py-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                    >
                        <Stethoscope className="h-4 w-4" />
                        Patient Consultation
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Search by name or facility..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/3"
                    />
                    <div className="text-sm text-gray-600">Total Patients: {filteredPatients.length}</div>
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
                                        No patients found.
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
                    <div className="text-sm text-gray-600">Total Patients: {filteredPatients.length}</div>

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
                        <Button variant="outline" size="sm" onClick={() => handlePagination(0)} disabled={pagination.pageIndex === 0}>
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
                            disabled={pagination.pageIndex >= table.getPageCount() - 1}
                        >
                            Next
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination(table.getPageCount() - 1)}
                            disabled={pagination.pageIndex >= table.getPageCount() - 1}
                        >
                            Last
                        </Button>
                    </div>
                </div>

                {/* PatientConsent modal */}
                {isConsentModalOpen && selectedPatient && (
                    <PatientConsent
                        patient={{
                            pat_fname: selectedPatient.pat_fname,
                            pat_lname: selectedPatient.pat_lname,
                            sex_code: selectedPatient.sex_code,
                            pat_birthDate: selectedPatient.pat_birthDate,
                            pat_mobile: selectedPatient.pat_mobile,
                            patient_address: selectedPatient.patient_address,
                        }}
                    />
                )}

                {showModal && selectedId !== null && (
                    <PatientConsentModal
                        open={showModal}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedId(null);
                        }}
                        patientId={selectedId}
                    />
                )}
            </div>
        </AppLayout>
    );
};

export default PatientIndex;
