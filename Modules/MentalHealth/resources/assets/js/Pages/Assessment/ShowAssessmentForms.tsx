import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import type { PageProps, MasterPatient, Consultations, MentalAssessmentForm } from '@/types';
// Import your Table components (e.g., from shadcn/ui or your own)
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
}

export default function ShowAssessmentForm({ patient, assessments }: Props) {
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

            <Table className="table-auto w-full border border-black text-left mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            Facility Details
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Facility Name:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.facility_name || 'N/A'}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Facility location:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.facility_location || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Name of provider:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.provider_name || 'N/A'}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Date intake:</TableHead>
                        <TableCell className="p-2 border border-black">{latestAssessment?.consult_date_assess || 'N/A'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            Personal details
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Patient Fullname:</TableHead>
                        <TableCell className="p-2 border border-black">{`${patient.pat_fname || ''} ${patient.pat_mname || ''} ${patient.pat_lname || ''}`.trim()}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Date of birth:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.pat_birthDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Age:</TableHead>
                        <TableCell className="p-2 border border-black">{calculateAge(patient.pat_birthDate)}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Occupation:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.occupation_code || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Gender:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A'}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Address:</TableHead>
                        <TableCell className="p-2 border border-black">
                            {patient.patient_address || ''}, {patient.bgycode}, {patient.citycode}, {patient.provcode}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Mobile:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.pat_mobile || 'N/A'}</TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Telephone:</TableHead>
                        <TableCell className="p-2 border border-black">{patient.pat_landline || 'N/A'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            Carer’s details
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Carer’s Name:</TableHead>
                        <TableCell className="p-2 border border-black">
                            <div className="block">{`${patient.fat_fname || ''} ${patient.fat_mname || ''} ${patient.fat_lname || ''}`.trim()}</div>
                            <div className="block">{`${patient.mot_fname || ''} ${patient.mot_mname || ''} ${patient.mot_lname || ''}`.trim()}</div>
                        </TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Address:</TableHead>
                        <TableCell className="p-2 border border-black">
                            <div className="block">{patient.fat_address || 'N/A'}</div>
                            <div className="block">{patient.mot_address || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Contact Number:</TableHead>
                        <TableCell className="p-2 border border-black">
                            <div className="block">{patient.fat_contact || 'N/A'}</div>
                            <div className="block">{patient.mot_contact || 'N/A'}</div>
                        </TableCell>
                        <TableHead className="p-2 border border-black font-semibold hover:bg-gray-200 transition-colors">Relationship to patient:</TableHead>
                        <TableCell className="p-2 border border-black">
                            <div className="block">Father</div>
                            <div className="block">Mother</div>
                        </TableCell>
                    </TableRow>

                    {/* Section I */}
                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            I. Assess physical health (refer to mhGAP-IG 2.0 p.8)
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>1. Assessment of Physical Health:</span> {latestAssessment?.assessment_physical_health || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. Management of Physical Health:</span> {latestAssessment?.management_physical_health || 'N/A'}</div>
                        </TableCell>
                    </TableRow>

                    {/* Section II */}
                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            II. Conduct MNS assessment (refer to mhGAP-IG 2.0 p.9)
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>1. Presenting Complaint:</span> {latestAssessment?.pres_comp_label || 'N/A'}: {latestAssessment?.pres_comp_item}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. General Health History:</span> {latestAssessment?.gen_heal_hist_item}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>3. MNS History:</span> {latestAssessment?.mns_hist_item || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>4. Family History to MNS Condition:</span> {latestAssessment?.fam_hist_mns_cond_item || 'N/A'}</div>
                        </TableCell>
                    </TableRow>

                    {/* Section III */}
                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            III. Manage MNS Assessment (refer to mhGAP-IG 2.0 p.11)
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <span className="font-bold">1. Treatment Plan:</span>
                            <div className="inline-flex items-center space-x-4 ml-4">
                                <label className="flex items-center space-x-1">
                                    <input type="checkbox" checked={latestAssessment?.treat_avail === "YES"} readOnly />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input type="checkbox" checked={latestAssessment?.treat_avail === "No"} readOnly />
                                    <span>No</span>
                                </label>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. Psychosocial Intervention:</span> {latestAssessment?.psycho_inter}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>3. Pharmalogical Intervention:</span>
                                {latestAssessment?.phar_med?.toUpperCase() || ''},{" "}
                                {latestAssessment?.phar_intake ? parseFloat(latestAssessment.phar_intake).toString() : ''}{" "}
                                {latestAssessment?.phar_intakeUnit?.toUpperCase() || ''} in every{" "}
                                {latestAssessment?.phar_freq ? parseFloat(latestAssessment.phar_freq).toString() : ''}{" "}
                                {latestAssessment?.phar_freqUnit?.toUpperCase() || ''} for{" "}
                                {latestAssessment?.phar_dur ? parseFloat(latestAssessment.phar_dur).toString() : ''}{" "}
                                {latestAssessment?.phar_durUnit?.toUpperCase() || ''}
                                {latestAssessment?.phar_quantity ? `, (${parseFloat(latestAssessment.phar_quantity).toString()})-Total` : ''}
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>4. Referrals:</span> {latestAssessment?.ref_choice} {latestAssessment?.ref_fhud} {latestAssessment?.ref_reason}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>5. Follow-up Plan (*Follow-up after):</span> {latestAssessment?.date_nxt_visit}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>6. Carer and Family:</span> {latestAssessment?.carer_name_mot || 'N/A'} , {latestAssessment?.carer_name_mot}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>7. Link:</span> {latestAssessment?.link_status || 'N/A'}</div>
                        </TableCell>
                    </TableRow>

                    {/* Special Populations */}
                    <TableRow>
                        <TableCell colSpan={4} className="p-2 border border-black">
                            <div className="font-semibold mb-2">8. Special populations</div>
                            <div className="flex flex-col space-y-1 ml-4">
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.child_and_adolescent === "Y"} readOnly /> Children and adolescents
                                </label>
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.older_adults === "Y"} readOnly /> Older adults
                                </label>
                                <label>
                                    <input type="checkbox" checked={latestAssessment?.preg_or_breastf_wom === "Y"} readOnly /> Pregnant or breastfeeding women
                                </label>
                            </div>
                        </TableCell>
                    </TableRow>

                    {/* Section IV */}
                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            IV. Assess for self-harm or suicide and substance use disorders
                        </TableHead>
                    </TableRow>
                    <TableRow className="h-[100px]">
                        <TableCell colSpan={4} className="p-2 border border-black align-top">
                            {latestAssessment?.selfharm_sui === "Y" ? (
                                <div className="space-y-1">
                                    <div><span className="font-semibold">Grade/Year:</span> {latestAssessment.grade_year || ''}</div>
                                    <div><span className="font-semibold">School:</span> {latestAssessment.school_name || ''}</div>
                                    <div><span className="font-semibold">Occupation:</span> {patient.occupation_code || ''}</div>
                                    <div><span className="font-semibold">Place of Incidence:</span> {latestAssessment.place_inci || ''}</div>
                                    <div><span className="font-semibold">Means of Suicide:</span> {latestAssessment.self_sui_means || ''}</div>
                                    <div><span className="font-semibold">Remarks:</span> {latestAssessment.self_sui_remarks || ''}</div>
                                </div>
                            ) : (
                                <div>{' '}</div>
                            )}
                            <div className="text-center italic">Refer to the next form for Treatment Plan</div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <p className="mt-4 italic text-xs">Adapted from the mhGAP-IG version 2.0</p>
        </div>
    );
}