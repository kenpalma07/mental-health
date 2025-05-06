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
        <h1 className="text-2xl font-semibold">Treatment Card </h1>

      <div className="relative flex items-center justify-between mb-4">
        {/* Left Logo */}
        <img src="/path-to-left-logo.png" alt="Left Logo" className="h-16 w-16 object-contain" />

        {/* Centered Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="font-bold text-xl uppercase">
            Municipal Health Office
          </h1>
          <h2 className="text-md uppercase">
            San Francisco Agusan Del Sur
          </h2>
          <h3 className="font-semibold text-lg mt-2 uppercase underline">
            Psychiatric Treatment Card
          </h3>
        </div>

        {/* Right Logo */}
        <img src="/path-to-right-logo.png" alt="Right Logo" className="h-16 w-16 object-contain" />
      </div>

        

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <label>Case #:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>PhilHealth #:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div className="col-span-2">
          <label>Name:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div className="col-span-2">
          <label>Address:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Age:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Birthdate:</label>
          <input className="border-b border-black w-full" type="date" />
        </div>
        <div>
          <label>Birthplace:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Religion:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Sex:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Civil Status:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div className="col-span-2">
          <label>Contact Number:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Guardian:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
        <div>
          <label>Relationship:</label>
          <input className="border-b border-black w-full" type="text" />
        </div>
      </div>

      {/* Medication Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border border-black text-xs">
          <thead>
            <tr className="border-b border-black bg-gray-200">
              <th className="border-r border-black px-2 py-1">Medicine</th>
              <th className="border-r border-black px-2 py-1">Dosage</th>
              <th className="border-r border-black px-2 py-1">Date Given</th>
              <th className="border-r border-black px-2 py-1">Appointment / FF/Up / Signature</th>
              <th className="border-r border-black px-2 py-1">Medicine</th>
              <th className="border-r border-black px-2 py-1">Dosage</th>
              <th className="border-r border-black px-2 py-1">Date Given</th>
              <th className="px-2 py-1">Appointment / FF/Up / Signature</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-t border-black">
                {Array.from({ length: 8 }).map((_, i) => (
                  <td key={i} className="border-r border-black px-2 py-1">
                    <input className="w-full border-none outline-none" type="text" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <label>Diagnosis:</label>
        <textarea className="w-full border border-black p-1 mt-1" rows="3"></textarea>
      </div>
    </div>
    </AppLayout>
  );
};

export default treatmentcardindex;
