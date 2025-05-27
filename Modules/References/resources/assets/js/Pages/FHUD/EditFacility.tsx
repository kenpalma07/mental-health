import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FHUD } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import rawLocationDataJson from './json/philippine_reg_prov_cit_brgy.json';

const rawLocationData = rawLocationDataJson as unknown as LocationData;

interface MunicipalityMap {
    [municipalityName: string]: {
        barangay_list: string[];
    };
}

interface ProvinceMap {
    [provinceName: string]: {
        municipality_list: MunicipalityMap[];
    };
}

interface Region {
    region_name: string;
    province_list: ProvinceMap;
}

type LocationData = {
    [regionCode: string]: Region;
};

interface EditFacilityProps {
    isOpen: boolean;
    onClose: () => void;
    facility: FHUD;
    onSubmit: (data: any) => void;
}

type LocationItem = {
    region_code: string;
    region_name: string;
    province_name: string;
    city_name: string;
    brgy_name: string;
};

const flattenLocationData = (rawData: any): LocationItem[] => {
    const locations: LocationItem[] = [];

    for (const regionCode in rawData) {
        const region = rawData[regionCode];
        const regionName = region?.region_name || regionCode;
        const provinceList = region?.province_list;
        if (!provinceList || typeof provinceList !== 'object') continue;

        for (const provinceKey in provinceList) {
            const province = provinceList[provinceKey];

            for (const cityKey in province) {
                const municipality = province[cityKey];
                const barangayList = municipality?.barangay_list;

                if (Array.isArray(barangayList)) {
                    barangayList.forEach((barangay: string) => {
                        locations.push({
                            region_code: regionCode,
                            region_name: regionName,
                            province_name: provinceKey,
                            city_name: cityKey,
                            brgy_name: barangay,
                        });
                    });
                }
            }
        }
    }

    return locations;
};

