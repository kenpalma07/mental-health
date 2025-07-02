import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps, MentalAssessmentForm } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referral List Encounter',
        href: '#',
    },
];

const EncounterIndex: React.FC = () => {
    const { assessments } = usePage<PageProps<{ assessments: MentalAssessmentForm[] }>>().props;
    const [showModal, setShowModal] = React.useState(true);

    const closeModal = () => {
        setShowModal(false);
        window.location.href = '/patients';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const filteredAssessments = React.useMemo(
        () =>
            assessments.filter(
                (item: { ref_choice: string; ref_fhud: string; ref_reason: string; }) =>
                    (item.ref_choice && item.ref_choice.trim() !== '') ||
                    (item.ref_fhud && item.ref_fhud.trim() !== '') ||
                    (item.ref_reason && item.ref_reason.trim() !== '')
            ),
        [assessments]
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Encounter" />

            {/* Modal container */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-10" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }}>
                    <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Referral History</h2>
                            <button onClick={closeModal} className="rounded bg-red-400 px-3 py-1 text-sm hover:bg-red-600">
                                X
                            </button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    <TableHead className="bg-black text-xs border px-4 py-2 text-white">Date</TableHead>
                                    <TableHead className="bg-black text-xs border px-4 py-2 text-white">Referral Choice</TableHead>
                                    <TableHead className="bg-black text-xs border px-4 py-2 text-white">Referred FHUD</TableHead>
                                    <TableHead className="bg-black text-xs border px-4 py-2 text-white">Referral Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAssessments.map((item: MentalAssessmentForm) => (
                                    <TableRow
                                        key={item.id}
                                        className="cursor-pointer text-xs hover:bg-gray-100"
                                        onClick={(): void => {
                                            window.open(`/referralform/${item.pat_temp_id}?consult_date=${item.consult_date_assess}`, '_blank');
                                            setShowModal(false);
                                            window.location.href = '/patients';
                                        }}
                                    >
                                        <TableCell className="text-black-600 border px-4 py-2">
                                            {item.consult_date_assess ? formatDate(item.consult_date_assess) : ''}
                                        </TableCell>
                                        <TableCell className="text-black-600 border px-4 py-2">
                                            {item.ref_choice && item.ref_choice.trim() !== '' ? item.ref_choice : ''}
                                        </TableCell>
                                        <TableCell className="text-black-600 border px-4 py-2">
                                            {item.ref_fhud && item.ref_fhud.trim() !== '' ? item.ref_fhud : ''}
                                        </TableCell>
                                        <TableCell className="text-black-600 border px-4 py-2">
                                            {item.ref_reason && item.ref_reason.trim() !== '' ? item.ref_reason : ''}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default EncounterIndex;