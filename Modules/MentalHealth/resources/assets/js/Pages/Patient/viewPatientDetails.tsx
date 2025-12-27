import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, MasterPatient } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, User } from 'lucide-react';
import ViewDemoinfo from '../components/ViewDemoinfo';
import ViewParentinfo from '../components/ViewParentinfo';
import ViewPatinfo from '../components/ViewPatinfo';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Patient Details', href: '#' },
];

const ViewPatientDetails = ({ patient }: { patient: MasterPatient }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Details" />
            <div className="container mx-auto p-6">
                {/* Patient Info Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-center bg-blue-500 p-4">
                            <h3 className="text-center text-lg font-semibold text-white">Patient Information</h3>
                        </div>
                        <ViewPatinfo patient={patient} />
                    </div>

                    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-center bg-blue-500 p-4">
                            <h3 className="text-center text-lg font-semibold text-white">Parents Information</h3>
                        </div>
                        <ViewParentinfo patient={patient} />
                    </div>

                    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-center bg-blue-500 p-4">
                            <h3 className="text-center text-lg font-semibold text-white">Demographic Information</h3>
                        </div>
                        <ViewDemoinfo patient={patient} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={() => (window.location.href = '/patients')}
                        className="inline-flex items-center rounded-md bg-gray-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <User className="mr-2" />
                        Back to Patients
                    </button>

                    <button
                        onClick={() => (window.location.href = `/patients/${patient.id}/edit`)}
                        className="inline-flex items-center rounded-md bg-gray-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <Edit className="mr-2" />
                        Update Details
                    </button>
                </div>
            </div>
        </AppLayout>
    );
};

export default ViewPatientDetails;
