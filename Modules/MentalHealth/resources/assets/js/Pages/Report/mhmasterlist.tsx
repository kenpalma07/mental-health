import * as React from 'react';
import { usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health Masterlist', href: '/reportmasterlist' },
];

const months = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const mhmasterlistindex: React.FC = () => {
  const { props } = usePage();
  const patients = props.patients as any[];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedData = patients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mental Health Masterlist" />

      <div className="p-4 space-y-4">
        <div className="overflow-x-auto bg-white border rounded-2xl shadow-lg p-6 w-auto">
          <div className="relative flex items-center justify-between mb-6">
            <img src="/path-to-left-logo.png" alt="Left Logo" className="h-16 w-16 object-contain" />
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-gray-600">Republic of the Philippines</p>
              <p className="text-sm text-gray-600">Department of Health</p>
              <h1 className="font-bold uppercase text-lg text-gray-800">Center for Health Development - Caraga</h1>
              <p className="text-sm text-gray-600">National Mental Health Program</p>
              <p className="text-sm font-medium uppercase text-gray-700">Mental Health Client Masterlist</p>
            </div>
            <img src="/path-to-right-logo.png" alt="Right Logo" className="h-16 w-16 object-contain" />
          </div>

          <table className="min-w-full text-sm text-left text-gray-800 border-collapse">
            <thead className="bg-black text-white text-xs">
              <tr className="text-center">
                <th rowSpan={3} className="border p-2">ID No.</th>
                <th rowSpan={3} className="border p-2 w-35">Assessment/ Registration<br />(MM/DD/YYYY)</th>
                <th rowSpan={3} className="border p-2 w-35">Assessed By</th>
                <th colSpan={3} className="border p-2 w-80">Name of Patient</th>
                <th rowSpan={3} className="border p-2 w-50">Address</th>
                <th rowSpan={3} className="border p-2 w-16">Age</th>
                <th colSpan={2} className="border p-2 w-16">Sex</th>
                <th rowSpan={3} className="border p-2 w-32">Occupation</th>
                <th rowSpan={3} className="border p-2 w-32">Contact No.</th>
                <th colSpan={7} className="border p-2 w-150">Diagnosis</th>
                <th rowSpan={3} className="border p-2 w-32">Others</th>
                <th rowSpan={3} className="border p-2 w-64">Medications<br />(Dosage & Frequency)</th>
                <th colSpan={2} className="border p-2 w-60">Referred By</th>
                <th rowSpan={3} className="border p-2 w-40">Remarks</th>
                <th colSpan={12} className="border p-2 w-250">Follow-up</th>
              </tr>
              <tr className="text-center">
                <th className="border p-2">Family Name</th>
                <th className="border p-2">Given Name</th>
                <th className="border p-2">Middle Name</th>
                <th className="border p-2">M</th>
                <th className="border p-2">F</th>
                <th className="border p-2">Depression</th>
                <th className="border p-2">Psychoses</th>
                <th className="border p-2">Epilepsy</th>
                <th className="border p-2">Child/Adolescent Disorders</th>
                <th className="border p-2">Dementia</th>
                <th className="border p-2">Substance Use</th>
                <th className="border p-2">Self-Harm</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Contact No.</th>
                {months.map((month) => (
                  <th key={month} className="border p-2">{month.slice(0, 3)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => {
                const form = item.follow_ups || {};
                const diagnosisArray = item.diagnosis ? item.diagnosis.toLowerCase().split(',').map(d => d.trim()) : [];

                return (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="border p-2">{item.master_patient_perm_id}</td>
                    <td className="border p-2">{item.date_entered || 'N/A'}</td>
                    <td className="border p-2">{item.phar_doc || 'N/A'}</td>
                    <td className="border p-2">{item.pat_lname}</td>
                    <td className="border p-2">{item.pat_fname}</td>
                    <td className="border p-2">{item.pat_mname}</td>
                    <td className="border p-2">{item.patient_address}</td>
                    <td className="border p-2">{item.pat_birthDate ? getAge(item.pat_birthDate) : ''}</td>
                    <td className="border p-2">{item.sex_code === 'M' ? '✔' : ''}</td>
                    <td className="border p-2">{item.sex_code === 'F' ? '✔' : ''}</td>
                    <td className="border p-2">{item.occupation_code}</td>
                    <td className="border p-2">{item.pat_mobile}</td>

                    <td className="border p-2 text-center">{diagnosisArray.includes('depression') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('psychoses') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('epilepsy') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('child disorders') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('dementia') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('substance use') ? '✔' : ''}</td>
                    <td className="border p-2 text-center">{diagnosisArray.includes('self-harm') ? '✔' : ''}</td>

                    <td className="border p-2">{item.others || 'N/A'}</td>
                    <td className="border p-2">{item.medications || 'N/A'}</td>

                    <td className="border p-2">{item.phar_doc}</td>
                    <td className="border p-2">{item.pat_mobile}</td>

                    <td className="border p-2">{item.phar_remarks}</td>

                    {months.map((month) => {
                      const consults = followUps[month] || [];

                      return (
                        <td key={month} className="border p-1">
                          {consults.length > 0 ? (
                            consults.map((consult, idx) => (
                              <div key={idx} className="mb-1">
                                <input
                                  type="date"
                                  className="w-full border px-1 py-0.5 mb-1 text-[10px]"
                                  value={consult.date}
                                  readOnly
                                />
                                <input
                                  type="text"
                                  className="w-full border px-1 py-0.5 text-[10px]"
                                  value={consult.service}
                                  readOnly
                                />
                              </div>
                            ))
                          ) : (
                            <div className="text-[10px] text-gray-400">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Previous</button>
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Next</button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition">Print Report</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default mhmasterlistindex;

function getAge(birthDateString: string): number {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}