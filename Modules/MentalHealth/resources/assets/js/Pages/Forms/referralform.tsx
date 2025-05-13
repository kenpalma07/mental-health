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
    backReferralFacility: '',
    backTelNo: '',
    replyName: '',
    replyDate: '',
    replyPosition: '',
    replySpecialty: '',
    toFacility: '',
    backServiceUserName: '',
    backIdentityNumber: '',
    backAge: '',
    backSex: '',
    backAddress: '',
    seenBy: '',
    seenDate: '',
    backHealthHistory: '',
    backAssessmentFindings: '',
    diagnosis: '',
    treatmentFollowUp: '',
    medicationPrescribed: '',
    psychologicalRecommendation: '',
    continueWith: '',
    referBackTo: '',
    finalName: '',
    finalSignature: '',
    finalDate: '',
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
          <table className="w-auto table-fixed border border-collapse border-gray-700">

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
                    <input type="radio"
                      name="sex"
                      value="M"
                      checked={formData.sex === 'M'}
                      onChange={handleChange}
                      className="mr-1"
                    />{' '}
                    M
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="F"
                      checked={formData.sex === 'F'}
                      onChange={handleChange}
                      className="mr-1"
                    />{' '}
                    F
                  </label>
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Address:
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Mental and physical health history <br />
                  <small className="italic">
                    (include substance use, medical history, family history)
                  </small>
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="mentalHistory"
                    placeholder="Health History"
                    value={formData.mentalHistory}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Assessment findings:
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="assessmentFindings"
                    placeholder="Assessment findings"
                    value={formData.assessmentFindings}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Any treatment provided:
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="treatmentProvided"
                    placeholder="Treatment provided"
                    value={formData.treatmentProvided}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Reason for referral:
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="referralReason"
                    placeholder="Reason for referral"
                    value={formData.referralReason}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold align-top">
                  Documents accompanying referral:
                </td>
                <td colSpan={6} className="border p-1">
                  <textarea
                    name="documents"
                    placeholder="Documents"
                    value={formData.documents}
                    onChange={handleChange}
                    className="w-full border p-1"
                    rows={2}
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 font-semibold">
                  Print name, sign and date:
                </td>
                <td colSpan={2} className="border p-1">
                  <input
                    name="printedName"
                    placeholder="Printed Name"
                    value={formData.printedName}
                    onChange={handleChange}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="border p-1 font-semibold">Name:</td>
                <td className="border p-1">
                  <input
                    name="signature"
                    placeholder="Signature"
                    value={formData.signature}
                    onChange={handleChange}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="border p-1 font-semibold">Date:</td>
                <td className="border p-1">
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate}
                    onChange={handleChange}
                    className="w-full p-1 border"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default ReferralFormIndex;
