import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { MapPin, PlusCircleIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import rawLocationDataJson from './json/philippine_reg_prov_cit_brgy.json';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'Setup', href: '/references/setup' },
];

type FacilityOption = {
    value: string;
    label: string;
    facility_name: string;
    fhudcode: string;
    faccode: string;
    facility_address: string;
    provider_name: string;
};

type FacilityList = FacilityOption & { id: number };

const fetchFhudCodes = async (inputValue: string): Promise<FacilityOption[]> => {
    try {
        const { data } = await axios.get('/api/fhud-codes', {
            params: { search: inputValue },
        });

        console.log('Fetching FHUD codes with input:', inputValue);
        console.log('Mapped FHUD options:', data);

        return Array.isArray(data)
            ? data
                  .filter((item: any) => item.facility_stat === 'A')
                  .map((item: any) => ({
                      value: item.id.toString(),
                      label: `${item.fhudcode} – ${item.facility_name}`,
                      facility_name: item.facility_name,
                      fhudcode: item.fhudcode,
                      faccode: item.faccode,
                      facility_address: item.facility_address,
                      provider_name: item.provider_name,
                  }))
            : [];
    } catch (err) {
        console.error('Error fetching FHUD codes:', err);
        return [];
    }
};

const fetchFacility = async (inputValue: string): Promise<FacilityList[]> => {
    try {
        const { data } = await axios.get('/api/facilities', {
            params: { search: inputValue },
        });

        return Array.isArray(data)
            ? data
                  .filter((item: any) => item.facility_stat === 'A')
                  .map((item: any) => ({
                      id: item.id,
                      value: item.id.toString(),
                      label: `${item.fhudcode} – ${item.facility_name}`,
                      facility_name: item.facility_name,
                      fhudcode: item.fhudcode,
                      faccode: item.faccode,
                      facility_address: item.facility_address,
                      provider_name: item.provider_name,
                  }))
            : [];
    } catch (err) {
        console.error('Error fetching facilities:', err);
        return [];
    }
};

