import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';


interface Props extends PageProps {
    patient: any;
    consultation?: any;
    assessments: any[];
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

            <table className="table-auto w-full border border-black text-left">
                <tbody>
                    {/* Facility and Provider Info */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Facility Details</td>
                    </tr>
                    <tr>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Facility Name:</td>
                            <div>{patient.facility_name || 'N/A'}</div>
                        </td>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Facility location:</td>
                            <div> {patient.facility_location || 'N/A'}</div>
                        </td>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Name of provider:</td>
                            <div> {patient.provider_name || 'N/A'}</div>
                        </td>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Date intake:</td>
                            <div>{latestAssessment?.consult_date_assess || 'N/A'}</div>
                        </td>
                    </tr>

                    {/* Personal Details */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Personal details</td>
                    </tr>
                    <tr>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Patient Fullname:</td>
                            <div>{`${patient.pat_fname || ''} ${patient.pat_mname || ''} ${patient.pat_lname || ''}`.trim()}</div>
                        </td>
                        <td className="p-2 border border-black">
                            <div className="space-y-2">
                                <div className="flex">
                                    <div className="w-40 font-semibold">Date of birth:</div>
                                    <div>{patient.pat_birthDate}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 font-semibold">Age:</div>
                                    <div>{calculateAge(patient.pat_birthDate)}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Occupation:</td>
                            <div>{patient.occupation_code || 'N/A'}</div>
                        </td>
                        <td className="p-2 border border-black">
                            <td className="font-semibold">Gender:</td>
                            <div>{patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="p-2 border border-black align-top">
                            <div className="font-semibold">Address:</div>
                            <div>
                                {patient.patient_address || ''}, {patient.bgycode}, {patient.citycode}, {patient.provcode}
                            </div>
                        </td>

                        <td className="p-2 border border-black align-top">
                            <div className="font-semibold">Mobile:</div>
                            <div>{patient.pat_mobile || 'N/A'}</div>
                        </td>

                        <td className="p-2 border border-black align-top">
                            <div className="font-semibold">Telephone:</div>
                            <div>{patient.pat_landline || 'N/A'}</div>
                        </td>
                    </tr>

                    {/* Carer's Details */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">Carer’s details</td>
                    </tr>
                    <tr>
                        <td className="p-2 border border-black">
                            <div className="font-semibold">Carer’s Name:</div>
                            <td>
                                <div className="block">{`${patient.fat_fname || ''} ${patient.fat_mname || ''} ${patient.fat_lname || ''}`.trim()}</div>
                                <div className="block">{`${patient.mot_fname || ''} ${patient.mot_mname || ''} ${patient.mot_lname || ''}`.trim()}</div>
                            </td>
                        </td>
                        <td className="p-2 border border-black">
                            <div className="font-semibold">Address:</div>
                            <td>
                                <div className="block">{patient.fat_address || 'N/A'}</div>
                                <div className="block">{patient.mot_address || 'N/A'}</div>
                            </td>
                        </td>
                        <td className="p-2 border border-black">
                            <div className="font-semibold">Contact Number:</div>
                            <td>
                                <div className="block">{patient.fat_contact || 'N/A'}</div>
                                <div className="block">{patient.mot_contact || 'N/A'}</div>
                            </td>
                        </td>
                        <td className="p-2 border border-black">
                            <div className="font-semibold">Relationship to patient:</div>
                            <td>
                                <div className="block">{'Father'}</div>
                                <div className="block">{'Mother'}</div>
                            </td>
                        </td>
                    </tr>

                    {/* Section I */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            I. Assess physical health (refer to mhGAP-IG 2.0 p.8)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>1. Assessment of Physical Health:</span> {latestAssessment?.assessment_physical_health || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. Management of Physical Health:</span> {latestAssessment?.management_physical_health || 'N/A'}</div>
                        </td>
                    </tr>

                    {/* Section II */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            II. Conduct MNS assessment (refer to mhGAP-IG 2.0 p.9)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>1. Presenting Complaint:</span> {latestAssessment?.pres_comp_label || 'N/A'}: {latestAssessment?.pres_comp_item}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. General Health History:</span> {latestAssessment?.gen_heal_hist_item}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>3. MNS History:</span> {latestAssessment?.mns_hist_item || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>4. Family History to MNS Condition:</span> {latestAssessment?.fam_hist_mns_cond_item || 'N/A'}</div>
                        </td>
                    </tr>

                    {/* Section III */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            III. Manage MNS Assessment (refer to mhGAP-IG 2.0 p.11)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
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
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>2. Psychosocial Intervention:</span> {latestAssessment?.psycho_inter}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
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
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>4. Referrals:</span> {latestAssessment?.ref_choice} {latestAssessment?.ref_fhud} {latestAssessment?.ref_reason}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>5. Follow-up Plan (*Follow-up after):</span> {latestAssessment?.date_nxt_visit}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>6. Carer and Family:</span> {latestAssessment?.carer_name_mot || 'N/A'} , {latestAssessment?.carer_name_mot}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <div><span className='font-bold'>7. Link:</span> {latestAssessment?.link_status || 'N/A'}</div>
                        </td>
                    </tr>

                    {/* Special Populations */}
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
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

                        </td>
                    </tr>

                    {/* Section IV */}
                    <tr className="bg-black text-white">
                        <td colSpan={4} className="p-2 font-semibold">
                            IV. Assess for self-harm or suicide and substance use disorders
                        </td>
                    </tr>
                    <tr className="h-[100px]">
                        <td colSpan={4} className="p-2 border border-black align-top">
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
                        </td>
                    </tr>


                </tbody>
            </table>

            <p className="mt-4 italic text-xs">Adapted from the mhGAP-IG version 2.0</p>
        </div>
    );
}
