import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Select } from '@headlessui/react';
import { UserPlus } from 'lucide-react';

type Props = {
    mother_firstname: string;
    mother_middlename: string;
    mother_lastname: string;
    mother_birthdate: string;
    mother_address: string;
    mother_contact: string;
    mother_status: string;

    father_firstname: string;
    father_middlename: string;
    father_lastname: string;
    father_birthdate: string;
    father_address: string;
    father_contact: string;
    father_status: string;
    onChange: (
        field: 'mot_fname' | 'mot_mname' | 'mot_lname' | 'mot_birthdate' | 'mot_address' | 'mot_contact' | 'mot_deceased_status' | 'fat_fname' | 'fat_mname' | 'fat_lname' | 'fat_birthdate' | 'fat_address' | 'fat_contact' | 'fat_deceased_status',
        value: string,
    ) => void;
    errors?: {
        mot_fname?: string;
        mot_mname?: string;
        mot_lname?: string;
        mot_birthdate?: string;
        mot_address?: string;
        mot_contact?: string;
        mot_deceased_status?: string;
        fat_fname?: string;
        fat_mname?: string;
        fat_lname?: string;
        fat_birthdate?: string;
        fat_address?: string;
        fat_contact?: string;
        fat_deceased_status?: string;
    };
};

export function ParentsInformation({
    mother_firstname,
    mother_middlename,
    mother_lastname,
    mother_birthdate,
    mother_address,
    mother_contact,
    mother_status,
    father_firstname,
    father_middlename,
    father_lastname,
    father_birthdate,
    father_address,
    father_contact,
    father_status,
    onChange,
    errors,
}: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <div className="space-y-3">
                    <div className="flex items-center gap-1">
                        <UserPlus className="h-4 w-4 text-gray-600" />
                        <h2 className="text-md font-semibold">Parents' Information</h2>
                    </div>
                    <hr />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        {/* Mother's Info */}
                        <div className="space-y-3">
                            <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>

                            {/* Mother's First Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_fname" className="w-40 text-sm font-medium text-gray-700">
                                        First Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_fname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_firstname}
                                        onChange={(e) => onChange('mot_fname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_fname && <InputError message={errors.mot_fname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Middle Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_mname" className="w-40 text-sm font-medium text-gray-700">
                                        Middle Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_mname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_middlename}
                                        onChange={(e) => onChange('mot_mname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_mname && <InputError message={errors.mot_mname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Last Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_lname" className="w-40 text-sm font-medium text-gray-700">
                                        Last Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_lname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_lastname}
                                        onChange={(e) => onChange('mot_lname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_lname && <InputError message={errors.mot_lname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Birthdate */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                        Birth Date <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_birthdate"
                                        type="date"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_birthdate}
                                        onChange={(e) => onChange('mot_birthdate', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_birthdate && <InputError message={errors.mot_birthdate} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Address */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_address" className="w-40 text-sm font-medium text-gray-700">
                                        Address <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_address"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_address}
                                        onChange={(e) => onChange('mot_address', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_address && <InputError message={errors.mot_address} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Contact */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_contact" className="w-40 text-sm font-medium text-gray-700">
                                        Contact No. <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="mot_contact"
                                        type="tel"
                                        maxLength={11}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mother_contact}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                            onChange('mot_contact', numericValue);
                                        }}
                                        placeholder="e.g. 09123456789"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_contact && <InputError message={errors.mot_contact} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Mother's Deceased Status */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_deceased_status" className="w-40 text-sm font-medium text-gray-700">
                                        Deceased Status
                                    </Label>
                                    <Select
                                        id="mot_deceased_status"
                                        className={cn('text-dark-500 w-full rounded-md border p-2 text-sm shadow-sm')}
                                        value={mother_status}
                                        onChange={(e) => onChange('mot_deceased_status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.mot_deceased_status && (
                                        <InputError message={errors.mot_deceased_status} className="text-[10px] text-red-600" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Father's Info */}
                        <div className="space-y-3">
                            <h5 className="text-sm font-semibold text-gray-500">Father's Name</h5>

                            {/* Father's First Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_fname" className="w-40 text-sm font-medium text-gray-700">
                                        First Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_fname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_firstname}
                                        onChange={(e) => onChange('fat_fname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_fname && <InputError message={errors.fat_fname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Middle Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_mname" className="w-40 text-sm font-medium text-gray-700">
                                        Middle Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_mname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_middlename}
                                        onChange={(e) => onChange('fat_mname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_mname && <InputError message={errors.fat_mname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Last Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_lname" className="w-40 text-sm font-medium text-gray-700">
                                        Last Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_lname"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_lastname}
                                        onChange={(e) => onChange('fat_lname', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_lname && <InputError message={errors.fat_lname} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Birthdate */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                        Birth Date <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_birthdate"
                                        type="date"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_birthdate}
                                        onChange={(e) => onChange('fat_birthdate', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_birthdate && <InputError message={errors.fat_birthdate} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Address */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_address" className="w-40 text-sm font-medium text-gray-700">
                                        Address <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_address"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_address}
                                        onChange={(e) => onChange('fat_address', e.target.value.toUpperCase())}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_address && <InputError message={errors.fat_address} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Contact */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_contact" className="w-40 text-sm font-medium text-gray-700">
                                        Contact No. <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="fat_contact"
                                        type="tel"
                                        maxLength={11}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={father_contact}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                            onChange('fat_contact', numericValue);
                                        }}
                                        placeholder="e.g. 09123456789"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_contact && <InputError message={errors.fat_contact} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Father's Status */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="fat_deceased_status" className="w-40 text-sm font-medium text-gray-700">
                                        Deceased Status
                                    </Label>
                                    <Select
                                        id="fat_deceased_status"
                                        className={cn('text-dark-500 w-full rounded-md border p-2 text-sm shadow-sm')}
                                        value={father_status}
                                        onChange={(e) => onChange('fat_deceased_status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.fat_deceased_status && (
                                        <InputError message={errors.fat_deceased_status} className="text-[10px] text-red-600" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
