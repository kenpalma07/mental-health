import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Pencil, Trash2 } from 'lucide-react';

type PharmaType = {
  phar_id: number;
  phar_date: string;
  phar_med: string;
  phar_intake: string;
  phar_intakeUnit: string;
  phar_freq: string;
  phar_freqUnit: string;
  phar_dur: string;
  phar_durUnit: string;
  phar_quantity: string;
};

interface ModalRXDiagMedsProps {
  meds?: PharmaType[];
  patientId: number;
}

const formatNumber = (value: string | number) => {
  const num = parseFloat(value as string);
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const ModalRXDiagMeds: React.FC<ModalRXDiagMedsProps> = ({ meds = [], patientId }) => {
  return (
    <div className="printable max-h-[70vh] overflow-auto">
      <table className="w-full text-sm border mb-4 border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="border p-2 text-left">Start Date</th>
            <th className="border p-2 text-left">Medicine</th>
            <th className="border p-2 text-left">Instructions</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meds.length > 0 ? (
            meds.map((med, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2 text-xs">{med.phar_date}</td>
                <td className="border p-2 text-xs">{med.phar_med}</td>
                <td className="border p-2 text-xs">
                  {`${formatNumber(med.phar_intake)} ${med.phar_intakeUnit} every ${formatNumber(med.phar_freq)} ${med.phar_freqUnit}, for ${formatNumber(med.phar_dur)} ${med.phar_durUnit}`}
                </td>
                <td className="border p-2 text-xs">{formatNumber(med.phar_quantity)}</td>
                <td className="border p-2 space-x-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="text-blue-600"
                    title="Print"
                  >
                    <a
                      href={`/RxPrint/${patientId}?date=${encodeURIComponent(med.phar_date)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Printer size={20} />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-yellow-600" title="Edit">
                    <Pencil size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600" title="Delete">
                    <Trash2 size={20} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No prescriptions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModalRXDiagMeds;