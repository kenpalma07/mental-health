import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, CheckCircle, XCircle } from 'lucide-react';

interface ModalDiagMedsEncProps {
  setIsModalOpen: (val: boolean) => void;
}

const ModalDiagMedsEnc: React.FC<ModalDiagMedsEncProps> = ({ setIsModalOpen }) => {
  const medicines = [
    {
      start_date: '2025-01-01',
      medicine: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take one capsule every 8 hours',
      quantity: 21,
      status: 'Completed',
    },
    {
      start_date: '2025-01-05',
      medicine: 'Ibuprofen',
      dosage: '200mg',
      instructions: 'Take as needed for pain',
      quantity: 10,
      status: 'In Progress',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Patient Medication History</h2>
        <Button size="icon" variant="ghost" onClick={() => setIsModalOpen(false)}>
          ✕
        </Button>
      </div>

      <div className="printable">
        <table className="w-full text-sm border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Start Date</th>
              <th className="border p-2 text-left">Medicine</th>
              <th className="border p-2 text-left">Dosage</th>
              <th className="border p-2 text-left">Instructions</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, idx) => (
              <tr key={idx}>
                <td className="border p-2">{med.start_date}</td>
                <td className="border p-2">{med.medicine}</td>
                <td className="border p-2">{med.dosage}</td>
                <td className="border p-2">{med.instructions}</td>
                <td className="border p-2">{med.quantity}</td>
                <td className="border p-2">
                  {med.status === 'Completed' ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-600 w-5 h-5" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        className="text-left p-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 mt-4"
        onClick={() => window.print()}
      >
        <Printer size={16} className="mr-2" />
        Print Prescription
      </Button>
    </div>
  );
};

export default ModalDiagMedsEnc;
