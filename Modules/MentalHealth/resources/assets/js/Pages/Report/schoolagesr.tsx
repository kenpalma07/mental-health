import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLayout from '@/layouts/app-layout';
import { SchoolMasterPatient, SchoolMentalAssessmentForm } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as React from 'react';


const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
};

const getQuarterFromDate = (dateStr: string): string | null => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) return 'Q1';
    if (month >= 4 && month <= 6) return 'Q2';
    if (month >= 7 && month <= 9) return 'Q3';
    if (month >= 10 && month <= 12) return 'Q4';
    return null;
};

const SchoolAgeSRIndex: React.FC = () => {
    const { props } = usePage();
    const patients = props.patients as SchoolMasterPatient[];

    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedQuarter, setSelectedQuarter] = React.useState<string>('');
    const itemsPerPage = 10;


    const allRows = React.useMemo(() => {
        const rows: { patient: SchoolMasterPatient; assessment: SchoolMentalAssessmentForm }[] = [];
        patients.forEach((patient) => {
            if (patient.suicideAssessments && patient.suicideAssessments.length > 0) {
                patient.suicideAssessments.forEach((assessment) => {
                    rows.push({ patient, assessment });
                });
            }
        });
        return rows;
    }, [patients]);

    const filteredRows = React.useMemo(() => {
        if (!selectedQuarter) return allRows;
        return allRows.filter(({ assessment }) => {
            const quarter = getQuarterFromDate(assessment.consult_date_assess);
            return quarter === selectedQuarter;
        });
    }, [allRows, selectedQuarter]);

    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

    const paginatedRows = React.useMemo(() => {
        return filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [filteredRows, currentPage]);


    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedQuarter]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Suicide Report (School Age)', href: '/reportschoolagesr' }]}>
            <Head title="Suicide Report (School Age)" />

            <div className="space-y-4 p-2">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                    <div className="mb-4 flex flex-col items-center">
                        <div className="mb-4 flex w-full items-center justify-center gap-x-4">
                            <AppLogoDOH/>

                            <div className="text-center">
                                <h1 className="block text-xl font-semibold text-gray-800 uppercase">Suicide Incidence Report</h1>
                                <span className="block text-sm text-gray-600">(School Age)</span>
                            </div>

                            <AppLogoBP/>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <p className="text-sm text-gray-600">Quarter:</p>
                            <select
                                value={selectedQuarter}
                                onChange={(e) => setSelectedQuarter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="Q1">1st Quarter</option>
                                <option value="Q2">2nd Quarter</option>
                                <option value="Q3">3rd Quarter</option>
                                <option value="Q4">4th Quarter</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border bg-white shadow">
                        <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="border-b bg-black text-xs text-white">
                                <tr className="text-center">
                                    <th className="rounded-tl-lg border p-2 text-xs">Date of Occurrence</th>
                                    <th className="border p-2 text-xs">Patient Code Name</th>
                                    <th className="border p-2 text-xs">Age</th>
                                    <th className="border p-2 text-xs">Sex</th>
                                    <th className="border p-2 text-xs">Address</th>
                                    <th className="border p-2 text-xs">Contact No. of Guardian</th>
                                    <th className="border p-2 text-xs">Grade/Year</th>
                                    <th className="border p-2 text-xs">School</th>
                                    <th className="border p-2 text-xs">Place of Incidence</th>
                                    <th className="border p-2 text-xs">Means of Suicide</th>
                                    <th className="border p-2 text-xs">Existing Mental Health Issue? (Yes/No)</th>
                                    <th className="border p-2 text-xs">Validated by (Name & Position)</th>
                                    <th className="rounded-tr-lg border p-2 text-xs">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRows.length > 0 ? (
                                    paginatedRows.map(({ patient, assessment }, idx) => (
                                        <tr key={`${patient.id}-${idx}`} className="text-center hover:bg-gray-50">
                                            <td className="border p-2 text-xs">{assessment.consult_date_assess ? formatDate(assessment.consult_date_assess) : 'N/A'}</td>
                                            <td className="border p-2 text-xs">{`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`}</td>
                                            <td className="border p-2 text-xs">{calculateAge(patient.pat_birthDate)}</td>
                                            <td className="border p-2 text-xs">
                                                {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A'}
                                            </td>
                                            <td className="border p-2 text-xs">{patient.patient_address}</td>
                                            <td className="border p-2 text-xs">{patient.pat_mobile}</td>
                                            <td className="border p-2 text-xs">{assessment.grade_year ?? ''}</td>
                                            <td className="border p-2 text-xs">{assessment.school_name ?? ''}</td>
                                            <td className="border p-2 text-xs">{assessment.place_inci ?? ''}</td>
                                            <td className="border p-2 text-xs">{assessment.self_sui_means ?? ''}</td>
                                            <td className="border p-2 text-xs">{assessment.diagnosis ? `Yes - ${assessment.diagnosis}` : 'No'}</td>
                                            <td className="border p-2 text-xs">{assessment.phar_doc ?? ''}</td>
                                            <td className="border p-2 text-xs">{assessment.self_sui_remarks ?? ''}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={13} className="p-4 text-center">
                                            No suicide assessments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

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

                    <div className="mt-6 flex justify-end"></div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SchoolAgeSRIndex;
