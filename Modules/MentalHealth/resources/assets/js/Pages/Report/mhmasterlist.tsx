import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, MHMasterPatient } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as React from 'react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet } from 'lucide-react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Mental Health Masterlist', href: '/mhmasterlist' }];

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

function getAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const MhMasterlistIndex: React.FC = () => {
    const { props } = usePage();
    const patients = props.patients as MHMasterPatient[];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = useMemo(() => {
        return patients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [patients, currentPage]);

    const totalPages = Math.ceil(patients.length / itemsPerPage);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const handleExportExcel = () => {
        const data = patients.map((p) => {
            const diagnosis = p.assessment?.diagnosis?.toLowerCase() || '';
            const hasDiagnosis = (d: string) => diagnosis.includes(d);
            const meds = `${p.assessment?.phar_med ?? ''} ${p.assessment?.phar_intakeUnit ?? ''} ${p.assessment?.phar_freqUnit ?? ''}`.trim();
            // For follow-up, join all months' consultations
            const followUps = Array.from({ length: 12 }, (_, i) => {
                const consultations = p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === i) || [];
                return consultations.length
                    ? consultations
                        .map((c) =>
                            new Date(c.consult_date).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }),
                        )
                        .join(', ')
                    : '—';
            });

            return {
                'ID No.': p.consultation && p.consultation.length > 0 ? p.consultation[0].consult_perm_id : '—',
                'Assessment/Registration': p.date_entered ? formatDate(p.date_entered) : 'N/A',
                'Assessed By': p.assessment?.phar_doc || 'N/A',
                'Family Name': p.pat_lname,
                'Given Name': p.pat_fname,
                'Middle Name': p.pat_mname,
                'Address': p.patient_address,
                'Age': p.pat_birthDate ? getAge(p.pat_birthDate) : '',
                'Sex (M)': p.sex_code === 'M' ? '✔' : '',
                'Sex (F)': p.sex_code === 'F' ? '✔' : '',
                'Occupation': p.occupation_code,
                'Contact No.': p.pat_mobile ?? 'N/A',
                'Depression': hasDiagnosis('depression') ? '✔' : '',
                'Psychoses': hasDiagnosis('psychoses') ? '✔' : '',
                'Epilepsy': hasDiagnosis('epilepsy') ? '✔' : '',
                'Child/Adolescent Disorders': hasDiagnosis('child') ? '✔' : '',
                'Dementia': hasDiagnosis('dementia') ? '✔' : '',
                'Substance Use': hasDiagnosis('substance use') ? '✔' : '',
                'Self-Harm': hasDiagnosis('self-harm') ? '✔' : '',
                'Others': p.others ?? 'N/A',
                'Medications': meds || 'N/A',
                'Referred By Name': p.assessment?.phar_doc || 'N/A',
                'Referred By Contact No.': p.pat_mobile ?? 'N/A',
                'Remarks': p.assessment?.phar_remarks || 'N/A',
                ...Object.fromEntries(months.map((month, i) => [month.slice(0, 3), followUps[i]])),
            };
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Masterlist');
        XLSX.writeFile(wb, 'Mental_Health_Masterlist.xlsx');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Health Masterlist" />
            <div className="space-y-4 p-4">
                <div className="w-auto overflow-x-auto rounded-2xl border bg-white p-6 shadow-lg">
                    <div className="mb-6 flex items-center justify-center space-x-4">
                        {/* DOH Logo */}
                        <AppLogoDOH />

                        {/* Center Text */}
                        <div className="flex flex-col items-center text-center">
                            <p className="text-sm text-gray-600">Republic of the Philippines</p>
                            <p className="text-sm text-gray-600">Department of Health</p>
                            <h1 className="text-lg font-bold text-gray-800 uppercase">Center for Health Development - Caraga</h1>
                            <p className="text-sm text-gray-600">National Mental Health Program</p>
                            <p className="text-sm font-medium text-gray-700 uppercase">Mental Health Client Masterlist</p>
                        </div>

                        {/* BP Logo */}
                        <AppLogoBP />
                    </div>

                    <div className="mb-4 flex justify-left">
                        <button
                            onClick={handleExportExcel}
                            className="ml-4 flex items-center gap-2 rounded bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700"
                            type="button"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Export to Excel
                        </button>
                    </div>

                    {/* Table */}
                    <Table className="min-w-full border-collapse text-left text-sm text-gray-800">
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead rowSpan={3} className="bg-black text-xs text-center text-white border p-2">
                                    ID No.
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-35 border p-2">
                                    Assessment/Registration
                                    <br />
                                    (MM/DD/YYYY)
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-35 border p-2">
                                    Assessed By
                                </TableHead>
                                <TableHead colSpan={3} className="bg-black text-xs text-center text-white w-80 border p-2">
                                    Name of Patient
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-50 border p-2">
                                    Address
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-16 border p-2">
                                    Age
                                </TableHead>
                                <TableHead colSpan={2} className="bg-black text-xs text-center text-white w-16 border p-2">
                                    Sex
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-32 border p-2">
                                    Occupation
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-32 border p-2">
                                    Contact No.
                                </TableHead>
                                <TableHead colSpan={7} className="bg-black text-xs text-center text-white w-150 border p-2">
                                    Diagnosis
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-32 border p-2">
                                    Others
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-center text-white w-64 border p-2">
                                    Medications
                                    <br />
                                    (Dosage & Frequency)
                                </TableHead>
                                <TableHead colSpan={2} className="bg-black text-xs text-center text-white w-60 border p-2">
                                    Referred By
                                </TableHead>
                                <TableHead rowSpan={3} className="bg-black text-xs text-white w-40 border p-2">
                                    Remarks
                                </TableHead>
                                <TableHead colSpan={12} className="bg-black text-xs text-center text-white w-250 border p-2">
                                    Follow-up
                                </TableHead>
                            </TableRow>
                            <TableRow className="text-center text-xs">
                                <TableHead className="bg-black text-xs text-white border p-2">Family Name</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Given Name</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Middle Name</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">M</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">F</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Depression</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Psychoses</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Epilepsy</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Child/Adolescent Disorders</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Dementia</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Substance Use</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Self-Harm</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Name</TableHead>
                                <TableHead className="bg-black text-xs text-white border p-2">Contact No.</TableHead>
                                {months.map((month) => (
                                    <TableHead key={month} className="bg-black text-xs text-white text-center border p-2">
                                        {month.slice(0, 3)}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((p) => {
                                const diagnosis = p.assessment?.diagnosis?.toLowerCase() || '';
                                const hasDiagnosis = (d: string) => diagnosis.includes(d);
                                const meds =
                                    `${p.assessment?.phar_med ?? ''} ${p.assessment?.phar_intakeUnit ?? ''} ${p.assessment?.phar_freqUnit ?? ''}`.trim();

                                return (
                                    <TableRow key={p.id} className="text-center text-xs hover:bg-gray-50">
                                        <TableCell className="border p-2 text-xs">
                                            {p.consultation && p.consultation.length > 0 ? p.consultation[0].consult_perm_id : '—'}
                                        </TableCell>
                                        <TableCell className="border p-2 text-xs">{p.date_entered ? formatDate(p.date_entered) : 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.assessment?.phar_doc || 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_lname}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_fname}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_mname}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.patient_address}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_birthDate ? getAge(p.pat_birthDate) : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.sex_code === 'M' ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.sex_code === 'F' ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.occupation_code}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_mobile ?? 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('depression') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('psychoses') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('epilepsy') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('child') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('dementia') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('substance use') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{hasDiagnosis('self-harm') ? '✔' : ''}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.others ?? 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{meds || 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.assessment?.phar_doc || 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.pat_mobile ?? 'N/A'}</TableCell>
                                        <TableCell className="border p-2 text-xs">{p.assessment?.phar_remarks || 'N/A'}</TableCell>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const consultations = p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === i) || [];
                                            return (
                                                <TableCell key={i} className="border p-2 text-xs">
                                                    {consultations.length
                                                        ? consultations
                                                            .map((c) =>
                                                                new Date(c.consult_date).toLocaleDateString('en-US', {
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                    year: 'numeric',
                                                                }),
                                                            )
                                                            .join(', ')
                                                        : '—'}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
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
                                disabled={currentPage === totalPages}
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

export default MhMasterlistIndex;