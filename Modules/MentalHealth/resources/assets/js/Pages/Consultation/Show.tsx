import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Consultations, MasterPatient, MentalAssessmentForm, PageProps } from '@/types';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Edit, Eye, Stethoscope } from 'lucide-react';
import { router } from '@inertiajs/react';
import ConsultPathead from '../components/ConsultPathead';
import * as React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface Props extends PageProps {
    patient: MasterPatient;
    consultation?: Consultations;
    assessments: MentalAssessmentForm[];
}

export default function AssessmentShow({ patient, assessments }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Mental Health', href: '/patients' },
        { title: 'Search Patients', href: '/patients/create' },
        { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
        { title: 'Assessments', href: '#' },
    ];

    // Search and pagination state
    const [searchDate, setSearchDate] = React.useState('');
    const [page, setPage] = React.useState(1);
    const pageSize = 5;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const filteredAssessments = React.useMemo(
        () =>
            assessments
                .slice()
                .sort((a, b) => new Date(b.consult_date_assess).getTime() - new Date(a.consult_date_assess).getTime())
                .filter(a =>
                    a.consult_date_assess
                        ? formatDate(a.consult_date_assess).includes(searchDate)
                        : false
                ),
        [assessments, searchDate]
    );
    const totalPages = Math.ceil(filteredAssessments.length / pageSize);
    const paginatedAssessments = React.useMemo(
        () =>
            filteredAssessments.slice((page - 1) * pageSize, page * pageSize),
        [filteredAssessments, page, pageSize]
    );

    React.useEffect(() => {
        setPage(1);
    }, [searchDate]);

    const handleView = (assessment: MentalAssessmentForm) => {
        console.log('View assessment:', assessment);

    };

    const handleEdit = (assessment: MentalAssessmentForm) => {
        console.log('Edit assessment:', assessment);
        router.visit(`/assessments/${assessment.id}/edit`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ConsultPathead patient={patient} />
            <div className="space-y-4 p-4">
                <Head title="Assessment List" />
                <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-4 text-sm shadow-sm">
                    <div className="flex w-fit items-center gap-2 rounded bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                        <a
                            href={`/consultations/${patient.id}`}
                            className="flex items-center gap-1 rounded bg-transparent p-0 px-2 text-inherit transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Consultation
                        </a>
                        {/* White vertical separator */}
                        <span className="mx-2 h-6 w-px bg-white" />
                        <span className="flex items-center gap-1">
                            <Stethoscope className="h-4 w-4" />
                            Patient Assessment List
                        </span>
                    </div>
                    {/* Search input */}
                    <div className="mb-2 flex items-center justify-between">
                        <span className="mb-1 mt-4 text-xs text-gray-700 font-bold">
                            Assessment List
                            <span className="ml-2 text-green-700 font-normal">
                                (Total: {filteredAssessments.length})
                            </span>
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 italic">Search by assessment date</span>
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchDate}
                                onChange={e => setSearchDate(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                    {filteredAssessments.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow">
                            <Table className="min-w-full border text-sm text-gray-700">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Tracking #</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Date</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Treatment Avail</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Treatment Choice</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Diagnosis</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-left">Remarks</TableHead>
                                        <TableHead className="text-white-500 bg-green-100 text-xs uppercase px-2 py-2 text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedAssessments.map((a, index) => (
                                        <TableRow key={index} className="border-t bg-white hover:bg-gray-50">
                                            <TableCell className="px-2 py-2 font-semibold">{a.consultation_id}</TableCell>
                                            <TableCell className="px-2 py-2">{a.consult_date_assess ? formatDate(a.consult_date_assess) : ''}</TableCell>
                                            <TableCell className="px-2 py-2 text-center">{a.treat_avail}</TableCell>
                                            <TableCell className="px-2 py-2">{a.treat_choice}</TableCell>
                                            <TableCell className="px-2 py-2">{a.diagnosis}</TableCell>
                                            <TableCell className="px-2 py-2">{a.phar_remarks}</TableCell>
                                            <TableCell className="px-2 py-2">
                                                <div className="inline-flex items-center justify-center gap-2">
                                                    <Button
                                                        onClick={() => handleView(a)}
                                                        className="rounded border px-2 py-1 text-blue-600 hover:bg-blue-500 hover:text-white"
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleEdit(a)}
                                                        className="rounded border border-green-600 px-2 py-1 text-green-600 hover:bg-green-500 hover:text-white"
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* Pagination */}
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-xs text-gray-600">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No assessments found.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
