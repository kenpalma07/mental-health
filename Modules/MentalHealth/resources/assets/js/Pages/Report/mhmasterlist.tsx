import * as React from 'react';
import { usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState, useMemo } from 'react';

type Consultation = {
  consult_perm_id: string;
  consult_date: string;
  type_service: string;
  chief_complaint: string;
};

type Patient = {
  id: number;
  date_entered: string;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  patient_address: string;
  pat_birthDate: string;
  sex_code: string;
  occupation_code: string;
  pat_mobile: string;
  others: string;
  medications?: string;
  

  consultation?: Consultation[];
  assessment?: {
    diagnosis: string;
    phar_med: string;
    phar_intakeUnit: string;
    phar_freqUnit: string;
    phar_doc: string;
    phar_remarks: string;
  };
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health Masterlist', href: '/mhmasterlist' },
];

const months = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

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

const MhMasterlistIndex: React.FC = () => {
  const { props } = usePage();
  const patients = props.patients as Patient[];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = useMemo(() => {
    return patients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [patients, currentPage]);

  const totalPages = Math.ceil(patients.length / itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mental Health Masterlist" />
      <div className="p-4 space-y-4">
        <div className="overflow-x-auto bg-white border rounded-2xl shadow-lg p-6 w-auto">
          {/* Header */}
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

          {/* Table */}
          <table className="min-w-full text-sm text-left text-gray-800 border-collapse">
            <thead className="bg-black text-white text-xs">
              <tr className="text-center">
                <th rowSpan={3} className="border p-2">ID No.</th>
                <th rowSpan={3} className="border p-2 w-35">Assessment/Registration<br />(MM/DD/YYYY)</th>
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
            {paginatedData.map((p) => {
                const diagnosis = p.assessment?.diagnosis?.toLowerCase() || '';
                const hasDiagnosis = (d: string) => diagnosis.includes(d);
                const meds = `${p.assessment?.phar_med ?? ''} ${p.assessment?.phar_intakeUnit ?? ''} ${p.assessment?.phar_freqUnit ?? ''}`.trim();

                return (
                  <tr key={p.id} className="hover:bg-gray-50 text-center">
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.date_entered || 'N/A'}</td>
                    <td className="border p-2">{p.assessment?.phar_doc || 'N/A'}</td>
                    <td className="border p-2">{p.pat_lname}</td>
                    <td className="border p-2">{p.pat_fname}</td>
                    <td className="border p-2">{p.pat_mname}</td>
                    <td className="border p-2">{p.patient_address}</td>
                    <td className="border p-2">{p.pat_birthDate ? getAge(p.pat_birthDate) : ''}</td>
                    <td className="border p-2">{p.sex_code === 'M' ? '✔' : ''}</td>
                    <td className="border p-2">{p.sex_code === 'F' ? '✔' : ''}</td>
                    <td className="border p-2">{p.occupation_code}</td>
                    <td className="border p-2">{p.pat_mobile ?? 'N/A'}</td>
                    <td className="border p-2">{hasDiagnosis('depression') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('psychoses') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('epilepsy') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('child') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('dementia') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('substance use') ? '✔' : ''}</td>
                    <td className="border p-2">{hasDiagnosis('self-harm') ? '✔' : ''}</td>
                    <td className="border p-2">{p.others ?? 'N/A'}</td>
                    <td className="border p-2">{meds || 'N/A'}</td>
                    <td className="border p-2">{p.assessment?.phar_doc || 'N/A'}</td>
                    <td className="border p-2">{p.pat_mobile ?? 'N/A'}</td>
                    <td className="border p-2">{p.assessment?.phar_remarks || 'N/A'}</td>
                    {Array.from({ length: 12 }, (_, i) => {
                      const consultations = p.consultation?.filter(c => new Date(c.consult_date).getMonth() === i) || [];
                      return (
                        <td key={i} className="border p-2">
                          {consultations.length
                            ? consultations.map(c => new Date(c.consult_date).toLocaleDateString()).join(', ')
                            : '—'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Previous</button>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">Next</button>
            </div>
          </div>

          {/* Print Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={() => window.print()} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition">Print Report</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MhMasterlistIndex;
