import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Select } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import rawLocationData from '../json/philippine_reg_prov_cit_brgy.json';
import SearchPatientModal from './SearchPatientModal';


type LocationData = {
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

const locationData = rawLocationData as unknown as LocationData;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Add Patients', href: '/patients/create' },
];

interface PageProps {
    nextId: string;
    [key: string]: unknown;
}

export default function AddPatient() {
<<<<<<< HEAD
    const { nextId } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        master_patient_perm_id: nextId,
        facility_name: '',
        facility_location: '',
        provider_name: '',
        //intake_date: '',
        registered_at: '',
        prefix_code: '',
        pat_lname: '',
        pat_mname: '',
        pat_fname: '',
        suffix_code: '',
        sex_code: '',
        pat_birthplace: '',
        pat_birthDate: '',
        civil_stat_code: '',
        religion_code: '',
        nationality: '',
        educattainment: '',
        occupation_code: '',

        patient_address: '',
        regcode: '',
        provcode: '',
        citycode: '',
        bgycode: '',
        zipcode: '',
        country_code: '',
        pat_mobile: '',
        pat_landline: '',

        mot_fname: '',
        mot_mname: '',
        mot_lname: '',
        mot_birthDate: '',
        mot_address: '',
        mot_contact: '',
        mot_deceased_status: '',
        fat_fname: '',
        fat_mname: '',
        fat_lname: '',
        fat_birthDate: '',
        fat_address: '',
        fat_contact: '',
        fat_deceased_status: '',
    });

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [age, setAge] = useState({ years: '', months: '', days: '' });

    function getAgeBreakdown(birthDate: string) {
        if (!birthDate) return { years: '', months: '', days: '' };

        const birth = new Date(birthDate);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            years: years.toString(),
            months: months.toString(),
            days: days.toString(),
        };
