import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PlusCircleIcon } from 'lucide-react';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

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
};

const fetchFhudCodes = async (inputValue: string): Promise<FacilityOption[]> => {
    try {
        const { data } = await axios.get('/api/fhud-codes', {
            params: { search: inputValue },
        });

        return Array.isArray(data)
            ? data.map((item: any) => ({
                  value: item.id.toString(),
                  label: `${item.fhudcode} – ${item.facility_name}`,
                  facility_name: item.facility_name,
                  fhudcode: item.fhudcode,
                  faccode: item.faccode,
              }))
            : [];
    } catch (err) {
        console.error('Error fetching FHUD codes:', err);
        return [];
    }
};

const FacilitySetup: React.FC<PageProps> = () => {
    const [selectedOption, setSelectedOption] = React.useState<FacilityOption | null>(null);
    const [facilityName, setFacilityName] = React.useState('');
    const [facilityCode, setFacilityCode] = React.useState('');
    const [fhuCode, setFhuCode] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const { props } = usePage<PageProps & { facilitySetups: any[] }>();
    const facilitySetups = props.facilitySetups || [];

    const isDisabled = facilitySetups.length >= 1 || saving;

    const handleChange = (opt: FacilityOption | null) => {
        setSelectedOption(opt);
        setFacilityName(opt?.facility_name || '');
        setFacilityCode(opt?.fhudcode || '');
        setFhuCode(opt?.faccode || '');
    };

    const saveFacilitySetup = async () => {
        if (!selectedOption) {
            alert('Please select a FHUD code.');
            return;
        }

        const payload = {
            facility_name: facilityName,
            fhudcode: facilityCode,
            faccode: fhuCode,
        };

        setSaving(true);

        try {
            console.log('Sending data:', payload);
            const resp = await axios.post('/facility-setup', payload);
            console.log('Saved successfully:', resp.data);
            alert('Setup saved successfully!');
            setEditMode(false); // Exit edit mode after successful save
            window.location.reload();
        } catch (err: any) {
            console.error('Save error:', err.response?.data || err.message);
            alert('Save failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    const updateFacilitySetup = async () => {
        if (!selectedOption) {
            alert('Please select a FHUD code.');
            return;
        }

        const payload = {
            id: selectedOption.value,
            facility_name: facilityName,
            fhudcode: facilityCode,
            faccode: fhuCode,
        };

        setSaving(true);

        try {
            console.log('Sending data:', payload);
            const resp = await axios.put(`/facility-setup/${selectedOption.value}`, payload); // Assuming PUT request for update
            console.log('Updated successfully:', resp.data);
            alert('Setup updated successfully!');
            setEditMode(false); // Exit edit mode after successful update
            window.location.reload();
        } catch (err: any) {
            console.error('Update error:', err.response?.data || err.message);
            alert('Update failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (facility: any) => {
        setFacilityName(facility.facility_name);
        setFacilityCode(facility.fhudcode);
        setFhuCode(facility.faccode);
        setEditMode(true); // Enable edit mode
        setSelectedOption({
            value: facility.id.toString(),
            label: `${facility.fhudcode} – ${facility.facility_name}`,
            facility_name: facility.facility_name,
            fhudcode: facility.fhudcode,
            faccode: facility.faccode,
        }); // Pre-select the facility
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setFacilityName('');
        setFacilityCode('');
        setFhuCode('');
        setSelectedOption(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setup" />
            <div className="w-full space-y-8 px-10 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">HOSPITAL MASTER DATA</h2>
                    <div>
                        {editMode ? (
                            <Button onClick={updateFacilitySetup} disabled={isDisabled} className="h-8 px-2 lg:px-3">
                                {saving ? 'Updating…' : 'Update Setup'}
                            </Button>
                        ) : (
                            <Button onClick={saveFacilitySetup} disabled={isDisabled} className="h-8 px-2 lg:px-3">
                                <PlusCircleIcon className="h-4 w-4" />
                                {saving ? 'Saving…' : 'Add Setup'}
                            </Button>
                        )}
                        {editMode && (
                            <Button onClick={handleCancelEdit} className="ml-2">
                                Cancel Edit
                            </Button>
                        )}
                    </div>
                </div>

                <hr />
                <h3 className="text-lg font-semibold">General Information</h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <div>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">FHUD Code</Label>
                        <AsyncSelect<FacilityOption, false>
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchFhudCodes}
                            onChange={handleChange}
                            value={selectedOption}
                            getOptionValue={(opt) => opt.value}
                            getOptionLabel={(opt) => opt.label}
                            placeholder="Search FHUD code..."
                            isClearable
                            isDisabled={editMode} // Disable the selection during edit mode
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
                            className="w-full rounded border p-2"
                            readOnly={!editMode} // Allow editing only in edit mode
                        />
                    </div>
                    <div>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">FHUD Code</Label>
                        <input
                            type="text"
                            value={fhuCode}
                            onChange={(e) => setFhuCode(e.target.value)}
                            className="w-full rounded border p-2"
                            readOnly={!editMode} // Allow editing only in edit mode
                        />
                    </div>
                    <div>
                        <Label className="mb-1 block text-sm font-medium text-gray-700">Facility Name</Label>
                        <input
                            type="text"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                            className="w-full rounded border p-2"
                            readOnly={!editMode} // Allow editing only in edit mode
                        />
                    </div>
                </div>

                {editMode && (
                    <div className="mt-4">
                        <Button onClick={handleCancelEdit}>Cancel Edit</Button>
                    </div>
                )}

                <hr />
                <h3 className="text-lg font-semibold">Location</h3>
            </div>
        </AppLayout>
    );
};

export default FacilitySetup;
