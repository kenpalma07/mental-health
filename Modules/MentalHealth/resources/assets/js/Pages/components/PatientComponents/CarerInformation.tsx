import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@headlessui/react';
import { UserPlus } from 'lucide-react';

type Props = {
    carerFname: string;
    carerLname: string;
    carerMname: string;
    carerSuffix: string;
    carerBirthdate: string;
    carerSex: string;
    carerAddress: string;
    carerRelationship: string;
    carerContact: string;
    onChange: (
        field:
            | 'carer_fname'
            | 'carer_lname'
            | 'carer_mname'
            | 'carer_suffix'
            | 'carer_birthdate'
            | 'carer_sex'
            | 'carer_address'
            | 'carer_relationship'
            | 'carer_contact',
        value: string,
    ) => void;
    errors?: {
        carer_fname?: string;
        carer_lname?: string;
        carer_mname?: string;
        carer_suffix?: string;
        carer_birthdate?: string;
        carer_sex?: string;
        carer_address?: string;
        carer_relationship?: string;
        carer_contact?: string;
    };
};

export default function CarerInformation({
    carerFname,
    carerLname,
    carerMname,
    carerSuffix,
    carerBirthdate,
    carerSex,
    carerAddress,
    carerRelationship,
    carerContact,
    onChange,
    errors,
}: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <div className="space-y-3">
                    <div className="flex items-center gap-1">
                        <UserPlus className="h-4 w-4 text-gray-600" />
                        <h2 className="text-md w-50 font-semibold">Carer's Information</h2>
                        <small className="text-red-600 italic">Note: Carer must be alive</small>
                    </div>
                    <hr />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        <div className="col-span-1 space-y-3">
                            {/* Carer's First Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_fname" className="w-40 text-sm font-medium text-gray-700">
                                        First Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="carer_fname"
                                        type="text"
                                        value={carerFname}
                                        onChange={(e) => onChange('carer_fname', e.target.value.toUpperCase())}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_fname && <span className="text-[10px] text-red-600">{errors.carer_fname}</span>}
                                </div>
                            </div>

                            {/* Carer's Middle Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_mname" className="w-40 text-sm font-medium text-gray-700">
                                        Middle Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="carer_mname"
                                        type="text"
                                        value={carerMname}
                                        onChange={(e) => onChange('carer_mname', e.target.value.toUpperCase())}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_mname && <span className="text-[10px] text-red-600">{errors.carer_mname}</span>}
                                </div>
                            </div>

                            {/* Carer's Last Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_lname" className="w-40 text-sm font-medium text-gray-700">
                                        Last Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="carer_lname"
                                        type="text"
                                        value={carerLname}
                                        onChange={(e) => onChange('carer_lname', e.target.value.toUpperCase())}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_mname && <span className="text-[10px] text-red-600">{errors.carer_mname}</span>}
                                </div>
                            </div>

                            {/* Carer's Suffix */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_suffix" className="w-40 text-sm font-medium text-gray-700">
                                        Suffix
                                    </Label>
                                    <Select
                                        id="carer_suffix"
                                        value={carerSuffix}
                                        onChange={(e) => onChange('carer_suffix', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Suffix --</option>
                                        <option value="NA">Not Applicable</option>
                                        <option value="JR">Jr</option>
                                        <option value="SR">Sr</option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_suffix && <span className="text-[10px] text-red-600">{errors.carer_suffix}</span>}
                                </div>
                            </div>

                            {/* Carer's Birthdate */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                        Birth Date: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="carer_birthdate"
                                        type="date"
                                        value={carerBirthdate}
                                        onChange={(e) => onChange('carer_birthdate', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_birthdate && <span className="text-[10px] text-red-600">{errors.carer_birthdate}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 space-y-3">
                            {/* Carer's Sex */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_sex" className="w-40 text-sm font-medium text-gray-700">
                                        Gender <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Select
                                        id="carer_sex"
                                        value={carerSex}
                                        onChange={(e) => onChange('carer_sex', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Sex --</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_sex && <span className="text-[10px] text-red-600">{errors.carer_sex}</span>}
                                </div>
                            </div>

                            {/* Carer's Address */}
                            <div>
                                <div className="">
                                    <Label htmlFor="carer_address" className="w-40 text-sm font-medium text-gray-700">
                                        Address: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <textarea
                                        id="carer_address"
                                        value={carerAddress}
                                        onChange={(e) => onChange('carer_address', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                        rows={2}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_address && <span className="text-[10px] text-red-600">{errors.carer_address}</span>}
                                </div>
                            </div>

                            {/* Carer's Relationship to the Patient */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_relationship" className="w-40 text-sm font-medium text-gray-700">
                                        Relationship to the Patient: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Select
                                        id="carer_relationship"
                                        value={carerRelationship}
                                        onChange={(e) => onChange('carer_relationship', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Relationship to the Patient --</option>
                                        <option value="FAT">Father</option>
                                        <option value="MOT">Mother</option>
                                        <option value="BRO">Brother</option>
                                        <option value="SIS">Sister</option>
                                        <option value="GRD">Grandparent</option>
                                        <option value="COU">Cousin</option>
                                        <option value="FRA">Friend</option>
                                        <option value="SPO">Spouse</option>
                                        <option value="CHI">Child</option>
                                        <option value="AUN">Aunt</option>
                                        <option value="UNC">Uncle</option>
                                        <option value="GUA">Guardian</option>
                                        <option value="OTH">Other</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_relationship && <span className="text-[10px] text-red-600">{errors.carer_relationship}</span>}
                                </div>
                            </div>

                            {/* Carer's Contact Number */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="carer_contact" className="w-40 text-sm font-medium text-gray-700">
                                        Mobile <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="carer_contact"
                                        type="text"
                                        maxLength={11}
                                        value={carerContact}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                                            onChange('carer_contact', value);
                                        }}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                        placeholder="Enter 11-digit mobile number"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.carer_contact && <span className="text-[10px] text-red-600">{errors.carer_contact}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
