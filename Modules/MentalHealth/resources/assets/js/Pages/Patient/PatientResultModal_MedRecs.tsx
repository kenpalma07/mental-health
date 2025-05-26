import * as React from 'react';
import { Dialog } from '@headlessui/react';
import { X, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Patient {
  id: number;
  master_patient_perm_id: string;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  sex_code: string;
  pat_birthDate: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
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
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {patients.map(patient => (
              <div key={patient.id} className="border p-3 rounded shadow-sm bg-gray-50">
                <p><strong>Patient ID:</strong> {patient.master_patient_perm_id}</p>
                <p><strong>Name:</strong> {patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}</p>
                <p><strong>Birthdate:</strong> {patient.pat_birthDate}</p>
                <p><strong>Sex:</strong> {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}</p>
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={() => handleConsultation(patient.id)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-108 transition-all duration-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
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
