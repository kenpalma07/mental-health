import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mental Health Tracker',
    href: '/mhtracker',
  },
];

const trackerindex: React.FC = () => {
const [currentPage, setCurrentPage] = React.useState(1);
const [searchTerm, setSearchTerm] = React.useState('');
const itemsPerPage = 5;

// Replace this with your actual data array
const data = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  date: '01/10/2024',
  philHealthNo: '18204563456',
  membership: 'Member',
  name: ['Sample', 'First', 'Middle'],
  address: 'Address Sample',
  birthdate: '09/09/1998',
  age: 30,
  sex: 'Male',
  oral: 'Sample',
  injectable: 'Sample 2',
  visit: '01/10/2024',
}));

const filteredData = data.filter((item) =>
  item.name.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
);

//const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const paginatedData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

React.useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Mental Health Tracker" />
    
          <div className="p-4 space-y-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col mb-6">
              <div className="flex items-center gap-3 mt-3">
                <p className="text-sm text-gray-600 whitespace-nowrap">Search Patient:</p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter patient name..."
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
            </div>
              {/* Table Container */}
              <div className="overflow-x-auto bg-white border rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-black text-xs text-white border-b">
                    <tr className="bg-black text-white text-center">
                      <th rowSpan={3} className="border border-black p-2 rounded-tl-lg">Date of Entry</th>
                      <th rowSpan={3} className="border border-black p-2">No.</th>
                      <th rowSpan={3} className="border border-black p-2">PhilHealth No.</th>
                      <th rowSpan={3} className="border border-black p-2">Membership Type</th>
                      <th colSpan={3} className="border border-black p-2">Patient Name</th>
                      <th rowSpan={3} className="border border-black p-2">Address</th>
                      <th rowSpan={3} className="border border-black p-2">Birthdate</th>
                      <th rowSpan={3} className="border border-black p-2">Age</th>
                      <th rowSpan={3} className="border border-black p-2">Sex</th>
                      <th colSpan={2} className="border border-black p-2">Medicine</th>
                      <th colSpan={12} className="border border-black p-2 rounded-tr-lg">Visitation</th>
                    </tr>
                    <tr className="text-center">
                        <th className="border  border-black p-2">Family Name</th>
                        <th className="border  border-black p-2">Given Name</th>
                        <th className="border  border-black p-2">Middle Name</th>
                        <th className="border  border-black p-2">Oral Medication</th>
                        <th className="border  border-black p-2">Injectables</th>
                        {Array.from({ length: 12 }, (_, index) => (
                          <th key={`date-${index}`} className="border border-black p-2">Date</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 text-center">
                        <td className="border p-2">{item.date}</td>
                        <td className="border p-2">{item.id}</td>
                        <td className="border p-2">{item.philHealthNo}</td>
                        <td className="border p-2">{item.membership}</td>
                        <td className="border p-2">{item.name[0]}</td>
                        <td className="border p-2">{item.name[1]}</td>
                        <td className="border p-2">{item.name[2]}</td>
                        <td className="border p-2">{item.address}</td>
                        <td className="border p-2">{item.birthdate}</td>
                        <td className="border p-2">{item.age}</td>
                        <td className="border p-2">{item.sex}</td>
                        <td className="border p-2">{item.oral}</td>
                        <td className="border p-2">{item.injectable}</td>
                        <td className="border p-2">{item.visit}</td>
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
    
              
             
              {/* Actions */}
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

export default trackerindex;
