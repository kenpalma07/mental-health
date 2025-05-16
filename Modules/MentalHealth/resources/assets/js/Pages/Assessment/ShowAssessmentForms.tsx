import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Props extends PageProps {
    patient: any;
    consultation?: any;
    assessments: any[];
}

export default function ShowAssessmentForm({ patient, consultation, assessments }: Props) {
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;

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

        <div className="p-6 bg-white shadow rounded-md text-sm">
            <h1 className="text-lg font-bold mb-4 text-center uppercase">
                Center for Health Development - CARAGA
            </h1>

            <table className="table-auto w-full border border-black text-left">
                <tbody>
                    {/* Facility and Provider Info */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Facility Details</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Facility Name</td>
                        <td className="p-2 border border-black">
                            {patient.facility_name || ''}
                        </td>
                        <td className="p-2 font-semibold border border-black">Facility location</td>
                        <td className="p-2 border border-black">
                            {patient.facility_location || ''}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Name of provider</td>
                        <td className="p-2 border border-black">
                            {patient.provider_name || ''}
                        </td>
                        <td className="p-2 font-semibold border border-black">Date intake</td>
                        <td className="p-2 border border-black">
                            {latestAssessment?.consult_date_assess || ''}
                        </td>
                    </tr>

                    {/* Personal Details */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Personal details</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Patient Fullname</td>
                        <td className="p-2 border border-black">
                            {`${patient.pat_fname || ''} ${patient.pat_mname || ''} ${patient.pat_lname || ''}`.trim()}
                        </td>
                        <td className="p-2 font-semibold border border-black">Date of birth / Age</td>
                        <td className="p-2 border border-black">
                            {`${patient.pat_birthDate} / ${calculateAge(patient.pat_birthDate)} years`}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Occupation</td>
                        <td className="p-2 border border-black">
                            {patient.occupation_code || ''}
                        </td>
                        <td className="p-2 font-semibold border border-black">Gender</td>
                        <td className="p-2 border border-black">
                            {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : ''}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Address</td>
                        <td colSpan={3} className="p-2 border border-black">
                            {patient.patient_address || ''}, {patient.bgycode}, {patient.citycode}, {patient.provcode}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Mobile</td>
                        <td  className="p-2 border border-black">
                            {patient.pat_mobile || ''}
                        </td>
                        <td className="p-2 font-semibold border border-black">Telephone</td>
                        <td className="p-2 border border-black">
                            {patient.pat_landline || ''}
                        </td>
                    </tr>

                    {/* Carer's Details */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Carer’s details</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Carer’s name</td>
                        <td className="p-2 border border-black">
                            {latestAssessment?.carer_name_fat || ''}
                        </td>
                        <td className="p-2 font-semibold border border-black">Address</td>
                        <td className="p-2 border border-black">
                            {latestAssessment?.carer_address || ''} 
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold border border-black">Telephone</td>
                        <td className="p-2 border border-black">
                            <Input disabled value={latestAssessment?.carer_telephone || ''} />
                        </td>
                        <td className="p-2 font-semibold border border-black">Relationship to patient</td>
                        <td className="p-2 border border-black">
                            <Input disabled value={latestAssessment?.carer_relationship || ''} />
                        </td>
                    </tr>

                    {/* Section I */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            I. Assess physical health (mhGAP-IG 2.0 p.8)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <Textarea disabled value={latestAssessment?.physical_assessment || ''} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <Textarea disabled value={latestAssessment?.physical_management || ''} />
                        </td>
                    </tr>

                    {/* Section II */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            II. Conduct MNS assessment (mhGAP-IG 2.0 p.9)
                        </td>
                    </tr>
                    {[1, 2, 3, 4].map(n => (
                        <tr key={`section2_${n}`}>
                            <td colSpan={4} className="p-2 border border-black">
                                <Textarea
                                    disabled
                                    value={latestAssessment?.[`section2_${n}`] || ''}
                                    placeholder={`Section 2.${n}`}
                                />
                            </td>
                        </tr>
                    ))}

                    {/* Section III */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            III. Manage MNS conditions (mhGAP-IG 2.0 p.11)
                        </td>
                    </tr>
                    {[1, 2, 3, 4, 5, 6, 7].map(n => (
                        <tr key={`section3_${n}`}>
                            <td colSpan={4} className="p-2 border border-black">
                                <Textarea
                                    disabled
                                    value={latestAssessment?.[`section3_${n}`] || ''}
                                    placeholder={`Section 3.${n}`}
                                />
                            </td>
                        </tr>
                    ))}

                    {/* Special Populations */}
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div className="font-semibold mb-2">8. Special populations</div>
                            <div className="flex flex-col space-y-1 ml-4">
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.special_children || false} disabled /> Children and adolescents
                                </label>
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.special_older || false} disabled /> Older adults
                                </label>
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.special_pregnant || false} disabled /> Pregnant or breastfeeding women
                                </label>
                            </div>
                        </td>
                    </tr>

                    {/* Section IV */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            IV. Assess for self-harm or suicide and substance use disorders
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <Textarea disabled value={latestAssessment?.selfharm_suicide_assessment || ''} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <p className="mt-4 italic text-xs">Adapted from the mhGAP-IG version 2.0</p>
        </div>
    );
}
