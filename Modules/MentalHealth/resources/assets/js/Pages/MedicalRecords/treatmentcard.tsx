import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, PageProps } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
  { title: 'Treatment Card', href: '/treatmentcard' },
];

interface Patient {
  id: number;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  pat_birthDate: string;
  pat_birthplace?: string;
  patient_address: string;
  bgycode?: string;
  citycode?: string;
  provcode?: string;
  regcode?: string;
  religion_code?: string;
  sex_code?: string;
  civil_stat_code?: string;
  pat_mobile?: string;
  fat_fname?: string;
  fat_mname?: string;
  fat_lname?: string;
  mot_fname?: string;
  mot_mname?: string;
  mot_lname?: string;
}

const religionMap: { [key: string]: string } = {
  Chri: 'Christian',
  Cat: 'Catholic',
  Prot: 'Protestant',
  Isla: 'Islam',
  Bud: 'Buddhism',
  Hind: 'Hinduism',
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const civilStatusMap: { [key: string]: string } = {
  sin: 'Single',
  mar: 'Married',
  div: 'Divorced',
  sep: 'Separated',
  wid: 'Widow/Widower',
};

interface Assessment {
  consultation_id: string;
  icd_10_code: string;
  icd_10_descrip: string;
  diagnosis: string;
}

interface MedicationRecord {
  phar_med?: string;
  phar_intake?: string;
  phar_intakeUnit?: string;
  phar_dur?: string;
  phar_durUnit?: string;
  phar_freq?: string;
  phar_freqUnit?: string;
  phar_date?: string;
  appointment?: string;
}

interface TreatmentCardProps extends PageProps {
  patient: Patient;
  consultation?: any;
  assessments: Assessment[];
  medicationRecords?: MedicationRecord[];
}

const TreatmentCardIndex: React.FC<TreatmentCardProps> = ({
  patient,
  assessments,
  medicationRecords = [],
}) => {
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.pat_birthDate);
  const icd_10_code = assessments[0]?.icd_10_code || '';
  const icd_10_descrip = assessments[0]?.icd_10_descrip || '';
  const diagnosis = assessments[0]?.diagnosis || '';

  // Chunk medicationRecords two per row for display
  const chunkedMedication: MedicationRecord[][] = [];
  for (let i = 0; i < medicationRecords.length; i += 2) {
    chunkedMedication.push(medicationRecords.slice(i, i + 2));
  }
  while (chunkedMedication.length < 12) {
    chunkedMedication.push([]);
  }

  function renderDosage(record) {
    const formatNumber = (value) => {
      if (!value || parseFloat(value) === 0) return '';
      const floatVal = parseFloat(value);
      return floatVal % 1 === 0 ? `${parseInt(floatVal)}` : `${floatVal}`;
    };

    const intake = record.phar_intake ? `${formatNumber(record.phar_intake)} ${record.phar_intakeUnit ?? ''}`.trim() : '';
    const freq = record.phar_freq ? `${formatNumber(record.phar_freq)} ${record.phar_freqUnit ?? ''}`.trim() : '';
    const duration = record.phar_dur ? `${formatNumber(record.phar_dur)} ${record.phar_durUnit ?? ''}`.trim() : '';
    const quantity = record.phar_quantity && parseFloat(record.phar_quantity) !== 0
      ? `Qty: ${formatNumber(record.phar_quantity)}`
      : '';

    return [intake, freq, duration, quantity].filter(Boolean).join(', ');
  }


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Treatment Card" />
      <div className="p-4 space-y-4">
        <div className="w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
          <div className="w-full h-full border border-black text-black text-sm print:border-none p-4">

            {/* Header */}
            <div className="relative flex items-center justify-between mb-8 px-2">
              <div className="flex-shrink-0 mr-2">
                <AppLogoDOH className="h-16 w-auto" />
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                <h1 className="font-bold text-lg uppercase">Municipal Health Office</h1>
                <h2 className="uppercase text-sm">San Francisco, Agusan Del Sur</h2>
                <h3 className="font-semibold text-xl mt-1 uppercase">Psychiatric Treatment Card</h3>
              </div>
              <div className="flex-shrink-0 ml-2">
                <AppLogoBP className="h-16 w-auto" />
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-6 break-inside-avoid">
              <div>
                <label className="block font-semibold mb-1">Case #:</label>
                <input
                  type="text"
                  defaultValue={assessments[0]?.consultation_id || ''}
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">PhilHealth #:</label>
                <input type="text" className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Name:</label>
                <input
                  type="text"
                  defaultValue={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`}
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Address:</label>
                <input
                  type="text"
                  defaultValue={`${patient.patient_address}, ${patient.bgycode ?? ''}, ${patient.citycode ?? ''}, ${patient.provcode ?? ''}`}
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Age:</label>
                <input type="text" defaultValue={age} className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Birthdate:</label>
                <input type="text" defaultValue={patient.pat_birthDate} className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Birthplace:</label>
                <input type="text" defaultValue={patient.pat_birthplace ?? ''} className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Religion:</label>
                <input
                  type="text"
                  defaultValue={religionMap[capitalizeFirstLetter(patient.religion_code ?? '')] ?? patient.religion_code ?? ''}
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Sex:</label>
                <input
                  type="text"
                  defaultValue={
                    patient.sex_code?.toUpperCase() === 'M'
                      ? 'Male'
                      : patient.sex_code?.toUpperCase() === 'F'
                        ? 'Female'
                        : ''
                  }
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Civil Status:</label>
                <input
                  type="text"
                  defaultValue={civilStatusMap[patient.civil_stat_code?.toLowerCase() ?? ''] ?? patient.civil_stat_code ?? ''}
                  className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Contact No.:</label>
                <input type="text" defaultValue={patient.pat_mobile ?? ''} className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
              </div>
            </div>

            {/* Parent/Guardian */}
            <div className="mb-6 break-inside-avoid">
              <h4 className="font-semibold mb-2">Parent/Guardian</h4>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                <div>
                  <label className="block font-semibold mb-1">Father's Name:</label>
                  <input
                    type="text"
                    defaultValue={`${patient.fat_fname ?? ''} ${patient.fat_mname ?? ''} ${patient.fat_lname ?? ''}`.trim()}
                    className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mother's Name:</label>
                  <input
                    type="text"
                    defaultValue={`${patient.mot_fname ?? ''} ${patient.mot_mname ?? ''} ${patient.mot_lname ?? ''}`.trim()}
                    className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Contact No.:</label>
                  <input type="text" className="w-full border-b border-black focus:outline-none px-1 py-0.5" />
                </div>
              </div>
            </div>



            {/* Medication Record Table */}
            <div className="overflow-x-auto mb-6 break-inside-avoid">
              <table className="w-full table-fixed border border-black border-collapse text-xs text-center">
                <thead>
                  <tr className="border border-black bg-gray-100">
                    <th className="w-[20%] border border-black px-1 py-1">Medication</th>
                    <th className="w-[20%] border border-black px-1 py-1">Dosage / Intake / Duration / Frequency/ Quantity</th>
                    <th className="w-[15%] border border-black px-1 py-1">Date</th>
                    <th className="w-[15%] border border-black px-1 py-1">Appointment</th>
                    <th className="w-[15%] border border-black px-1 py-1">Medication</th>
                    <th className="w-[15%] border border-black px-1 py-1">Dosage / Intake / Duration / Frequency/ Quanity</th>
                  </tr>
                </thead>
                <tbody>
                  {chunkedMedication.map((pair, index) => (
                    <tr key={index} className="border border-black text">
                      <td className="border border-black px-1 py-1">{pair[0]?.phar_med || ''}</td>
                      <td className="border border-black px-1 py-1">{pair[0] ? renderDosage(pair[0]) : ''}</td>
                      <td className="border border-black px-1 py-1">{pair[0]?.phar_date || ''}</td>
                      <td className="border border-black px-1 py-1">{pair[0]?.appointment || ''}</td>
                      <td className="border border-black px-1 py-1">{pair[1]?.phar_med || ''}</td>
                      <td className="border border-black px-1 py-1">{pair[1] ? renderDosage(pair[1]) : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add any additional form or footer here */}
            {/* ICD-10 and Diagnosis */}
            <div className="mb-6 break-inside-avoid">
              <div className="grid grid-cols-3 gap-x-4">
                <div>
                  <label className="block font-semibold mb-1">ICD-10 Code:</label>
                  <input
                    type="text"
                    defaultValue={icd_10_code}
                    className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">ICD-10 Description:</label>
                  <input
                    type="text"
                    defaultValue={icd_10_descrip}
                    className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block font-semibold mb-1">Diagnosis:</label>
                  <input
                    type="text"
                    defaultValue={diagnosis}
                    className="w-full border-b border-black focus:outline-none px-1 py-0.5"
                  />
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TreatmentCardIndex;
