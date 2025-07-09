import { useState } from 'react';
import { ChevronsUpDown, Check, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import locationDataJson from '../json/philippine_reg_prov_cit_brgy.json';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Props = {
    region: string;
    province: string;
    city: string;
    barangay: string;
    patientAddress: string; // ✅ Add this line
    onChange: (field: 'regcode' | 'provcode' | 'citycode' | 'bgycode' | 'patient_address', value: string) => void;
};

type LocationDataType = {
    [regionCode: string]: {
        region_name: string;
        province_list: {
            [provinceName: string]: {
                municipality_list: Array<{
                    [municipalityName: string]: {
                        barangay_list: string[];
                    };
                }>;
            };
        };
    };
};

const locationData = locationDataJson as unknown as LocationDataType;

export function AddressSelector({ region, province, city, barangay, patientAddress, onChange }: Props) {
    const [open, setOpen] = useState('');

    const regionList = Object.entries(locationData);
    const provinceList = region ? Object.keys(locationData[region]?.province_list || {}) : [];
    const municipalityList = region && province ? locationData[region].province_list[province].municipality_list : [];
    const cityList = municipalityList.map((m) => Object.keys(m)[0]);

    const barangayList = region && province && city ? municipalityList.find((m) => Object.keys(m)[0] === city)?.[city]?.barangay_list || [] : [];

    const handleSelect = (field: string, value: string) => {
        if (field === 'region') {
            const regionCode = value.split(' - ')[0];
            onChange('regcode', regionCode);
            onChange('provcode', '');
            onChange('citycode', '');
            onChange('bgycode', '');
        } else if (field === 'province') {
            onChange('provcode', value);
            onChange('citycode', '');
            onChange('bgycode', '');
        } else if (field === 'city') {
            onChange('citycode', value);
            onChange('bgycode', '');
        } else {
            onChange('bgycode', value);
        }
        setOpen('');
    };

    const renderSelect = (label: string, field: string, items: string[], value: string, disabled = false) => (
        <div className="w-full">
            <Label className="mb-1 block text-sm font-medium text-gray-700">{label}</Label>
            <Popover open={open === field} onOpenChange={(v) => !disabled && setOpen(v ? field : '')}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', disabled && 'cursor-not-allowed opacity-50')}
                        disabled={disabled}
                    >
                        {value || `Select ${label.toLowerCase()}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                            {items.map((item) => (
                                <CommandItem key={item} value={item} onSelect={() => handleSelect(field, item)}>
                                    <Check className={cn('mr-2 h-4 w-4', value === item ? 'opacity-100' : 'opacity-0')} />
                                    {item}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <div className="space-y-3">
                    <div className="flex items-center gap-1">
                        <Pencil className="h-4 w-4 text-gray-600" />
                        <h2 className="text-md font-semibold">Address and Contact Info</h2>
                    </div>
                    <hr />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="col-span-4">
                            <Label htmlFor="patient_address">
                                House # / Lot # / Street Name / Building / Purok # / Village Name
                                <span className="font-bold text-red-600">*</span>
                            </Label>
                            <textarea
                                id="patient_address"
                                className="w-full rounded-md border p-2 text-sm"
                                placeholder="e.g., 123 Purok 2, Sunshine St., Brgy. Mabini"
                                rows={2}
                                value={patientAddress}
                                onChange={(e) => onChange('patient_address', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {renderSelect(
                            'Region',
                            'region',
                            regionList.map(([code, info]) => `${code} - ${info.region_name}`),
                            regionList.find(([code]) => code === region)?.[1].region_name || '',
                        )}

                        {renderSelect('Province', 'province', provinceList, province, !region)}
                        {renderSelect('City / Municipality', 'city', cityList, city, !province)}
                        {renderSelect('Barangay', 'barangay', barangayList, barangay, !city)}
                    </div>
                </div>
            </div>
        </div>
    );
}
