import * as React from 'react';
import { Dialog } from '@headlessui/react';
import { X, BookCopyIcon } from 'lucide-react';
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

const PatientEncounter: React.FC<Props> = ({ open, onClose, patients, onRegisterNewPatient }) => {
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
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border-b">Patient ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Birthdate</th>
                  <th className="px-4 py-2 border-b">Sex</th>
                  <th className="px-4 py-2 border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} className="border-b text-sm hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{patient.master_patient_perm_id}</td>
                    <td className="px-4 py-2 text-sm">
                      {patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}
                    </td>
                    <td className="px-4 py-2 text-sm">{patient.pat_birthDate}</td>
                    <td className="px-4 py-2 text-sm">
                      {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}
                    </td>
                    <td className="px-4 py-2 text-right">
                    <Button
                        variant="outline"
                        onClick={() => handleConsultation(patient.id)}
                        className="flex items-center gap-1 text-xs  text-black rounded hover:bg-green-400 px-3 py-1"
                      >
                        <BookCopyIcon className="w-2 h-2" />
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

export default PatientEncounter;
