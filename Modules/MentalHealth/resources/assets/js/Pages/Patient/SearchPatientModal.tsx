import * as React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Search, Eraser } from 'lucide-react';
import axios from 'axios';
import PatientResultModal from './PatientResultModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Patient {
  id: number;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  sex_code: string;
  pat_birthDate: string;
}

const SearchPatientModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = React.useState({
    pat_fname: '',
    pat_mname: '',
    pat_lname: '',
    pat_birthDate: '',
    sex_code: '',
  });

  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [showResultModal, setShowResultModal] = React.useState(false);

  const search = async () => {
    try {
      const response = await axios.get('/patients/search', { params: form });
      setPatients(response.data || []);
      setShowResultModal(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const clearSearch = () => {
    setForm({
      pat_fname: '',
      pat_mname: '',
      pat_lname: '',
      pat_birthDate: '',
      sex_code: '',
    });
    setPatients([]);
  };

  React.useEffect(() => {
    if (open) clearSearch();
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-start justify-center pt-5">
      <div className="fixed inset-0" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }} />
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-xl z-50 shadow-lg relative w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">Search Existing Patients</Dialog.Title>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>

          <div className="mb-6 space-y-3">
            <input
              placeholder="First Name"
              value={form.pat_fname}
              onChange={e => setForm(prev => ({ ...prev, pat_fname: e.target.value }))}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              placeholder="Middle Name"
              value={form.pat_mname}
              onChange={e => setForm(prev => ({ ...prev, pat_mname: e.target.value }))}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              placeholder="Last Name"
              value={form.pat_lname}
              onChange={e => setForm(prev => ({ ...prev, pat_lname: e.target.value }))}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              value={form.pat_birthDate}
              onChange={e => setForm(prev => ({ ...prev, pat_birthDate: e.target.value }))}
              className="border rounded px-3 py-2 w-full"
            />
            <select
              value={form.sex_code}
              onChange={e => setForm(prev => ({ ...prev, sex_code: e.target.value }))}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Select Sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div className="flex justify-end mb-2 gap-2">
            <button
              onClick={search}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Search className="w-4 h-4" /> Search
            </button>
            <button
              onClick={clearSearch}
              className="flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              <Eraser className="w-4 h-4" /> Clear
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      <PatientResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        patients={patients}
      />
    </>
  );
};

export default SearchPatientModal;
