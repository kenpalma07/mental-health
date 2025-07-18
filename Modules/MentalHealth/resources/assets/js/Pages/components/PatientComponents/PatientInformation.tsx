import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@headlessui/react';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    masterPatientId: string;
    prefixCode: string;
    lastName: string;
    firstName: string;
    middleName: string;
    maidenMiddleName: string;
    maidenLastName: string;
    suffixCode: string;
    sexCode: string;
    birthDate: string;
    onChange: (
        field:
            | 'master_patient_perm_id'
            | 'prefix_code'
            | 'maiden_middlename'
            | 'maiden_lastname'
            | 'pat_lname'
            | 'pat_fname'
            | 'pat_mname'
            | 'suffix_code'
            | 'sex_code'
            | 'pat_birthDate',
        value: string,
    ) => void;
    errors?: {
        master_patient_perm_id?: string;
        prefix_code?: string;
        pat_lname?: string;
        pat_fname?: string;
        pat_mname?: string;
        maiden_middlename?: string;
        maiden_lastname?: string;
        suffix_code?: string;
        sex_code?: string;
        pat_birthDate?: string;
    };
};

export function PatientInformation({
    masterPatientId,
    prefixCode,
    lastName,
    firstName,
    middleName,
    maidenMiddleName,
    maidenLastName,
    suffixCode,
    sexCode,
    birthDate,
    onChange,
    errors,
}: Props) {
    const [age, setAge] = useState({ years: '', months: '', days: '' });
    function getAgeBreakdown(birthDate: string) {
        if (!birthDate) return { years: '', months: '', days: '' };

        const birth = new Date(birthDate);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            years: years.toString(),
            months: months.toString(),
            days: days.toString(),
        };
    }

    useEffect(() => {
        if (birthDate) {
            setAge(getAgeBreakdown(birthDate));
        } else {
            setAge({ years: '', months: '', days: '' });
        }
    }, [birthDate]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                <Pencil className="h-4 w-4 text-gray-600" />
                <h2 className="text-md font-semibold">Personal Information</h2>
            </div>
            <hr />

            {/* Patient Record No. */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">Patient Record No. : </Label>
                    <Input type="text" value={masterPatientId} readOnly className="text-dark-500 w-full rounded border bg-gray-100 p-2" />
                </div>
            </div>

            {/* Prefix */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Prefix: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Select
                        id="prefix_code"
                        value={prefixCode}
                        onChange={(e) => onChange('prefix_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Prefix --</option>
                        <option value="Mr">MR</option>
                        <option value="Ms">MS</option>
                        <option value="Mrs">MRS</option>
                        <option value="Dr">DR</option>
                        <option value="NA">NOT APPLICABLE</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.prefix_code && <span className="text-[10px] text-red-600">{errors.prefix_code}</span>}
                </div>
            </div>

            {/* Last Name */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Last Name: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="pat_lname"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={lastName}
                        onChange={(e) => onChange('pat_lname', e.target.value.toUpperCase())}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.pat_lname && <span className="text-[10px] text-red-600">{errors.pat_lname}</span>}
                </div>
            </div>

            {/* First Name */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        First Name: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="pat_fname"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={firstName}
                        onChange={(e) => onChange('pat_fname', e.target.value.toUpperCase())}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.pat_fname && <span className="text-[10px] text-red-600">{errors.pat_fname}</span>}
                </div>
            </div>

            {/* Middle Name */}
            <div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    <small className="text-[10px] text-red-600">Note: If no MIDDLE NAME, put N/A</small>
                </div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Middle Name: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="pat_mname"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={middleName}
                        onChange={(e) => onChange('pat_mname', e.target.value.toUpperCase())}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.pat_mname && <span className="text-[10px] text-red-600">{errors.pat_mname}</span>}
                </div>
            </div>

            {/* Maiden Middle Name */}
            <div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    <small className="text-[10px] text-red-600">Note: Only for married woman</small>
                </div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Maiden Middle Name: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="maiden_middlename"
                        className="text-black-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm disabled:bg-gray-100"
                        value={maidenMiddleName}
                        onChange={(e) => onChange('maiden_middlename', e.target.value.toUpperCase())}
                        disabled={prefixCode !== 'Mrs'}
                    />
                </div>
            </div>

            {/* Maiden Last Name */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Maiden Last Name: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="maiden_lastname"
                        className="text-black-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm disabled:bg-gray-100"
                        value={maidenLastName}
                        onChange={(e) => onChange('maiden_lastname', e.target.value.toUpperCase())}
                        disabled={prefixCode !== 'Mrs'}
                    />
                </div>
            </div>

            {/* Suffix */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Suffix: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Select
                        id="suffix_code"
                        value={suffixCode}
                        onChange={(e) => onChange('suffix_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Suffix --</option>
                        <option value="NA">N/A</option>
                        <option value="Jr">Jr</option>
                        <option value="Sr">Sr</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.suffix_code && <span className="text-[10px] text-red-600">{errors.suffix_code}</span>}
                </div>
            </div>

            {/* Sex */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Sex: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Select
                        id="fat_deceased_status"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={sexCode}
                        onChange={(e) => onChange('sex_code', e.target.value)}
                    >
                        <option value="">-- Select Sex --</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.sex_code && <span className="text-[10px] text-red-600">{errors.sex_code}</span>}
                </div>
            </div>

            {/* Birthdate */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Birth Date: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Input
                        id="pat_birthDate"
                        type="date"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={birthDate}
                        onChange={(e) => onChange('pat_birthDate', e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-45 text-sm font-medium text-gray-700" />
                    {errors?.pat_birthDate && <span className="text-[10px] text-red-600">{errors.pat_birthDate}</span>}
                </div>
            </div>

            {/* Age */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">Age:</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Year: </Label>
                            <Input
                                type="text"
                                value={age.years}
                                readOnly
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                            />
                        </div>
                        <div>
                            <Label>Month: </Label>
                            <Input
                                type="text"
                                value={age.months}
                                readOnly
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                            />
                        </div>
                        <div>
                            <Label>Day: </Label>
                            <Input
                                type="text"
                                value={age.days}
                                readOnly
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
