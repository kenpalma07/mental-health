import { Home } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Importing Textarea

interface Patient {
    patient_address: string;
    citycode: string;
    provcode: string;
    regcode: string;
}

const ViewDemoinfo = ({ patient }: { patient: Patient }) => {
    return (
        <div className="p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                    <Home />
                    <Label>Purok:</Label>
                    <span>{patient.patient_address}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Home />
                    <Label>City:</Label>
                    <span>{patient.citycode}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Home />
                    <Label>Province:</Label>
                    <span>{patient.provcode}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Home />
                    <Label>Region:</Label>
                    <span>{patient.regcode}</span>
                </div>
                {/* Using Textarea for full address */}
                <div className="flex items-center gap-x-2">
                    <Textarea
                        readOnly
                        className="h-[150px] text-black"
                    >{`${patient.patient_address}, ${patient.citycode}, ${patient.provcode}, ${patient.regcode}`}</Textarea>
                </div>
            </div>
        </div>
    );
};

export default ViewDemoinfo;
