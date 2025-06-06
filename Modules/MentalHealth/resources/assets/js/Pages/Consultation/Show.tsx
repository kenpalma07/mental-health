import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Consultations, MasterPatient, MentalAssessmentForm, PageProps } from '@/types';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { Edit, Eye, Stethoscope } from 'lucide-react';
import ConsultPathead from '../components/ConsultPathead';

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

    // Placeholder handlers
    const handleView = (assessment: MentalAssessmentForm) => {
        console.log('View assessment:', assessment);
        // You can show a modal or redirect here
    };

    const handleEdit = (assessment: MentalAssessmentForm) => {
        console.log('Edit assessment:', assessment);
        // Navigate or open modal
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ConsultPathead patient={patient} />
            <div className="space-y-4 p-4">
                <Head title="Assessment List" />
                <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-4 text-sm shadow-sm">
                    <div className="flex w-fit items-center gap-2 rounded bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                        <Stethoscope className="h-4 w-4" />
                        Patient Assessment List
                    </div>
                    {assessments.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full border text-sm text-gray-700">
                                <thead className="text-white-500 bg-green-100 text-xs uppercase">
                                    <tr>
                                        <th className="px-2 py-2 text-left">Tracking #</th>
                                        <th className="px-2 py-2 text-left">Date</th>
                                        <th className="px-2 py-2 text-left">Treatment Avail</th>
                                        <th className="px-2 py-2 text-left">Treatment Choice</th>
                                        <th className="px-2 py-2 text-left">Diagnosis</th>
                                        <th className="px-2 py-2 text-left">Remarks</th>
                                        <th className="px-2 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                                    {assessments.map((a, index) => (
                                        <tr key={index} className="border-t bg-white hover:bg-gray-50">
                                            <td className="px-2 py-2 font-semibold">{a.consultation_id}</td>
                                            <td className="px-2 py-2">{a.consult_date_assess ? formatDate(a.consult_date_assess) : ''}</td>
                                            <td className="px-2 py-2 text-center">{a.treat_avail}</td>
                                            <td className="px-2 py-2">{a.treat_choice}</td>
                                            <td className="px-2 py-2">{a.diagnosis}</td>
                                            <td className="px-2 py-2">{a.phar_remarks}</td>
                                            <td className="px-2 py-2">
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No assessments found.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
