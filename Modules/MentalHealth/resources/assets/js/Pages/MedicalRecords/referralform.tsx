import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import React from 'react';
import type {
  BreadcrumbItem, MasterPatient, MedicationRecord,
  MentalAssessmentForm,
  ReferralData
} from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Referral Form',
    href: '/referralform',
  },
];

interface ReferralFormProps {
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords?: MedicationRecord[];
}

const ReferralFormIndex: React.FC<ReferralFormProps> = ({
  patient,
  assessments,
}) => {
  const fullName = [patient.pat_fname, patient.pat_mname, patient.pat_lname].filter(Boolean).join(' ');
  const fullAddress = [patient.patient_address, patient.bgycode, patient.citycode, patient.provcode]
    .filter(Boolean)
    .join(', ');

  const handleSendReferral = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: ReferralData = {
      consultation_id: assessments[0]?.consultation_id,
      date_ref: assessments[0]?.consult_date_assess,
      pat_temp_id: patient.master_patient_perm_id,
      hpersonnel: assessments[0]?.phar_doc,
      hposition: 'Doctor',
      facility_name: patient.provider_name,
      facility_address: patient.facility_location,
      htel_arrangement: 'Y',
      facility_telephone: '',
      referral_facility_name: assessments[0]?.ref_fhud,
      referral_facility_address: '',
      pat_fullname: fullName,
      identity_number: assessments[0]?.consultation_id,
      pat_age: '',
      pat_sex: patient.sex_code,
      pat_fullAdd: fullAddress,
      assess_phy_heal: assessments[0]?.assessment_physical_health || '',
      manage_phy_heal: assessments[0]?.management_physical_health || '',
      assessment_findings: assessments.map(a => a.diagnosis).join(', '),
      any_treatment_prov: assessments.length > 0
        ? `${assessments[0].phar_med}, ${parseFloat(assessments[0].phar_intake).toString()} ${assessments[0].phar_intakeUnit}, ${parseFloat(assessments[0].phar_dur).toString()} ${assessments[0].phar_durUnit}, ${parseFloat(assessments[0].phar_freq).toString()} ${assessments[0].phar_freqUnit}, Total: ${parseFloat(assessments[0].phar_quantity).toString()}`
        : '',
      reason_referral: assessments[0]?.ref_reason,
      doc_accomp_referral: '',
      status_code: '0',
    };
    router.post('/sendReferral/send', data, {
      onSuccess: () => {
        alert('Referral Successfully Sent to the Facility!');
      },
      onError: (errors) => {
        console.error(errors);
        alert('Error sending Referral');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Referral Form" />
      <div className="p-4 space-y-4">
        <div className="flex justify-end mt-4">
          <Button
            type="button"
            onClick={handleSendReferral}
            className="inline-flex items-center rounded-md border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
          >
            <Send className="mr-2 h-4 w-4 text-white" />
            Send Referral
          </Button>
        </div>
        <div className="w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
          <div className="w-full h-full  text-black text-sm print:border-none p-4">

            <div className="flex items-center justify-center gap-4 w-full">

              <div className="flex-shrink-0">
                <AppLogoDOH />
              </div>

              <div className="text-center">
                <span className="text-sm font-normal block">Republic of the Philippines</span>
                <span className="text-base font-bold block">Department of Health</span>
                <span className="font-bold text-lg block uppercase">Center for Health Development - Caraga</span>
              </div>

              <div className="flex-shrink-0">
                <AppLogoBP />
              </div>
            </div>

            <form className="p-4 max-w-5xl mx-auto text-sm print:text-xs">
              <h2 className="font-bold text-xl mb-4 text-center uppercase">Referral Form</h2>
              <Table className="w-full table-fixed border border-collapse border-black mb-8">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={6} className=" bg-black text-white border border-black p-1 text-left font-bold">
                      <div className="flex justify-between items-center">
                        <span>Name of facility</span>
                        <span className="text-xs font-medium">Original / Copy</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='text-sm'>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Referred by:</TableCell>
                    <TableCell colSpan={2} className="border p-2">Name: <div className='text-xs font-bold'>{assessments.length > 0 ? assessments[0].phar_doc : 'N/A'}</div></TableCell>
                    <TableCell colSpan={2} className="border p-2">Position: <div className='text-xs font-bold'>Doctor</div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Initiating facility <br /> <span className="text-xs italic">(name and address):</span></TableCell>
                    <TableCell colSpan={2} className="border p-2 text-xs font-bold">{patient.provider_name}</TableCell>
                    <TableCell colSpan={2} className="border p-2">Date of referral: <div className='text-xs font-bold'>{assessments.length > 0 ? assessments[0].consult_date_assess : 'N/A'}</div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Telephone arrangements made:</TableCell>
                    <TableCell colSpan={2} className="border p-2">
                      <label className="mr-4">
                        <input type="checkbox" className="mr-1" /> Yes
                      </label>
                      <label>
                        <input type="checkbox" className="mr-1" /> No
                      </label>
                    </TableCell>
                    <TableCell colSpan={2} className="border p-2">Facility Tel No.:</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2 align-top">Referred to facility <br /> <span className="text-xs italic">(name and address):</span></TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold">{assessments.length > 0 ? assessments[0].ref_fhud : 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Service user name:</TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold">{fullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Identity number:</TableCell>
                    <TableCell colSpan={2} className="border p-2 text-xs font-bold">{assessments.length > 0 ? assessments[0].consultation_id : 'N/A'}</TableCell>
                    <TableCell colSpan={2} className="border p-2">
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
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Address:</TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold">{fullAddress}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Mental and physical health history:</TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold">
                      {assessments.length > 0 ? assessments[0].assessment_physical_health : 'N/A'}
                      <br />
                      {assessments.length > 0 ? assessments[0].management_physical_health : 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Assessment findings:</TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold">{assessments.map((a, i) => <div key={i}>{a.diagnosis}</div>)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Any treatment provided:</TableCell>
                    <TableCell colSpan={4} className="border p-2">
                      {assessments.length > 0 ? (
                        <>
                          {assessments[0].phar_med},{" "}
                          {parseFloat(assessments[0].phar_intake).toString()} {assessments[0].phar_intakeUnit},{" "}
                          {parseFloat(assessments[0].phar_dur).toString()} {assessments[0].phar_durUnit},{" "}
                          {parseFloat(assessments[0].phar_freq).toString()} {assessments[0].phar_freqUnit},{" "}
                          <strong>Total:</strong> {parseFloat(assessments[0].phar_quantity).toString()}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Reason for referral:</TableCell>
                    <TableCell colSpan={4} className="border p-2 text-xs font-bold"> {assessments.length > 0 ? assessments[0].ref_reason : 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border p-2">Documents accompanying referral:</TableCell>
                    <TableCell colSpan={4} className="border p-2"></TableCell>
                  </TableRow>
                  <TableRow className="h-16">
                    <TableCell colSpan={2} className="border p-2 align-top">Print name, sign and date:</TableCell>
                    <TableCell colSpan={2} className="border p-2 align-top">Name:</TableCell>
                    <TableCell className="border p-2 align-top">Signature:</TableCell>
                    <TableCell className="border p-2 align-top">Date:</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* BACK REFERRAL */}
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={6} className="bg-black text-white border border-gray-700 p-1 text-left font-bold">
                      <div className="flex justify-between items-center">
                        <span>Back Referral from facility</span>
                        <span className="text-xs font-medium">Original / Copy</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Back-referral from facility<br />
                      <small className="italic">(name)</small>
                    </TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={2}></TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={2}>Tel No.:</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black  w-1/3" rowSpan={2}>Reply from<br />
                      <small className="italic">(person completing form)</small>
                    </TableCell>
                    <TableCell className="p-2 border border-black" colSpan={4}>
                      <label className="block ">Name:</label>
                    </TableCell>
                    <TableCell className="p-2 border border-black" colSpan={2}>
                      <label className="block ">Date</label>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black" colSpan={3}>
                      <label className="block ">Position</label>
                    </TableCell>
                    <TableCell className="p-2 border border-black" colSpan={2}>
                      <label className="block ">Specialty</label>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={2}>To initiating facility:<br />
                      <small className="italic">(name and address)</small>
                    </TableCell>
                    <TableCell colSpan={4} className="p-2 border border-black"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black font-bold w-1/3" colSpan={2}>Service user name:</TableCell>
                    <TableCell colSpan={4} className="p-2 border border-black"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black " colSpan={2}>Identity number:</TableCell>
                    <TableCell colSpan={2} className="p-2 border border-black"></TableCell>
                    <TableCell className="p-2 border border-black" colSpan={2}>Age:
                      <label className="mr-2">
                        <input type="radio" name="backsex" value="M" className="mr-1" />{' '}M
                      </label>
                      <label>
                        <input type="radio" name="backsex" value="F" className="mr-1" />{' '} F
                      </label>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Address:</TableCell>
                    <TableCell colSpan={4} className="p-2 border border-black"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>This person was seen by:<br />
                      <small className="italic">(name and position)</small>
                    </TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={3}></TableCell>
                    <TableCell className="p-2 border border-black italic w-1/8" colSpan={1}>on date:</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black font-bold w-1/3" colSpan={2}>Mental and physical health history<br />
                      <small className="italic">(include substance use, medical history, family history)</small>
                    </TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black font-bold w-1/3" colSpan={2}>Assessment findings</TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={2}>Diagnosis</TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Treatment plan and follow-up:</TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Medication prescribed:</TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Psychological intervention recommended:</TableCell>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Please continue with:<br />
                      <small className="italic">(medications, prescriptions, psychological care, follow-up)</small>
                    </TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black w-1/3" colSpan={2}>Refer back to:</TableCell>
                    <TableCell className="p-2 border border-black  w-1/3" colSpan={3}></TableCell>
                    <TableCell className="p-2 border border-black italic w-1/8" colSpan={1}>on date:</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-2 border border-black" colSpan={2}>Print name, sign and date:</TableCell>
                    <TableCell colSpan={2} className="p-2 border border-black w-1/3">Name:</TableCell>
                    <TableCell className="p-2 border border-black " colSpan={1}>Signature:</TableCell>
                    <TableCell className="p-2 border border-black " colSpan={1}>Date:</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 text-right"></div>
            </form>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSendReferral}
            className="inline-flex items-center rounded-md border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
          >
            <Send className="mr-2 h-4 w-4 text-white" />
            Send Referral
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReferralFormIndex;