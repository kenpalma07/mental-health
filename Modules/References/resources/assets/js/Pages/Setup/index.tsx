import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import axios from 'axios';
import { PlusCircleIcon } from 'lucide-react';
import * as React from 'react';
import AsyncSelect from 'react-select/async';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Select } from '@headlessui/react';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'Setup', href: '/references/setup' },
];

// now include facility_name in the option type
type FacilityOption = {
    value: string;
    label: string;
    facility_name: string;
    fhudcode: string;
    faccode: string;
};

const fetchFhudCodes = async (inputValue: string): Promise<FacilityOption[]> => {
    try {
        const { data } = await axios.get('/api/fhud-codes', {
            params: { search: inputValue },
        });
        console.log('Fetched facilities:', data);

        if (!Array.isArray(data)) return [];

        return data.map((item: any) => ({
            value: item.id.toString(),
            label: `${item.fhudcode} – ${item.facility_name}`,
            facility_name: item.facility_name,
            fhudcode: item.fhudcode,
            faccode: item.faccode,
        }));
    } catch (err) {
        console.error('Error fetching facilities:', err);
        return [];
    }
};

const FacilitySetup: React.FC<PageProps> = () => {
    const [selectedOption, setSelectedOption] = React.useState<FacilityOption | null>(null);
    const [facilityName, setFacilityName] = React.useState<string>('');
    const [facilityCode, setFacilityCode] = React.useState<string>('');
    const [fhuCode, setFhuCode] = React.useState<string>('');
    const [saving, setSaving] = React.useState(false);

    // when user picks an option, pull its facility_name into the text input
    const handleChange = (opt: FacilityOption | null) => {
        setSelectedOption(opt);
        setFacilityName(opt ? opt.facility_name : '');
        setFacilityCode(opt ? opt.fhudcode : '');
        setFhuCode(opt ? opt.faccode : '');
    };

    const saveFacilitySetup = async () => {
        if (!selectedOption) {
            alert('Please select a FHUD code first.');
            return;
        }
        setSaving(true);
        try {
            const resp = await axios.post('/api/facility-setup', {
                fhud_facility_id: selectedOption.value,
                facility_name: facilityName,
                fhudcode: facilityCode,
                faccode: fhuCode,
            });
            console.log('Saved:', resp.data);
            // e.g. toast or redirect
        } catch (err) {
            console.error(err);
            alert('Save failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setup" />
            <div className="w-full space-y-8 px-10 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">HOSPITAL MASTER DATA</h2>
                    <Button onClick={saveFacilitySetup} disabled={saving} className="h-8 px-2 lg:px-3">
                        <PlusCircleIcon className="h-4 w-4" />
                        {saving ? 'Saving…' : 'Save Setup'}
                    </Button>
                </div>
                <hr></hr>
                <h3 className="text-lg font-semibold"> General Information </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <div>
                        <Label className="font-small mb-1 block text-sm text-gray-700">FHUD Code</Label>
                        <AsyncSelect<FacilityOption, false>
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchFhudCodes}
                            onChange={handleChange}
                            getOptionValue={(opt) => opt.value}
                            getOptionLabel={(opt) => opt.label}
                            value={selectedOption}
                            placeholder="Search FHUD code..."
                            isClearable
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <div>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">Code</Label>
                        <input
                            type="text"
                            value={facilityCode}
                            onChange={(e) => setFacilityCode(e.target.value)}
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            placeholder="Code"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">FHUD Code</label>
                        <input
                            type="text"
                            value={fhuCode}
                            onChange={(e) => setFhuCode(e.target.value)}
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            placeholder="Facility Code"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Facility Name</label>
                        <input
                            type="text"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            placeholder="Facility Name"
                            
                        />
                    </div>
                </div>

                {/* Location */}
                <hr></hr>
                <div>
                    <h3 className="text-lg font-semibold"> Location </h3>
                </div>
            </div>
        </AppLayout>
    );
};

export default FacilitySetup;
