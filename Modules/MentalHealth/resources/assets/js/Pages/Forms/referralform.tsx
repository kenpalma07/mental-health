import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Referral Form',
    href: '/referralform',
  },
];

const ReferralFormIndex: React.FC = () => {
  const [formData, setFormData] = useState({
    referredby: '',
    name:'',
    referredByPosition: '',
    dateOfReferral: '',
    initiatingFacility: '',
    telYes: false,
    telNo: false,
    facilityTelNo: '',
    referredToFacility: '',
    serviceUserName: '',
    identityNumber: '',
    age: '',
    sex: '',
    address: '',
    mentalHistory: '',
    assessmentFindings: '',
    treatmentProvided: '',
    referralReason: '',
    documents: '',
    printedName: '',
    signature: '',
    signatureDate: '',
    // Back-referral section (if needed later)
    backreferralfacility: '',
    backtelno: '',
    replyname: '',
    replydate: '',
    replyposition: '',
    replyspecialty: '',
    tofacility: '',
    backserviceusername: '',
    backidentitynumber: '',
    backage: '',
    backsex: '',
    backaddress: '',
    seenby: '',
    seendate: '',
    backhealthhistory: '',
    backassessmentfindings: '',
    diagnosis: '',
    treatmentfollowup: '',
    medicationprescribed: '',
    psychologicalrecommendation: '',
    continuewith: '',
    referbackto: '',
    referbacktodate:'',
    finalname: '',
    finalsignature: '',
    finaldate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Referral Form" />
      <div className="p-4 space-y-4">
        
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-5xl mx-auto text-sm print:text-xs">
          <h2 className="font-bold text-lg mb-4 uppercase">Referral Form</h2>
          <table className="w-auto table-fixed border border-collapse border-gray-700 mb-8">

            <thead>
              <tr className="bg-gray-200">
                <th colSpan={6} className="border border-gray-700 p-1 text-left font-bold">
                <div className="flex justify-between items-center">
                  <span>Name of facility</span>
                  <span className="text-xs font-medium">Original / Copy</span>
                </div>
                </th>
              </tr>
            </thead>
            <tbody> 
               {/* 1st row */}
              <tr>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Referred by:
                  <input name="referredby" value={formData.referredby} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Name:
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Position:
                  <input name="position" value={formData.referredByPosition} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
              {/* 2nd row */}
              <tr>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Initiating facility (name and address):</td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>
                  <input name="initiatingFacility" value={formData.initiatingFacility} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Date of referral:
                  <input name="dateOfReferral" value={formData.dateOfReferral} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
               {/* 3rd row */}
              <tr>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Telephone arrangements made:</td>
                <td className="border p-1 w-1/3" colSpan={2}>
                  <label className="mr-4">
                    <input type="checkbox" name="telYes" checked={formData.telYes} onChange={handleChange}className="mr-1"/>Yes
                  </label>
                  <label className="mr-4 text-center">
                    <input type="checkbox"name="telNo" checked={formData.telNo} onChange={handleChange}className="mr-1"/>No
                  </label>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Facility Tel No.:
                  <input name="facilityTelNo" value={formData.facilityTelNo} onChange={handleChange}className="w-full p-1 mt-1"/>
                </td>
              </tr>
              {/* 4th row */}
              <tr>
                <td className="border p-1 font-semibold align-top"colSpan={2}>Referred to facility (name and address):</td>
                <td colSpan={4} className="border p-1">
                  <textarea name="referredToFacility"value={formData.referredToFacility} onChange={handleChange} className="w-full p-1 mt-1" rows={2}/>
                </td>
              </tr>
               {/* 5th row */}
              <tr>
                <td className="border p-1 font-semibold" colSpan={2}>Service user name:</td>
                <td colSpan={4} className="border p-1">
                  <input name="serviceUserName" value={formData.serviceUserName} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
               {/* 6th row */}
              <tr>
                <td className="border p-1 font-semibold" colSpan={2}>Identity number:</td>
                <td colSpan={2} className="border p-1">
                  <input name="identityNumber"value={formData.identityNumber} onChange={handleChange}className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold" colSpan={2}>Age:
                  <input name="age"value={formData.age} onChange={handleChange}className="w-full p-1 mt-1"/>
                    <label className="mr-2">
                      <input type="radio" name="sex" value="M" checked={formData.sex === 'M'} onChange={handleChange} className="mr-1"/>{' '}M
                    </label>
                    <label>
                      <input type="radio" name="sex" value="F" checked={formData.sex === 'F'} onChange={handleChange} className="mr-1"/>{' '} F
                    </label>
                </td>
              </tr>
               {/* 7th row */}
              <tr>
                <td className="border p-1 font-semibold align-top" colSpan={2}>Address:</td>
                <td colSpan={4} className="border p-1">
                  <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-1" rows={2}/>
                </td>
              </tr>
               {/* 8th row */}
              <tr>
                <td className="border p-1 font-semibold align-top">Mental and physical health history <br />
                  <small className="italic">(include substance use, medical history, family history)</small>
                </td>
                <td colSpan={5} className="border p-1">
                  <textarea name="mentalHistory" value={formData.mentalHistory} onChange={handleChange} className="w-full p-1" rows={2}/>
                </td>
              </tr>
               {/* 9th row */}
              <tr>
                <td className="border p-1 font-semibold align-top">Assessment findings:</td>
                <td colSpan={5} className="border p-1">
                  <textarea name="assessmentFindings" value={formData.assessmentFindings}onChange={handleChange} className="w-full p-1" rows={2}/>
                </td>
              </tr>
               {/* 10th row */}
              <tr>
                <td className="border p-1 font-semibold align-top">Any treatment provided:</td>
                <td colSpan={5} className="border p-1">
                  <textarea name="treatmentProvided" value={formData.treatmentProvided} onChange={handleChange} className="w-full p-1"rows={2}/>
                </td>
              </tr>
              {/* 11th row */}
              <tr>
                <td className="border p-1 font-semibold align-top">Reason for referral:</td>
                <td colSpan={5} className="border p-1">
                  <textarea name="referralReason" value={formData.referralReason} onChange={handleChange}className="w-full p-1" rows={2}/>
                </td>
              </tr>
              {/* 12th row */}
              <tr>
                <td className="border p-1 font-semibold align-top">Documents accompanying referral:
                </td>
                <td colSpan={5} className="border p-1">
                  <textarea name="documents" value={formData.documents} onChange={handleChange} className="w-full p-1" rows={2}/>
                </td>
              </tr>
              {/* 13th row */}
              <tr>
                <td className="border p-1 font-semibold" colSpan={2}>Print name, sign and date:</td>
                <td colSpan={2} className="border p-1 font-semibold w-1/3">Name:
                  <input name="printedName" value={formData.printedName} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold" colSpan={1}>Signature:
                  <input name="signature" value={formData.signature} onChange={handleChange}className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold" colSpan={1}>Date:
                  <input type="date" name="signatureDate" value={formData.signatureDate}onChange={handleChange}className="w-full p-1 mt-1"/>
                </td>
              </tr>
              </tbody>
              </table>

               {/* BACK REFERRAL */}
               
              <table className="w-full border-collapse">
              <tbody>
              {/* 1st row */}
              <tr>
                <td className="border p-1 font-bold w-1/3" colSpan={2}>Back-referral from facility<br>
                </br>
                <small className="italic">(name)</small>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>
                  <input name="backreferralfacility" value={formData.backreferralfacility} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold w-1/3" colSpan={2}>Tel No.:
                  <input name="backtelno" value={formData.backtelno} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
               {/* 2nd row */}
               <tr>
                <td className="border p-1 font-bold w-1/3" rowSpan={2}>Reply from<br>
                  <small className="italic">(person completing form)</small>
                  </br>
                </td>
                <td className="border p-1" colSpan={4}>
                  <label className="block font-semibold">Name:</label>
                  <input className="w-full p-1 mt-1" name="replyname" value={formData.replyname} onChange={handleChange} />
                </td>
                <td className="border p-1" colSpan={2}>
                  <label className="block font-semibold">Date</label>
                  <input className="w-full p-1 mt-1" name="replydate" type="date" value={formData.replydate} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className="border p-1" colSpan={3}>
                  <label className="block font-semibold">Position</label>
                  <input className="w-full p-1 mt-1" name="replyposition" value={formData.replyposition} onChange={handleChange} />
                </td>
                <td className="border p-1" colSpan={2}>
                  <label className="block font-semibold">Specialty</label>
                  <input className="w-full p-1 mt-1" name="replyspecialty" value={formData.replyspecialty} onChange={handleChange} />
                </td>
              </tr>
              {/* 3rd row */}
              <tr>
                <td className="border p-1 font-bold w-1/3" colSpan={2}>To initiating facility:<br>
                </br>
                <small className="italic">(name and address)</small>
                </td>
                <td colSpan={4} className="border p-1">
                  <textarea name="tofacility"value={formData.tofacility} onChange={handleChange} className="w-full p-1 mt-1" rows={2}/>
                </td>
              </tr>
              {/* 4th row */}
              <tr>
                <td className="border p-1 font-bold w-1/3" colSpan={2}>Service user name:
                </td>
                <td colSpan={4} className="border p-1">
                <input name="backserviceusername" value={formData.backserviceusername} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
              {/* 5th row */}
              <tr>
                <td className="border p-1 font-semibold" colSpan={2}>Identity number:</td>
                <td colSpan={2} className="border p-1">
                  <input name="backidentitynumber"value={formData.backidentitynumber} onChange={handleChange}className="w-full p-1 mt-1"/>
                </td>
                <td className="border p-1 font-semibold" colSpan={2}>Age:
                  <input name="backage" value={formData.backage} onChange={handleChange} className="w-full p-1 mt-1"/>
                    <label className="mr-2">
                      <input type="radio" name="backsex" value="M" checked={formData.sex === 'M'} onChange={handleChange} className="mr-1"/>{' '}M
                    </label>
                    <label>
                      <input type="radio" name="backsex" value="F" checked={formData.sex === 'F'} onChange={handleChange} className="mr-1"/>{' '} F
                    </label>
                </td>
              </tr>
               {/* 6th row */}
               <tr>
                <td className="border p-1 font-bold w-1/3" colSpan={2}>Address:
                </td>
                <td colSpan={4} className="border p-1">
                <input name="backaddress" value={formData.backaddress} onChange={handleChange} className="w-full p-1 mt-1"/>
                </td>
              </tr>
              {/* 7th row */}
              <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>This person was seen by:<br>
              </br>
              <small className="italic">(name and position)</small>
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={3}>
                <input name="backreferralfacility" value={formData.backreferralfacility} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
              <td className="border p-1 italic w-1/8" colSpan={1}>on date:
                <input name="seendate" type="date" value={formData.seendate} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 8th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Mental and physical health history<br>
              </br>
              <small className="italic">(include substance use, medical history, family history)</small>
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="backhealthhistory" value={formData.backhealthhistory} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 9th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Assessment findings
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="backhealthhistory" value={formData.backhealthhistory} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 10th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Diagnosis
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 11th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Treatment plan and follow-up
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="treatmentfollowup" value={formData.treatmentfollowup} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
             {/* 12th row */}
             <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Medication prescribed
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="medicationprescribed" value={formData.medicationprescribed} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
             {/* 13th row */}
             <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Psychological intervention recommended
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="psychologicalrecommendation" value={formData.psychologicalrecommendation} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 14th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Please continue with:<br>
              <small className="italic">(medications, prescriptions, psychological care, follow-up)</small>
              </br>
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={4}>
                <textarea name="continuewith" value={formData.continuewith} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
            {/* 15th row */}
            <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Refer back to:
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={3}>
                <input name="referbackto" value={formData.referbackto} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
              <td className="border p-1 italic w-1/8" colSpan={1}>on date:
                <input name="referbacktodate" type="date" value={formData.referbacktodate} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>
             {/* 16th row */}
             <tr>
              <td className="border p-1 font-bold w-1/3" colSpan={2}>Refer back to:
              </td>
              <td className="border p-1 font-semibold w-1/3" colSpan={3}>
                <input name="referbackto" value={formData.referbackto} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
              <td className="border p-1 italic w-1/8" colSpan={1}>on date:
                <input name="referbacktodate" type="date" value={formData.referbacktodate} onChange={handleChange} className="w-full p-1 mt-1"/>
              </td>
            </tr>

            </tbody>
            </table>
            <div className="mt-4 text-right">
              <button
                type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Form
              </button>
            </div>
          </form>

        </div>
      </AppLayout>
     );
  };

export default ReferralFormIndex;