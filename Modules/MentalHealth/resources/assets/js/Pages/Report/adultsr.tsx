import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Suicide Report (Adults)',
    href: '/reportadultsr',
  },
];

const adultsrindex: React.FC = () => {
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 5;

const dataadult = Array.from({ length: 8 }, (_, i) => ({
  id: i +1,
  dateoccur: '01/10/2024',
  patientcode: 'Sein',
  age: '30',
  sex: 'Male',
  address: 'Address Sample',
  significantother: '098765432123',
  occupation:'Office Worker',
  placeofincidence:'N/A',
  means: 'Sample',
  existing: 'No',
  validated: 'Sample',
  remarks:'Attempted'
}));

const paginatedData = dataadult.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
const totalPages = Math.ceil(dataadult.length / itemsPerPage);

  return (
     <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Suicide Report (Adults)" />
    
          <div className="p-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-xl font-semibold uppercase text-gray-800">
                  Suicide Incidence Report (Adults)
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-sm text-gray-600">Quarter:</p>
                  <select
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Q1">1st Quarter</option>
                    <option value="Q2">2nd Quarter</option>
                    <option value="Q3">3rd Quarter</option>
                    <option value="Q4">4th Quarter</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto bg-white border rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-black text-xs text-white border-b">
                    <tr className="bg-black text-white text-center">
                      <th className="border border-black p-2 rounded-tl-lg">Date of Occurrence</th>
                      <th className="border border-black p-2">Patient Code Name (Initial of First and Middle Name, Last Name)</th>
                      <th className="border border-black p-2">Age</th>
                      <th className="border border-black p-2">Sex</th>
                      <th className="border border-black p-2">Address</th>
                      <th className="border border-black p-2">Contact No. of Significant Other</th>
                      <th className="border border-black p-2">Occupation</th>
                      <th className="border border-black p-2">Place of Incidence</th>
                      <th className="border border-black p-2">Means of Suicide</th>
                      <th className="border border-black p-2">
                        Existing Mental Health Issue? (Yes/No) (If Yes, please specify _______)
                      </th>
                      <th className="border border-black p-2">Validated by: (Name & Position/ Designation)</th>
                      <th className="border border-black p-2 rounded-tr-lg">Remarks (Completed or Attempted)</th>
                    </tr>
                  </thead>
                  <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={item.id}className="hover:bg-gray-50 text-center">
                    <td className="border p-2 text-center">{item.dateoccur}</td>
                    <td className="border p-2 text-center">{item.patientcode}</td>
                    <td className="border p-2 text-center">{item.age}</td>
                    <td className="border p-2 text-center">{item.sex}</td>
                    <td className="border p-2 text-center">{item.address}</td>
                    <td className="border p-2 text-center">{item.significantother}</td>
                    <td className="border p-2 text-center">{item.occupation}</td>
                    <td className="border p-2 text-center">{item.placeofincidence}</td>
                    <td className="border p-2 text-center">{item.means}</td>
                    <td className="border p-2 text-center">{item.existing}</td>
                    <td className="border p-2 text-center">{item.validated}</td>
                    <td className="border p-2 text-center">{item.remarks}</td>
                    </tr>
                     ))}
                  </tbody>
                </table>
              </div>
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
              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
                >
                  Print Report
                </button>
              </div>
            </div>
          </div>
        </AppLayout>
       );
      };

export default adultsrindex;
