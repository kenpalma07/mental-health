import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import type { MasterPatient } from '@/types/modules/mental-health';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import type { BreadcrumbItem } from '@/types';

interface Props extends PageProps {
  patient: MasterPatient;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Patients', href: '/patients' },
  { title: 'Edit Patient', href: '#' },
];

const EditPatient: React.FC<Props> = ({ patient }) => {
  const { data, setData, put, processing, errors } = useForm({
    facility_region: patient.facility_region || '',
    facility_province: patient.facility_province || '',
    facility_city: patient.facility_city || '',
    facility_location: patient.facility_location || '',
    provider_name: patient.provider_name || '',
    intake_date: patient.intake_date || '',
    facility_barangay: patient.facility_barangay || '',
    facility_name: patient.facility_name || '',

    pat_lname: patient.pat_lname || '',
    pat_fname: patient.pat_fname || '',
    pat_mname: patient.pat_mname || '',
    pat_suffix: patient.pat_suffix || '',
    sex_code: patient.sex_code || '',
    civil_status: patient.civil_status || '',
    pat_birthDate: patient.pat_birthDate || '',
    regcode: patient.regcode || '',
    provcode: patient.provcode || '',
    citycode: patient.citycode || '',
    bgycode: patient.bgycode || '',
    pat_age: patient.pat_age || '',
    pat_birthPlace: patient.pat_birthPlace || '',
    pat_religion: patient.pat_religion || '',
    pat_educ: patient.pat_educ || '',
    pat_occupation: patient.pat_occupation || '',
    pat_mobile: patient.pat_mobile || '',
    pat_landline: patient.pat_landline || '',
    is_deceased: patient.is_deceased || false,
    death_date: patient.death_date || '',
    death_reason: patient.death_reason || '',

    pat_street: patient.pat_street || '',
    pat_houseno: patient.pat_houseno || '',
    patient_address: patient.patient_address || '',

    mot_fname: patient.mot_fname || '',
    mot_mname: patient.mot_mname || '',
    mot_lname: patient.mot_lname || '',
    mot_suffix: patient.mot_suffix || '',
    mot_contact: patient.mot_contact || '',
    mot_deceased: patient.mot_deceased || false,
    mot_address: patient.mot_address || '',

    fat_fname: patient.fat_fname || '',
    fat_mname: patient.fat_mname || '',
    fat_lname: patient.fat_lname || '',
    fat_suffix: patient.fat_suffix || '',
    fat_contact: patient.fat_contact || '',
    fat_deceased: patient.fat_deceased || false,
    fat_address: patient.fat_address || '',
  });

  useEffect(() => {
    if (data.pat_birthDate) {
      const birthDate = new Date(data.pat_birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setData('pat_age', age.toString());
    }
  }, [data.pat_birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/patients/${patient.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <form onSubmit={handleSubmit} className="w-full px-10 py-8 space-y-8">
        {/* Facility Info */}
        <h3 className="text-lg font-semibold">Edit - Patient Registration Form</h3>
        <hr></hr>
        <h3 className="text-lg font-semibold">Facility Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label>Facility Name</Label>
            <Input value={data.facility_name} onChange={e => setData('facility_name', e.target.value)} />
            <InputError message={errors.facility_name} />
          </div>
          <div>
            <Label>Facility Location</Label>
            <Input value={data.facility_location} onChange={e => setData('facility_location', e.target.value)} />
            <InputError message={errors.facility_location} />
          </div>
          <div>
            <Label>Provider Name</Label>
            <Input value={data.provider_name} onChange={e => setData('provider_name', e.target.value)} />
            <InputError message={errors.provider_name} />
          </div>
          <div>
            <Label>Date Intake</Label>
            <Input value={data.intake_date} onChange={e => setData('intake_date', e.target.value)} disabled />
            <InputError message={errors.intake_date} />
          </div>
        </div>

        <h2 className="text-xl font-semibold pt-4">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['pat_lname', 'Last Name'],
            ['pat_fname', 'First Name'],
            ['pat_mname', 'Middle Name'],
            ['pat_suffix', 'Suffix'],
          ].map(([field, label]) => (
            <div key={field}>
              <Label>{label}</Label>
              <Input
                value={data[field as keyof typeof data]}
                onChange={e => setData(field as keyof typeof data, e.target.value)}
              />
              <InputError message={errors[field as keyof typeof data]} />
            </div>
          ))}

          {/* Sex Dropdown */}
          <div>
            <Label>Sex</Label>
            <Input
              type="text"
              value={data.sex_code === 'M' ? 'Male' : data.sex_code === 'F' ? 'Female' : ''}
              onChange={e => setData('sex_code', e.target.value === 'Male' ? 'm' : e.target.value === 'Female' ? 'f' : '')} disabled
            />
            <InputError message={errors.sex_code} />
          </div>


          <div>
            <Label>Civil Status</Label>
            <Input
              value={data.civil_status}
              onChange={e => setData('civil_status', e.target.value)}
            />
            <InputError message={errors.civil_status} />
          </div>

          {[
            ['pat_birthDate', 'Birth Date'],
            ['patient_address', 'Address'],
            ['regcode', 'Region'],
            ['provcode', 'Province'],
            ['citycode', 'City'],
            ['bgycode', 'Barangay'],
            ['pat_age', 'Age'],
            ['pat_birthPlace', 'Birth Place'],
            ['pat_religion', 'Religion'],
            ['pat_educ', 'Education'],
            ['pat_occupation', 'Occupation'],
            ['pat_mobile', 'Contact Number'],
            ['pat_landline', 'Landline'],
          ].map(([field, label]) => (
            <div key={field}>
              <Label>{label}</Label>
              <Input
                type={field === 'pat_birthDate' ? 'date' : 'text'}
                value={data[field as keyof typeof data]}
                onChange={e => setData(field as keyof typeof data, e.target.value)}
                disabled={field === 'pat_age'}
              />
              <InputError message={errors[field as keyof typeof data]} />
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox checked={data.is_deceased} onCheckedChange={v => setData('is_deceased', !!v)} />
          <Label>Is Deceased?</Label>
        </div>
        {data.is_deceased && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Death</Label>
              <Input type="date" value={data.death_date} onChange={e => setData('death_date', e.target.value)} />
              <InputError message={errors.death_date} />
            </div>
            <div>
              <Label>Reason of Death</Label>
              <Input value={data.death_reason} onChange={e => setData('death_reason', e.target.value)} />
              <InputError message={errors.death_reason} />
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold pt-4">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>House No.</Label>
            <Input value={data.pat_houseno} onChange={e => setData('pat_houseno', e.target.value)} />
            <InputError message={errors.pat_houseno} />
          </div>
          <div>
            <Label>Street</Label>
            <Input value={data.pat_street} onChange={e => setData('pat_street', e.target.value)} />
            <InputError message={errors.pat_street} />
          </div>
          <div className="col-span-2">
            <Label>Full Address</Label>
            <Input value={data.patient_address} onChange={e => setData('patient_address', e.target.value)} />
            <InputError message={errors.patient_address} />
          </div>
        </div>

        <h2 className="text-xl font-semibold pt-4">Mother's Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['mot_lname', "Last Name"],
            ['mot_fname', "First Name"],
            ['mot_mname', "Middle Name"],
            ['mot_suffix', "Suffix"],
            ['mot_contact', "Contact"],
            ['mot_address', "Address"],
          ].map(([field, label]) => (
            <div key={field}>
              <Label>{label}</Label>
              <Input
                value={data[field as keyof typeof data]}
                onChange={e => setData(field as keyof typeof data, e.target.value)}
              />
              <InputError message={errors[field as keyof typeof data]} />
            </div>
          ))}
          <div className="col-span-2 flex items-center space-x-2">
            <Checkbox checked={data.mot_deceased} onCheckedChange={v => setData('mot_deceased', !!v)} />
            <Label>Is Deceased?</Label>
          </div>
        </div>

        <h2 className="text-xl font-semibold pt-4">Father's Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['fat_lname', "Last Name"],
            ['fat_fname', "First Name"],
            ['fat_mname', "Middle Name"],
            ['fat_suffix', "Suffix"],
            ['fat_contact', "Contact"],
            ['fat_address', "Address"],
          ].map(([field, label]) => (
            <div key={field}>
              <Label>{label}</Label>
              <Input
                value={data[field as keyof typeof data]}
                onChange={e => setData(field as keyof typeof data, e.target.value)}
              />
              <InputError message={errors[field as keyof typeof data]} />
            </div>
          ))}
          <div className="col-span-2 flex items-center space-x-2">
            <Checkbox checked={data.fat_deceased} onCheckedChange={v => setData('fat_deceased', !!v)} />
            <Label>Is Deceased?</Label>
          </div>
        </div>

        <div className="pt-6">
          <Button type="submit" disabled={processing}>
            Update Patient
          </Button>
        </div>
      </form>
    </AppLayout>
  );
};

export default EditPatient;
