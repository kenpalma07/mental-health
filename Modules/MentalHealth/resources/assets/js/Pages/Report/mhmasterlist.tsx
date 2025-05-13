import * as React from 'react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mental Health Masterlist',
    href: '/mhmasterlist',
  },
];

const months = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const mhmasterlistindex: React.FC = () => {
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 5;

  const [formData, setFormData] = useState(
    months.reduce((acc, month) => {
      acc[month] = { date: "", service: "" };
      return acc;
    }, {} as Record<string, { date: string; service: string }>)
  );

 const handleChange = (month: string, field: "date" | "service", value: string) => {
    setFormData(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [field]: value
      }
    }));
  };

  const datamasterlist = Array.from({ length: 8 }, (_, i) => ({
    id: i +1,
    idno:'001',
    assessdate: '01/10/2024',
    assessby:'Dr. Reyes',
    patientname: ['Dela Cruz', 'Juan', 'M'],
    address: 'Butuan City',
    age: '30',
    sex: ['M',''],
    occupation:'Farmer',
    contactno: '098765432123',
    diagnosis:['','','✔','','✔','',''],
    others:'N/A',
    medications: 'Risperidone 2mg/day',
    referredby: ['Nurse Ana','09124567890'],
    remarks:'stable',
    followup:['']
  }));

  const paginatedData = datamasterlist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(datamasterlist.length / itemsPerPage);

  return (
  <AppLayout breadcrumbs={breadcrumbs}> 
  <Head title="Mental Health Masterlist" />

  <div className="p-4 space-y-4">
    <div className="overflow-x-auto bg-white border rounded-2xl shadow-lg p-6 w-auto">
      {/* Header with logos and title */}
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
            <th rowSpan={3} className="border p-2 w-35">Assessment/ Registration<br/>(MM/DD/YYYY)</th>
            <th rowSpan={3} className="border p-2 w-35">Assessed By</th>
            <th colSpan={3} className="border p-2 w-80">Name of Patient</th>
            <th rowSpan={3} className="border p-2 w-50">Address</th>
            <th rowSpan={3} className="border p-2 w-16">Age</th>
            <th colSpan={2} className="border p-2 w-16">Sex</th>
            <th rowSpan={3} className="border p-2 w-32">Occupation</th>
            <th rowSpan={3} className="border p-2 w-32">Contact No.</th>
            <th colSpan={7} className="border p-2 w-150">Diagnosis</th>
            <th rowSpan={3} className="border p-2 w-32">Others</th>
            <th rowSpan={3} className="border p-2 w-64">Medications<br/>(Dosage & Frequency)</th>
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
          {paginatedData.map((item, index) => (
            <tr key={item.id}className="hover:bg-gray-50 text-center">
            <td className="border p-2 text-center">{item.idno}</td>
            <td className="border p-2 text-center">{item.assessdate}</td>
            <td className="border p-2">{item.assessby}</td>
            <td className="border p-2">{item.patientname[0]}</td>
            <td className="border p-2">{item.patientname[1]}</td>
            <td className="border p-2">{item.patientname[2]}</td>
            <td className="border p-2">{item.address}</td>
            <td className="border p-2 text-center">{item.age}</td>
            <td className="border p-2 text-center">{item.sex[0]}</td>
            <td className="border p-2 text-center">{item.sex[1]}</td>
            <td className="border p-2">{item.occupation}</td>
            <td className="border p-2">{item.contactno}</td>
            <td className="border p-2 text-center">{item.diagnosis[0]}</td>
            <td className="border p-2 text-center">{item.diagnosis[1]}</td>
            <td className="border p-2 text-center">{item.diagnosis[2]}</td>
            <td className="border p-2 text-center">{item.diagnosis[3]}</td>
            <td className="border p-2 text-center">{item.diagnosis[4]}</td>
            <td className="border p-2 text-center">{item.diagnosis[5]}</td>
            <td className="border p-2 text-center">{item.diagnosis[6]}</td>
            <td className="border p-2">{item.others}</td>
            <td className="border p-2">{item.medications}</td>
            <td className="border p-2">{item.referredby[0]}</td>
            <td className="border p-2">{item.referredby[1]}</td>
            <td className="border p-2">{item.remarks}</td>
            {months.map((month) => (
              <td key={month} className="border p-1">
                <div>
                  <input
                    type="date"
                    className="w-full border px-1 py-0.5 mb-1 text-[10px]"
                    value={formData[month].date}
                    onChange={(e) => handleChange(month, "date", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Service"
                    className="w-full border px-1 py-0.5 text-[10px]"
                    value={formData[month].service}
                    onChange={(e) => handleChange(month, "service", e.target.value)}
                  />
                </div>
              </td>
            ))}
          </tr>
         ))}
        </tbody>
      </table>
      
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>
          {/* Print Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition">
              Print Report
            </button>
          </div>
    </div>
  </div>
</AppLayout>
  );
};

export default mhmasterlistindex;

