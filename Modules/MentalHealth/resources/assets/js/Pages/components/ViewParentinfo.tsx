import { Label } from '@/components/ui/label';
import { Cake, CalendarDays, PhoneCall, User } from 'lucide-react';

interface Patient {
    fat_fname: string;
    fat_mname: string;
    fat_lname: string;
    fat_birthdate: string;
    fat_contact: string;
    mot_fname: string;
    mot_mname: string;
    mot_lname: string;
    mot_birthdate: string;
    mot_contact: string;
}

const ViewParentinfo = ({ patient }: { patient: Patient }) => {
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

    return (
        <div className="p-6">
            <div className="space-y-4">
                {/* Father Info */}
                <div className="flex items-center gap-x-2">
                    <User className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Father:</Label>
                    <span>
                        {patient.fat_fname} {patient.fat_mname} {patient.fat_lname}
                    </span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Cake className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Father's Birthdate:</Label>
                    <span>{patient.fat_birthdate}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <CalendarDays className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Father's Age:</Label>
                    <span>{calculateAge(patient.fat_birthdate)}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <PhoneCall className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Father's Contact:</Label>
                    <span>{patient.fat_contact}</span>
                </div>

                {/* Mother Info */}
                <div className="flex items-center gap-x-2">
                    <User className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Mother:</Label>
                    <span>
                        {patient.mot_fname} {patient.mot_mname} {patient.mot_lname}
                    </span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Cake className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Mother's Birthdate:</Label>
                    <span>{patient.mot_birthdate}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <CalendarDays className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Mother's Age:</Label>
                    <span>{calculateAge(patient.mot_birthdate)}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <PhoneCall className="mr-2 h-6 w-6 text-gray-500" />
                    <Label>Mother's Contact:</Label>
                    <span>{patient.mot_contact}</span>
                </div>
            </div>
        </div>
    );
};

export default ViewParentinfo;
