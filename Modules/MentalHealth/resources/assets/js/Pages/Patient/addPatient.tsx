import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import SearchPatientModal from './SearchPatientModal'; // Import your modal
import type { BreadcrumbItem } from '@/types';
import { Select } from '@headlessui/react';
import locationData from '../json/philippine_reg_prov_cit_brgy.json';



const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Add Patients', href: '/patients/create' },
];


const AddPatient: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    facility_name: '',
    facility_location: '',
    provider_name: '',
    //intake_date: '',
    registered_at: '', // Assuming this is the date of registration
    prefix_code: '', // Assuming this is a prefix code
    pat_lname: '',
    pat_mname: '',
    pat_fname: '',
    suffix_code: '', // Assuming this is a suffix code
    sex_code: '',
    pat_birthplace: '',
    pat_birthDate: '',
    civil_stat_code: '',
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
    mot_address: '', // Assuming this is the mother's address - Newly added - Ken
    mot_contact: '', // Assuming this is the mother's contact number - Newly added - Ken
    mot_deceased_status: '', // Assuming this is the mother's deceased status - Newly added - Ken
    fat_fname: '',
    fat_mname: '',
    fat_lname: '',
    fat_birthDate: '',
    fat_address: '', // Assuming this is the father's address - Newly added - Ken
    fat_contact: '', // Assuming this is the father's contact number - Newly added - Ken
    fat_deceased_status: '', // Assuming this is the father's deceased status - Newly added - Ken
  });

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [age, setAge] = useState<number | ''>('');

  useEffect(() => {
    setAge(calculateAge(data.pat_birthDate));
  }, [data.pat_birthDate]);
  

  // Utility function to calculate age
  function calculateAge(birthDate: string): number | '' {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  function getRegistration(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  useEffect(() => {
    if (!data.registered_at) {
      setData('registered_at', getRegistration());
    }
  }, []);
  
  // State for managing modal visibility
  const [isModalOpen, setModalOpen] = React.useState(false);

  // Open modal function
  const openModal = () => setModalOpen(true);

  // Close modal function
  const closeModal = () => setModalOpen(false);

  // Disable background scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Reset on unmount
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/patients');
  };

  React.useEffect(() => {
    // Automatically open the modal when the page loads
    openModal();
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Patients" />

      <form onSubmit={handleSubmit} className="w-full px-10 py-8 space-y-8">
        {/* Facility Info */}
        <h3 className="text-lg font-semibold">Patient Registration Form</h3>
        <hr></hr>
        <h3 className="text-lg font-semibold">Facility Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="facility_name">
              Facility Name <span className="text-red-600 font-bold">*</span>
            </Label>
            <Input
              id="facility_name"
              className="text-dark-500"
              value={data.facility_name}
              onChange={(e) => setData('facility_name', e.target.value)}
            />
            <InputError message={errors.facility_name} />
          </div>
          <div>
            <Label htmlFor="facility_location">
              Facility Location <span className="text-red-600 font-bold">*</span>
            </Label>
            <Input
              id="facility_location"
              className="text-dark-500"
              value={data.facility_location}
              onChange={(e) => setData('facility_location', e.target.value)}
            />
            <InputError message={errors.facility_location} />
          </div>
          <div>
            <Label htmlFor="provider_name">
              Name of Provider <span className="text-red-600 font-bold">*</span>
            </Label>
            <Input
              id="provider_name"
              className="text-dark-500"
              value={data.provider_name}
              onChange={(e) => setData('provider_name', e.target.value)}
            />
            <InputError message={errors.provider_name} />
          </div>
          <div>
            <Label htmlFor="registered_at">Date of Registration <span className="text-red-600 font-bold">*</span></Label>
            <Input
              id="registered_at"
              type="datetime-local"
              className="text-dark-500"
              value={data.registered_at}
              onChange={(e) => setData('registered_at', e.target.value)}
            />
            <InputError message={errors.registered_at} />
          </div>

        </div>

        {/* Patient Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Patient Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="prefix_code">
                Prefix <span className="text-red-600 font-bold">*</span>
              </Label>
                <Select
                  id="prefix_code"
                  value={data.prefix_code}
                  onChange={(e) => setData('prefix_code', e.target.value)}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500">
                  <option value="">Select Prefix</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                </Select>
              <InputError message={errors.prefix_code} /> {/* Newly added - Ken */}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="pat_lname">
                Last Name <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                id="pat_lname"
                className="text-dark-500"
                value={data.pat_lname}
                onChange={(e) => setData('pat_lname', e.target.value)}
              />
              <InputError message={errors.pat_lname} />
            </div>
            <div>
              <Label htmlFor="pat_fname">
                First Name <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                id="pat_fname"
                className="text-dark-500"
                value={data.pat_fname}
                onChange={(e) => setData('pat_fname', e.target.value)}
              />
              <InputError message={errors.pat_fname} />
            </div>
            <div>
              <Label htmlFor="pat_mname">
                Middle Name <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                id="pat_mname"
                className="text-dark-500"
                value={data.pat_mname}
                onChange={(e) => setData('pat_mname', e.target.value)}
              />
              <InputError message={errors.pat_mname} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="suffix_code">
                Suffix <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="suffix_code"
                value={data.suffix_code}
                onChange={(e) => setData('suffix_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Suffix</option>
                <option value="I">N/A</option>
                <option value="Jr">Jr</option>
                <option value="Sr">Sr</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </Select>
              <InputError message={errors.suffix_code} /> 
            </div>
            <div>
              <Label htmlFor="pat_birthDate">
                Birth Date <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input
                id="pat_birthDate"
                type="date"
                className="text-dark-500"
                value={data.pat_birthDate}
                onChange={(e) => setData('pat_birthDate', e.target.value)}
              />
              <InputError message={errors.pat_birthDate} />
            </div>

            <div>
              <Label htmlFor="age">
                Age <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input
                id="age"
                type="text"
                className="w-full border rounded p-2 bg-gray-100 text-dark-500"
                value={age !== '' ? age : ''}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="sex_code">
                Sex <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="sex_code"
                value={data.sex_code}
                onChange={(e) => setData('sex_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Sex</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
              <InputError message={errors.sex_code} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="civil_stat_code">
                Civil Status <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Select
                id="civil_stat_code"
                value={data.civil_stat_code}
                onChange={(e) => setData('civil_stat_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Civil Status</option>
                <option value="sin">Single</option>
                <option value="mar">Married</option>
                <option value="div">Divorced</option>
                <option value="sep">Separated</option>
                <option value="wid">Widow/Widower</option>
                <option value="na">N/A</option>
              </Select>
              <InputError message={errors.civil_stat_code} />
            </div>
            <div>
              <Label htmlFor="pat_mobile">Mobile</Label>
              <Input
                id="pat_mobile"
                className="text-dark-500"
                value={data.pat_mobile}
                onChange={(e) => setData('pat_mobile', e.target.value)}
              />
              <InputError message={errors.pat_mobile} />
            </div>
            <div>
              <Label htmlFor="pat_landline">Landline</Label>
              <Input
                id="pat_landline"
                className="text-dark-500"
                value={data.pat_landline}
                onChange={(e) => setData('pat_landline', e.target.value)}
              />
              <InputError message={errors.pat_landline} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="sm:col-span-2 lg:col-span-3">
                <Label htmlFor="patient_address">
                  No. Street <span className="text-red-600 font-bold">*</span> 
                </Label>
                <Input
                  id="patient_address"
                  className="text-dark-500"
                  value={data.patient_address}
                  onChange={(e) => setData('patient_address', e.target.value)}
                />
                <InputError message={errors.patient_address} />
            </div>
          </div>
        </div>

      {/* Location Codes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Region */}
        <div>
          <Label htmlFor="regcode">
            Region <span className="text-red-600 font-bold">*</span> 
          </Label>
          <Select
            id="regcode"
            value={selectedRegion}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedRegion(val);
              setSelectedProvince('');
              setSelectedCity('');
              setData('regcode', val);
              setData('provcode', '');
              setData('citycode', '');
              setData('bgycode', '');
            }}
            className="w-full border rounded p-2 text-dark-500"
          >
            <option value="">Select Region</option>
            {Object.entries(locationData).map(([code, info]) => (
              <option key={code} value={code}>
                {info.region_name}
              </option>
            ))}
          </Select>
          <InputError message={errors.regcode} />
        </div>

        {/* Province */}
        <div>
          <Label htmlFor="provcode">
            Province <span className="text-red-600 font-bold">*</span> 
          </Label>
          <Select
            id="provcode"
            value={selectedProvince}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedProvince(val);
              setSelectedCity('');
              setData('provcode', val);
              setData('citycode', '');
              setData('bgycode', '');
            }}
            className="w-full border rounded p-2 text-dark-500"
            disabled={!selectedRegion}
          >
            <option value="">Select Province</option>
            {selectedRegion &&
              Object.keys(locationData[selectedRegion].province_list).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
          </Select>
          <InputError message={errors.provcode} />
        </div>

        {/* City / Municipality */}
        <div>
          <Label htmlFor="citycode">
            City / Municipality <span className="text-red-600 font-bold">*</span> 
          </Label>
          <Select
            id="citycode"
            value={selectedCity}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCity(val);
              setData('citycode', val);
              setData('bgycode', '');
            }}
            className="w-full border rounded p-2 text-dark-500"
            disabled={!selectedProvince}
          >
            <option value="">Select City/Municipality</option>
            {selectedRegion &&
              selectedProvince &&
              locationData[selectedRegion].province_list[selectedProvince].municipality_list.map((muni, i) => {
                const city = Object.keys(muni)[0];
                return (
                  <option key={i} value={city}>
                    {city}
                  </option>
                );
              })}
          </Select>
          <InputError message={errors.citycode} />
        </div>

        {/* Barangay */}
        <div>
          <Label htmlFor="bgycode">
            Barangay <span className="text-red-600 font-bold">*</span> 
          </Label>
          <Select
            id="bgycode"
            value={data.bgycode}
            onChange={(e) => setData('bgycode', e.target.value)}
            className="w-full border rounded p-2 text-dark-500"
            disabled={!selectedCity}
          >
            <option value="">Select Barangay</option>
            {selectedRegion &&
              selectedProvince &&
              selectedCity &&
              locationData[selectedRegion].province_list[selectedProvince].municipality_list
                .find((m) => Object.keys(m)[0] === selectedCity)?.[selectedCity].barangay_list.map((brgy, i) => (
                  <option key={i} value={brgy}>
                    {brgy}
                  </option>
                ))}
          </Select>
          <InputError message={errors.bgycode} />
        </div>

            {/* Full Address */}
            <div className="col-span-4"> {/* Adjust col-span to match your grid layout if needed */}
              <Label htmlFor="fulladdress">Full Address</Label>
              <Input
                id="fulladdress"
                type="text"
                className="w-full border rounded p-2 bg-gray-100 text-dark-500"
                value={
                  [
                    data.patient_address,
                    data.bgycode,
                    selectedCity,
                    selectedProvince,
                    selectedRegion,
                  ]
                    .filter(Boolean)
                    .join(', ')
                }
                readOnly
              />
            </div>

      </div>
        <hr></hr>
        {/* Parent Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Parent Information</h3>
          <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="mot_fname">First Name</Label>
              <Input
                id="mot_fname"
                className="text-dark-500"
                value={data.mot_fname}
                onChange={(e) => setData('mot_fname', e.target.value)}
              />
              <InputError message={errors.mot_fname} />
            </div>
            <div>
              <Label htmlFor="mot_mname">Middle Name</Label>
              <Input
                id="mot_mname"
                className="text-dark-500"
                value={data.mot_mname}
                onChange={(e) => setData('mot_mname', e.target.value)}
              />
              <InputError message={errors.mot_mname} />
            </div>
            <div>
              <Label htmlFor="mot_lname">Last Name</Label>
              <Input
                id="mot_lname"
                className="text-dark-500"
                value={data.mot_lname}
                onChange={(e) => setData('mot_lname', e.target.value)}
              />
              <InputError message={errors.mot_lname} />
            </div>
            <div>
              <Label htmlFor="mot_birthDate">Birth Date</Label>
              <Input
                id="mot_birthDate"
                className="text-dark-500"
                type="date"
                value={data.mot_birthDate}
                onChange={(e) => setData('mot_birthDate', e.target.value)}
              />
              <InputError message={errors.mot_birthDate} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <Label htmlFor="mot_address">Address</Label>
              <Input
                id="mot_address"
                className="text-dark-500"
                value={data.mot_address}
                onChange={(e) => setData('mot_address', e.target.value)}
              />
              <InputError message={errors.mot_address} />
            </div>
            <div>
              <Label htmlFor="mot_contact">Contact Number</Label>
              <Input
                id="mot_contact"
                className="text-dark-500"
                value={data.mot_contact}
                onChange={(e) => setData('mot_contact', e.target.value)}
              />
              <InputError message={errors.mot_contact} />
            </div>
            <div>
              <Label htmlFor="mot_deceased_status">Deceased</Label>
              <Select
                id="mot_deceased_status"
                value={data.mot_deceased_status}
                onChange={(e) => setData('mot_deceased_status', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </Select>
              <InputError message={errors.mot_deceased_status} /> {/* Newly added - Ken */}
            </div>
          </div>
          <h5 className="text-sm font-semibold text-gray-500">Father's Name</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="fat_fname">First Name</Label>
              <Input
                id="fat_fname"
                className="text-dark-500"
                value={data.fat_fname}
                onChange={(e) => setData('fat_fname', e.target.value)}
              />
              <InputError message={errors.fat_fname} />
            </div>
            <div>
              <Label htmlFor="fat_mname">Middle Name</Label>
              <Input
                id="fat_mname"
                className="text-dark-500"
                value={data.fat_mname}
                onChange={(e) => setData('fat_mname', e.target.value)}
              />
              <InputError message={errors.fat_mname} />
            </div>
            <div>
              <Label htmlFor="fat_lname">Last Name</Label>
              <Input
                id="fat_lname"
                className="text-dark-500"
                value={data.fat_lname}
                onChange={(e) => setData('fat_lname', e.target.value)}
              />
              <InputError message={errors.fat_lname} />
            </div>
            <div>
              <Label htmlFor="fat_birthDate">Birth Date</Label>
              <Input
                id="fat_birthDate"
                className="text-dark-500"
                type="date"
                value={data.fat_birthDate}
                onChange={(e) => setData('fat_birthDate', e.target.value)}
              />
              <InputError message={errors.fat_birthDate} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <Label htmlFor="fat_address">Address</Label>
              <Input
                id="fat_address"
                className="text-dark-500"
                value={data.fat_address}
                onChange={(e) => setData('fat_address', e.target.value)}
              />
              <InputError message={errors.fat_address} />
            </div>
            <div>
              <Label htmlFor="fat_contact">Contact Number</Label>
              <Input
                id="fat_contact"
                className="text-dark-500"
                value={data.fat_contact}
                onChange={(e) => setData('fat_contact', e.target.value)}
              />
              <InputError message={errors.fat_contact} />
            </div>
            <div>
              <Label htmlFor="fat_deceased_status">Deceased</Label>
              <Select
              id="fat_deceased_status"
              value={data.fat_deceased_status}
              onChange={(e) => setData('fat_deceased_status', e.target.value)}
              className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </Select>
              <InputError message={errors.fat_deceased_status} />
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

      {/* The SearchPatientModal is controlled by state */}
      <SearchPatientModal open={isModalOpen} onClose={closeModal} />
    </AppLayout>
  );
};

export default AddPatient;
