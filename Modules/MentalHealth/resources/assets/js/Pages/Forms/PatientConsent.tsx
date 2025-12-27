import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MasterPatient } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface PatientConsentProps {
    patient: MasterPatient
}

const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

const PatientConsent: React.FC<PatientConsentProps> = ({ patient }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const age = calculateAge(patient.pat_birthDate);
    const printConsent = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1, h2, h3 { text-align: center; }
              .section { margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h3>Republic of the Philippines<br>
            Province of Agusan del Sur<br>
            MUNICIPALITY OF SAN FRANCISCO</h3>
            <p style="text-align: center;">Purok 3, Barangay 4, San Francisco, Agusan del Sur<br>
            Email: rhusanfranciscoagdsurdevt@yahoo.com</p>

            <h2>MUNICIPAL HEALTH OFFICE</h2>
            <p style="text-align: center;"><em>Transforming Lives, Building Healthy Communities</em></p>
            <h3 style="margin-top: 20px;">INFORMED CONSENT</h3>

            <div class="section">
              <p>I, <strong>${patient.pat_fname} ${patient.pat_lname}</strong>, ${age} years of age, hereby consent to the medical, nursing, laboratory, and radiology procedures to be conducted by the staff of the <strong>Rural Health Unit and Reproductive Health Center of San Francisco</strong>. I entrust myself/the patient to their care and authorize them to administer necessary medications and treatments as prescribed by my attending physician whom I have voluntarily chosen and accepted to treat me/the patient.</p>

              <p>I have been thoroughly explained on the treatment and procedures involved and have been provided with all necessary information. I understand that these may encompass various diagnostic tests, injections, and potentially invasive surgeries and procedures.</p>

              <p><em>(Please specify the surgery or procedure if any)</em></p>
              <p>________________________________________________________________________</p>

              <p>Furthermore, I consent to the administration of anesthesia during the procedure as may then be considered necessary or desirable in the judgment of the medical staff. I also grant permission for the disposal of any tissues or parts by authorities of the Primary Care Facility (PCF) that may be deemed necessary to remove from me/the patient.</p>

              <p>I agree to the documentation of the treatment or operation through photography and/or videography.</p>

              <p>I am fully aware of and properly explained the <strong>No Balance Billing Policy</strong> for basic accommodation in the PCF. I am also informed on the pricing of various services and commodities offered by the facility such as the price of basic accommodation, fees of medical and surgical procedures, price of laboratory and professional fees, price of drugs and medicines and medical supplies, bundle/package price of health services, corresponding PhilHealth case rates and Z-package rates if applicable.</p>

              <p>I understand that personal and sensitive data may be collected, and it will be handled with utmost confidentiality. Additionally, I have been informed about how the information will be used, stored, and shared.</p>

              <p>This consent is given freely and voluntarily, without any external pressure or coercion. I acknowledge the potential risks and complications associated with the procedures, which may not always be foreseeable or avoidable.</p>

              <p>I understand that neither the attending physician(s) nor the PCF personnel will be held liable for any charges, provided there is no negligence on their part.</p>
            </div>

            <div class="section">
              <p>Signature or Thumbmark of Patient or Authorized Person: ____________________________</p>
              <p>Relation to the patient: ____________________________</p>
              <p>(In case the patient is minor or unable to sign)</p>
              <br>
              <p>Witness: ____________________________</p>
              <p>Signature: ____________________________</p>
              <p>Address: ____________________________</p>
              <br>
              <p>Interpreter (if required): ____________________________</p>
              <p>Signature: ____________________________</p>
              <p>Address: ____________________________</p>
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
            <Head title="Patient Consent" />
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-5">
                <div className="fixed inset-0" style={{ backgroundColor: 'rgba(49, 49, 49, 0.6)' }} />
                <div className="relative z-10 max-h-screen w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                    <div className="mb-4 text-center">
                        <h1 className="text-xl font-bold">Republic of the Philippines</h1>
                        <p>Province of Agusan del Sur</p>
                        <p className="font-semibold">MUNICIPALITY OF SAN FRANCISCO</p>
                        <p className="text-sm">
                            Purok 3, Barangay 4, San Francisco, Agusan del Sur
                            <br />
                            Email: rhusanfranciscoagdsurdevt@yahoo.com
                        </p>
                    </div>

                    <h2 className="mb-2 text-center text-lg font-bold">MUNICIPAL HEALTH OFFICE</h2>
                    <p className="mb-4 text-center italic">Transforming Lives, Building Healthy Communities</p>
                    <h3 className="text-md mb-6 text-center font-semibold">INFORMED CONSENT</h3>

                    <div className="mb-4 max-h-[60vh] space-y-4 overflow-y-auto text-justify text-sm">
                        <p>
                            I,{' '}
                            <strong>
                                {patient.pat_fname} {patient.pat_lname}
                            </strong>
                            , <strong>{age}</strong> years of age, hereby consent to the medical, nursing, laboratory, and radiology procedures to be
                            conducted by the staff of the <strong>Rural Health Unit and Reproductive Health Center of San Francisco</strong>. I
                            entrust myself/the patient to their care and authorize them to administer necessary medications and treatments as
                            prescribed by my attending physician whom I have voluntarily chosen and accepted to treat me/the patient.
                        </p>

                        <p>
                            I have been thoroughly explained on the treatment and procedures involved and have been provided with all necessary
                            information. I understand that these may encompass various diagnostic tests, injections, and potentially invasive
                            surgeries and procedures.
                        </p>

                        <p>
                            <em>(Please specify the surgery or procedure if any)</em>
                        </p>
                        <p>________________________________________________________________________</p>

                        <p>
                            Furthermore, I consent to the administration of anesthesia during the procedure as may then be considered necessary or
                            desirable in the judgment of the medical staff. I also grant permission for the disposal of any tissues or parts by
                            authorities of the Primary Care Facility (PCF) that may be deemed necessary to remove from me/the patient.
                        </p>

                        <p>I agree to the documentation of the treatment or operation through photography and/or videography.</p>

                        <p>
                            I am fully aware of and properly explained the <strong>No Balance Billing Policy</strong> for basic accommodation in the
                            PCF. I am also informed on the pricing of various services and commodities offered by the facility such as the price of
                            basic accommodation, fees of medical and surgical procedures, price of laboratory and professional fees, price of drugs
                            and medicines and medical supplies, bundle/package price of health services, corresponding PhilHealth case rates and
                            Z-package rates if applicable.
                        </p>

                        <p>
                            I understand that personal and sensitive data may be collected, and it will be handled with utmost confidentiality.
                            Additionally, I have been informed about how the information will be used, stored, and shared.
                        </p>

                        <p>
                            This consent is given freely and voluntarily, without any external pressure or coercion. I acknowledge the potential risks
                            and complications associated with the procedures, which may not always be foreseeable or avoidable.
                        </p>

                        <p>
                            I understand that neither the attending physician(s) nor the PCF personnel will be held liable for any charges, provided
                            there is no negligence on their part.
                        </p>
                    </div>

                    <div className="mb-4 flex items-center space-x-2">
                        <Input type="checkbox" id="agreeConsent" checked={isAgreed} onChange={handleAgreementChange} className="h-4 w-4" />
                        <Label htmlFor="agreeConsent" className="text-sm">
                            I have read and agree to the terms of the informed consent.
                        </Label>
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                        <Button onClick={() => router.visit('/patients')} className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                            Close
                        </Button>
                        <Button
                            onClick={printConsent}
                            disabled={!isAgreed}
                            className={`px-4 py-2 ${isAgreed ? 'bg-green-600' : 'cursor-not-allowed bg-gray-300'} rounded-lg text-white hover:bg-green-700`}
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
