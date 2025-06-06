import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, MHMasterPatient } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as React from 'react';
import { useMemo, useState } from 'react';


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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Health Masterlist" />
            <div className="space-y-4 p-4">
                <div className="w-auto overflow-x-auto rounded-2xl border bg-white p-6 shadow-lg">
                    <div className="mb-6 flex items-center justify-center space-x-4">
                        {/* DOH Logo */}
                        <AppLogoDOH/>

                        {/* Center Text */}
                        <div className="flex flex-col items-center text-center">
                            <p className="text-sm text-gray-600">Republic of the Philippines</p>
                            <p className="text-sm text-gray-600">Department of Health</p>
                            <h1 className="text-lg font-bold text-gray-800 uppercase">Center for Health Development - Caraga</h1>
                            <p className="text-sm text-gray-600">National Mental Health Program</p>
                            <p className="text-sm font-medium text-gray-700 uppercase">Mental Health Client Masterlist</p>
                        </div>

                        {/* BP Logo */}
                        <AppLogoBP/>
                    </div>

                    {/* Table */}
                    <table className="min-w-full border-collapse text-left text-sm text-gray-800">
                        <thead className="bg-black text-xs text-white">
                            <tr className="text-center">
                                <th rowSpan={3} className="border p-2">
                                    ID No.
                                </th>
                                <th rowSpan={3} className="w-35 border p-2">
                                    Assessment/Registration
                                    <br />
                                    (MM/DD/YYYY)
                                </th>
                                <th rowSpan={3} className="w-35 border p-2">
                                    Assessed By
                                </th>
                                <th colSpan={3} className="w-80 border p-2">
                                    Name of Patient
                                </th>
                                <th rowSpan={3} className="w-50 border p-2">
                                    Address
                                </th>
                                <th rowSpan={3} className="w-16 border p-2">
                                    Age
                                </th>
                                <th colSpan={2} className="w-16 border p-2">
                                    Sex
                                </th>
                                <th rowSpan={3} className="w-32 border p-2">
                                    Occupation
                                </th>
                                <th rowSpan={3} className="w-32 border p-2">
                                    Contact No.
                                </th>
                                <th colSpan={7} className="w-150 border p-2">
                                    Diagnosis
                                </th>
                                <th rowSpan={3} className="w-32 border p-2">
                                    Others
                                </th>
                                <th rowSpan={3} className="w-64 border p-2">
                                    Medications
                                    <br />
                                    (Dosage & Frequency)
                                </th>
                                <th colSpan={2} className="w-60 border p-2">
                                    Referred By
                                </th>
                                <th rowSpan={3} className="w-40 border p-2">
                                    Remarks
                                </th>
                                <th colSpan={12} className="w-250 border p-2">
                                    Follow-up
                                </th>
                            </tr>
                            <tr className="text-center text-xs">
                                <th className="border p-2">Family Name</th>
                                <th className="border p-2">Given Name</th>
                                <th className="border p-2">Middle Name</th>
                                <th className="border p-2">M</th>
                                <th className="border p-2">F</th>
                                <th className="border p-2">Depression</th>
                                <th className="border p-2">Psychoses</th>
                                <th className="border p-2">Epilepsy</th>
                                <th className="border p-2">Child/Adolescent Disorders</th>
                                <th className="border p-2">Dementia</th>
                                <th className="border p-2">Substance Use</th>
                                <th className="border p-2">Self-Harm</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Contact No.</th>
                                {months.map((month) => (
                                    <th key={month} className="border p-2">
                                        {month.slice(0, 3)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((p) => {
                                const diagnosis = p.assessment?.diagnosis?.toLowerCase() || '';
                                const hasDiagnosis = (d: string) => diagnosis.includes(d);
                                const meds =
                                    `${p.assessment?.phar_med ?? ''} ${p.assessment?.phar_intakeUnit ?? ''} ${p.assessment?.phar_freqUnit ?? ''}`.trim();

                                return (
                                    <tr key={p.id} className="text-center text-xs hover:bg-gray-50">
                                        <td className="border p-2 text-xs">
                                            {p.consultation && p.consultation.length > 0 ? p.consultation[0].consult_perm_id : '—'}
                                        </td>
                                        <td className="border p-2 text-xs">{p.date_entered ? formatDate(p.date_entered) : 'N/A'}</td>
                                        <td className="border p-2 text-xs">{p.assessment?.phar_doc || 'N/A'}</td>
                                        <td className="border p-2 text-xs">{p.pat_lname}</td>
                                        <td className="border p-2 text-xs">{p.pat_fname}</td>
                                        <td className="border p-2 text-xs">{p.pat_mname}</td>
                                        <td className="border p-2 text-xs">{p.patient_address}</td>
                                        <td className="border p-2 text-xs">{p.pat_birthDate ? getAge(p.pat_birthDate) : ''}</td>
                                        <td className="border p-2 text-xs">{p.sex_code === 'M' ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{p.sex_code === 'F' ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{p.occupation_code}</td>
                                        <td className="border p-2 text-xs">{p.pat_mobile ?? 'N/A'}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('depression') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('psychoses') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('epilepsy') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('child') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('dementia') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('substance use') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{hasDiagnosis('self-harm') ? '✔' : ''}</td>
                                        <td className="border p-2 text-xs">{p.others ?? 'N/A'}</td>
                                        <td className="border p-2 text-xs">{meds || 'N/A'}</td>
                                        <td className="border p-2 text-xs">{p.assessment?.phar_doc || 'N/A'}</td>
                                        <td className="border p-2 text-xs">{p.pat_mobile ?? 'N/A'}</td>
                                        <td className="border p-2 text-xs">{p.assessment?.phar_remarks || 'N/A'}</td>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const consultations = p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === i) || [];

                                            return (
                                                <td key={i} className="border p-2 text-xs">
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
                                                </td>
                                            );
                                        })}

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

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
