import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, MHTrackConsultation, MHTrackPatient } from '@/types';
import { Head } from '@inertiajs/react';
import * as React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface Props {
    patients: MHTrackPatient[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mental Health Tracker',
        href: '/mhtracker',
    },
];

const TrackerIndex: React.FC<Props> = ({ patients }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const itemsPerPage = 5;

    React.useEffect(() => { }, [patients]);

    const hasOral = (consultations?: MHTrackConsultation[]) => !!consultations?.some((c) => c.phar_intakeUnit === 'tablet');
    const hasAmpule = (consultations?: MHTrackConsultation[]) => !!consultations?.some((c) => c.phar_intakeUnit === 'ampule');

    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const filteredData = React.useMemo(
        () => patients.filter((p) => `${p.pat_fname} ${p.pat_mname} ${p.pat_lname}`.toLowerCase().includes(searchTerm.toLowerCase())),
        [patients, searchTerm],
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = React.useMemo(
        () => filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredData, currentPage, itemsPerPage],
    );

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const handleExportExcel = () => {
        const months = Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString('default', { month: 'short' })
        );
        const data = filteredData.map((p) => {
            const consultations = p.consultation || [];
            const monthVisits = months.map((_, monthIndex) => {
                const visits = consultations.filter((c) => new Date(c.consult_date).getMonth() === monthIndex);
                return visits.length
                    ? visits
                        .map((c) =>
                            new Date(c.consult_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })
                        )
                        .join(', ')
                    : '—';
            });
            return {
                'Date of Entry': p.date_entered ? formatDate(p.date_entered) : '',
                'Tracking#': consultations.length > 0 ? consultations[0].consult_perm_id : '—',
                'PhilHealth No.': p.pat_philhealth || '—',
                'Membership Type': p.philhealth_status_code === 'M' ? 'Member' : p.philhealth_status_code === 'D' ? 'Dependent' : '—',
                'Family Name': p.pat_lname,
                'Given Name': p.pat_fname,
                'Middle Name': p.pat_mname,
                'Address': p.patient_address,
                'Birthdate': p.pat_birthDate ? formatDate(p.pat_birthDate) : '',
                'Age': calculateAge(p.pat_birthDate),
                'Sex': p.sex_code,
                'Oral': hasOral(consultations) ? '✔' : '',
                'Injectables': hasAmpule(consultations) ? '✔' : '',
                ...Object.fromEntries(months.map((m, i) => [m, monthVisits[i]])),
            };
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MHTracker');
        XLSX.writeFile(wb, 'Mental_Health_Tracker.xlsx');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Health Tracker" />
            <div className="space-y-6 p-4">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="mb-4 text-sm">
                        <span>Mental Health Tracker:</span> <span className="font-semibold">{new Date().getFullYear()}</span>
                    </div>

                    <div className="mb-6 flex flex-row items-center gap-6">
                        <div className="flex items-center gap-3">
                            <p className="text-sm whitespace-nowrap text-gray-600">Search Patient:</p>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter patient name..."
                                className="w-64 rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 rounded bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700"
                            type="button"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Export to Excel
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto rounded-lg border bg-white shadow">
                        <Table className="min-w-full text-left text-sm text-gray-700">
                            <TableHeader>
                                <TableRow className="text-center">
                                    <TableHead rowSpan={2} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Date of Entry
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Tracking#
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        PhilHealth No.
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Membership Type
                                    </TableHead>
                                    <TableHead colSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Patient Name
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Address
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Birthdate
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Age
                                    </TableHead>
                                    <TableHead rowSpan={3} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Sex
                                    </TableHead>
                                    <TableHead colSpan={2} className="border-b bg-black text-center text-xs text-white border p-2">
                                        Medicine
                                    </TableHead>
                                    <TableHead colSpan={12} className="border-b bg-black text-center text-xs text-white rounded-tr-lg border p-2">
                                        Visitation
                                    </TableHead>
                                </TableRow>
                                <TableRow className="text-center">
                                    <TableHead className="border-b bg-black text-xs text-center text-white border p-2">Family Name</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-center text-white border p-2">Given Name</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-center text-white border p-2">Middle Name</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-center text-white border p-2">Oral</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-center text-white border p-2">Injectables</TableHead>
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <TableHead key={index} className="border-b bg-black text-xs text-white text-center border p-2">
                                            {new Date(0, index).toLocaleString('default', { month: 'short' })}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={18} className="p-4 text-center text-gray-500">
                                            No patients found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedData.map((p) => (
                                        <TableRow key={p.id} className="text-center text-[10px] hover:bg-gray-50">
                                            <TableCell className="border p-2">{p.date_entered ? formatDate(p.date_entered) : ''}</TableCell>
                                            <TableCell className="border p-2">
                                                {p.consultation && p.consultation.length > 0 ? p.consultation[0].consult_perm_id : '—'}
                                            </TableCell>
                                            <TableCell className="border p-2">{p.pat_philhealth || '—'}</TableCell>
                                            <TableCell className="border p-2">
                                                {p.philhealth_status_code === 'M' ? 'Member' : p.philhealth_status_code === 'D' ? 'Dependent' : '—'}
                                            </TableCell>
                                            <TableCell className="border p-2">{p.pat_lname}</TableCell>
                                            <TableCell className="border p-2">{p.pat_fname}</TableCell>
                                            <TableCell className="border p-2">{p.pat_mname}</TableCell>
                                            <TableCell className="border p-2">{p.patient_address}</TableCell>
                                            <TableCell className="border p-2">{p.pat_birthDate ? formatDate(p.pat_birthDate) : ''}</TableCell>
                                            <TableCell className="border p-2">{calculateAge(p.pat_birthDate)}</TableCell>
                                            <TableCell className="border p-2">{p.sex_code}</TableCell>
                                            <TableCell className="border p-2">{hasOral(p.consultation) ? '✔' : ''}</TableCell>
                                            <TableCell className="border p-2">{hasAmpule(p.consultation) ? '✔' : ''}</TableCell>
                                            {Array.from({ length: 12 }, (_, monthIndex) => {
                                                const consultationsThisMonth =
                                                    p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === monthIndex) ?? [];
                                                return (
                                                    <TableCell key={monthIndex} className="border p-2">
                                                        {consultationsThisMonth.length > 0
                                                            ? consultationsThisMonth
                                                                .map((c) =>
                                                                    new Date(c.consult_date).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                    }),
                                                                )
                                                                .join(', ')
                                                            : '—'}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages || 1}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default TrackerIndex;