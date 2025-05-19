import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ShowAssessmentForm from './ShowAssessmentForms';
import TreatmentPlan from './TreatmentPlan';
import AppLogos from '@/components/app-logo-itr';
import { Button } from '@/components/ui/button';
import { Printer, PrinterCheckIcon, Stethoscope } from 'lucide-react';



interface Props extends PageProps {
    patient: any;
    consultation?: any;
    assessments: any[];
}

export default function ITRiClinicPat({ patient, consultation, assessments }: Props) {
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;

    const handlePrint = () => {
        window.print();
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Mental Health', href: '/patients' },
        { title: 'Search Patients', href: '/patients/create' },
        { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
        { title: 'ITR & Assessment Forms & Treatment Plan', href: '#' },
    ];

    const renderCheckbox = (label: string, selectedList: string) => {
        const normalizedSelected =
            selectedList?.split(',').map(item => item.trim().toLowerCase().replace(/[\s-]/g, '')) || [];
        const normalizedLabel = label.toLowerCase().replace(/[\s-]/g, '');

        // Special logic for "Visited"
        const isVisited = normalizedLabel === 'visited' &&
            (normalizedSelected.includes('followupvisit') ||
                normalizedSelected.includes('newadmission') ||
                normalizedSelected.includes('newconsultation'));

        const isChecked = normalizedSelected.includes(normalizedLabel) || isVisited;

        return (
            <label key={label} className="flex items-center gap-1">
                <input type="checkbox" checked={isChecked} readOnly />
                <span className="font-bold">{label}</span>
            </label>
        );
    };



    function calculateAge(birthDateString: string) {
        if (!birthDateString) return '-';
        const birthDate = new Date(birthDateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <style>
                {`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  .printable-area, .printable-area * {
                    visibility: visible;
                  }
                  .printable-area {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                  }
                    
                }
              `}
            </style>
            <Head title="ITR & Assessment Forms" />
            <div className="p-6 bg-white shadow rounded text-xs space-y-4">
                <div className="flex justify-end">
                    <Button className="flex items-center gap-2" onClick={handlePrint}>
                        <PrinterCheckIcon />
                        Print All Forms
                    </Button>
                </div>
                <div className="printable-area">
                    <div className="p-6 bg-white shadow rounded-md text-sm">
                        <table className="table-auto w-full border border-black text-left">
                            <thead>
                                <tr>
                                    <th className="border border-black p-1">
                                        <div className="flex items-center space-x-2">
                                            <AppLogos />
                                            <div>
                                                <span className="text-xs font-normal block">Republic of the Philippines</span>
                                                <span className="text-base font-bold block">Department of Health</span>
                                                <span className="text-xs font-normal block">Kagawaran ng Kalusugan</span>
                                            </div>
                                        </div>
                                    </th>


                                    <th className="border border-black p-1 text-xs font-normal align-top">Family Serial Number</th>
                                    <th className="border border-black p-1 text-xs font-normal align-top">Facility Code</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-1 text-center font-bold text-2xl" colSpan={8}>
                                        INDIVIDUAL TREATMENT RECORD
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        {/* I. PATIENT INFORMATION */}
                        <table className="table-auto w-full border border-black text-left">
                            <thead>
                                <tr>
                                    <th colSpan={6} className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        I. Patient Information (Impormasyon ng Pasyente)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-1">Last Name</td>
                                    <td className="border border-black p-1 font-bold uppercase">{patient.pat_lname}</td>
                                    <td className="border border-black p-1">First Name</td>
                                    <td className="border border-black p-1 font-bold uppercase">{patient.pat_fname}</td>
                                    <td className="border border-black p-1">Middle Name</td>
                                    <td className="border border-black p-1 font-bold uppercase">{patient.pat_mname}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">Suffix</td>
                                    <td className="border border-black p-1 font-bold uppercase">{patient.suffix || 'N/A'}</td>
                                    <td className="border border-black p-1">Age</td>
                                    <td className="border border-black p-1 font-bold uppercase">{calculateAge(patient.pat_birthDate)}</td>
                                    <td className="border border-black p-1">Residential Address</td>
                                    <td className="border border-black p-1 font-bold uppercase">
                                        {patient.patient_address}, {patient.bgycode}, {patient.citycode}, {patient.provcode}, {patient.zipcode}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* II. CHU / RHU PERSONNEL ONLY */}
                        <table className="table-auto w-full border border-black text-left">
                            <thead>
                                <tr>
                                    <th colSpan={8} className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        II. For CHU / RHU Personnel Only (para sa kinatawan ng CHU / RHU lamang)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="border border-black p-1">Mode of Transaction</td>
                                    <td className="border border-black p-1" colSpan={2}>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('Walk-in', consultation?.consult_type_code)}
                                            {renderCheckbox('Visited', consultation?.consult_type_code)}
                                            {renderCheckbox('Referral', consultation?.consult_type_code)}
                                        </div>
                                    </td>

                                    {consultation?.consult_type_code === 'referral' ? (
                                        <>
                                            <td className="border border-black p-1">Referred From</td>
                                            <td className="border border-black p-1 font-bold uppercase">{patient?.provider_name || ''}</td>
                                            <td className="border border-black p-1">Referred To</td>
                                            <td className="border border-black p-1 font-bold uppercase" colSpan={2}>
                                                {latestAssessment?.ref_fhud || ''}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            {/* If you want to leave empty cells to keep table layout consistent, add empty cells here */}
                                            <td className="border border-black p-1" colSpan={5}></td>
                                        </>
                                    )}
                                </tr>

                                <tr>
                                    <td className="border border-black p-1">Date of Consultation</td>
                                    <td className="border border-black p-1 font-bold uppercase" colSpan={2}>{consultation?.consult_date || ''}</td>
                                    <td className="border border-black p-1">Consultation Time</td>
                                    <td className="border border-black p-1 font-bold uppercase">
                                        {consultation?.consult_time
                                            ? new Date(`1970-01-01T${consultation.consult_time}`)
                                                .toLocaleTimeString('en-PH', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                    timeZone: 'Asia/Manila',
                                                })
                                            : ''}
                                    </td>


                                    <td className="border border-black p-1">Reason(s) for Referral</td>
                                    <td className="border border-black p-1 font-bold uppercase" colSpan={2}>
                                        {latestAssessment?.ref_reason || ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">Blood Pressure</td>
                                    <td className="border border-black p-1 font-bold uppercase">{consultation?.pat_systolic_pres || ''}/{consultation?.pat_diastolic_pres || ''}</td>
                                    <td className="border border-black p-1">Temperature</td>
                                    <td className="border border-black p-1 font-bold uppercase">{consultation?.pat_temperature || ''}</td>
                                    <td className="border border-black p-1">Height (cm)</td>
                                    <td className="border border-black p-1 font-bold uppercase">{consultation?.pat_height || ''}</td>
                                    <td className="border border-black p-1">Weight (kg)</td>
                                    <td className="border border-black p-1 font-bold uppercase">{consultation?.pat_weight || ''}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">Name of Attending Provider</td>
                                    <td className="border border-black p-1 font-bold uppercase" colSpan={4}>
                                        {patient?.provider_name || ''}
                                    </td>
                                    <td className="border border-black p-1">Referred By</td>
                                    <td className="border border-black p-1 font-bold uppercase" colSpan={3}>
                                        {latestAssessment.phar_doc}
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                        <table className="table-auto w-full border border-black text-left">
                            <thead>
                                <tr>
                                    <th className="border border-black p-1 w-2/3">Nature of Visit</th>
                                    <th className="border border-black p-1">Chief Complaint</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-1">
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('New Consultation', consultation?.consult_type_code)}
                                            {renderCheckbox('New Admission', consultation?.consult_type_code)}
                                            {renderCheckbox('Follow-up Visit', consultation?.consult_type_code)}
                                            {renderCheckbox('Referral', consultation?.consult_type_code)}
                                        </div>
                                    </td>
                                    <td className="border border-black p-1 font-bold uppercase">
                                        {consultation?.chief_complaint || ''}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={8} className="border border-black p-1 bg-gray-200 font-semibold uppercase">Type of Consultation/Purpose of Visit</th>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1" colSpan={4}>
                                        <div className="grid grid-cols-4 gap-1">
                                            {[

                                                'General', 'Prenatal', 'Dental Care', 'Child Care', 'Child Nutrition', 'Mental Health',
                                                'Injury', 'Adult Immunization', 'Family Planning', 'Postpartum',
                                                'Tuberculosis', 'Child Immunization', 'Sick Children', 'Fire Cracker Injury',
                                            ].map((item, idx) => (
                                                <label key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        className="mr-1"
                                                        checked={
                                                            item === 'Mental Health' // Always check Mental Health
                                                                ? true
                                                                : consultation?.to_consult_code?.includes(item)
                                                        }
                                                        readOnly
                                                    />
                                                    <span>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <th colSpan={8} className="border border-black p-1 bg-gray-200 font-semibold uppercase">Diagnosis:</th>
                                </tr>
                                <tr>
                                    <td className="align-top">
                                        <div className="flex gap-4 flex-wrap">
                                            <div className="font-bold uppercase">{latestAssessment?.diagnosis || ''}</div>
                                            <div>
                                                ICD 10: <span className="font-bold uppercase">{latestAssessment?.icd_10_code || ''}</span>
                                            </div>
                                            <div className="text-sm">
                                                Description: <span className="font-bold uppercase text-xs">{latestAssessment?.icd_10_descrip || ''}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        Medication/Treatment:
                                    </th>
                                    <th className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        Name of Health Care Provider:
                                    </th>
                                </tr>
                                <tr>
                                    <td className="border border-black text-xs h-[80px] align-top uppercase">
                                        {latestAssessment?.phar_med?.toUpperCase() || ''},{" "}
                                        {latestAssessment?.phar_intake ? parseFloat(latestAssessment.phar_intake).toString() : ''}{" "}
                                        {latestAssessment?.phar_intakeUnit?.toUpperCase() || ''} IN EVERY{" "}
                                        {latestAssessment?.phar_freq ? parseFloat(latestAssessment.phar_freq).toString() : ''}{" "}
                                        {latestAssessment?.phar_freqUnit?.toUpperCase() || ''} FOR{" "}
                                        {latestAssessment?.phar_dur ? parseFloat(latestAssessment.phar_dur).toString() : ''}{" "}
                                        {latestAssessment?.phar_durUnit?.toUpperCase() || ''}
                                        {latestAssessment?.phar_quantity ? `, (${parseFloat(latestAssessment.phar_quantity).toString()})-Total` : ''}
                                    </td>

                                    <td className="border border-black text-xs h-[80px] align-top uppercase">
                                        {patient?.provider_name || ''}<br />
                                        {latestAssessment?.phar_doc || ''}
                                    </td>

                                </tr>


                                <tr>
                                    <th className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        Laboratory Findings/Impression:
                                    </th>
                                    <th className="border border-black p-1 bg-gray-200 font-semibold uppercase">
                                        Performed Laboratory Test:
                                    </th>
                                </tr>
                                <tr>
                                    <td className="border border-black text-xs h-[80px] align-top">

                                    </td>
                                    <td className="border border-black text-xs h-[80px] align-top">

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
<br></br>

                    <ShowAssessmentForm assessments={assessments} patient={patient} />
<br></br>
                    <TreatmentPlan assessments={assessments} patient={patient} />
                </div>
            </div>
        </AppLayout>
    );
}
