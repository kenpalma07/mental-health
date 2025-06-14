import * as React from 'react';
import { Dialog } from '@headlessui/react';
import { X, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MasterPatient } from '@/types';
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

const PatientResultModal_MedRecs: React.FC<Props> = ({ open, onClose, patients, onRegisterNewPatient }) => {
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
      <Dialog.Panel className="bg-white rounded-lg p-6 max-w-3xl w-full z-50 relative">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-semibold">
            {patients.length > 0 ? 'Matching Patients' : 'No Patient Found'}
          </Dialog.Title>
          <Button onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>

        {patients.length > 0 ? (
          <div className="max-h-64 overflow-y-auto">
            <Table className="w-full text-sm border">
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead className="bg-black text-white p-2 text-left">Patient ID</TableHead>
                  <TableHead className="bg-black text-white p-2 text-left">Name</TableHead>
                  <TableHead className="bg-black text-white p-2 text-left">Birthdate</TableHead>
                  <TableHead className="bg-black text-white p-2 text-left">Sex</TableHead>
                  <TableHead className="bg-black text-white p-2 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map(patient => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell className="p-2">{patient.master_patient_perm_id}</TableCell>
                    <TableCell className="p-2">{patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}</TableCell>
                    <TableCell className="p-2">{patient.pat_birthDate ? formatDate(patient.pat_birthDate) : ''}</TableCell>
                    <TableCell className="p-2">{patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}</TableCell>
                    <TableCell className="p-2 text-right">
                      <Button
                        onClick={() => handleConsultation(patient.id)}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-108 transition-all duration-200"
                      >
                        <EyeIcon className="w-4 h-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-4">No matching patient found. Would you like to register a new one?</p>
            <div className="flex justify-end">
              <Button
                onClick={handleRegister}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register New Patient
              </Button>
            </div>
          </div>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};

export default PatientResultModal_MedRecs;