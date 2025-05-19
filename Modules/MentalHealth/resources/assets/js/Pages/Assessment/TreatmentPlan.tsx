
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';


interface Props extends PageProps {
    patient: any;
    consultation?: any;
    assessments: any[];
}

export default function TreatmentPlan({ patient, assessments }: Props) {
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;


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
                        <td colSpan={4} className="p-2 font-semibold">Treatment Plan</td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2 w-1/2 align-top">
                            <div className="italic text-gray-700">Name:</div>
                            <div>{`${patient.pat_fname || ''} ${patient.pat_mname || ''} ${patient.pat_lname || ''}`.trim()}</div>
                            <div className="border-b border-black border-dashed h-[2px] mt-1"></div>
                        </td>
                        <td className="border border-black p-2 w-1/2 align-top">
                            <div className="italic text-gray-700">Number/ID:</div>
                            <div>{latestAssessment?.consultation_id || 'N/A'}</div>
                            <div className="border-b border-black border-dashed h-[2px] mt-1"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2 w-1/2 align-top">
                            <div className="italic text-gray-700">Date:</div>
                            <div>{latestAssessment?.consult_date_assess || 'N/A'}</div>
                            <div className="border-b border-black border-dashed h-[2px] mt-1"></div>
                        </td>
                        <td className="border border-black p-2 w-1/2 align-top">
                            <div className="italic text-gray-700">Name of health-care provider:</div>
                            <div>{patient.provider_name || 'N/A'}</div>
                            <div className="border-b border-black border-dashed h-[2px] mt-1"></div>
                        </td>
                    </tr>

                    <tr className="bg-black text-white">
                        <td colSpan={2} className="p-2">Presenting problem</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Brief summary of the reason the person is seeking help</div>
                            <div>[{latestAssessment?.pres_comp_label || 'N/A'}] {latestAssessment?.pres_comp_item || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr className="bg-black text-white">
                        <td colSpan={2} className="p-2">Written treatment plan</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Pharmacological Interventions (if any)</div>
                            <div>
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
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Psychosocial Interventions</div>
                            <div>{latestAssessment?.psycho_inter || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Referrals</div>
                            <div>{latestAssessment?.ref_choice}, {latestAssessment?.ref_fhud}, {latestAssessment?.ref_reason}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Mangement of any concurrent physical and/or other MNS Condition</div>
                            <div> {latestAssessment?.assessment_physical_health || 'N/A'}</div>
                            <div> {latestAssessment?.management_physical_health || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Crisis Plan</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Follow-up Plan</div>
                            <div>{latestAssessment?.date_nxt_visit || 'N/A'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700">Other</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
