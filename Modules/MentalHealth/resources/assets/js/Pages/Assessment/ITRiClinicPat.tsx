import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ShowAssessmentForms from './ShowAssessmentForms';


interface Props extends PageProps {
    patient: any;
    consultation?: any;
    assessments: any[];
}

export default function ITRiClinicPat({ patient, consultation, assessments }: Props) {
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Mental Health', href: '/patients' },
        { title: 'Search Patients', href: '/patients/create' },
        { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
        { title: 'ITR', href: '#' },
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
            <Head title="Individual Treatment Record" />

            <div className="p-6 bg-white shadow rounded text-xs space-y-4">
                <div className="p-6 bg-white shadow rounded-md text-sm">
                <h1 className="text-center font-bold text-sm uppercase">
                    Republic of the Philippines - Department of Health<br />
                    <span className="font-semibold">Individual Treatment Record</span>
                </h1>

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
                            <td className="border border-black p-1 font-bold uppercase">{patient.suffix || '-'}</td>
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
                                II. For CHU / RHU Personnel Only
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
                            <td className="border border-black p-1">REFERRED FROM</td>
                            <td className="border border-black p-1 font-bold uppercase">{patient?.provider_name || ''}</td>
                            <td className="border border-black p-1">REFERRED TO</td>
                            <td className="border border-black p-1 font-bold uppercase" colSpan={2}>
                                {latestAssessment?.ref_fhud || ''}
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1">Date of Consultation</td>
                            <td className="border border-black p-1 font-bold uppercase" colSpan={2}>{consultation?.consult_date || ''}</td>
                            <td className="border border-black p-1">Consultation Time</td>
                            <td className="border border-black p-1 font-bold uppercase">{consultation?.consult_date || ''}</td>
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
                                        'Mental Health',
                                        'General', 'Prenatal', 'Dental Care', 'Child Care', 'Child Nutrition',
                                        'Injury', 'Adult Immunization', 'Family Planning', 'Postpartum',
                                        'Tuberculosis', 'Child Immunization', 'Sick Children', 'Fire Cracker Injury',
                                    ].map((item, idx) => (
                                        <label key={idx}>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={consultation?.to_consult_code?.includes(item)}
                                                readOnly
                                            />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                {/* Nature of Visit and Complaints
                <table className="table-auto w-full border border-black text-left">
                    <tbody>
                        <tr>
                            <td className="border border-black p-1">Nature of Visit</td>
                            <td className="border border-black p-1">Chief Complaint</td>
                        </tr>
                        <tr>
                            <td>sdds</td>
                            <td>dsdsd</td>
                            <td>sdsd</td>
                            <td className="border border-black p-1">
                                <div className="grid grid-cols-2 gap-1">
                                    {[
                                        'New Consultation/Case', 'New Admission', 'Follow-up Visit',
                                        'General', 'Prenatal', 'Dental Care', 'Child Care', 'Child Nutrition',
                                        'Injury', 'Adult Immunization', 'Family Planning', 'Postpartum',
                                        'Tuberculosis', 'Child Immunization', 'Sick Children', 'Fire Cracker Injury', 'Mental Health',
                                    ].map((item, idx) => (
                                        <label key={idx}>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={consultation?.to_consult_code?.includes(item)}
                                                readOnly
                                            />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> */}

                {/* Diagnosis and Provider */}
                {/* <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="font-semibold uppercase">Diagnosis:</p>
                        <Textarea
                            className="w-full border border-black p-1 min-h-[60px] mt-1 font-bold uppercase"
                            readOnly
                            value={latestAssessment?.diagnosis || ''}
                        />
                    </div>
                    <div>
                        <p className="font-semibold uppercase">Name of Health Care Provider:</p>
                        <Input
                            className="w-full border border-black p-1 mt-1 font-bold uppercase"
                            readOnly
                            value={patient?.provider_name || ''}
                        />
                    </div>
                </div> */}

                {/* Medications / Treatment & Lab Test */}
                {/* <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="font-semibold uppercase">Medications / Treatment:</p>
                        <Textarea
                            className="w-full border border-black p-1 min-h-[60px] mt-1 font-bold uppercase"
                            readOnly
                            value={latestAssessment?.phar_med || ''}
                        />
                    </div>
                    <div>
                        <p className="font-semibold uppercase">Performed Laboratory Test:</p>
                        <Textarea
                            className="w-full border border-black p-1 min-h-[60px] mt-1 font-bold uppercase"
                            readOnly
                            value=""
                        />
                    </div>
                </div> */}

                {/* Lab Findings */}
                {/* <div>
                    <p className="font-semibold uppercase">Laboratory Findings / Impression:</p>
                    <Textarea
                        className="w-full border border-black p-1 min-h-[60px] mt-1 font-bold uppercase"
                        readOnly
                        value=""
                    />
                </div> */}
            </div>
            <ShowAssessmentForms assessments={latestAssessment} patient={patient} />
            </div>
        </AppLayout>
    );
}
