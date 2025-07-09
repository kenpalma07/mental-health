import AppLayout from '@/layouts/app-layout';
import type {
    BreadcrumbItem,
    PageProps,
    MasterPatient,
    Consultations,
    MentalAssessmentForm,
    Pharma,
} from '@/types';
import { Head } from '@inertiajs/react';
import ShowAssessmentForm from './ShowAssessmentForms';
import TreatmentPlan from './TreatmentPlan';
import AppLogos from '@/components/app-logo-itr';
import { Button } from '@/components/ui/button';
import { PrinterCheckIcon } from 'lucide-react';

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface Props extends PageProps {
    patient: MasterPatient;
    consultation?: Consultations;
    assessments: MentalAssessmentForm[];
    pharmaMeds: Pharma[];
}

export default function ITRiClinicPat({ patient, consultation, assessments, pharmaMeds }: Props) {
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

    const renderCheckbox = (label: string, selectedList: string | undefined) => {
        const normalizedSelected =
            selectedList?.split(',').map(item => item.trim().toLowerCase().replace(/[\s-]/g, '')) || [];
        const normalizedLabel = label.toLowerCase().replace(/[\s-]/g, '');

        const isVisited =
            normalizedLabel === 'visited' &&
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

    function formatNumber(value?: string | number): string {
        if (!value) return '';
        const num = parseFloat(value.toString());
        if (isNaN(num)) return value.toString();
        return num % 1 === 0 ? parseInt(value.toString()).toString() : num.toString();
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
                        {/* Header Table */}
                        <Table className="table-auto w-full border border-black text-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border border-black p-1">
                                        <div className="flex items-center space-x-2">
                                            <AppLogos />
                                            <div>
                                                <span className="text-xs font-normal block">Republic of the Philippines</span>
                                                <span className="text-base font-bold block">Department of Health</span>
                                                <span className="text-xs font-normal block">Kagawaran ng Kalusugan</span>
                                            </div>
                                        </div>
                                    </TableHead>
                                    <TableHead className="border border-black p-1 text-xs font-normal align-top">Family Serial Number</TableHead>
                                    <TableHead className="border border-black p-1 text-xs font-normal align-top">Facility Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8} className="p-1 text-center font-bold text-2xl">
                                        INDIVIDUAL TREATMENT RECORD
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* I. PATIENT INFORMATION */}
                        <Table className="table-auto w-full border border-black text-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={6} className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        I. Patient Information (Impormasyon ng Pasyente)
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Last Name</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{patient.pat_lname}</TableCell>
                                    <TableCell className="border border-black p-1">First Name</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{patient.pat_fname}</TableCell>
                                    <TableCell className="border border-black p-1">Middle Name</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{patient.pat_mname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Suffix</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{patient.suffix_code || 'N/A'}</TableCell>
                                    <TableCell className="border border-black p-1">Age</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{calculateAge(patient.pat_birthDate)}</TableCell>
                                    <TableCell className="border border-black p-1">Residential Address</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">
                                        {patient.patient_address}, {patient.bgycode}, {patient.citycode}, {patient.provcode}, {patient.zipcode}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* II. CHU / RHU PERSONNEL ONLY */}
                        <Table className="table-auto w-full border border-black text-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={8} className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        II. For CHU / RHU Personnel Only (para sa kinatawan ng CHU / RHU lamang)
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Mode of Transaction</TableCell>
                                    <TableCell className="border border-black p-1" colSpan={2}>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('Walk-in', consultation?.consult_type_code)}
                                            {renderCheckbox('Visited', consultation?.consult_type_code)}
                                            {renderCheckbox('Referral', consultation?.consult_type_code)}
                                        </div>
                                    </TableCell>
                                    {consultation?.consult_type_code === 'referral' ? (
                                        <>
                                            <TableCell className="border border-black p-1">Referred From</TableCell>
                                            <TableCell className="border border-black p-1 font-bold uppercase">{patient?.provider_name || ''}</TableCell>
                                            <TableCell className="border border-black p-1">Referred To</TableCell>
                                            <TableCell className="border border-black p-1 font-bold uppercase" colSpan={2}>
                                                {latestAssessment?.ref_fhud || ''}
                                            </TableCell>
                                        </>
                                    ) : (
                                        <TableCell className="border border-black p-1" colSpan={5}></TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Date of Consultation</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase" colSpan={2}>{consultation?.consult_date || ''}</TableCell>
                                    <TableCell className="border border-black p-1">Consultation Time</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">
                                        {consultation?.consult_time
                                            ? new Date(`1970-01-01T${consultation.consult_time}`).toLocaleTimeString('en-PH', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                                timeZone: 'Asia/Manila',
                                            })
                                            : ''}
                                    </TableCell>
                                    <TableCell className="border border-black p-1">Reason(s) for Referral</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase" colSpan={2}>
                                        {latestAssessment?.ref_reason || ''}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Blood Pressure</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{consultation?.pat_systolic_pres || ''}/{consultation?.pat_diastolic_pres || ''}</TableCell>
                                    <TableCell className="border border-black p-1">Temperature</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{consultation?.pat_temperature || ''}</TableCell>
                                    <TableCell className="border border-black p-1">Height (cm)</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{consultation?.pat_height || ''}</TableCell>
                                    <TableCell className="border border-black p-1">Weight (kg)</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">{consultation?.pat_weight || ''}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black p-1">Name of Attending Provider</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase" colSpan={4}>
                                        {patient?.provider_name || ''}
                                    </TableCell>
                                    <TableCell className="border border-black p-1">Referred By</TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase" colSpan={3}>
                                        {latestAssessment?.phar_doc}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Nature of Visit and Chief Complaint */}
                        <Table className="table-auto w-full border border-black text-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border border-black p-1 w-2/3">Nature of Visit</TableHead>
                                    <TableHead className="border border-black p-1">Chief Complaint</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border border-black p-1">
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('New Consultation', consultation?.consult_type_code)}
                                            {renderCheckbox('New Admission', consultation?.consult_type_code)}
                                            {renderCheckbox('Follow-up Visit', consultation?.consult_type_code)}
                                            {renderCheckbox('Referral', consultation?.consult_type_code)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="border border-black p-1 font-bold uppercase">
                                        {consultation?.chief_complaint || ''}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead colSpan={8} className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        III. Type of Consultation/Purpose of Visit
                                    </TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black p-1" colSpan={4}>
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
                                                            item === 'Mental Health'
                                                                ? true
                                                                : consultation?.to_consult_code?.includes(item)
                                                        }
                                                        readOnly
                                                    />
                                                    <span>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead colSpan={8} className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        IV. Diagnosis
                                    </TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="align-top h-[90px] align-top">
                                        <div className="flex gap-4 flex-wrap">
                                            <div className="font-bold uppercase">{latestAssessment?.diagnosis || ''}</div>
                                            <div>
                                                ICD 10: <span className="font-bold uppercase text-xs">{latestAssessment?.icd_10_code || ''}</span>
                                            </div>
                                            <div className="text-sm">
                                                Description: <span className="font-bold uppercase text-xs">{latestAssessment?.icd_10_descrip || ''}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        V. Medication/Treatment:
                                    </TableHead>
                                    <TableHead className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        Name of Health Care Provider:
                                    </TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black text-xs h-[80px] align-top uppercase">
                                        {pharmaMeds.length > 0 ? (
                                            <ul className="space-y-1">
                                                {pharmaMeds.map((med, idx) => (
                                                    <li key={idx}>
                                                        {med.phar_med?.toUpperCase()},{" "}
                                                        {formatNumber(med.phar_intake)} {med.phar_intakeUnit?.toUpperCase()} IN EVERY{" "}
                                                        {formatNumber(med.phar_freq)} {med.phar_freqUnit?.toUpperCase()} FOR{" "}
                                                        {formatNumber(med.phar_dur)} {med.phar_durUnit?.toUpperCase()}
                                                        {med.phar_quantity && parseFloat(med.phar_quantity) !== 0 && (
                                                            <>
                                                                , (<span className="font-bold">{formatNumber(med.phar_quantity)}</span>)-Total
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No medicines recorded</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="border border-black text-xs h-[80px] align-top uppercase">
                                        {patient?.provider_name || ''}
                                        <br />
                                        {pharmaMeds.length > 0 ? pharmaMeds[0].phar_doc : ''}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        VI. Laboratory Findings/Impression:
                                    </TableHead>
                                    <TableHead className="border border-black p-1 bg-black text-white text-xs font-semibold uppercase">
                                        Performed Laboratory Test:
                                    </TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-black text-xs h-[80px] align-top"></TableCell>
                                    <TableCell className="border border-black text-xs h-[80px] align-top"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <br />
                    <ShowAssessmentForm pharmaMeds={pharmaMeds} assessments={assessments} patient={patient} />
                    <br />
                    <TreatmentPlan pharmaMeds={pharmaMeds} assessments={assessments} patient={patient} />
                </div>
            </div>
        </AppLayout>
    );
}