const FacilitySetup: React.FC<PageProps> = () => {
    const [selectedOption, setSelectedOption] = React.useState<FacilityOption | null>(null);
    const [facilityName, setFacilityName] = React.useState('');
    const [facilityCode, setFacilityCode] = React.useState('');
    const [fhudCode, setFhuCode] = React.useState('');
    const [facilityAddress, setFacilityAddress] = React.useState('');
    const [providerName, setProviderName] = React.useState('');

    const [saving, setSaving] = React.useState(false);
    const [updating, setUpdating] = React.useState(false);

    const { props } = usePage<PageProps & { facilitySetups: any[] }>();
    const facilitySetups = props.facilitySetups || [];
    const setup = facilitySetups[0];
    const isDisabled = facilitySetups.length >= 1 || saving;
    const isEmpty = facilitySetups.length === 0;

    const [selectedFacility, setSelectedFacility] = React.useState<FacilityList | null>(null);
    const [fhud_facilityName, setFhud_facilityName] = React.useState('');
    const [fhud_fhudcode, setFhud_fhudcode] = React.useState('');
    const [fhud_facilityCode, setFhud_facilityCode] = React.useState('');
    const [fhud_facilityAddress, setFhud_facilityAddress] = React.useState('');
    const [fhud_providerName, setFhud_providerName] = React.useState('');


    const handleSaveChanges = (opt: FacilityOption | null) => {
        setSelectedOption(opt);
        if (!opt) {
            setFacilityName('');
            setFacilityCode('');
            setFhuCode('');
            setFacilityAddress('');
            setProviderName('');
            return;
        }

        setFacilityName(opt.facility_name);
        setFacilityCode(opt.faccode);
        setFhuCode(opt.fhudcode);
        setFacilityAddress(opt.facility_address);
        setProviderName(opt.provider_name);
    };

    const handleUpdateChanges = (opt: FacilityList | null) => {
        setSelectedFacility(opt);
        if (!opt) {
            setFhud_facilityName('');
            setFhud_facilityCode('');
            setFhud_fhudcode('');
            setFhud_facilityAddress('');
            setFhud_providerName('');
            return;
        }

        setFhud_facilityName(opt.facility_name);
        setFhud_facilityCode(opt.faccode);
        setFhud_fhudcode(opt.fhudcode);
        setFhud_facilityAddress(opt.facility_address);
        setFhud_providerName(opt.provider_name);
    };

    const saveFacilitySetup = async () => {
        const payload = {
            facility_name: facilityName,
            fhudcode: fhudCode,
            faccode: facilityCode,
            facility_address: facilityAddress,
            provider_name: providerName,
        };

        setSaving(true);
        try {
            await axios.post('/references/setup', payload);
            alert('Setup saved successfully!');
            window.location.reload();
        } catch (err: any) {
            console.error('Save error:', err.response?.data || err.message);
            alert('Save failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    const updateFacilitySetup = async () => {
        if (!setup) {
            console.error('No setup found to update');
            return;
        }

        const payload = {
            facility_name: fhud_facilityName,
            fhudcode: fhud_fhudcode,
            faccode: fhud_facilityCode,
            facility_address: fhud_facilityAddress,
            provider_name: fhud_providerName,
            _method: 'PUT',
        };

        setUpdating(true);
        try {
            await axios.post(`/references/setup/${setup.id}`, payload);
            alert('Setup updated successfully!');
            window.location.reload();
        } catch (err: any) {
            console.error('Update error:', err.response?.data || err.message);
            alert('Select the facility first before you update!');
        } finally {
            setUpdating(false);
        }
    };

    // Auto-select the facility from setup (edit section) on mount
    React.useEffect(() => {
        if (setup) {
            const defaultFacility: FacilityList = {
                id: setup.id,
                value: setup.id.toString(),
                label: `${setup.fhudcode} – ${setup.facility_name}`,
                facility_name: setup.facility_name,
                fhudcode: setup.fhudcode,
                faccode: setup.faccode,
                facility_address: setup.facility_address,
                provider_name: setup.provider_name,
            };
            setSelectedFacility(defaultFacility);
            setFhud_facilityName(defaultFacility.facility_name);
            setFhud_facilityCode(defaultFacility.faccode);
            setFhud_fhudcode(defaultFacility.fhudcode);
            setFhud_facilityAddress(defaultFacility.facility_address);
            setFhud_providerName(defaultFacility.provider_name);
        }
    }, [setup]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setup" />
            <div className="w-full space-y-8 px-10 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">HOSPITAL MASTER DATA</h2>
                </div>

                <hr />
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-semibold">Facility Setup Information</h3>
                            <p className="text-xs text-red-500">
                                * Select a FHUD code to configure the facility. Only one facility can be set up at a time.
                                <br />
                                * Once a facility is set up, you can only view and update its information.
                                <br />* To add a new facility, please contact the system administrator.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label className="w-40 text-sm font-medium text-gray-700">Select Facility: </label>
                                <AsyncSelect<FacilityOption, false>
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={fetchFhudCodes}
                                    onChange={handleSaveChanges}
                                    value={selectedOption}
                                    getOptionValue={(opt) => opt.value}
                                    getOptionLabel={(opt) => opt.label}
                                    placeholder="Search FHUD code..."
                                    isClearable
                                    // isDisabled={isDisabled}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={saveFacilitySetup} disabled={isDisabled} className="h-8 px-2 lg:px-3">
                                    <PlusCircleIcon className="h-4 w-4" />
                                    {saving ? 'Saving…' : 'Add Setup'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 flex items-center justify-between">
                    <Button onClick={updateFacilitySetup} className="h-8 px-2 lg:px-3" disabled={isEmpty}>
                        <PlusCircleIcon className="h-4 w-4" />
                        {updating ? 'Updating…' : 'Save Setup'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="w-40 text-sm font-medium text-gray-700">Select Facility: </label>
                                <AsyncSelect<FacilityList, false>
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={fetchFacility}
                                    onChange={handleUpdateChanges}
                                    value={selectedFacility}
                                    getOptionValue={(opt) => opt.value}
                                    getOptionLabel={(opt) => opt.label}
                                    placeholder="Search FHUD code..."
                                    isClearable
                                    isDisabled={isEmpty}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="w-40 text-sm font-medium text-gray-700">Code</label>
                                <input type="text" value={fhud_fhudcode} className="text-dark-500 w-full rounded border bg-gray-100 p-2" readOnly />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="w-40 text-sm font-medium text-gray-700">Facility code: </label>
                                <input
                                    type="text"
                                    value={fhud_facilityCode}
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="w-40 text-sm font-medium text-gray-700">Facility Name: </label>
                                <input
                                    type="text"
                                    value={fhud_facilityName}
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="w-40 text-sm font-medium text-gray-700">Provider Name: </label>
                                <input
                                    type="text"
                                    value={fhud_providerName}
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                    readOnly
                                />
                            </div>

                            <hr />

                            <div className="flex items-center justify-start gap-10">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-gray-600" />
                                    <h2 className="text-md font-semibold">Location</h2>
                                </div>
                                <div>
                                    <small className="text-red-500">* Select the Facility first before you update</small>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="w-40 text-sm font-medium text-gray-700">Address: </label>
                                <input
                                    type="text"
                                    value={fhud_facilityAddress}
                                    onChange={(e) => setFhud_facilityAddress(e.target.value)}
                                    className="text-dark-500 w-full rounded border p-2"
                                    disabled={isEmpty}
                                />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </AppLayout>
    );
};

export default FacilitySetup;
