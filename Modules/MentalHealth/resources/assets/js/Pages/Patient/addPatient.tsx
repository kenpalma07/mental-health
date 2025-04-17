import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Patients',
    href: '/patients/create',
  },
];

const AddPatient: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    facility_name: '',
    facility_location: '',
    provider_name: '',
    intake_date: '',
    pat_lname: '',
    pat_mname: '',
    pat_fname: '',
    sex_code: '',
    pat_birthDate: '',
    regcode: '',
    provcode: '',
    citycode: '',
    bgycode: '',
    patient_address: '',
    pat_mobile: '',
    pat_landline: '',
    mot_fname: '',
    mot_mname: '',
    mot_lname: '',
    mot_birthDate: '',
    fat_fname: '',
    fat_mname: '',
    fat_lname: '',
    fat_birthDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/patients');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Patients" />

      <form onSubmit={handleSubmit} className="w-full px-10 py-8 space-y-8">
        {/* Facility Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="facility_name">Facility Name</Label>
            <Input id="facility_name" value={data.facility_name} onChange={(e) => setData('facility_name', e.target.value)} />
            <InputError message={errors.facility_name} />
          </div>
          <div>
            <Label htmlFor="facility_location">Facility Location</Label>
            <Input id="facility_location" value={data.facility_location} onChange={(e) => setData('facility_location', e.target.value)} />
            <InputError message={errors.facility_location} />
          </div>
          <div>
            <Label htmlFor="provider_name">Name of Provider</Label>
            <Input id="provider_name" value={data.provider_name} onChange={(e) => setData('provider_name', e.target.value)} />
            <InputError message={errors.provider_name} />
          </div>
          <div>
            <Label htmlFor="intake_date">Date Intake</Label>
            <Input id="intake_date" type="date" value={data.intake_date} onChange={(e) => setData('intake_date', e.target.value)} />
            <InputError message={errors.intake_date} />
          </div>
        </div>

        {/* Patient Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Patient Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="pat_lname">Last Name</Label>
              <Input id="pat_lname" value={data.pat_lname} onChange={(e) => setData('pat_lname', e.target.value)} />
              <InputError message={errors.pat_lname} />
            </div>
            <div>
              <Label htmlFor="pat_mname">Middle Name</Label>
              <Input id="pat_mname" value={data.pat_mname} onChange={(e) => setData('pat_mname', e.target.value)} />
              <InputError message={errors.pat_mname} />
            </div>
            <div>
              <Label htmlFor="pat_fname">First Name</Label>
              <Input id="pat_fname" value={data.pat_fname} onChange={(e) => setData('pat_fname', e.target.value)} />
              <InputError message={errors.pat_fname} />
            </div>
            <div>
              <Label htmlFor="pat_birthDate">Birth Date</Label>
              <Input id="pat_birthDate" type="date" value={data.pat_birthDate} onChange={(e) => setData('pat_birthDate', e.target.value)} />
              <InputError message={errors.pat_birthDate} />
            </div>
            <div>
              <Label htmlFor="sex_code">Gender</Label>
              <select id="sex_code" value={data.sex_code} onChange={(e) => setData('sex_code', e.target.value)} className="block w-full px-3 py-2 border rounded-md shadow-sm">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <InputError message={errors.sex_code} />
            </div>
            <div>
              <Label htmlFor="pat_mobile">Mobile</Label>
              <Input id="pat_mobile" value={data.pat_mobile} onChange={(e) => setData('pat_mobile', e.target.value)} />
              <InputError message={errors.pat_mobile} />
            </div>
            <div>
              <Label htmlFor="pat_landline">Landline</Label>
              <Input id="pat_landline" value={data.pat_landline} onChange={(e) => setData('pat_landline', e.target.value)} />
              <InputError message={errors.pat_landline} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="patient_address">Address</Label>
              <Input id="patient_address" value={data.patient_address} onChange={(e) => setData('patient_address', e.target.value)} />
              <InputError message={errors.patient_address} />
            </div>
          </div>
        </div>

        {/* Location Codes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="regcode">Region Code</Label>
            <Input id="regcode" value={data.regcode} onChange={(e) => setData('regcode', e.target.value)} />
            <InputError message={errors.regcode} />
          </div>
          <div>
            <Label htmlFor="provcode">Province Code</Label>
            <Input id="provcode" value={data.provcode} onChange={(e) => setData('provcode', e.target.value)} />
            <InputError message={errors.provcode} />
          </div>
          <div>
            <Label htmlFor="citycode">City Code</Label>
            <Input id="citycode" value={data.citycode} onChange={(e) => setData('citycode', e.target.value)} />
            <InputError message={errors.citycode} />
          </div>
          <div>
            <Label htmlFor="bgycode">Barangay Code</Label>
            <Input id="bgycode" value={data.bgycode} onChange={(e) => setData('bgycode', e.target.value)} />
            <InputError message={errors.bgycode} />
          </div>
        </div>

        {/* Carer (Parent) Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Parent Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="mot_fname">Mother's First Name</Label>
              <Input id="mot_fname" value={data.mot_fname} onChange={(e) => setData('mot_fname', e.target.value)} />
              <InputError message={errors.mot_fname} />
            </div>
            <div>
              <Label htmlFor="mot_mname">Mother's Middle Name</Label>
              <Input id="mot_mname" value={data.mot_mname} onChange={(e) => setData('mot_mname', e.target.value)} />
              <InputError message={errors.mot_mname} />
            </div>
            <div>
              <Label htmlFor="mot_lname">Mother's Last Name</Label>
              <Input id="mot_lname" value={data.mot_lname} onChange={(e) => setData('mot_lname', e.target.value)} />
              <InputError message={errors.mot_lname} />
            </div>
            <div>
              <Label htmlFor="mot_birthDate">Mother's Birth Date</Label>
              <Input id="mot_birthDate" type="date" value={data.mot_birthDate} onChange={(e) => setData('mot_birthDate', e.target.value)} />
              <InputError message={errors.mot_birthDate} />
            </div>
            <div>
              <Label htmlFor="fat_fname">Father's First Name</Label>
              <Input id="fat_fname" value={data.fat_fname} onChange={(e) => setData('fat_fname', e.target.value)} />
              <InputError message={errors.fat_fname} />
            </div>
            <div>
              <Label htmlFor="fat_mname">Father's Middle Name</Label>
              <Input id="fat_mname" value={data.fat_mname} onChange={(e) => setData('fat_mname', e.target.value)} />
              <InputError message={errors.fat_mname} />
            </div>
            <div>
              <Label htmlFor="fat_lname">Father's Last Name</Label>
              <Input id="fat_lname" value={data.fat_lname} onChange={(e) => setData('fat_lname', e.target.value)} />
              <InputError message={errors.fat_lname} />
            </div>
            <div>
              <Label htmlFor="fat_birthDate">Father's Birth Date</Label>
              <Input id="fat_birthDate" type="date" value={data.fat_birthDate} onChange={(e) => setData('fat_birthDate', e.target.value)} />
              <InputError message={errors.fat_birthDate} />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <Button type="submit" disabled={processing}>
            Save Patient
          </Button>
        </div>
      </form>
    </AppLayout>
  );
};

export default AddPatient;
