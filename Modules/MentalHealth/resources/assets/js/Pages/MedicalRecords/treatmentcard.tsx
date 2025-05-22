import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Treatment Card',
    href: '/treatmentcard',
  },
];

const treatmentcardindex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Treatment Card" />
      <div className="p-4 space-y-4">
        
        <div className="w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
        <div className="w-full h-full border border-black text-black text-sm print:border-none p-4">

           {/* Header */}
        <div className="relative flex items-center justify-between mb-8">
          <img src="/path-to-left-logo.png" alt="Left Logo" className="h-16 w-16 object-contain" />
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="font-bold text-xl uppercase">Municipal Health Office</h1>
            <h2 className="text-sm uppercase">San Francisco, Agusan Del Sur</h2>
            <h3 className="font-semibold text-base mt-1 uppercase underline">Psychiatric Treatment Card</h3>
          </div>
          <img src="/path-to-right-logo.png" alt="Right Logo" className="h-16 w-16 object-contain" />
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-6 break-inside-avoid">
          {[
            ['Case #:', 'text'],
            ['PhilHealth #:', 'text'],
            ['Name:', 'text', 2],
            ['Address:', 'text', 2],
            ['Age:', 'text'],
            ['Birthdate:', 'date'],
            ['Birthplace:', 'text'],
            ['Religion:', 'text'],
            ['Sex:', 'text'],
            ['Civil Status:', 'text'],
            ['Contact Number:', 'text', 2],
            ['Guardian:', 'text'],
            ['Relationship:', 'text'],
          ].map(([label, type, span], i) => (
            <div key={i} className={`col-span-${span || 1}`}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type={type}
                className="w-full border-b border-black focus:outline-none px-1 py-0.5"
              />
            </div>
          ))}
        </div>

        {/* Medication Table */}
        <div className="mt-8 border border-black p-4 rounded-lg shadow-sm break-inside-avoid">
          <h4 className="font-semibold text-sm mb-2">Medication Record</h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-black text-xs table-fixed">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  {[
                    "Medicine", "Dosage", "Date Given", "Appointment / FF/Up / Signature",
                    "Medicine", "Dosage", "Date Given", "Appointment / FF/Up / Signature"
                  ].map((header, i) => (
                    <th key={i} className="border-r border-black px-2 py-1 font-medium w-[12.5%]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="even:bg-gray-50">
                    {Array.from({ length: 8 }).map((_, colIdx) => (
                      <td key={colIdx} className="border-r border-black px-1 py-1 align-top">
                        <input
                          type="text"
                          className="w-full bg-transparent text-xs border-none focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mt-6 break-inside-avoid">
          <label className="font-semibold block mb-1">Diagnosis:</label>
          <textarea
            className="w-full border border-black p-2 text-sm resize-none"
            rows="3"
          />
        </div>

        {/* Print Button */}
        <div className="mt-6 print:hidden">
          <button
            // onClick={handlePrint}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition"
          >
            Print Treatment Card
          </button>
        </div>
      </div>
    </div>

    </div>
    </AppLayout>
  );
};

export default treatmentcardindex;
