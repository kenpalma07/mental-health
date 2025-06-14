import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLayout from '@/layouts/app-layout';
import { SchoolMasterPatient, SchoolMentalAssessmentForm } from '@/types';
import { Head, usePage } from '@inertiajs/react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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

    const handleExportExcel = () => {
        const data = filteredRows.map(({ patient, assessment }) => ({
            'Date of Occurrence': assessment.consult_date_assess ? formatDate(assessment.consult_date_assess) : 'N/A',
            'Patient Code Name': `${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`,
            'Age': calculateAge(patient.pat_birthDate),
            'Sex': patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A',
            'Address': patient.patient_address,
            'Contact No. of Guardian': patient.pat_mobile,
            'Grade/Year': assessment.grade_year ?? '',
            'School': assessment.school_name ?? '',
            'Place of Incidence': assessment.place_inci ?? '',
            'Means of Suicide': assessment.self_sui_means ?? '',
            'Existing Mental Health Issue? (Yes/No)': assessment.diagnosis ? `Yes - ${assessment.diagnosis}` : 'No',
            'Validated by (Name & Position)': assessment.phar_doc ?? '',
            'Remarks': assessment.self_sui_remarks ?? '',
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SchoolAgeSR');
        XLSX.writeFile(wb, 'Suicide_Report_School_Age.xlsx');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Suicide Report (School Age)', href: '/reportschoolagesr' }]}>
            <Head title="Suicide Report (School Age)" />

            <div className="space-y-4 p-2">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                    <div className="mb-4 flex flex-col items-center">
                        <div className="mb-4 flex w-full items-center justify-center gap-x-4">
                            <AppLogoDOH />

                            <div className="text-center">
                                <h1 className="block text-xl font-semibold text-gray-800 uppercase">Suicide Incidence Report</h1>
                                <span className="block text-sm text-gray-600">(School Age)</span>
                            </div>

                            <AppLogoBP />
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <p className="text-sm text-gray-600">Quarter:</p>
                            <Select
                                value={selectedQuarter}
                                onValueChange={setSelectedQuarter}
                            >
                                <SelectTrigger className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-40">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Q1">1st Quarter</SelectItem>
                                    <SelectItem value="Q2">2nd Quarter</SelectItem>
                                    <SelectItem value="Q3">3rd Quarter</SelectItem>
                                    <SelectItem value="Q4">4th Quarter</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Export Excel Button */}
                            <button
                                onClick={handleExportExcel}
                                className="ml-4 flex items-center gap-2 rounded bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700"
                                type="button"
                            >
                                <FileSpreadsheet className="h-4 w-4" />
                                Export to Excel
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border bg-white shadow">
                        <Table className="min-w-full text-left text-sm text-gray-700">
                            <TableHeader>
                                <TableRow className="text-center">
                                    <TableHead className="border-b bg-black text-xs text-white text-center rounded-tl-lg border p-2 text-xs">Date of Occurrence</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Patient Code Name</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Age</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Sex</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Address</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Contact No. of Guardian</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Grade/Year</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">School</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Place of Incidence</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Means of Suicide</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Existing Mental Health Issue? (Yes/No)</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center border p-2 text-xs">Validated by (Name & Position)</TableHead>
                                    <TableHead className="border-b bg-black text-xs text-white text-center rounded-tr-lg border p-2 text-xs">Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedRows.length > 0 ? (
                                    paginatedRows.map(({ patient, assessment }, idx) => (
                                        <TableRow key={`${patient.id}-${idx}`} className="text-center hover:bg-gray-50">
                                            <TableCell className="border p-2 text-xs">{assessment.consult_date_assess ? formatDate(assessment.consult_date_assess) : 'N/A'}</TableCell>
                                            <TableCell className="border p-2 text-xs">{`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`}</TableCell>
                                            <TableCell className="border p-2 text-xs">{calculateAge(patient.pat_birthDate)}</TableCell>
                                            <TableCell className="border p-2 text-xs">
                                                {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A'}
                                            </TableCell>
                                            <TableCell className="border p-2 text-xs">{patient.patient_address}</TableCell>
                                            <TableCell className="border p-2 text-xs">{patient.pat_mobile}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.grade_year ?? ''}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.school_name ?? ''}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.place_inci ?? ''}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.self_sui_means ?? ''}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.diagnosis ? `Yes - ${assessment.diagnosis}` : 'No'}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.phar_doc ?? ''}</TableCell>
                                            <TableCell className="border p-2 text-xs">{assessment.self_sui_remarks ?? ''}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={13} className="p-4 text-center">
                                            No suicide assessments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
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