import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { BreadcrumbItem } from '@/types';

interface Assessment {
    id: number;                 // assessment id for React keys
    pat_temp_id: number;        // patient id
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Encounter" />

            {/* Modal container */}
            {showModal && (
                <div
                    className="fixed inset-0 flex items-start justify-center pt-10 z-50"
                    style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Referral History</h2>
                            <button
                                onClick={closeModal}
                                className="text-sm px-3 py-1 bg-red-400 rounded hover:bg-red-600"
                            >
                                X
                            </button>
                        </div>
                        <table className="min-w-full table-auto border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-black text-white text-sm">
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Referral Choice</th>
                                    <th className="px-4 py-2 border">Referred FHUD</th>
                                    <th className="px-4 py-2 border">Referral Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-100 text-xs cursor-pointer"
                                        onClick={() => {
                                            window.open(
                                                `/referralform/${item.pat_temp_id}?consult_date=${item.consult_date_assess}`,
                                                '_blank'
                                            );
                                            setShowModal(false);   
                                            window.location.href = '/patients'; 
                                        }}
                                    >
                                        <td className="px-4 py-2 border text-black-600">{item.consult_date_assess}</td>
                                        <td className="px-4 py-2 border text-black-600">{item.ref_choice}</td>
                                        <td className="px-4 py-2 border text-black-600">{item.ref_fhud}</td>
                                        <td className="px-4 py-2 border text-black-600">{item.ref_reason}</td>
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