=======
  const { nextId } = usePage<PageProps>().props;

  const { data, setData, post, processing, errors } = useForm({
    master_patient_perm_id: nextId,
    facility_name: '',
    facility_location: '',
    provider_name: '',
    registered_at: '', 
    prefix_code: '', 
    pat_lname: '',
    pat_mname: '',
    pat_fname: '',
    suffix_code: '', 
    sex_code: '',
    pat_birthplace: '',
    pat_birthDate: '',
    civil_stat_code: '',
    religion_code: '',
    nationality: '',
    educattainment: '',
    occupation_code: '',

    patient_address: '',
    regcode: '',
    provcode: '',
    citycode: '',
    bgycode: '',
    zipcode: '',
    country_code: '',
    pat_mobile: '',
    pat_landline: '',

    mot_fname: '',
    mot_mname: '',
    mot_lname: '',
    mot_birthDate: '',
    mot_address: '', 
    mot_contact: '',
    mot_deceased_status: '',
    fat_fname: '',
    fat_mname: '',
    fat_lname: '',
    fat_birthDate: '',
    fat_address: '', 
    fat_contact: '',
    fat_deceased_status: '', 
  });

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [age, setAge] = useState({ years: '', months: '', days: '' });

  function getAgeBreakdown(birthDate: string) {
    if (!birthDate) return { years: '', months: '', days: '' };
  
    const birth = new Date(birthDate);
    const today = new Date();
  
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
  
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
>>>>>>> f29d314262856412b55a823310db27ed2093de14
    }

    useEffect(() => {
        if (data.pat_birthDate) {
            setAge(getAgeBreakdown(data.pat_birthDate));
        } else {
            setAge({ years: '', months: '', days: '' });
        }
    }, [data.pat_birthDate]);

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
    }, [data.registered_at, setData]);

    const [isModalOpen, setModalOpen] = React.useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    React.useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    React.useEffect(() => {
        openModal();
    }, []);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/patients');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Patients" />

            <form onSubmit={handleSubmit} className="w-full space-y-8 px-10 py-8">
                {/* ----------------- Start of Patient Registration Form ----------------- */}

                <h2 className="text-lg font-semibold">PATIENT REGISTRATION FORM</h2>
                <hr></hr>
                <h3 className="text-lg font-semibold">Facility Information</h3>

                {/* ----------------- Start of Facility Information ----------------- */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <Label htmlFor="facility_name">
                            Facility Name <span className="font-bold text-red-600">*</span>
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
                            Facility Location <span className="font-bold text-red-600">*</span>
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
                            Name of Provider <span className="font-bold text-red-600">*</span>
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
                        <Label htmlFor="registered_at">
                            Date of Registration <span className="font-bold text-red-600">*</span>
                        </Label>
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
                {/* ----------------- End of Facility Information ----------------- */}

                <hr></hr>
                {/* ----------------- Start of Patient Information ----------------- */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Patient Information</h3>

                    {/* ----------------- Start of 1st Row ----------------- */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* ----------------- Start of Patient Record Number ----------------- */}
                        <div>
                            <Label>Patient Record No.</Label>
                            <Input
                                type="text"
                                value={data.master_patient_perm_id}
                                readOnly
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            />
                        </div>
                        {/* ----------------- End of Patient Record Number ----------------- */}

                        {/* ----------------- Profile Picture ----------------- */}
                        {/* <div>
              <Label htmlFor="pat_photo">
                Patient Photo <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                type="file"
                id="pat_photo"
                accept="image/*"
                capture="environment"
                className="text-dark-500"
              />
            </div> */}
                        {/* ----------------- End of Patient Record Number ----------------- */}

                        {/* ----------------- Start of Prefix ----------------- */}
                        <div>
                            <Label htmlFor="prefix_code">
                                Prefix <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="prefix_code"
                                value={data.prefix_code}
                                onChange={(e) => setData('prefix_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Prefix</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Dr">Dr</option>
                            </Select>
                            <InputError message={errors.prefix_code} />
                        </div>
                        {/* ----------------- End of Prefix ----------------- */}
                    </div>
                    {/* ----------------- End of 1st Row ----------------- */}

                    {/* ----------------- Start of 2nd Row ----------------- */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* ----------------- Start of Last Name ----------------- */}
                        <div>
                            <Label htmlFor="pat_lname">
                                Last Name <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="pat_lname"
                                className="text-dark-500"
                                value={data.pat_lname}
                                onChange={(e) => setData('pat_lname', e.target.value)}
                            />
                            <InputError message={errors.pat_lname} />
                        </div>
                        {/* ----------------- End of Last Name ----------------- */}

                        {/* ----------------- Start of First Name ----------------- */}
                        <div>
                            <Label htmlFor="pat_fname">
                                First Name <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="pat_fname"
                                className="text-dark-500"
                                value={data.pat_fname}
                                onChange={(e) => setData('pat_fname', e.target.value)}
                            />
                            <InputError message={errors.pat_fname} />
                        </div>
                        {/* ----------------- End of First Name ----------------- */}

                        {/* ----------------- Start of Middle Name ----------------- */}
                        <div>
                            <Label htmlFor="pat_mname">
                                Middle Name <span className="font-bold text-red-600">*</span>
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
                    {/* ----------------- End of 2nd Row ----------------- */}

                    {/* ----------------- Start of 3rd Row ----------------- */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* ----------------- Start of Suffix ----------------- */}
                        <div>
                            <Label htmlFor="suffix_code">
                                Suffix <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="suffix_code"
                                value={data.suffix_code}
                                onChange={(e) => setData('suffix_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Suffix</option>
                                <option value="NA">N/A</option>
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
                        {/* ----------------- End of Suffix ----------------- */}

                        {/* ----------------- Start of Birth Date ----------------- */}
                        <div>
                            <Label htmlFor="pat_birthDate">
                                Birth Date <span className="font-bold text-red-600">*</span>
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
                        {/* ----------------- End of Birth Date ----------------- */}

                        {/* ----------------- Start of Age ----------------- */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Year:</Label>
                                <Input
                                    type="text"
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                    value={age.years}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label>Month:</Label>
                                <Input
                                    type="text"
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                    value={age.months}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label>Day:</Label>
                                <Input
                                    type="text"
                                    className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                    value={age.days}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* ----------------- End of Age ----------------- */}

                        {/* ----------------- Start of Sex ----------------- */}
                        <div>
                            <Label htmlFor="sex_code">
                                Sex <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="sex_code"
                                value={data.sex_code}
                                onChange={(e) => setData('sex_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Sex</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Select>
                            <InputError message={errors.sex_code} />
                        </div>
                        {/* ----------------- End of Sex ----------------- */}

                        {/* ----------------- Start of Civil Status ----------------- */}
                        <div>
                            <Label htmlFor="civil_stat_code">
                                Civil Status <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="civil_stat_code"
                                value={data.civil_stat_code}
                                onChange={(e) => setData('civil_stat_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                        {/* ----------------- End of Civil Status ----------------- */}

                        {/* ----------------- Start of Birth Place ----------------- */}
                        <div>
                            <Label htmlFor="pat_birthplace">
                                Birth Place <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="pat_birthplace"
                                className="text-dark-500"
                                value={data.pat_birthplace}
                                onChange={(e) => setData('pat_birthplace', e.target.value)}
                            />
                            <InputError message={errors.pat_birthplace} />
                        </div>
                        {/* ----------------- End of Birth Place ----------------- */}

                        {/* ----------------- Start of Religion ----------------- */}
                        <div>
                            <Label htmlFor="religion_code">
                                Religion <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="religion_code"
                                value={data.religion_code}
                                onChange={(e) => setData('religion_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Religion</option>
                                <option value="Chri">Christian</option>
                                <option value="Cat">Catholic</option>
                                <option value="Prot">Protestant</option>
                                <option value="Isla">Islam</option>
                                <option value="Bud">Buddhism</option>
                                <option value="Hind">Hinduism</option>
                                <option value="Other">Other</option>
                            </Select>
                            <InputError message={errors.religion_code} />
                        </div>
                        {/* ----------------- End of Religion ----------------- */}

                        {/* ----------------- Start of Nationality ----------------- */}
                        <div>
                            <Label htmlFor="nationality">
                                Nationality <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="nationality"
                                value={data.nationality}
                                onChange={(e) => setData('nationality', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Nationality</option>
                                <option value="PH">Filipino</option>
                                <option value="US">American</option>
                                <option value="Oth">Others</option>
                            </Select>
                            <InputError message={errors.nationality} />
                        </div>
                        {/* ----------------- End of Nationality ----------------- */}

                        {/* ----------------- Start of Educational Attainment ----------------- */}
                        <div>
                            <Label htmlFor="educattainment">
                                Educational Attainment <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="educattainment"
                                value={data.educattainment}
                                onChange={(e) => setData('educattainment', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select</option>
                                <option value="01">No Schooling</option>
                                <option value="02">Elementary</option>
                                <option value="03">High School</option>
                                <option value="04">College</option>
                                <option value="05">Graduate</option>
                            </Select>
                            <InputError message={errors.educattainment} />
                        </div>
                        {/* ----------------- End of Educational Attainment ----------------- */}

                        {/* ----------------- Start of Occupation ----------------- */}
                        <div>
                            <Label htmlFor="occupation_code">
                                Occupation <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="occupation_code"
                                className="text-dark-500"
                                value={data.occupation_code}
                                onChange={(e) => setData('occupation_code', e.target.value)}
                            />
                            <InputError message={errors.occupation_code} />
                        </div>
                        {/* ----------------- End of Occupation ----------------- */}

                        {/* ----------------- Start of Contact Number ----------------- */}
                        <div>
                            <Label htmlFor="pat_mobile">
                                Contact Number <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="pat_mobile"
                                className="text-dark-500"
                                value={data.pat_mobile}
                                onChange={(e) => setData('pat_mobile', e.target.value)}
                            />
                            <InputError message={errors.pat_mobile} />
                        </div>
                        {/* ----------------- End of Contact Number ----------------- */}

                        {/* ----------------- Start of Landline ----------------- */}
                        <div>
                            <Label htmlFor="pat_landline">
                                Landline <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="pat_landline"
                                className="text-dark-500"
                                value={data.pat_landline}
                                onChange={(e) => setData('pat_landline', e.target.value)}
                            />
                            <InputError message={errors.pat_landline} />
                        </div>
                        {/* ----------------- End of Landline ----------------- */}
                    </div>
                    {/* ----------------- End of 3rd Row ----------------- */}
                    <hr></hr>
                    {/* ----------------- Start of 4th Row ----------------- */}

                    {/* ----------------- Start of Demographic Information ----------------- */}
                    <h3 className="text-lg font-semibold">Demographic Information</h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* ----------------- Start of Address ----------------- */}
                        <div className="col-span-4">
                            <Label htmlFor="patient_address">
                                House # / Lot # / Street Name / Building / Purok # / Village Name <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input
                                id="patient_address"
                                className="text-dark-500"
                                value={data.patient_address}
                                onChange={(e) => setData('patient_address', e.target.value)}
                            />
                            <InputError message={errors.patient_address} />
                        </div>
                        {/* ----------------- End of Address ----------------- */}

                        {/* ----------------- Start of Region ----------------- */}
                        <div>
                            <Label htmlFor="regcode">
                                Region <span className="font-bold text-red-600">*</span>
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
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Region</option>
                                {Object.entries(locationData).map(([code, info]) => {
                                    const regionName = regionLookup[code] || info.region_name;
                                    return (
                                        <option key={code} value={code}>
                                            Region {code} - {regionName}
                                        </option>
                                    );
                                })}
                            </Select>
                            <InputError message={errors.regcode} />
                        </div>
                        {/* ----------------- End of Region ----------------- */}

                        {/* ----------------- Start of Province ----------------- */}
                        <div>
                            <Label htmlFor="provcode">
                                Province <span className="font-bold text-red-600">*</span>
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
                                className={`text-dark-500 w-full rounded border p-2 ${!selectedRegion ? 'cursor-not-allowed opacity-50' : ''}`}
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
                        {/* ----------------- End of Province ----------------- */}

                        {/* ----------------- Start of City / Municipality ----------------- */}
                        <div>
                            <Label htmlFor="citycode">
                                City / Municipality <span className="font-bold text-red-600">*</span>
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
                                className={`text-dark-500 w-full rounded border p-2 ${!selectedProvince ? 'cursor-not-allowed opacity-50' : ''}`}
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
                        {/* ----------------- End of City / Municipality ----------------- */}

                        {/* ----------------- Start of Barangay ----------------- */}
                        <div>
                            <Label htmlFor="bgycode">
                                Barangay <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="bgycode"
                                value={data.bgycode}
                                onChange={(e) => setData('bgycode', e.target.value)}
                                className={`text-dark-500 w-full rounded border p-2 ${!selectedCity ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <option value="">Select Barangay</option>
                                {selectedRegion &&
                                    selectedProvince &&
                                    selectedCity &&
                                    locationData[selectedRegion].province_list[selectedProvince].municipality_list
                                        .find((m) => Object.keys(m)[0] === selectedCity)
                                        ?.[selectedCity].barangay_list.map((brgy, i) => (
                                            <option key={i} value={brgy}>
                                                {brgy}
                                            </option>
                                        ))}
                            </Select>
                            <InputError message={errors.bgycode} />
                        </div>
                        {/* ----------------- End of Barangay ----------------- */}

                        {/* ----------------- Start of Zip Code ----------------- */}
                        <div>
                            <Label htmlFor="zipcode">
                                Zip Code <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input id="zipcode" className="text-dark-500" value={data.zipcode} onChange={(e) => setData('zipcode', e.target.value)} />
                            <InputError message={errors.zipcode} />
                        </div>
                        {/* ----------------- End of Zip Code ----------------- */}

                        {/* ----------------- Start of Country Code ----------------- */}
                        <div>
                            <Label htmlFor="country_code">
                                Country Code <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Select
                                id="country_code"
                                value={data.country_code}
                                onChange={(e) => setData('country_code', e.target.value)}
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select Country</option>
                                <option value="PH">Philippines</option>
                            </Select>
                            <InputError message={errors.country_code} />
                        </div>
                        {/* ----------------- End of Country Code ----------------- */}

                        {/* ----------------- Start of Full Address ----------------- */}
                        <div className="col-span-4">
                            {' '}
                            {/* Adjust col-span to match your grid layout if needed */}
                            <Label htmlFor="fulladdress">Full Address</Label>
                            <Input
                                id="fulladdress"
                                type="text"
                                className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                value={[
                                    data.patient_address,
                                    data.bgycode,
                                    selectedCity,
                                    selectedProvince,
                                    selectedRegion,
                                    regionLookup[data.regcode] || '',
                                    data.zipcode,
                                    data.country_code === 'PH' ? 'Philippines' : '', // Country
                                ]
                                    .filter(Boolean)
                                    .join(', ')}
                                readOnly
                            />
                        </div>
                        {/* ----------------- End of Full Address ----------------- */}
                    </div>
                    {/* ----------------- End of Demographic Information ----------------- */}
                    <hr></hr>
                    {/* ----------------- Start of Parent's Information ----------------- */}
                    <h3 className="text-lg font-semibold">Parent's Information</h3>

                    {/* ----------------- Start of Mother's Information ----------------- */}
                    <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </Select>
                            <InputError message={errors.mot_deceased_status} />
                        </div>
                    </div>
                    {/* ----------------- Start of Mother's Information ----------------- */}

                    {/* ----------------- Start of Father's Information ----------------- */}
                    <h5 className="text-sm font-semibold text-gray-500">Father's Name</h5>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                            >
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </Select>
                            <InputError message={errors.fat_deceased_status} />
                        </div>
                    </div>
                    {/* ----------------- End of Parent's Information ----------------- */}
                </div>
                {/* ----------------- End of Patient Information ----------------- */}
                {/* ----------------- End of Patient Registration Form ----------------- */}

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
}
