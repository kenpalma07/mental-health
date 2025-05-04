import React from 'react';
import { User, ArrowRight } from "lucide-react";
import { PageProps } from '@inertiajs/react';

interface Patient {
  id: number;
  master_patient_perm_id: string;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  sex_code: string;
  civil_status: string;
  pat_birthDate: string;
  patient_address: string;
  mot_fname: string;
  mot_mname: string;
  mot_lname: string;
  fat_fname: string;
  fat_mname: string;
  fat_lname: string;
  ts_created_at: string;
}

interface Props extends PageProps {
  patient: Patient;
}

function InfoRow({
  icon: Icon, label, value, withArrow
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>,
  label: string,
  value: string,
  withArrow?: boolean
}) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="text-gray-500" size={16} />
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-700">{value}</span>
      {withArrow && <ArrowRight className="text-gray-500 ml-2" size={16} />}
    </div>
  );
}

const PatientInfoHead: React.FC<Props> = ({ patient }) => {
  const age = new Date().getFullYear() - new Date(patient.pat_birthDate).getFullYear();

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 rounded-xl p-4 shadow-sm bg-white text-sm">
        <div className="space-y-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">Personal Information</div>
          <InfoRow icon={User} label="Patient name:" value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
          <InfoRow icon={User} label="Patient Number:" value={patient.master_patient_perm_id} />
          <InfoRow icon={User} label="Sex:" value={patient.sex_code} />
          <InfoRow icon={User} label="Civil status:" value={patient.civil_status} />
          <InfoRow icon={User} label="Birthdate:" value={new Date(patient.pat_birthDate).toLocaleDateString()} />
          <InfoRow icon={User} label="Age:" value={`${age} yrs`} />
        </div>
        <div className="space-y-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">Relationship Information</div>
          <InfoRow icon={ArrowRight} label="Patient Address:" value={patient.patient_address} />
          <InfoRow icon={ArrowRight} label="Mother's name:" value={`${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`} />
          <InfoRow icon={ArrowRight} label="Father's name:" value={`${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`} />
          <InfoRow icon={ArrowRight} label="Date entered:" value={new Date(patient.ts_created_at).toLocaleString()} />
        </div>
      </div>
    </div>
  );
};

export default PatientInfoHead;
