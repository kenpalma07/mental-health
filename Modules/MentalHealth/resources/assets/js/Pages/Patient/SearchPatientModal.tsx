import * as React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import axios from 'axios';

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
  const [results, setResults] = React.useState<Patient[]>([]);

  const search = async () => {
    const response = await axios.get('/patients/search', { params: form });
    setResults(response.data);
  };

  const clearSearch = () => {
    setForm({
      pat_fname: '',
      pat_mname: '',
      pat_lname: '',
      pat_birthDate: '',
      sex_code: '',
    });
    setResults([]);
  };

  React.useEffect(() => {
    if (open) {
      setResults([]);
      setForm({
        pat_fname: '',
        pat_mname: '',
        pat_lname: '',
        pat_birthDate: '',
        sex_code: '',
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-start justify-center pt-5">
      <div className="fixed inset-0" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }} />  
      <Dialog.Panel className="bg-white rounded-lg p-6 max-w-xl z-50 shadow-lg relative w-full">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-semibold">Search Existing Patients</Dialog.Title>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8 space-y-3"> {/* This ensures all inputs are stacked vertically */}
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

        <div className="flex justify-end mb-4">
          <button
            onClick={search}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Clear Search
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-gray-500"></p>
          ) : (
            results.map(p => (
              <div key={p.id} className="border px-4 py-2 rounded shadow-sm">
                <p>
                  <strong>{p.pat_lname}, {p.pat_fname} {p.pat_mname}</strong>
                </p>
                <p className="text-sm text-gray-600">{p.sex_code} | {p.pat_birthDate}</p>
              </div>
            ))
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default SearchPatientModal;
