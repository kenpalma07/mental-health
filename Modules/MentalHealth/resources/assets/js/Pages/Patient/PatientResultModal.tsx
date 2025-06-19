import { Button } from '@/components/ui/button';
import { MasterPatient } from '@/types';
import { Dialog } from '@headlessui/react';
import { Stethoscope, X } from 'lucide-react';
import * as React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface Props {
    open: boolean;
    onClose: () => void;
    patients: MasterPatient[];
    onRegisterNewPatient: () => void;
}

const PatientResultModal: React.FC<Props> = ({ open, onClose, patients, onRegisterNewPatient }) => {
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const pageSize = 5;

    const handleConsultation = (id: number) => {
        window.location.href = `/consultations/${id}`;
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

    // Filter and paginate patients
    const filteredPatients = React.useMemo(
        () =>
            patients.filter(
                (patient) =>
                    patient.pat_lname.toLowerCase().includes(search.toLowerCase()) ||
                    patient.pat_fname.toLowerCase().includes(search.toLowerCase()) ||
                    (patient.pat_mname && patient.pat_mname.toLowerCase().includes(search.toLowerCase())) ||
                    patient.master_patient_perm_id?.toString().includes(search) ||
                    (patient.pat_birthDate && formatDate(patient.pat_birthDate).includes(search))
            ),
        [patients, search]
    );
    const totalPages = Math.ceil(filteredPatients.length / pageSize);
    const paginatedPatients = React.useMemo(
        () => filteredPatients.slice((page - 1) * pageSize, page * pageSize),
        [filteredPatients, page, pageSize]
    );

    React.useEffect(() => {
        setPage(1);
    }, [search]);

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
                    <>
                        {/* Search and Pagination Controls */}
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-700">
                                Patient List <span className="ml-2 font-normal text-green-700">(Total: {filteredPatients.length})</span>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name, ID, or birthdate..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="rounded border border-gray-300 px-2 py-1 text-xs italic"
                            />
                        </div>
                        <div className="max-h-64 overflow-x-auto overflow-y-auto">
                            <Table className="min-w-full border border-gray-200 bg-white text-left text-sm">
                                <TableHeader className="sticky top-0">
                                    <TableRow>
                                        <TableHead className="bg-black text-white border-b px-4 py-2">Patient ID</TableHead>
                                        <TableHead className="bg-black text-white border-b px-4 py-2">Name</TableHead>
                                        <TableHead className="bg-black text-white border-b px-4 py-2">Birthdate</TableHead>
                                        <TableHead className="bg-black text-white border-b px-4 py-2">Sex</TableHead>
                                        <TableHead className="bg-black text-white border-b px-4 py-2 text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedPatients.length > 0 ? paginatedPatients.map((patient) => (
                                        <TableRow key={patient.id} className="border-b text-sm hover:bg-gray-50">
                                            <TableCell className="px-4 py-2 text-xs">{patient.master_patient_perm_id}</TableCell>
                                            <TableCell className="px-4 py-2 text-xs">
                                                {patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-xs">{patient.pat_birthDate ? formatDate(patient.pat_birthDate) : ''}</TableCell>
                                            <TableCell className="px-4 py-2 text-xs">
                                                {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}
                                            </TableCell>
                                            <TableCell className="px-4 py-2 text-right">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleConsultation(patient.id)}
                                                    className="flex items-center gap-1 rounded px-3 py-1 text-xs text-black hover:bg-green-400 hover:text-white"
                                                >
                                                    <Stethoscope className="h-2 w-2" />
                                                    Add Consultation
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="px-4 py-2 text-center text-sm">
                                                No patients found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-end items-center gap-2 mt-2">
                            <button
                                className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Prev
                            </button>
                            <span className="text-xs">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages || totalPages === 0}
                            >
                                Next
                            </button>
                        </div>
                    </>
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

export default PatientResultModal;