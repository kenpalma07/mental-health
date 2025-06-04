import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
  { title: 'Medication Card', href: '/medcard' },
];

interface Patient {
  id: number;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  pat_birthDate: string;
  patient_address: string;
  bgycode?: string;
  citycode?: string;
  provcode?: string;
  pat_mobile?: string;
  provider_name?: string;
}

interface Assessment {
  consultation_id: string;
  icd_10_code: string;
  icd_10_descrip: string;
  diagnosis: string;
  phar_doc?: string;
}

interface MedicationRecord {
  phar_med: string;
  phar_date: string;
  phar_intake: string;
  phar_intakeUnit: string;
  phar_dur: string;
  phar_durUnit: string;
  phar_freq: string;
  phar_freqUnit: string;
  phar_quantity: string;
  given: string;
  personnel: string;
}

interface MedicationCardProps {
  patient: Patient;
  assessments: Assessment[];
  medicationRecords?: MedicationRecord[];
}

const medcardindex: React.FC<MedicationCardProps> = ({
  patient,
  assessments,
  medicationRecords = [],
}) => {
  const phar_doc = assessments[0]?.phar_doc || '';

  // Helper to format patient full name
  const fullName = [patient.pat_fname, patient.pat_mname, patient.pat_lname].filter(Boolean).join(' ');

  // Helper to format address
  const fullAddress = [patient.patient_address, patient.bgycode, patient.citycode, patient.provcode]
    .filter(Boolean)
    .join(', ');

  const formatNum = (value: any) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value ?? '';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2).replace(/\.00$/, '');
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medication Card" />
      <div className="p-4 space-y-4">
        <div className="p-4">
          {/* Info Card */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                {/* Allergy Alert */}
                <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                  <h2 className="font-bold mb-2 text-gray-800">Allergy Alert</h2>
                  <Textarea
                    className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
                    disabled
                    value=""
                  />
                </div>

                {/* Patient Info */}
                <div className="w-1/3 p-4 border border-white rounded-xl shadow-sm bg-gray-50">
                  <h2 className="font-bold mb-2 text-gray-800">Patient Info</h2>

                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-white-700">Name</label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{fullName}</p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Address</label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{fullAddress}</p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone</label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{patient.pat_mobile ?? ''}</p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Birthdate</label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{patient.pat_birthDate ?? ''}</p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Doctor</label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{phar_doc}</p>
                  </div>
                </div>

                {/* Logos and Header */}
                <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <AppLogoDOH/>
                    <AppLogoBP/>
                  </div>
                  <h6 className="text-lg font-bold text-gray-900">MEDICATION CARD</h6>
                  <p className="mt-2 text-sm text-gray-700">{patient.provider_name}</p>
                  <div className="mt-4 border-t border-gray-300 w-full pt-2 text-sm text-gray-700">
                    {phar_doc}<br></br>
                    Authorized Signature
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medication Table Card */}
          <div className="mt-6 bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white">
              <h2 className="text-center font-bold text-gray-800 mb-4 text-lg">MEDICATION</h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-black text-white">
                      {["Name of Drug", "Date", "Dose/Strength", "Given/ Total Quantity", "Signature"].map((label, idx) => (
                        <th key={idx} className="border border-gray-300 px-2 py-1 font-semibold">{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {medicationRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="border border-gray-300 p-2 text-center text-gray-500">
                          No medication records available.
                        </td>
                      </tr>
                    ) : (
                      medicationRecords.map((med, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border border-gray-300 p-1">{med.phar_med}</td>
                          <td className="border border-gray-300 p-1">{med.phar_date}</td>
                          <td className="border border-gray-300 p-1">
                            {`${formatNum(med.phar_intake)} ${med.phar_intakeUnit} in every ${formatNum(med.phar_freq)} ${med.phar_freqUnit} for ${formatNum(med.phar_dur)} ${med.phar_durUnit}`}
                          </td>
                          <td className="border border-gray-300 p-1">{formatNum(med.phar_quantity)}</td>
                          <td className="border border-gray-300 p-1">{phar_doc}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </AppLayout>
  );
};

export default medcardindex;
