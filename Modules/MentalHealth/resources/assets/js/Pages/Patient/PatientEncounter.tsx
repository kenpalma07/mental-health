import { Button } from '@/components/ui/button';
import { MasterPatient } from '@/types';
import { Dialog } from '@headlessui/react';
import { BookCopyIcon, X } from 'lucide-react';
import * as React from 'react';


interface Props {
    open: boolean;
    onClose: () => void;
    patients: MasterPatient[];
    onRegisterNewPatient: () => void;
}

const PatientEncounter: React.FC<Props> = ({ open, onClose, patients, onRegisterNewPatient }) => {
    const handleConsultation = (id: number) => {
        window.location.href = `/medrecords/${id}`;
    };

    const handleRegister = () => {
        onClose();
        onRegisterNewPatient();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-start justify-center pt-5">
            <div className="fixed inset-0" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }} />
            <Dialog.Panel className="relative z-50 w-full max-w-3xl rounded-lg bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold">{patients.length > 0 ? 'Matching Patients' : 'No Patient Found'}</Dialog.Title>
                    <Button onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {patients.length > 0 ? (
                    <div className="max-h-64 overflow-x-auto overflow-y-auto">
                        <table className="min-w-full border border-gray-200 bg-white text-left text-sm">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="border-b px-4 py-2">Patient ID</th>
                                    <th className="border-b px-4 py-2">Name</th>
                                    <th className="border-b px-4 py-2">Birthdate</th>
                                    <th className="border-b px-4 py-2">Sex</th>
                                    <th className="border-b px-4 py-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="border-b text-sm hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm">{patient.master_patient_perm_id}</td>
                                        <td className="px-4 py-2 text-sm">
                                            {patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}
                                        </td>
                                        <td className="px-4 py-2 text-sm">{patient.pat_birthDate ? formatDate(patient.pat_birthDate) : ''}</td>
                                        <td className="px-4 py-2 text-sm">
                                            {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleConsultation(patient.id)}
                                                className="flex items-center gap-1 rounded px-3 py-1 text-xs text-black hover:bg-green-400"
                                            >
                                                <BookCopyIcon className="h-2 w-2" />
                                                -Medical Records
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4 text-sm text-gray-600">No matching patient found. Would you like to register a new one?</p>
                        <div className="flex justify-end">
                            <Button onClick={handleRegister} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                Register New Patient
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog.Panel>
        </Dialog>
    );
};

export default PatientEncounter;
