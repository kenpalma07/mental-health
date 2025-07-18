import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select } from '@headlessui/react';
import { Check, ChevronsUpDown, Pencil } from 'lucide-react';
import { useState } from 'react';
import ethnicGroupsData from '../../json/ethnic_groups.json';

type PatientFieldKey =
    | 'pat_birthplace'
    | 'civil_stat_code'
    | 'educattainment'
    | 'occupation_code'
    | 'occupation_sp'
    | 'monthly_income'
    | 'IndigenousGroup'
    | 'ethnic_code'
    | 'tax_id_num'
    | 'religion_code'
    | 'nationality'
    | 'bloodtype_code';

type Props = {
    birthPlace: string;
    civilStatus: string;
    educationalAttainment: string;
    ethnicCode: string;
    IndigenousGroup: string;
    occupationCode: string;
    occupationSp: string;
    monthlyIncome: string;
    taxIdNum: string;
    religionCode: string;
    nationalityCode: string;
    bloodType: string;
    onChange: (field: PatientFieldKey, value: string) => void;
};

export function OtherPatientInformation({
    birthPlace,
    civilStatus,
    educationalAttainment,
    ethnicCode,
    IndigenousGroup,
    occupationCode,
    occupationSp,
    monthlyIncome,
    taxIdNum,
    religionCode,
    nationalityCode,
    bloodType,
    onChange,
}: Props) {
    const [open, setOpen] = useState(false);
    const ethnicGroups = ethnicGroupsData['Ethnic Group'];
    const selected = ethnicGroups.find((g) => String(g.code) === ethnicCode)?.name;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                <Pencil className="h-4 w-4 text-gray-600" />
                <h2 className="text-md font-semibold">Other Personal Information</h2>
            </div>
            <hr />

            {/* Birth Place */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">Birth Place: </Label>
                    <Input
                        id="pat_birthplace"
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        value={birthPlace}
                        onChange={(e) => onChange('pat_birthplace', e.target.value.toUpperCase())}
                    />
                </div>
            </div>

            {/* Civil Status */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Civil Status: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <select
                        id="civil_stat_code"
                        value={civilStatus}
                        onChange={(e) => onChange('civil_stat_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Civil Status --</option>
                        <option value="sin">Single</option>
                        <option value="mar">Married</option>
                        <option value="div">Divorced</option>
                        <option value="sep">Separated</option>
                        <option value="wid">Widow/Widower</option>
                        <option value="na">N/A</option>
                    </select>
                </div>
            </div>

            {/* Educational Attainment */}
            <div>
                <div className="flex items-center gap-2">
                    <Label className="w-70 text-sm font-medium text-gray-700">
                        Educational Attainment: <span className="font-bold text-red-600">*</span>
                    </Label>
                    <Select
                        id="educattainment"
                        value={educationalAttainment}
                        onChange={(e) => onChange('educattainment', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Educational Attainment --</option>
                        <option value="01">Advance Learning System</option>
                        <option value="02">College</option>
                        <option value="03">College Student</option>
                        <option value="04">College Undergrad</option>
                        <option value="05">Elem Student</option>
                        <option value="06">Elem Undergrad</option>
                        <option value="07">Elementary Education</option>
                        <option value="08">High School Education</option>
                        <option value="09">HS Student</option>
                        <option value="10">HS Undergrad</option>
                        <option value="11">No Formal Education</option>
                        <option value="12">Not Applicable</option>
                        <option value="13">Postgraduate Program</option>
                        <option value="14">Pre-School</option>
                        <option value="15">Senior HS</option>
                        <option value="16">Vocational</option>
                    </Select>
                </div>
            </div>

            {/* Employment Status */}
            <div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="occupation_code" className="w-70 text-sm font-medium text-gray-700">
                        Employment Status:
                    </Label>
                    <select
                        id="occupation_code"
                        value={occupationCode}
                        onChange={(e) => onChange('occupation_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Employment --</option>
                        <option value="01">Employed</option>
                        <option value="02">None/Unemployed</option>
                        <option value="03">Retired</option>
                        <option value="04">Student</option>
                        <option value="05">Unknown</option>
                    </select>
                </div>
            </div>

            {/* Show only if employed */}
            {occupationCode === '01' && (
                <>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="occupation_sp" className="w-70 text-sm font-medium text-gray-700">
                            Specific Occupation:
                        </Label>
                        <Input
                            id="occupation_sp"
                            type="text"
                            value={occupationSp}
                            onChange={(e) => onChange('occupation_sp', e.target.value)}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Label htmlFor="monthly_income" className="w-70 text-sm font-medium text-gray-700">
                            Monthly Income:
                        </Label>
                        <Input
                            id="monthly_income"
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => onChange('monthly_income', e.target.value || '0')}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        />
                    </div>
                </>
            )}

            {/* Tax Identification No. (TIN) */}
            <div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="tax_id_num" className="w-70 text-sm font-medium text-gray-700">
                        Tax ID Number:
                    </Label>
                    <Input
                        id="tax_id_num"
                        type="number"
                        value={taxIdNum}
                        onChange={(e) => onChange('tax_id_num', e.target.value)}
                        disabled={occupationCode !== '01'}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Indigenous Yes/No */}
            <div className="flex items-center gap-2">
                <Label htmlFor="IndigenousGroup" className="w-45 text-sm font-medium text-gray-700">
                    Indigenous:
                </Label>

                <label className="flex items-center gap-1 text-sm text-gray-700">
                    <input
                        type="radio"
                        name="IndigenousGroup"
                        value="N"
                        checked={IndigenousGroup === 'N'}
                        className="accent-blue-600"
                        onChange={() => {
                            onChange('IndigenousGroup', 'N');
                            onChange('ethnic_code', '');
                        }}
                    />
                    No
                </label>
                <label className="flex items-center gap-1 text-sm text-gray-700">
                    <input
                        type="radio"
                        name="IndigenousGroup"
                        value="Y"
                        checked={IndigenousGroup === 'Y'}
                        className="accent-blue-600"
                        onChange={() => onChange('IndigenousGroup', 'Y')}
                    />
                    Yes
                </label>
            </div>

            {/* Ethnic Group Select - Visible only when Indigenous = Yes */}
            {IndigenousGroup === 'Y' && (
                <div className="flex items-center gap-2">
                    <Label htmlFor="ethnic_code" className="w-45 text-sm font-medium text-gray-700">
                        Ethnic Group <span className="text-red-500">*</span>
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="text-dark-500 w-80 justify-between">
                                {selected || 'Select ethnic group'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Search ethnic group..." />
                                <CommandEmpty>No ethnic group found.</CommandEmpty>
                                <CommandGroup className="max-h-60 overflow-y-auto">
                                    {ethnicGroups.map((item) => (
                                        <CommandItem
                                            key={item.code}
                                            value={item.name}
                                            onSelect={() => {
                                                onChange('ethnic_code', String(item.code));
                                                setOpen(false);
                                            }}
                                        >
                                            <Check className={cn('mr-2 h-4 w-4', ethnicCode === String(item.code) ? 'opacity-100' : 'opacity-0')} />
                                            {item.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            {/* Religion */}
            <div>
                <div className="flex items-center gap-1">
                    <Label className="w-70 text-sm font-medium text-gray-700">Religion:</Label>
                    <Select
                        id="religion_code"
                        value={religionCode}
                        onChange={(e) => onChange('religion_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Religion --</option>
                        <option value="Chri">Christian</option>
                        <option value="Cat">Catholic</option>
                        <option value="Prot">Protestant</option>
                        <option value="Isla">Islam</option>
                        <option value="Bud">Buddhism</option>
                        <option value="Hind">Hinduism</option>
                        <option value="Other">Other</option>
                    </Select>
                </div>
            </div>

            {/* Nationality */}
            <div>
                <div className="flex items-center gap-1">
                    <Label className="w-70 text-sm font-medium text-gray-700">Nationality:</Label>
                    <Select
                        id="nationality"
                        value={nationalityCode}
                        onChange={(e) => onChange('nationality', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Nationality --</option>
                        <option value="PH">Filipino</option>
                        <option value="US">American</option>
                        <option value="Oth">Others</option>
                    </Select>
                </div>
            </div>

            {/* Blood Type */}
            <div>
                <div className="flex items-center gap-1">
                    <Label className="w-70 text-sm font-medium text-gray-700">Blood Type:</Label>
                    <Select
                        id="bloodtype_code"
                        value={bloodType}
                        onChange={(e) => onChange('bloodtype_code', e.target.value)}
                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">-- Select Blood Type --</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </Select>
                </div>
            </div>
        </div>
    );
}
