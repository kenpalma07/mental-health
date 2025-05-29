import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import * as React from 'react';

interface Assessment {
    id: number; // assessment id for React keys
    pat_temp_id: number; // patient id
    consult_date_assess: string;
    ref_choice: string;
    ref_fhud: string;
    ref_reason: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Others',
        href: '/others',
    },
];

const OtherIndex: React.FC = () => {
    const { assessments } = usePage<PageProps<{ assessments: Assessment[] }>>().props;
    const [showModal, setShowModal] = React.useState(true);

    const closeModal = () => setShowModal(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

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
                        <table className="min-w-full table-auto border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-black text-sm text-white">
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Referral Choice</th>
                                    <th className="border px-4 py-2">Referred FHUD</th>
                                    <th className="border px-4 py-2">Referral Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="cursor-pointer text-xs hover:bg-gray-100"
                                        onClick={() => {
                                            window.open(`/referralform/${item.pat_temp_id}?consult_date=${item.consult_date_assess}`, '_blank');
                                            setShowModal(false);
                                            window.location.href = '/patients';
                                        }}
                                    >
                                        <td className="text-black-600 border px-4 py-2">{item.consult_date_assess ? formatDate(item.consult_date_assess) : ''}</td>
                                        <td className="text-black-600 border px-4 py-2">{item.ref_choice}</td>
                                        <td className="text-black-600 border px-4 py-2">{item.ref_fhud}</td>
                                        <td className="text-black-600 border px-4 py-2">{item.ref_reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default OtherIndex;