const EditFacility: React.FC<EditFacilityProps> = ({ isOpen, onClose, facility, onSubmit }) => {
    const {
        data: form,
        setData: setForm,
        reset,
        errors,
        processing,
    } = useForm({
        fhudcode: facility.fhudcode || '',
        facility_name: facility.facility_name || '',
        faccode: facility.faccode || '',
        zipcode: facility.zipcode || '',
        date_mod: facility.date_mod || '',
        provider_name: facility.provider_name || '',
        facility_address: facility.facility_address || '',
        regcode: facility.regcode || '',
        provcode: facility.provcode || '',
        citycode: facility.citycode || '',
        bgycode: facility.bgycode || '',
        facility_stat: facility.facility_stat || '',
        facility_licno: facility.facility_licno || '',
        accreno: facility.accreno || '',
    });

    useEffect(() => {
        setForm({
            fhudcode: facility.fhudcode || '',
            facility_name: facility.facility_name || '',
            faccode: facility.faccode || '',
            zipcode: facility.zipcode || '',
            date_mod: facility.date_mod || '',
            provider_name: facility.provider_name || '',
            facility_address: facility.facility_address || '',
            regcode: facility.regcode || '',
            provcode: facility.provcode || '',
            citycode: facility.citycode || '',
            bgycode: facility.bgycode || '',
            facility_stat: facility.facility_stat || '',
            facility_licno: facility.facility_licno || '',
            accreno: facility.accreno || '',
        });

        return () => reset();
    }, [facility.id]);

    const [error, setError] = useState<{ [key: string]: string }>({});
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [filteredProvinces, setFilteredProvinces] = useState<string[]>([]);
    const [filteredMunicipalities, setFilteredMunicipalities] = useState<string[]>([]);
    const [filteredBarangays, setFilteredBarangays] = useState<string[]>([]);
    const flattenedLocations = React.useMemo(() => flattenLocationData(rawLocationData), []);

    const regions = React.useMemo(() => Array.from(new Set(flattenedLocations.map((item) => item.region_name))).sort(), []);

    useEffect(() => {
        if (form.regcode) {
            const provinces = flattenedLocations.filter((item) => item.region_code === form.regcode).map((item) => item.province_name);

            setFilteredProvinces(Array.from(new Set(provinces)));

            if (form.provcode) {
                const municipalities = flattenedLocations.filter((item) => item.province_name === form.provcode).map((item) => item.city_name);

                setFilteredMunicipalities(Array.from(new Set(municipalities)));
            }

            if (form.citycode) {
                const barangays = flattenedLocations.filter((item) => item.city_name === form.citycode).map((item) => item.brgy_name);

                setFilteredBarangays(Array.from(new Set(barangays)));
            }
        }
    }, [form.regcode, form.provcode, form.citycode]);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const province = e.target.value;
        setSelectedProvince(province);

        const municipalities = flattenedLocations.filter((item) => item.province_name === province).map((item) => item.city_name);
        setFilteredMunicipalities(Array.from(new Set(municipalities)));

        setForm((prev) => ({ ...prev, provcode: province, citycode: '', bgycode: '' }));
    };

    const handleMunicipalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const municipality = e.target.value;
        setSelectedMunicipality(municipality);
        setForm((prev) => ({ ...prev, citycode: municipality, bgycode: '' }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'faccode') {
            setForm((prev) => ({ ...prev, faccode: value }));
            const match = value.match(/\d{7}$/);
            if (match) {
                setForm((prev) => ({ ...prev, fhudcode: match[0] }));
            }
            return;
        }

        if (name === 'fhudcode') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 7) {
                setForm((prev) => ({ ...prev, fhudcode: digitsOnly }));
            }
            return;
        }

        if (name === 'zipcode') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 4) {
                setForm((prev) => ({ ...prev, zipcode: digitsOnly }));
            }
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Form submitted:', form);
        onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-5">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                <button className="absolute top-3 right-3 text-red-500" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <h2 className="mb-4 text-xl font-bold">Edit FHUD Facility</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 text-sm">
                    {/* Date Modified */}
                    <div>
                        <Label htmlFor="date_mod">
                            Date <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="date_mod"
                            type="date"
                            value={form.date_mod}
                            onChange={(e) => setForm('date_mod', e.target.value)}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        />
                        <InputError message={errors.date_mod} />
                    </div>
                    <div></div>
                    <div></div>

                    {/* FHUD Code */}
                    <div>
                        <Label htmlFor="fhudcode">
                            Code: <span className="font-bold text-red-600">*</span>
                            <small className="text-muted-foreground">Must be exactly 7 digits (ex. 000XXXX) </small>
                        </Label>
                        <Input id="fhudcode" name="fhudcode" value={form.fhudcode} onChange={handleChange} readOnly className="bg-gray-100" />
                        <InputError message={errors.fhudcode} />
                    </div>

                    {/* Facility Code */}
                    <div>
                        <Label htmlFor="faccode">
                            Facility Code: <span className="font-bold text-red-600">*</span>
                            <small className="text-muted-foreground">Registered Facility Code from NHFR</small>
                        </Label>
                        <Input id="faccode" name="faccode" value={form.faccode} onChange={handleChange} />
                        <InputError message={errors.faccode} />
                    </div>

                    {/* Facility Name */}
                    <div>
                        <Label htmlFor="facility_name">
                            Facility Name: <span className="font-bold text-red-600">*</span>
                            <small className="text-muted-foreground">Registered Facility Name from NHFR</small>
                        </Label>
                        <Input
                            id="facility_name"
                            name="facility_name"
                            value={form.facility_name}
                            onChange={(e) => setForm('facility_name', e.target.value)}
                        />
                        <InputError message={errors.facility_name} />
                    </div>

                    {/* Name of the Provider */}
                    <div>
                        <Label htmlFor="provider_name">
                            Name of the Provider: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="provider_name"
                            name="provider_name"
                            value={form.provider_name}
                            onChange={handleChange}
                            placeholder="Name of the Provider"
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        />
                        <InputError message={errors.provider_name} />
                    </div>

                    {/* Facility Address */}
                    <div className="col-span-2">
                        <Label htmlFor="facility_address">
                            Facility Location / Address: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="facility_address"
                            name="facility_address"
                            value={form.facility_address}
                            onChange={handleChange}
                            placeholder="Facility Address"
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        />
                        <InputError message={errors.facility_address} />
                    </div>

                    {/* Region Code */}
                    <div>
                        <Label htmlFor="regcode">
                            Region: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <select
                            id="regcode"
                            name="regcode"
                            value={form.regcode}
                            onChange={(e) => {
                                const val = e.target.value;
                                setForm((prev) => ({
                                    ...prev,
                                    regcode: val,
                                    provcode: '',
                                    citycode: '',
                                    bgycode: '',
                                }));
                            }}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        >
                            <option value="">Select Region</option>
                            {Object.entries(rawLocationData).map(([regionCode, regionInfo]) => (
                                <option key={regionCode} value={regionCode}>
                                    Region {regionCode} - {regionInfo.region_name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.regcode} />
                    </div>

                    {/* Province, Municipality, Barangay */}
                    <div>
                        <Label htmlFor="provcode">
                            Province: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <select
                            id="provcode"
                            name="provcode"
                            value={form.provcode}
                            onChange={(e) => {
                                const val = e.target.value;
                                setForm((prev) => ({
                                    ...prev,
                                    provcode: val,
                                    citycode: '',
                                    bgycode: '',
                                }));
                            }}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        >
                            <option value="">Select Province</option>
                            {form.regcode &&
                                Object.keys(rawLocationData[form.regcode]?.province_list || {}).map((provinceName) => (
                                    <option key={provinceName} value={provinceName}>
                                        {provinceName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="citycode">
                            Municipality: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <select
                            id="citycode"
                            name="citycode"
                            value={form.citycode}
                            onChange={(e) => {
                                const val = e.target.value;
                                setForm((prev) => ({
                                    ...prev,
                                    citycode: val,
                                    bgycode: '',
                                }));
                            }}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        >
                            <option value="">Select Municipality</option>
                            {form.regcode &&
                                form.provcode &&
                                rawLocationData[form.regcode]?.province_list?.[form.provcode]?.municipality_list?.map(
                                    (mObj: Record<string, { barangay_list: string[] }>) => {
                                        const name = Object.keys(mObj)[0];
                                        return (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        );
                                    },
                                )}
                        </select>

                        <InputError message={errors.citycode} />
                    </div>

                    <div>
                        <Label htmlFor="bgycode">
                            Barangay: <span className="font-bold text-red-600">*</span>
                        </Label>
                        <select
                            id="bgycode"
                            name="bgycode"
                            value={form.bgycode}
                            onChange={(e) => {
                                const val = e.target.value;
                                setForm((prev) => ({
                                    ...prev,
                                    bgycode: val,
                                }));
                            }}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        >
                            <option value="">Select Barangay</option>
                            {form.regcode &&
                                form.provcode &&
                                form.citycode &&
                                (() => {
                                    const municipalities = rawLocationData[form.regcode]?.province_list?.[form.provcode]?.municipality_list || [];

                                    const found = municipalities.find((mObj) => Object.keys(mObj)[0] === form.citycode);

                                    const barangays = found?.[form.citycode]?.barangay_list || [];

                                    return barangays.map((brgy) => (
                                        <option key={brgy} value={brgy}>
                                            {brgy}
                                        </option>
                                    ));
                                })()}
                        </select>

                        <InputError message={errors.bgycode} />
                    </div>

                    {/* Zipcode */}
                    <div>
                        <Label htmlFor="zipcode">
                            Zipcode: <span className="font-bold text-red-600">*</span>
                            <small className="text-muted-foreground">Must be exactly 4 digits </small>
                        </Label>
                        <Input id="zipcode" name="zipcode" value={form.zipcode} onChange={handleChange} />
                        <InputError message={errors.zipcode} />
                    </div>

                    <div>
                        <Label htmlFor="facility_stat">
                            Status <span className="font-bold text-red-600">*</span>
                        </Label>
                        <select
                            id="facility_stat"
                            name="facility_stat"
                            value={form.facility_stat}
                            onChange={(e) => setForm('facility_stat', e.target.value as 'A' | 'I')}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                        >
                            <option value="">Select Status</option>
                            <option value="A">Active</option>
                            <option value="I">Inactive</option>
                        </select>
                        <InputError message={errors.facility_stat} />
                    </div>

                    <div>
                        <Label htmlFor="facility_licno">Facility License Number</Label>
                        <Input
                            id="facility_licno"
                            name="facility_licno"
                            value={form.facility_licno}
                            onChange={handleChange}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            placeholder="Facility License Number"
                        />
                        <InputError message={errors.facility_licno} />
                    </div>

                    <div>
                        <Label htmlFor="accreno">PhilHealth Accreditation No</Label>
                        <Input
                            id="accreno"
                            name="accreno"
                            value={form.accreno}
                            onChange={handleChange}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            placeholder="PhilHealth Accreditation No"
                        />
                        <InputError message={errors.accreno} />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-3 flex justify-end gap-2 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFacility;
