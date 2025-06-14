import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

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
        <h2 className="text-lg font-semibold">Medication Dispense History</h2>
        <Button size="icon" variant="ghost" onClick={() => setIsModalOpen(false)}>
          ✕
        </Button>
      </div>

      <div className="printable">
        <Table className="w-full text-sm border mb-4">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="border p-2 text-left">Start Date</TableHead>
              <TableHead className="border p-2 text-left">Medicine</TableHead>
              <TableHead className="border p-2 text-left">Dosage</TableHead>
              <TableHead className="border p-2 text-left">Instructions</TableHead>
              <TableHead className="border p-2 text-left">Quantity</TableHead>
              <TableHead className="border p-2 text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((med, idx) => (
              <TableRow key={idx}>
                <TableCell className="border p-2">{med.start_date}</TableCell>
                <TableCell className="border p-2">{med.medicine}</TableCell>
                <TableCell className="border p-2">{med.dosage}</TableCell>
                <TableCell className="border p-2">{med.instructions}</TableCell>
                <TableCell className="border p-2">{med.quantity}</TableCell>
                <TableCell className="border p-2">
                  {med.status === 'Completed' ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-600 w-5 h-5" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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