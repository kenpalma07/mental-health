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
              <h1 className="text-2xl font-semibold">Treatment Card </h1>


      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Print Medication Card
        </button>
  
        <div ref={componentRef} className="w-[297mm] h-[210mm] p-4 border shadow text-xs flex flex-col space-y-4">
          {/* Header Row */}
          <div className="flex flex-row space-x-4">
            <div className="w-1/3 border p-2">
              <h2 className="font-bold mb-2">Allergy Alert</h2>
              <textarea
                className="w-full border p-1 h-32"
                name="allergyAlert"
                value={formData.allergyAlert}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3 border p-2">
              <h2 className="font-bold mb-2">Patient Info</h2>
              <input className="w-full border p-1 mb-1" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="birthdate" placeholder="Birthdate" value={formData.birthdate} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="doctor" placeholder="Doctor" value={formData.doctor} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="doctorPhone" placeholder="Doctor Phone" value={formData.doctorPhone} onChange={handleChange} />
              <input className="w-full border p-1 mb-1" name="emergencyName" placeholder="Emergency Contact Name" value={formData.emergencyName} onChange={handleChange} />
              <input className="w-full border p-1" name="emergencyPhone" placeholder="Emergency Contact Phone" value={formData.emergencyPhone} onChange={handleChange} />
            </div>
            <div className="w-1/3 border p-2 flex flex-col items-center justify-center text-center">
              <h1 className="text-lg font-bold">MEDICATION CARD</h1>
              <p className="mt-4 text-sm">Municipal Health Office</p>
              <p className="text-sm">Authorized Signature</p>
              <div className="mt-4 border-t w-full pt-2 text-sm">Municipal Mayor</div>
            </div>
            <button onscree>print</button>
          </div>
  
          {/* Medication Table */}
          <div className="border p-2 w-full">
            <h2 className="text-center font-bold mb-2">MEDICATION</h2>
            <table className="table-auto w-full border text-xs">
              <thead>
                <tr>
                  <th className="border p-1">Name of Drug</th>
                  <th className="border p-1">Date</th>
                  <th className="border p-1">Dose/Strength</th>
                  <th className="border p-1">Given</th>
                  <th className="border p-1">Signature</th>
                </tr>
              </thead>
              <tbody>
                {formData.medications.map((med, index) => (
                  <tr key={index}>
                    <td className="border p-1">
                      <input className="w-full" value={med.drug} onChange={e => handleChange(e, index, 'drug')} />
                    </td>
                    <td className="border p-1">
                      <input className="w-full" value={med.date} onChange={e => handleChange(e, index, 'date')} />
                    </td>
                    <td className="border p-1">
                      <input className="w-full" value={med.dose} onChange={e => handleChange(e, index, 'dose')} />
                    </td>
                    <td className="border p-1">
                      <input className="w-full" value={med.given} onChange={e => handleChange(e, index, 'given')} />
                    </td>
                    <td className="border p-1">
                      <input className="w-full" value={med.personnel} onChange={e => handleChange(e, index, 'personnel')} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

       </div>
    </AppLayout>
    );
  };

export default medcardindex;
