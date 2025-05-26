import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import type { BreadcrumbItem } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Referral Form',
    href: '/referralform',
  },
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
  sex_code: string;
}
interface Assessment {
  consultation_id: string;
  icd_10_code: string;
  icd_10_descrip: string;
  diagnosis: string;
  phar_doc: string;
  consult_date_assess: string;
  ref_fhud: string;
  assessment_physical_health: string;
  management_physical_health: string;
  phar_med: string;
  phar_intake: string;
  phar_intakeUnit: string;
  phar_dur: string;
  phar_durUnit: string;
  phar_freq: string;
  phar_frequnit: string;
  phar_quantity: string;
  ref_reason: string;
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

interface ReferralFormProps {
  patient: Patient;
  assessments: Assessment[];
  medicationRecords?: MedicationRecord[];
}

const ReferralFormIndex: React.FC<ReferralFormProps> = ({

  patient,
  assessments,
}) => {


  // Helper to format patient full name
  const fullName = [patient.pat_fname, patient.pat_mname, patient.pat_lname].filter(Boolean).join(' ');

  // Helper to format address
  const fullAddress = [patient.patient_address, patient.bgycode, patient.citycode, patient.provcode]
    .filter(Boolean)
    .join(', ');


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Referral Form" />
      <div className="p-4 space-y-4">

        <div className="w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
          <div className="w-full h-full  text-black text-sm print:border-none p-4">

            <div className="flex items-center justify-center gap-4 w-full">
              {/* Left Logo */}
              <div className="flex-shrink-0">
                <AppLogoDOH />
              </div>

              {/* Center Text */}
              <div className="text-center">
                <span className="text-sm font-normal block">Republic of the Philippines</span>
                <span className="text-base font-bold block">Department of Health</span>
                <span className="font-bold text-lg block uppercase">Center for Health Development - Caraga</span>
              </div>

              {/* Right Logo */}
              <div className="flex-shrink-0">
                <AppLogoBP />
              </div>
            </div>

            <form
              className="p-4 max-w-5xl mx-auto text-sm print:text-xs">
              <h2 className="font-bold text-xl mb-4 text-center uppercase">Referral Form</h2>
              <table className="w-full table-fixed border border-collapse border-black mb-8">
                <thead>
                  <tr className="bg-black text-white">
                    <th colSpan={6} className="border border-black p-1 text-left font-bold">
                      <div className="flex justify-between items-center">
                        <span>Name of facility</span>
                        <span className="text-xs font-medium">Original / Copy</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  <tr>
                    <td colSpan={2} className="border p-2">Referred by:</td>
                    <td colSpan={2} className="border p-2">Name: <div className='text-xs font-bold'>{assessments.length > 0 ? assessments[0].phar_doc : 'N/A'}</div></td>
                    <td colSpan={2} className="border p-2">Position: <div className='text-xs font-bold'>Doctor</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Initiating facility (name and address):</td>
                    <td colSpan={2} className="border p-2 text-xs font-bold">{patient.provider_name}</td>
                    <td colSpan={2} className="border p-2">Date of referral: <div className='text-xs font-bold'>{assessments.length > 0 ? assessments[0].consult_date_assess : 'N/A'}</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Telephone arrangements made:</td>
                    <td colSpan={2} className="border p-2">
                      <label className="mr-4">
                        <input type="checkbox" className="mr-1" /> Yes
                      </label>
                      <label>
                        <input type="checkbox" className="mr-1" /> No
                      </label>
                    </td>
                    <td colSpan={2} className="border p-2">Facility Tel No.:</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2 align-top">Referred to facility (name and address):</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold">{assessments.length > 0 ? assessments[0].ref_fhud : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Service user name:</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold">{fullName}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Identity number:</td>
                    <td colSpan={2} className="border p-2 text-xs font-bold">{assessments.length > 0 ? assessments[0].consultation_id : 'N/A'}</td>
                    <td colSpan={2} className="border p-2">
                      Sex:
                      <label className="ml-2">
                        <input
                          type="checkbox"
                          name="sex_m"
                          checked={patient.sex_code === 'M'}
                          readOnly
                        />{' '}
                        Male
                      </label>
                      <label className="ml-2">
                        <input
                          type="checkbox"
                          name="sex_f"
                          checked={patient.sex_code === 'F'}
                          readOnly
                        />{' '}
                        Female
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Address:</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold">{fullAddress}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Mental and physical health history:</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold">
                      {assessments.length > 0 ? assessments[0].assessment_physical_health : 'N/A'}
                      <br />
                      {assessments.length > 0 ? assessments[0].management_physical_health : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Assessment findings:</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold">{assessments.map((a, i) => <div key={i}>{a.diagnosis}</div>)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Any treatment provided:</td>
                    <td colSpan={4} className="border p-2">
                      {assessments.length > 0 ? (
                        <>
                          {assessments[0].phar_med},{" "}
                          {parseFloat(assessments[0].phar_intake).toString()} {assessments[0].phar_intakeUnit},{" "}
                          {parseFloat(assessments[0].phar_dur).toString()} {assessments[0].phar_durUnit},{" "}
                          {parseFloat(assessments[0].phar_freq).toString()} {assessments[0].phar_frequnit},{" "}
                          <strong>Total:</strong> {parseFloat(assessments[0].phar_quantity).toString()}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Reason for referral:</td>
                    <td colSpan={4} className="border p-2 text-xs font-bold"> {assessments.length > 0 ? assessments[0].ref_reason : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border p-2">Documents accompanying referral:</td>
                    <td colSpan={4} className="border p-2"></td>
                  </tr>
                  <tr className="h-16"> {/* Optional: keep height if you want space */}
                    <td colSpan={2} className="border p-2 align-top">Print name, sign and date:</td>
                    <td colSpan={2} className="border p-2 align-top">Name:</td>
                    <td className="border p-2 align-top">Signature:</td>
                    <td className="border p-2 align-top">Date:</td>
                  </tr>
                </tbody>
              </table>

              {/* BACK REFERRAL */}

              <table className="w-full border-collapse">
                <tr className="bg-black text-white">
                  <th colSpan={6} className="border border-gray-700 p-1 text-left font-bold">
                    <div className="flex justify-between items-center">
                      <span>Back Referral from facility</span>
                      <span className="text-xs font-medium">Original / Copy</span>
                    </div>
                  </th>
                </tr>
                <tbody>
                  {/* 1st row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Back-referral from facility<br>
                    </br>
                      <small className="italic">(name)</small>
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={2}>

                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={2}>Tel No.:

                    </td>
                  </tr>
                  {/* 2nd row */}
                  <tr>
                    <td className="p-2 border border-black  w-1/3" rowSpan={2}>Reply from<br />
                      <small className="italic">(person completing form)</small>
                    </td>
                    <td className="p-2 border border-black" colSpan={4}>
                      <label className="block ">Name:</label>

                    </td>
                    <td className="p-2 border border-black" colSpan={2}>
                      <label className="block ">Date</label>

                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-black" colSpan={3}>
                      <label className="block ">Position</label>

                    </td>
                    <td className="p-2 border border-black" colSpan={2}>
                      <label className="block ">Specialty</label>

                    </td>
                  </tr>
                  {/* 3rd row */}
                  <tr>
                    <td className="p-2 border border-black  w-1/3" colSpan={2}>To initiating facility:<br>
                    </br>
                      <small className="italic">(name and address)</small>
                    </td>
                    <td colSpan={4} className="p-2 border border-black">

                    </td>
                  </tr>
                  {/* 4th row */}
                  <tr>
                    <td className="p-2 border border-black font-bold w-1/3" colSpan={2}>Service user name:
                    </td>
                    <td colSpan={4} className="p-2 border border-black">

                    </td>
                  </tr>
                  {/* 5th row */}
                  <tr>
                    <td className="p-2 border border-black " colSpan={2}>Identity number:</td>
                    <td colSpan={2} className="p-2 border border-black">

                    </td>
                    <td className="p-2 border border-black" colSpan={2}>Age:

                      <label className="mr-2">
                        <input type="radio" name="backsex" value="M" className="mr-1" />{' '}M
                      </label>
                      <label>
                        <input type="radio" name="backsex" value="F" className="mr-1" />{' '} F
                      </label>
                    </td>
                  </tr>
                  {/* 6th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Address:
                    </td>
                    <td colSpan={4} className="p-2 border border-black">

                    </td>
                  </tr>
                  {/* 7th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>This person was seen by:<br>
                    </br>
                      <small className="italic">(name and position)</small>
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={3}>

                    </td>
                    <td className="p-2 border border-black italic w-1/8" colSpan={1}>on date:

                    </td>
                  </tr>
                  {/* 8th row */}
                  <tr>
                    <td className="p-2 border border-black font-bold w-1/3" colSpan={2}>Mental and physical health history<br>
                    </br>
                      <small className="italic">(include substance use, medical history, family history)</small>
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 9th row */}
                  <tr>
                    <td className="p-2 border border-black font-bold w-1/3" colSpan={2}>Assessment findings
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 10th row */}
                  <tr>
                    <td className="p-2 border border-black  w-1/3" colSpan={2}>Diagnosis
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 11th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Treatment plan and follow-up:
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 12th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Medication prescribed:
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 13th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Psychological intervention recommended:
                    </td>
                    <td className="p-2 border border-black w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 14th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Please continue with:<br />
                      <small className="italic">(medications, prescriptions, psychological care, follow-up)</small>
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={4}>

                    </td>
                  </tr>
                  {/* 15th row */}
                  <tr>
                    <td className="p-2 border border-black w-1/3" colSpan={2}>Refer back to:
                    </td>
                    <td className="p-2 border border-black  w-1/3" colSpan={3}>

                    </td>
                    <td className="p-2 border border-black italic w-1/8" colSpan={1}>on date:

                    </td>
                  </tr>
                  {/* 16th row */}
                  <tr>
                    <td className="p-2 border border-black" colSpan={2}>Print name, sign and date:</td>
                    <td colSpan={2} className="p-2 border border-black w-1/3">Name:

                    </td>
                    <td className="p-2 border border-black " colSpan={1}>Signature:

                    </td>
                    <td className="p-2 border border-black " colSpan={1}>Date:

                    </td>
                  </tr>

                </tbody>
              </table>
              <div className="mt-4 text-right">

              </div>
            </form>

          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default ReferralFormIndex;