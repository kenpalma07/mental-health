import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, MasterPatient, MentalAssessmentForm, Pharma } from '@/types';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
  { title: 'Medication Card', href: '/medcard' },
];

interface MedicationCardProps {
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

const medcardindex: React.FC<MedicationCardProps> = ({
  patient,
  assessments,
  medicationRecords = [],
}) => {
  const phar_doc = assessments[0]?.phar_doc || '';
  const fullName = [patient.pat_fname, patient.pat_mname, patient.pat_lname]
    .filter(Boolean).join(' ');
  const fullAddress = [patient.patient_address, patient.bgycode, patient.citycode, patient.provcode]
    .filter(Boolean)
    .join(', ');

  const formatNum = (value: string | number | undefined) => {
    const num = typeof value === 'number' ? value : parseFloat(value ?? '');
    if (isNaN(num)) return value ?? '';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2).replace(/\.00$/, '');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medication Card" />
      <div className="p-4 space-y-4">
        <div className="p-4">

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">

                <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                  <h2 className="font-bold mb-2 text-gray-800">Allergy Alert</h2>
                  <Textarea
                    className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
                    disabled
                    value=""
                  />
                </div>

                <div className="w-1/3 p-4 border border-white rounded-xl shadow-sm bg-gray-50">
                  <h2 className="font-bold mb-2 text-gray-800">Patient Info</h2>

                  <div className="mb-2">
                    <Label className="block text-sm font-semibold text-white-700">Name</Label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{fullName}</p>
                  </div>

                  <div className="mb-2">
                    <Label className="block text-sm font-semibold text-gray-700">Address</Label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{fullAddress}</p>
                  </div>

                  <div className="mb-2">
                    <Label className="block text-sm font-semibold text-gray-700">Phone</Label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{patient.pat_mobile ?? ''}</p>
                  </div>

                  <div className="mb-2">
                    <Label className="block text-sm font-semibold text-gray-700">Birthdate</Label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{patient.pat_birthDate ?? ''}</p>
                  </div>

                  <div className="mb-2">
                    <Label className="block text-sm font-semibold text-gray-700">Doctor</Label>
                    <p className="w-full border-b border-black px-1 py-0.5 text-sm">{phar_doc}</p>
                  </div>
                </div>

                <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <AppLogoDOH />
                    <AppLogoBP />
                  </div>
                  <h6 className="text-lg font-bold text-gray-900">MEDICATION CARD</h6>
                  <p className="mt-2 text-sm text-gray-700">{patient.provider_name}</p>
                  <div className="mt-4 border-t border-gray-300 w-full pt-2 text-sm text-gray-700">
                    {phar_doc}<br />
                    Authorized Signature
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white">
              <h2 className="text-center font-bold text-gray-800 mb-4 text-lg">MEDICATION</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" bg-black text-whiteborder border-gray-300 px-2 py-1 font-semibold">Name of Drug</TableHead>
                      <TableHead className="bg-black text-white border border-gray-300 px-2 py-1 font-semibold">Date</TableHead>
                      <TableHead className="bg-black text-white border border-gray-300 px-2 py-1 font-semibold">Dose/Strength</TableHead>
                      <TableHead className="bg-black text-white border border-gray-300 px-2 py-1 font-semibold">Given/ Total Quantity</TableHead>
                      <TableHead className="bg-black text-white border border-gray-300 px-2 py-1 font-semibold">Signature</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicationRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="border border-gray-300 p-2 text-center text-gray-500">
                          No medication records available.
                        </TableCell>
                      </TableRow>
                    ) : (
                      medicationRecords.map((med, index) => (
                        <TableRow key={index} className="even:bg-gray-50">
                          <TableCell className="border border-gray-300 p-1">{med.phar_med}</TableCell>
                          <TableCell className="border border-gray-300 p-1">{med.phar_date}</TableCell>
                          <TableCell className="border border-gray-300 p-1">
                            {`${formatNum(med.phar_intake)} ${med.phar_intakeUnit} in every ${formatNum(med.phar_freq)} ${med.phar_freqUnit} for ${formatNum(med.phar_dur)} ${med.phar_durUnit}`}
                          </TableCell>
                          <TableCell className="border border-gray-300 p-1">{formatNum(med.phar_quantity)}</TableCell>
                          <TableCell className="border border-gray-300 p-1">{phar_doc}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default medcardindex;