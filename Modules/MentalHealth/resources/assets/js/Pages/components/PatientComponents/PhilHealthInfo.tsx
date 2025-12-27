import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@headlessui/react';
import { Pencil } from 'lucide-react';
import React from 'react';

type Props = {
    phicMember: string;
    patPhilhealth: string;
    philhealthStatus: string;
    pDependentType: string;
    onChange: (field: 'phic_member' | 'pat_philhealth' | 'philhealth_status_code' | 'pDependentType_code', value: string) => void;
    errors?: {
        phic_member?: string;
        pat_philhealth?: string;
        philhealth_status_code?: string;
        pDependentType_code?: string;
    };
};

export default function PhilHealthInfo({ phicMember, patPhilhealth, philhealthStatus, pDependentType, onChange, errors }: Props) {
    const isEnabled = philhealthStatus === 'D' && phicMember === 'Y';

    // Clear all PhilHealth fields if phicMember is set to 'N'
    React.useEffect(() => {
        if (phicMember === 'N') {
            onChange('pat_philhealth', '');
            onChange('philhealth_status_code', '');
            onChange('pDependentType_code', '');
        }
    }, [phicMember]);

    return (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <div className="space-y-3">
                <div className="flex items-center gap-1">
                    <Pencil className="h-4 w-4 text-green-600" />
                    <h2 className="text-md font-semibold">PHILHEALTH INFO</h2>
                </div>
                <hr />

                {/* Philhealth Member */}
                <div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="phic_member" className="w-49 text-sm font-medium text-red-500">
                            Philhealth Member?:
                        </Label>

                        <label className="flex items-center gap-1 text-sm text-red-500">
                            <input
                                type="radio"
                                name="phic_member"
                                value="N"
                                checked={phicMember === 'N'}
                                onChange={(e) => onChange('phic_member', e.target.value)}
                                className="accent-black-600"
                            />
                            No
                        </label>
                        <label className="flex items-center gap-1 text-sm text-red-500">
                            <input
                                type="radio"
                                name="phic_member"
                                value="Y"
                                checked={phicMember === 'Y'}
                                onChange={(e) => onChange('phic_member', e.target.value)}
                                className="accent-black-600"
                            />
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-49 text-sm font-medium text-gray-700" />
                        <InputError message={errors?.phic_member} className="text-[10px] text-red-600" />
                    </div>
                </div>

                {/* Philhealth Number */}
                <div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="pat_philhealth" className="w-70 text-sm font-medium">
                            Philhealth Number: <span className="text-sm font-medium text-red-500">*</span>
                        </Label>
                        <div className={`w-full ${phicMember !== 'Y' ? 'cursor-not-allowed opacity-100' : ''}`}>
                            <Input
                                id="pat_philhealth"
                                name="pat_philhealth"
                                value={patPhilhealth}
                                onChange={(e) => onChange('pat_philhealth', e.target.value)}
                                className="text-dark-500 rounded-md border px-3 py-2 shadow"
                                disabled={phicMember !== 'Y'}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-49 text-sm font-medium text-gray-700" />
                        <InputError message={errors?.pat_philhealth} className="text-[10px] text-red-600" />
                    </div>
                </div>

                {/* Philhealth Status Type */}
                <div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="philhealth_status_code" className="text-black-500 w-70 text-sm font-medium">
                            Philhealth Status Type: <span className="text-sm font-medium text-red-500">*</span>
                        </Label>
                        <Select
                            id="philhealth_status_code"
                            value={philhealthStatus}
                            onChange={(e) => onChange('philhealth_status_code', e.target.value)}
                            className={`text-dark-500 w-full rounded border p-2 text-sm ${phicMember !== 'Y' ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={!(phicMember === 'Y')}
                        >
                            <option value="">-- Select Philhealth Status Type --</option>
                            <option value="D">DEPENDENT</option>
                            <option value="M">MEMBER</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-49 text-sm font-medium text-gray-700" />
                        <InputError message={errors?.philhealth_status_code} className="text-[10px] text-red-600" />
                    </div>
                </div>

                {/* Membership Info */}
                <div className="space-y-3">
                    <hr />
                    {/* Relationship to the Member */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="pDependentType_code" className="text-black-500 w-71 text-sm font-medium">
                                Relationship to Member: <span className="text-sm font-medium text-red-500">*</span>
                            </Label>
                            <Select
                                id="pDependentType_code"
                                value={pDependentType}
                                onChange={(e) => onChange('pDependentType_code', e.target.value)}
                                disabled={!isEnabled}
                                className={`text-dark-500 w-full rounded border p-2 text-sm ${!isEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <option value="">-- Select Relationship to Member --</option>
                                <option value="C">CHILD</option>
                                <option value="P">PARENT</option>
                                <option value="S">SPOUSE</option>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-49 text-sm font-medium text-gray-700" />
                            <InputError message={errors?.pDependentType_code} className="text-[10px] text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
