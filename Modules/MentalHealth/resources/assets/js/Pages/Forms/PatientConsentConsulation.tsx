import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface PatientConsentProps {
  patient: {
    id: number;
    pat_fname: string;
    pat_lname: string;
    sex_code: string;
    pat_birthDate: string;
    pat_mobile: string;
    patient_address: string;
  };
}

const PatientConsent: React.FC<PatientConsentProps> = ({ patient }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const printConsent = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { font-size: 1.5em; margin-bottom: 20px; }
              .content { margin-bottom: 20px; }
              .footer { margin-top: 30px; }
              .no-print { display: none; }
              .facility-info { text-align: center; margin-bottom: 20px; }
              .patient-info { margin-top: 20px; }
            </style>
          </head>
          <body>
            <!-- Centered Facility Name and Address -->
            <div class="facility-info">
              <h1><strong>[Facility Name]</strong></h1>
              <p>[Facility Address]</p>
            </div>
            
            <h2 class="text-center">Patient Consent for Health Facility Care</h2>
  
            <!-- Patient Information -->
            <div class="patient-info">
              <p><strong>Patient Name:</strong> ${patient.pat_fname} ${patient.pat_lname}</p>
              <p><strong>Sex:</strong> ${patient.sex_code === "M" ? "Male" : patient.sex_code === "F" ? "Female" : "N/A"}</p>
              <p><strong>Birthdate:</strong> ${patient.pat_birthDate}</p>
              <p><strong>Contact Number:</strong> ${patient.pat_mobile}</p>
              <p><strong>Address:</strong> ${patient.patient_address}</p>
            </div>
  
            <p>
              I, <strong>${patient.pat_fname} ${patient.pat_lname}</strong>, hereby consent to receive medical care and treatment at <strong>[Health Facility Name]</strong>.
              I acknowledge that I have been informed of the nature and purpose of the medical procedures and treatments I may undergo.
              I understand that this consent is voluntary and that I have the right to withdraw it at any time.
            </p>
            <p>
              By signing below, I approve the following:
            </p>
            <ol>
              <li><strong>Medical Evaluation:</strong> I consent to undergo necessary medical evaluations, diagnostic tests, and consultations that are required for my treatment.</li>
              <li><strong>Treatment Procedures:</strong> I authorize the healthcare professionals at <strong>[Health Facility Name]</strong> to provide appropriate treatment for my condition, including but not limited to medical procedures, medications, and surgical interventions as deemed necessary.</li>
              <li><strong>Confidentiality:</strong> I understand that all information related to my medical care will be kept confidential according to the healthcare facility's privacy policies and applicable laws.</li>
              <li><strong>Emergency Treatment:</strong> In the event of an emergency, I authorize <strong>[Health Facility Name]</strong> to administer the necessary treatment or procedures as deemed urgent by the healthcare team.</li>
              <li><strong>Cost of Treatment:</strong> I acknowledge that I am responsible for all costs associated with the treatment I receive, including but not limited to, medical fees, diagnostic tests, and hospitalization expenses, unless otherwise covered by insurance.</li>
              <li><strong>No Guarantee of Outcomes:</strong> I understand that while healthcare professionals at <strong>[Health Facility Name]</strong> will provide the best care possible, there are no guarantees regarding the results or outcomes of my treatment.</li>
            </ol>
            <p>
              By signing this consent form, I confirm that I have been provided with sufficient information to make an informed decision about my treatment. I understand that I may ask questions and seek clarification about my treatment options.
            </p>
            <div class="footer">
              <p>
                Patient's Signature: _______________________
              </p>
              <p>
                Date: _______________________
              </p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };
  
  

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <>
  <Head title="Add Patients" />
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-5">
      <div className="fixed inset-0" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }} />
      <div className="relative bg-white p-6 rounded-lg shadow-xl z-10 w-full max-w-3xl">
        {/* Logo and Facility Info */}
        <div className="flex items-center justify-start mb-6 space-x-4">
          {/* Logo */}
          {/* <AppLogoIcon className="h-16 w-auto" /> */}

          {/* Facility Name and Address */}
          <div className="text-left">
            <h1 className="text-xl font-semibold">[Facility Name]</h1>
            <p className="text-sm text-gray-600">[Facility Address]</p>
          </div>
        </div>

        {/* Patient Consent Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Patient Consent for Health Facility Care
        </h2>

        {/* Scrollable Consent Text */}
        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          <p className="text-base mb-4">
            I, <strong>{patient.pat_fname} {patient.pat_lname}</strong>, hereby consent to receive medical care and treatment at <strong>[Health Facility Name]</strong>.
            I acknowledge that I have been informed of the nature and purpose of the medical procedures and treatments I may undergo.
            I understand that this consent is voluntary and that I have the right to withdraw it at any time.
          </p>
          <p className="text-base mb-4">By signing below, I approve the following:</p>
          <ol className="list-decimal pl-5 mb-4">
            <li className="mb-2"><strong>Medical Evaluation:</strong> I consent to undergo necessary medical evaluations, diagnostic tests, and consultations that are required for my treatment.</li>
            <li className="mb-2"><strong>Treatment Procedures:</strong> I authorize the healthcare professionals at <strong>[Health Facility Name]</strong> to provide appropriate treatment for my condition, including but not limited to medical procedures, medications, and surgical interventions as deemed necessary.</li>
            <li className="mb-2"><strong>Confidentiality:</strong> I understand that all information related to my medical care will be kept confidential according to the healthcare facility's privacy policies and applicable laws.</li>
            <li className="mb-2"><strong>Emergency Treatment:</strong> In the event of an emergency, I authorize <strong>[Health Facility Name]</strong> to administer the necessary treatment or procedures as deemed urgent by the healthcare team.</li>
            <li className="mb-2"><strong>Cost of Treatment:</strong> I acknowledge that I am responsible for all costs associated with the treatment I receive, including but not limited to, medical fees, diagnostic tests, and hospitalization expenses, unless otherwise covered by insurance.</li>
            <li className="mb-2"><strong>No Guarantee of Outcomes:</strong> I understand that while healthcare professionals at <strong>[Health Facility Name]</strong> will provide the best care possible, there are no guarantees regarding the results or outcomes of my treatment.</li>
          </ol>
          <p className="text-base mb-6">
            By signing this consent form, I confirm that I have been provided with sufficient information to make an informed decision about my treatment. I understand that I may ask questions and seek clarification about my treatment options.
          </p>

          {/* Consent Agreement */}
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id="dataPrivacy"
              checked={isAgreed}
              onChange={handleAgreementChange}
              className="h-5 w-5 border-gray-300 rounded"
            />
            <Label htmlFor="dataPrivacy" className="text-sm">
              I hereby agree to the Data Privacy Act and consent to the use of my data for treatment purposes.
            </Label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            onClick={() => router.visit(`/consultations?id=${patient.id}`)}  // Redirects with query parameter
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </Button>
          <Button
            onClick={printConsent}
            disabled={!isAgreed}
            className={`px-4 py-2 ${isAgreed ? 'bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-lg hover:bg-green-700`}
          >
            Print Consent
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientConsent;
