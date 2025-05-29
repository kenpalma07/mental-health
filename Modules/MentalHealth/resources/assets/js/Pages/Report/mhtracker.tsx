import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as React from 'react';

type Consultation = {
    consult_perm_id: string;
    consult_date: string;
    phar_intakeUnit?: string;
};

type Patient = {
    id: number;
    date_entered: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    phil_health?: string;
    phil_member?: string;
    patient_address: string;
    pat_birthDate: string;
    sex_code: string;
    pat_philhealth: string;
    philhealth_status_code: string;
    phar_intakeUnit: string;
    consultation?: Consultation[];
};

interface Props {
    patients: Patient[];
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

    React.useEffect(() => {}, [patients]);

    const hasOral = (consultations?: Consultation[]) => !!consultations?.some((c) => c.phar_intakeUnit === 'tablet');

    const hasAmpule = (consultations?: Consultation[]) => !!consultations?.some((c) => c.phar_intakeUnit === 'ampule');

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Health Tracker" />
            <div className="space-y-6 p-4">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="mb-4 text-sm">
                        <span>Mental Health Tracker:</span> <span className="font-semibold">{new Date().getFullYear()}</span>
                    </div>
                    <div className="mb-6 flex flex-col">
                        <div className="mt-3 flex items-center gap-3">
                            <p className="text-sm whitespace-nowrap text-gray-600">Search Patient:</p>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter patient name..."
                                className="w-64 rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg border bg-white shadow">
                        <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="border-b bg-black text-xs text-white">
                                <tr className="text-center">
                                    <th rowSpan={2} className="border p-2">
                                        Date of Entry
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Tracking#
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        PhilHealth No.
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Membership Type
                                    </th>
                                    <th colSpan={3} className="border p-2">
                                        Patient Name
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Address
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Birthdate
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Age
                                    </th>
                                    <th rowSpan={3} className="border p-2">
                                        Sex
                                    </th>
                                    <th colSpan={2} className="border p-2">
                                        Medicine
                                    </th>
                                    <th colSpan={12} className="rounded-tr-lg border p-2">
                                        Visitation
                                    </th>
                                </tr>
                                <tr className="text-center">
                                    <th className="border p-2">Family Name</th>
                                    <th className="border p-2">Given Name</th>
                                    <th className="border p-2">Middle Name</th>
                                    <th className="border p-2">Oral</th>
                                    <th className="border p-2">Injectables</th>
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <th key={index} className="border p-2">
                                            {new Date(0, index).toLocaleString('default', { month: 'short' })}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={18} className="p-4 text-center text-gray-500">
                                            No patients found.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((p) => (
                                        <tr key={p.id} className="text-center text-[10px] hover:bg-gray-50">
                                            <td className="border p-2">{p.date_entered ? formatDate(p.date_entered) : ''}</td>
                                            <td className="border p-2">
                                                {p.consultation && p.consultation.length > 0 ? p.consultation[0].consult_perm_id : '—'}
                                            </td>
                                            <td className="border p-2">{p.pat_philhealth || '—'}</td>
                                            <td className="border p-2">
                                                {p.philhealth_status_code === 'M' ? 'Member' : p.philhealth_status_code === 'D' ? 'Dependent' : '—'}
                                            </td>

                                            <td className="border p-2">{p.pat_lname}</td>
                                            <td className="border p-2">{p.pat_fname}</td>
                                            <td className="border p-2">{p.pat_mname}</td>
                                            <td className="border p-2">{p.patient_address}</td>
                                            <td className="border p-2">{p.pat_birthDate ? formatDate(p.pat_birthDate) : ''}</td>
                                            <td className="border p-2">{calculateAge(p.pat_birthDate)}</td>
                                            <td className="border p-2">{p.sex_code}</td>
                                            <td className="border p-2">{hasOral(p.consultation) ? '✔' : ''}</td>
                                            <td className="border p-2">{hasAmpule(p.consultation) ? '✔' : ''}</td>
                                            {Array.from({ length: 12 }, (_, monthIndex) => {
                                                const consultationsThisMonth =
                                                    p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === monthIndex) ?? [];
                                                return (
                                                    <td key={monthIndex} className="border p-2">
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
                                                    </td>
                                                );
                                            })}

                                            {/* For temporary change */}
                                            {/* {Array.from({ length: 12 }, (_, monthIndex) => {
                                                const consultationsThisMonth =
                                                    p.consultation?.filter((c) => new Date(c.consult_date).getMonth() === monthIndex) ?? [];
                                                return (
                                                    <td key={monthIndex} className="border p-2">
                                                        {consultationsThisMonth.length > 0
                                                            ? consultationsThisMonth
                                                                  .map((c) => new Date(c.consult_date).toLocaleDateString())
                                                                  .join(', ')
                                                            : '—'}
                                                    </td>
                                                );
                                            })} */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
