import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import React, { useRef, useState } from 'react';
//import { useReactToPrint } from 'react-to-print';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Medication Card',
    href: '/medcard',
  },
];

const medcardindex: React.FC = () => {
    const componentRef = useRef();
    const infoCardRef = useRef();
    const medCardRef = useRef();
  // const handlePrintAll = useReactToPrint({ content: () => componentRef.current });
  // const handlePrintInfo = useReactToPrint({ content: () => infoCardRef.current });
  // const handlePrintMed = useReactToPrint({ content: () => medCardRef.current });
    const [formData, setFormData] = useState({
      allergyAlert: '',
      name: '',
      address: '',
      phone: '',
      birthdate: '',
      doctor: '',
      doctorPhone: '',
      emergencyName: '',
      emergencyPhone: '',
      medications: Array(10).fill({ drug: '', date: '', dose: '', given: '', personnel: '' })
    });

    const handleChange = (e, index = null, field = null) => {
      const { name, value } = e.target;
      if (index !== null && field) {
        const newMedications = [...formData.medications];
        newMedications[index] = { ...newMedications[index], [field]: value };
        setFormData({ ...formData, medications: newMedications });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Treatment Card" />
            <div className="p-4 space-y-4">

              <div className="p-4">
              <button 
              //onClick={handlePrintAll}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
              Print Medication Card (FULL)
              </button>

              {/* Info Card */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div ref={infoCardRef} className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                  {/* Allergy Alert */}
                  <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                    <h2 className="font-bold mb-2 text-gray-800">Allergy Alert</h2>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
                      name="allergyAlert"
                      value={formData.allergyAlert}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Patient Info */}
                  <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                    <h2 className="font-bold mb-2 text-gray-800">Patient Info</h2>
                    {[
                      ['name', 'Name'],
                      ['address', 'Address'],
                      ['phone', 'Phone'],
                      ['birthdate', 'Birthdate'],
                      ['doctor', 'Doctor'],
                      ['doctorPhone', 'Doctor Phone'],
                      ['emergencyName', 'Emergency Contact Name'],
                      ['emergencyPhone', 'Emergency Contact Phone']
                    ].map(([name, placeholder]) => (
                      <input
                        key={name}
                        className="w-full border border-gray-300 rounded-md p-1 mb-2"
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {/* Header Info */}
                  <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col items-center justify-center text-center">
                    <h1 className="text-lg font-bold text-gray-900">MEDICATION CARD</h1>
                    <p className="mt-4 text-sm text-gray-700">Municipal Health Office</p>
                    <p className="text-sm text-gray-700">Authorized Signature</p>
                    <div className="mt-4 border-t border-gray-300 w-full pt-2 text-sm text-gray-700">Municipal Mayor</div>
                  </div>
                </div>
                <button 
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md self-start transition">
                  Print Info Card Only
                </button>
              </div>
            </div>
            <br></br>

              {/* Medication Table Card */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div ref={medCardRef} className="border border-gray-300 ring-1 ring-gray-200 p-4 shadow-md rounded-2xl bg-white">
                <h2 className="text-center font-bold text-gray-800 mb-4 text-lg">MEDICATION</h2>
                
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        {["Name of Drug", "Date", "Dose/Strength", "Given", "Signature"].map((label, idx) => (
                          <th key={idx} className="border border-gray-300 px-2 py-1 font-semibold">{label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.medications.map((med, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border border-gray-300 p-1">
                            <input
                              className="w-full border border-gray-300 rounded-md px-1 py-0.5 text-xs"
                              value={med.drug}
                             // onChange={e => handleChange(e, index, 'drug')}
                            />
                          </td>
                          <td className="border border-gray-300 p-1">
                            <input
                              className="w-full border border-gray-300 rounded-md px-1 py-0.5 text-xs"
                              value={med.date}
                              //onChange={e => handleChange(e, index, 'date')}
                            />
                          </td>
                          <td className="border border-gray-300 p-1">
                            <input
                              className="w-full border border-gray-300 rounded-md px-1 py-0.5 text-xs"
                              value={med.dose}
                             // onChange={e => handleChange(e, index, 'dose')}
                            />
                          </td>
                          <td className="border border-gray-300 p-1">
                            <input
                              className="w-full border border-gray-300 rounded-md px-1 py-0.5 text-xs"
                              value={med.given}
                             // onChange={e => handleChange(e, index, 'given')}
                            />
                          </td>
                          <td className="border border-gray-300 p-1">
                            <input
                              className="w-full border border-gray-300 rounded-md px-1 py-0.5 text-xs"
                              value={med.personnel}
                             // onChange={e => handleChange(e, index, 'personnel')}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition self-start">
                  Print Medication Table Only
                </button>
              </div>
            </div>
       </div>
       </div>
    </AppLayout>
    );
};
export default medcardindex;
