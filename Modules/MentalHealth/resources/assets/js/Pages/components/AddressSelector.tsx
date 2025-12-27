import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Pencil } from 'lucide-react';
import { useState } from 'react';
import locationCountryJson from '../json/country.json';
import locationDataJson from '../json/philippine_reg_prov_cit_brgy.json';

type Props = {
    region: string;
    province: string;
    city: string;
    barangay: string;
    patientAddress: string;
    zipCode: string;
    country: string;
    email: string;
    mobile: string;
    landline: string;
    onChange: (
        field:
            | 'regcode'
            | 'provcode'
            | 'citycode'
            | 'bgycode'
            | 'patient_address'
            | 'zipcode'
            | 'country_code'
            | 'pat_email'
            | 'pat_mobile'
            | 'pat_landline',
        value: string,
    ) => void;
    errors?: {
        patient_address?: string;
        zipcode?: string;
        regcode?: string;
        provcode?: string;
        citycode?: string;
        bgycode?: string;
        country_code?: string;
        pat_email?: string;
        pat_mobile?: string;
        pat_landline?: string;
    };
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

export function AddressSelector({
    region,
    province,
    city,
    barangay,
    patientAddress,
    zipCode,
    country,
    email,
    mobile,
    landline,
    onChange,
    errors,
}: Props) {
    const [open, setOpen] = useState('');

    const regionList = Object.entries(locationData).sort(([keyA, a], [keyB, b]) => {
        const isNumA = /^\d+$/.test(keyA);
        const isNumB = /^\d+$/.test(keyB);

        // Alphabetical codes (e.g., ARMM, BARMM) should come first
        if (!isNumA && isNumB) return -1;
        if (isNumA && !isNumB) return 1;

        // If both are numbers, sort numerically
        if (isNumA && isNumB) return parseInt(keyA) - parseInt(keyB);

        // If both are alphabetical, sort by region name
        return a.region_name.localeCompare(b.region_name);
    });
    const provinceList = region ? Object.keys(locationData[region]?.province_list || {}) : [];
    const municipalityList = region && province ? locationData[region].province_list[province].municipality_list : [];
    const cityList = municipalityList.map((m) => Object.keys(m)[0]);
    const barangayList = region && province && city ? municipalityList.find((m) => Object.keys(m)[0] === city)?.[city]?.barangay_list || [] : [];
    const countryList = locationCountryJson.Country.map((c: { code: string; name: string }) => c.name);

    const regionLookup: Record<string, string> = {
        NCR: 'NATIONAL CAPITAL REGION',
        CAR: 'CORDILLERA ADMINISTRATIVE REGION',
        ARMM: 'AUTONOMOUS REGION IN MUSLIM MINDANAO',
        BARMM: 'BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO',
        NIR: 'Negros Island Region',
        '13': 'CARAGA',
        '12': 'SOCCSKSARGEN',
        '11': 'DAVAO REGION',
        '10': 'NORTHERN MINDANAO',
        '09': 'ZAMBOANGA PENINSULA',
        '08': 'EASTERN VISAYAS',
        '07': 'CENTRAL VISAYAS',
        '06': 'WESTERN VISAYAS',
        '05': 'BICOL REGION',
        '4B': 'MIMAROPA REGION',
        '4A': 'CALABARZON',
        '03': 'CENTRAL LUZON',
        '02': 'CAGAYAN VALLEY',
        '01': 'ILOCOS REGION',
    };

    const handleSelect = (field: string, value: string) => {
        if (field === 'region') {
            const regionCode = Object.entries(locationData).find(([, info]) => info.region_name === value)?.[0] || '';
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
        } else if (field === 'barangay') {
            onChange('bgycode', value);
        } else if (field === 'country') {
            // Look up the country object based on the displayed name.
            const selected = locationCountryJson.Country.find((c: { code: string; name: string }) => c.name === value);
            if (selected) {
                onChange('country_code', selected.code);
            }
        }

        setOpen('');
    };

    const selectedCountryName = locationCountryJson.Country.find((c: { code: string; name: string }) => c.code === country)?.name || '';

    const renderSelect = (label: string, field: string, items: string[], value: string, disabled = false, error?: string) => (
        <div className="w-full">
            <Label className="mb-1 block text-sm font-medium text-gray-700">{label}</Label>
            <Popover open={open === field} onOpenChange={(v) => !disabled && setOpen(v ? field : '')}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            'flex w-full items-center justify-between truncate text-left', // ✅ added `flex`, `text-left`
                            disabled && 'cursor-not-allowed opacity-50',
                        )}
                        disabled={disabled}
                    >
                        <span className="block max-w-[90%] truncate">{value || `-- Select ${label.toLowerCase()} --`}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[340px] p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                            {items.map((item) => (
                                <CommandItem key={item} value={item} onSelect={() => handleSelect(field, item)} className="truncate">
                                    <Check className={cn('mr-2 h-4 w-4', value === item ? 'opacity-100' : 'opacity-0')} />
                                    <span className="truncate">{item}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <InputError message={error} className="mt-1 text-[10px] text-red-600" />}
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

                    {/* House # / Lot # / Street Name / Building / Purok # / Village Name */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="col-span-4">
                            <Label htmlFor="patient_address">
                                House # / Lot # / Street Name / Building / Purok # / Village Name
                                <span className="font-bold text-red-600">*</span>
                            </Label>
                            <textarea
                                id="patient_address"
                                className={cn('w-full rounded-md border p-2 text-sm')}
                                placeholder="e.g., 123 Purok 2, Sunshine St., Brgy. Mabini"
                                rows={2}
                                value={patientAddress}
                                onChange={(e) => onChange('patient_address', e.target.value)}
                            />
                            {errors?.patient_address && <InputError message={errors.patient_address} className="text-[10px] text-red-600" />}
                        </div>
                    </div>

                    {/* Region | Province | City | Barangay */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {renderSelect(
                            'Region',
                            'region',
                            regionList.map(([, info]) => info.region_name),
                            regionList.find(([code]) => code === region)?.[1].region_name || '',
                            false,
                            errors?.regcode,
                        )}

                        {renderSelect('Province', 'province', provinceList, province, !region, errors?.provcode)}
                        {renderSelect('City / Municipality', 'city', cityList, city, !province, errors?.citycode)}
                        {renderSelect('Barangay', 'barangay', barangayList, barangay, !city, errors?.bgycode)}
                    </div>

                    {/* Zipcode */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="zipcode" className="w-40 text-sm font-medium text-gray-700">
                                        Zip Code: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="zipcode"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={zipCode}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 4) {
                                                onChange('zipcode', value);
                                            }
                                        }}
                                        maxLength={4}
                                        placeholder="e.g., 8600"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.zipcode && <InputError message={errors.zipcode} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="country_code" className="w-40 text-sm font-medium text-gray-700">
                                        Country: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    {renderSelect('', 'country', countryList, selectedCountryName, false, errors?.country_code)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Email */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="pat_email" className="w-40 text-sm font-medium text-gray-700">
                                        Email: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="pat_email"
                                        type="email"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={email}
                                        onChange={(e) => onChange('pat_email', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.pat_email && <InputError message={errors.pat_email} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Contact Number / Mobile */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="pat_mobile" className="w-40 text-sm font-medium text-gray-700">
                                        Mobile <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="pat_mobile"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={mobile}
                                        onChange={(e) => onChange('pat_mobile', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.pat_mobile && <InputError message={errors.pat_mobile} className="text-[10px] text-red-600" />}
                                </div>
                            </div>

                            {/* Landline */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="pat_landline" className="w-40 text-sm font-medium text-gray-700">
                                        Landline:
                                    </Label>
                                    <Input
                                        id="pat_landline"
                                        type="text"
                                        className={cn('w-full rounded-md border p-2 text-sm')}
                                        value={landline}
                                        onChange={(e) => onChange('pat_landline', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {errors?.pat_landline && <InputError message={errors.pat_landline} className="text-[10px] text-red-600" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient's Full Address */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="col-span-4">
                            <Label htmlFor="full_address" className="mb-1 block text-sm font-medium text-gray-700">
                                Full Address
                            </Label>
                            <Input
                                id="full_address"
                                type="text"
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 uppercase"
                                placeholder="e.g., 123 Purok 2, Sunshine St., Brgy. Mabini, Butuan City, 8600, Philippines"
                                value={[patientAddress, barangay, city, province, regionLookup[region] || '', zipCode, selectedCountryName]
                                    .filter(Boolean)
                                    .join(', ')}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
