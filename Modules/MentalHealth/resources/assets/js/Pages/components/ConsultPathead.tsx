import { MasterPatient } from '@/types';
import { ArrowRight, Cake, CalendarDays, Home, Hospital, User, Venus } from 'lucide-react';



const InfoRow = ({ icon: Icon, label, value, withArrow = false }: { icon: React.ElementType; label: string; value: string; withArrow?: boolean }) => (
    <div className="flex items-start space-x-2 text-sm">
        {withArrow ? <ArrowRight className="mt-0.5 h-4 w-4 text-blue-500" /> : <Icon className="mt-0.5 h-4 w-4 text-blue-500" />}
        <div>
            <span className="font-medium">{label}</span> {value}
        </div>
    </div>
);

export default function ConsultPathead({ patient }: { patient: MasterPatient }) {
    const birthDate = new Date(patient.pat_birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return (
        <div className="space-y-4 p-4">
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-300 bg-white p-4 text-sm shadow-sm md:grid-cols-3">
                <div className="col-span-1 space-y-2">
                    <div className="mb-2 w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Personal Information</div>
                    {/* <InfoRow icon={Hospital} label="ID:" value={`${patient.id}`} /> */}
                    <InfoRow icon={Hospital} label="Patient Health No.:" value={`${patient.master_patient_perm_id}`} />
                    <InfoRow icon={User} label="Patient name:" value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
                    <InfoRow icon={Venus} label="Sex:" value={patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : ''} />
                    <InfoRow
                        icon={User}
                        label="Civil Status:"
                        value={
                            patient.civil_stat_code === 'sin'
                                ? 'Single'
                                : patient.civil_stat_code === 'mar'
                                    ? 'Married'
                                    : patient.civil_stat_code === 'sep'
                                        ? 'Separated'
                                        : patient.civil_stat_code === 'div'
                                            ? 'Divorced'
                                            : patient.civil_stat_code === 'wid'
                                                ? 'Widower'
                                                : patient.civil_stat_code === 'na'
                                                    ? 'N/A'
                                                    : ''
                        }
                    />
                    <InfoRow icon={Cake} label="Birthdate:" value={new Date(patient.pat_birthDate).toLocaleDateString()} />
                    <InfoRow icon={CalendarDays} label="Age:" value={`${age} yrs`} />
                    <InfoRow
                        icon={Home}
                        label="Address:"
                        value={`${patient.patient_address}, ${patient.provcode}, ${patient.citycode}, ${patient.bgycode}`}
                    />
                </div>
                <div className="col-span-1 space-y-2">
                    <div className="mb-2 w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Relationship Information</div>
                    <InfoRow icon={Home} label="Address:" value={patient.fat_address} />
                    <InfoRow icon={User} label="Mother's name:" value={`${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`} />
                    <InfoRow icon={User} label="Father's name:" value={`${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`} />
                    <InfoRow
                        icon={CalendarDays}
                        label="Date Registered:"
                        value={`${new Date(patient.ts_created_at).toLocaleDateString()} ${new Date(patient.ts_created_at).toLocaleTimeString()}`}
                    />
                </div>
            </div>
        </div>
    );
}
