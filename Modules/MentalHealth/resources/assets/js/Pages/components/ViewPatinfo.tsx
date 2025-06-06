import React from 'react';
import {
  Cake,
  CalendarDays,
  Phone,
  PhoneCallIcon,
  User,
  Venus,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MasterPatient } from '@/types';


interface ViewPatinfoProps {
  patient: MasterPatient;
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const ViewPatinfo: React.FC<ViewPatinfoProps> = ({ patient }: { patient: MasterPatient }) => {
  const age = calculateAge(patient.pat_birthDate);

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mx-auto mt-6 shadow-lg">
        <User className="w-16 h-16 text-gray-500" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-x-2">
          <User className="w-6 h-6 text-gray-500" />
          <Label>Full Name:</Label>
          <span>{patient.pat_fname} {patient.pat_mname} {patient.pat_lname}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <CalendarDays className="w-6 h-6 text-gray-500" />
          <Label>Age:</Label>
          <span>{age}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Venus className="w-6 h-6 text-gray-500" />
          <Label>Sex:</Label>
          <span>{patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Cake className="w-6 h-6 text-gray-500" />
          <Label>Date of Birth:</Label>
          <span>{patient.pat_birthDate}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Phone className="w-6 h-6 text-gray-500" />
          <Label>Mobile:</Label>
          <span>{patient.pat_mobile}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <PhoneCallIcon className="w-6 h-6 text-gray-500" />
          <Label>Landline:</Label>
          <span>{patient.pat_landline}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewPatinfo;
