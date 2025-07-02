import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import { Consultations, MasterPatient, MentalAssessmentForm, PageProps, Pharma } from '@/types';

interface Props extends PageProps {
    patient: MasterPatient;
    consultation?: Consultations;
    assessments: MentalAssessmentForm[];
    pharmaMeds: Pharma[];
}

export default function TreatmentPlan({ patient, assessments, pharmaMeds }: Props) {
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;


    function formatNumber(value?: string | number): string {
        if (!value) return '';
        const num = parseFloat(value.toString());
        if (isNaN(num)) return value.toString();
        return num % 1 === 0 ? parseInt(value.toString()).toString() : num.toString();
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
                            Treatment Plan
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHead className="border border-black p-2 align-top font-semibold hover:bg-gray-200 transition-colors">Name:</TableHead>
                        <TableCell className="border border-black p-2 align-top">
                            {`${patient.pat_fname || ''} ${patient.pat_mname || ''} ${patient.pat_lname || ''}`.trim()}
                        </TableCell>
                        <TableHead className="border border-black p-2 align-top font-semibold hover:bg-gray-200 transition-colors">Number/ID:</TableHead>
                        <TableCell className="border border-black p-2 align-top">
                            {latestAssessment?.consultation_id || 'N/A'}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="border border-black p-2 align-top font-semibold hover:bg-gray-200 transition-colors">Date:</TableHead>
                        <TableCell className="border border-black p-2 align-top">
                            {latestAssessment?.consult_date_assess || 'N/A'}
                        </TableCell>
                        <TableHead className="border border-black p-2 align-top font-semibold hover:bg-gray-200 transition-colors">Name of health-care provider:</TableHead>
                        <TableCell className="border border-black p-2 align-top">
                            {patient.provider_name || 'N/A'}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            Presenting problem
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className="border border-black h-[100px] p-2 align-top">
                            <div className="italic text-gray-700 font-bold">Brief summary of the reason the person is seeking help</div>
                            <div>[{latestAssessment?.pres_comp_label || 'N/A'}] {latestAssessment?.pres_comp_item || 'N/A'}</div>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead colSpan={4} className="p-2 font-semibold bg-black text-white">
                            Written treatment plan
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Pharmacological Interventions (if any)</div>
                            <div>
                                {pharmaMeds.length > 0 ? (
                                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                                        {pharmaMeds.map((med, idx) => (
                                            <li key={idx}>
                                                {med.phar_med?.toUpperCase()},{" "}
                                                {formatNumber(med.phar_intake)} {med.phar_intakeUnit?.toUpperCase()} in every{" "}
                                                {formatNumber(med.phar_freq)} {med.phar_freqUnit?.toUpperCase()} for{" "}
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
                                    <span className="ml-2">No medicines recorded</span>
                                )}
                            </div>

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Psychosocial Interventions</div>
                            <div>{latestAssessment?.psycho_inter || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Referrals</div>
                            <div>{latestAssessment?.ref_choice}, {latestAssessment?.ref_fhud}, {latestAssessment?.ref_reason}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Management of any concurrent physical and/or other MNS Condition</div>
                            <div>{latestAssessment?.assessment_physical_health || 'N/A'}</div>
                            <div>{latestAssessment?.management_physical_health || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Crisis Plan</div>
                            <div>{latestAssessment?.crisis_plan || ''}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Follow-up Plan</div>
                            <div>{latestAssessment?.date_nxt_visit || 'N/A'}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-black h-[100px] p-2 align-top" colSpan={4}>
                            <div className="italic text-gray-700 font-bold">Other</div>
                            <div>{latestAssessment?.other || ''}</div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}