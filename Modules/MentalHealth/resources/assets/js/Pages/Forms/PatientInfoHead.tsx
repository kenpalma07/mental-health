import { Consultations, MasterPatient } from '@/types';
import { ArrowRight, Cake, CalendarDays, Home, Hospital, User, Venus } from 'lucide-react';
import React from 'react';

interface Props {
    patient: MasterPatient;
}

interface Props {
    patient: MasterPatient;
    consultation?: Consultations | null;
}

function InfoRow({
    icon: Icon,
    label,
    value,
    withArrow,
}: {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    label: string;
    value: string;
    withArrow?: boolean;
}) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="text-gray-500" size={16} />
            <span className="font-medium text-gray-600">{label}</span>
            <span className="text-gray-700">{value}</span>
            {withArrow && <ArrowRight className="ml-2 text-gray-500" size={16} />}
        </div>
    );
}

const PatientInfoHead: React.FC<Props> = ({ patient, consultation }) => {
    const age = new Date().getFullYear() - new Date(patient.pat_birthDate).getFullYear();
    return (
        <div className="space-y-4 p-4">
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-300 bg-white p-4 text-sm shadow-sm md:grid-cols-3">
                <div className="col-span-1 space-y-2">
                    <div className="mb-2 w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Personal Information</div>
                    {/* <InfoRow icon={Hospital} label="ID:" value={`${consultation?.consult_temp_id ?? 'N/A'}`} />
                      <InfoRow icon={Hospital} label="Consultation ID:" value={`${consultation?.consult_perm_id ?? 'N/A'}`} /> */}
                    <InfoRow icon={Hospital} label="Patient Health No.:" value={`${patient.master_patient_perm_id}`} />
                    <InfoRow icon={CalendarDays} label="Consultation Date:" value={`${consultation?.consult_date ?? 'N/A'}`} />
                    <InfoRow icon={User} label="Patient name:" value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
                    <InfoRow icon={Venus} label="Sex:" value={patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : ''} />
                    <InfoRow icon={Cake} label="Birthdate:" value={new Date(patient.pat_birthDate).toLocaleDateString()} />
                    <InfoRow icon={CalendarDays} label="Age:" value={`${age} yrs`} />
                </div>
                <div className="col-span-1 space-y-2">
                    <div className="mb-2 w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Relationship Information</div>
                    <InfoRow icon={Home} label="Address:" value={patient.fat_address} />
                    <InfoRow icon={User} label="Mother's name:" value={`${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`} />
                    <InfoRow icon={User} label="Father's name:" value={`${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`} />
                </div>
            </div>
        </div>
    );
};

export default PatientInfoHead;
