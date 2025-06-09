import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Select } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil, UserPlus } from 'lucide-react';
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

interface Facility {
    fhudcode: string;
    facility_name: string;
    facility_address: string;
    provider_name: string;
}

interface PageProps {
    nextId: string;
    facilities: Facility[];
    [key: string]: unknown;
}

export default function AddPatient() {
    const { nextId, facilities } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        master_patient_perm_id: nextId,
        fhudcode: '',
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
        bloodtype_code: '',

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
        mot_birthdate: '',
        mot_address: '',
        mot_contact: '',
        mot_deceased_status: '',
        fat_fname: '',
        fat_mname: '',
        fat_lname: '',
        fat_birthdate: '',
        fat_address: '',
        fat_contact: '',
        fat_deceased_status: '',
        trackno: '',

        phic_member: 'N',
        pat_philhealth: '',
        type_of_membership: '',
        philhealth_status_code: '',
        pDependentType_code: '',
        pMemberLname: '',
        pMemberFname: '',
        pMemberMname: '',
        pMemberSuffix: '',
        pMemberBdate: '',
        pMemberSex: '',
    });

    useEffect(() => {
        if (facilities && facilities.length > 0) {
            setData('fhudcode', facilities[0].fhudcode);
            setData('facility_name', facilities[0].facility_name);
            setData('facility_location', facilities[0].facility_address);
            setData('provider_name', facilities[0].provider_name);
        }
    }, [facilities, setData]);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [age, setAge] = useState({ years: '', months: '', days: '' });
    const isEnabled = data.philhealth_status_code === 'D' && data.phic_member === 'Y';

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
            <Head title="Add Patient" />

            <form onSubmit={handleSubmit} className="w-full space-y-8 px-10 py-8">
                {/* ----------------- Start of Patient Registration Form ----------------- */}

                <div className="mb-6 flex flex-col items-start justify-between gap-4 pb-4 md:flex-row">
                    <h2 className="text-xl font-bold tracking-tight text-gray-800">PATIENT REGISTRATION FORM</h2>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Save Patient
                        </Button>
                        <Link
                            href="/patients"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Back to Patient List
                        </Link>
                    </div>
                </div>
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
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            value={data.facility_name}
                            onChange={(e) => setData('facility_name', e.target.value)}
                            readOnly
                        />
                        <InputError message={errors.facility_name} />
                    </div>
                    <div>
                        <Label htmlFor="facility_location">
                            Facility Location <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="facility_location"
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            value={data.facility_location}
                            onChange={(e) => setData('facility_location', e.target.value)}
                            readOnly
                        />
                        <InputError message={errors.facility_location} />
                    </div>
                    <div>
                        <Label htmlFor="provider_name">
                            Name of Provider <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="provider_name"
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            value={data.provider_name}
                            onChange={(e) => setData('provider_name', e.target.value)}
                            readOnly
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
                    <div className="hidden">
                        <Label htmlFor="fhudcode">
                            FHUD Code <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            id="fhudcode"
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            value={data.fhudcode}
                            onChange={(e) => setData('fhudcode', e.target.value)}
                            readOnly
                        />
                        <InputError message={errors.fhudcode} />
                    </div>
                </div>
                {/* ----------------- End of Facility Information ----------------- */}

                <hr></hr>

                <h3 className="text-lg font-semibold">Patient Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <Pencil className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md font-semibold">Personal Information</h2>
                            </div>
                            <hr />

                            {/* Patient Record No. */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Patient Record No. : </label>
                                    <Input
                                        type="text"
                                        value={data.master_patient_perm_id}
                                        readOnly
                                        className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                    />
                                </div>
                            </div>

                            {/* Prefix */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Prefix: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Select
                                        id="prefix_code"
                                        value={data.prefix_code}
                                        onChange={(e) => setData('prefix_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Prefix --</option>
                                        <option value="Mr">MR</option>
                                        <option value="Ms">MS</option>
                                        <option value="Mrs">MRS</option>
                                        <option value="Dr">DR</option>
                                        <option value="NA">NOT APPLICABLE</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.prefix_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Last Name: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        id="pat_lname"
                                        className="text-dark-500"
                                        value={data.pat_lname}
                                        onChange={(e) => setData('pat_lname', e.target.value)}
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_lname} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* First Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        First Name: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        id="pat_fname"
                                        className="text-dark-500"
                                        value={data.pat_fname}
                                        onChange={(e) => setData('pat_fname', e.target.value)}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_fname} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Middle Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <small className="text-[10px] text-red-600">Note: If no MIDDLE NAME, put N/A</small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Middle Name: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        id="pat_mname"
                                        className="text-dark-500"
                                        value={data.pat_mname}
                                        onChange={(e) => setData('pat_mname', e.target.value)}
                                        placeholder="Middle Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_mname} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Maiden Middle Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <small className="text-[10px] text-red-600">Note: Only for married woman</small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Maiden Middle Name: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        // id="pat_mname"
                                        className="text-dark-500"
                                        // value={data.pat_mname}
                                        // onChange={(e) => setData('pat_mname', e.target.value)}
                                        placeholder="Maiden Middle Name"
                                        disabled={!(data.prefix_code === 'Mrs' || data.prefix_code === 'Dr')}
                                    />
                                </div>
                            </div>

                            {/* Maiden Last Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Maiden Last Name: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        // id="pat_mname"
                                        className="text-dark-500"
                                        // value={data.pat_mname}
                                        // onChange={(e) => setData('pat_mname', e.target.value)}
                                        placeholder="Maiden Middle Name"
                                        disabled={!(data.prefix_code === 'Mrs' || data.prefix_code === 'Dr')}
                                    />
                                </div>
                            </div>

                            {/* Suffix */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Suffix: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Select
                                        id="suffix_code"
                                        value={data.suffix_code}
                                        onChange={(e) => setData('suffix_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Suffix --</option>
                                        <option value="NA">N/A</option>
                                        <option value="Jr">Jr</option>
                                        <option value="Sr">Sr</option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.suffix_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Sex */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Sex: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Select
                                        id="sex_code"
                                        value={data.sex_code}
                                        onChange={(e) => setData('sex_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Sex --</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.sex_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Birthdate */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Birth Date: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <Input
                                        id="pat_birthDate"
                                        type="date"
                                        className="text-dark-500"
                                        value={data.pat_birthDate}
                                        onChange={(e) => setData('pat_birthDate', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_birthDate} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Age */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Age: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label>Year: </Label>
                                            <Input
                                                type="text"
                                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                                value={age.years}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>Month: </Label>
                                            <Input
                                                type="text"
                                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                                value={age.months}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>Day: </Label>
                                            <Input
                                                type="text"
                                                className="text-dark-500 w-full rounded border bg-gray-100 p-2 text-center font-bold"
                                                value={age.days}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* End of Code */}
                        </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <Pencil className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md font-semibold">Other Personal Information</h2>
                            </div>
                            <hr />

                            {/* Birth Place */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Birth Place: </label>
                                    <Input
                                        id="pat_birthplace"
                                        className="text-dark-500"
                                        value={data.pat_birthplace}
                                        onChange={(e) => setData('pat_birthplace', e.target.value)}
                                        placeholder="Birth Place"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_birthplace} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Civil Status */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Civil Status: </label>
                                    <Select
                                        id="civil_stat_code"
                                        value={data.civil_stat_code}
                                        onChange={(e) => setData('civil_stat_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Civil Status --</option>
                                        <option value="sin">Single</option>
                                        <option value="mar">Married</option>
                                        <option value="div">Divorced</option>
                                        <option value="sep">Separated</option>
                                        <option value="wid">Widow/Widower</option>
                                        <option value="na">N/A</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.civil_stat_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Educational Attainment */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Educational Attainment: </label>
                                    <Select
                                        id="educattainment"
                                        value={data.educattainment}
                                        onChange={(e) => setData('educattainment', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Educational Attainment --</option>
                                        <option value="01">Advance Learning System</option>
                                        <option value="02">College</option>
                                        <option value="03">College Student</option>
                                        <option value="04">College Undergrad</option>
                                        <option value="05">Elem Student</option>
                                        <option value="06">Elem Undergrad</option>
                                        <option value="07">Elementary Education</option>
                                        <option value="08">High School Education</option>
                                        <option value="09">HS Student</option>
                                        <option value="10">HS Undergrad</option>
                                        <option value="11">No Formal Education</option>
                                        <option value="12">Not Applicable</option>
                                        <option value="13">Postgraduate Program</option>
                                        <option value="14">Pre-School</option>
                                        <option value="15">Senior HS</option>
                                        <option value="16">Vocational</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.educattainment} className="text-[10px] text-red-600" />
                                </div>
                            </div>
                            {/* End of Educational Attainment */}

                            {/* Start of Employment Status */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Employment Status: </label>
                                    <Select
                                        // id="educattainment"
                                        // value={data.educattainment}
                                        // onChange={(e) => setData('educattainment', e.target.value)}
                                        disabled={true}
                                        className="block w-full rounded-md border px-3 py-2 text-sm text-gray-500 shadow-sm disabled:bg-gray-100"
                                    >
                                        <option value="">-- Select Employment --</option>
                                        <option value="01">Employed</option>
                                        <option value="02">None/Unemployed</option>
                                        <option value="03">Retired</option>
                                        <option value="04">Student</option>
                                        <option value="05">Unknown</option>
                                    </Select>
                                </div>
                            </div>

                            {/* Religion */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="religion_code" className="w-40 text-sm font-medium text-gray-700">
                                        Religion:
                                    </Label>
                                    <Select
                                        id="religion_code"
                                        value={data.religion_code}
                                        onChange={(e) => setData('religion_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Religion --</option>
                                        <option value="Chri">Christian</option>
                                        <option value="Cat">Catholic</option>
                                        <option value="Prot">Protestant</option>
                                        <option value="Isla">Islam</option>
                                        <option value="Bud">Buddhism</option>
                                        <option value="Hind">Hinduism</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.religion_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Nationality */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="nationality" className="w-40 text-sm font-medium text-gray-700">
                                        Nationality:
                                    </Label>
                                    <Select
                                        id="nationality"
                                        value={data.nationality}
                                        onChange={(e) => setData('nationality', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select Nationality --</option>
                                        <option value="PH">Filipino</option>
                                        <option value="US">American</option>
                                        <option value="Oth">Others</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.nationality} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Indigenous */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="indigenous" className="w-33 text-sm font-medium text-gray-700">
                                        Indigenous:
                                    </Label>

                                    <label className="flex items-center gap-1 text-sm text-gray-700">
                                        <input type="radio" name="indigenous" value="No" className="accent-blue-600" disabled />
                                        No
                                    </label>
                                    <label className="flex items-center gap-1 text-sm text-gray-700">
                                        <input type="radio" name="indigenous" value="Yes" className="accent-blue-600" disabled />
                                        Yes
                                    </label>
                                </div>
                            </div>

                            {/* Ethnic Group */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="ethnic" className="w-40 text-sm font-medium text-gray-700">
                                        Ethnic Group: <span className="text-bold text-red-600">*</span>
                                    </Label>
                                    <Select
                                        // id="nationality"
                                        // value={data.nationality}
                                        // onChange={(e) => setData('nationality', e.target.value)}
                                        disabled={true} // or based on some state, e.g. disabled={isReadOnly}
                                        className="block w-full rounded-md border px-3 py-2 text-sm text-gray-500 shadow-sm disabled:bg-gray-100"
                                    >
                                        <option value="">-- Select Ethnic Group --</option>
                                        <option value="">No Data</option>
                                    </Select>
                                </div>
                            </div>

                            {/* Occupation */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="occupation_code" className="w-40 text-sm font-medium text-gray-700">
                                        Occupation:
                                    </Label>
                                    <Input
                                        id="occupation_code"
                                        className="text-dark-500"
                                        value={data.occupation_code}
                                        onChange={(e) => setData('occupation_code', e.target.value)}
                                        placeholder="Occupation"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.occupation_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Blood Type */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="bloodtype_code" className="w-40 text-sm font-medium text-gray-700">
                                        Blood Type:
                                    </Label>
                                    <Select
                                        id="bloodtype_code"
                                        value={data.bloodtype_code}
                                        onChange={(e) => setData('bloodtype_code', e.target.value)}
                                        // disabled={true} // or based on some state, e.g. disabled={isReadOnly}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm disabled:bg-gray-100"
                                    >
                                        <option value="">-- Select Blood Type --</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </Select>
                                </div>
                            </div>

                            {/* End of Code */}
                        </div>
                    </div>
                </div>

                {/* Address and Contact Info */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <Pencil className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md font-semibold">Address and Contact Info</h2>
                            </div>
                            <hr />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-4">
                                {/* House # / Lot # / Street Name / Building / Purok # / Village Name */}
                                <div className="col-span-4">
                                    <Label htmlFor="patient_address">
                                        House # / Lot # / Street Name / Building / Purok # / Village Name
                                        <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="patient_address"
                                        className="text-dark-500 text-xs"
                                        value={data.patient_address}
                                        onChange={(e) => setData('patient_address', e.target.value)}
                                        placeholder="House # / Lot # / Street Name / Building / Purok # / Village Name"
                                    />
                                    <InputError message={errors.patient_address} className="text-[10px] text-red-600" />
                                </div>

                                {/* Region */}
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
                                        className="text-dark-500 w-full rounded border p-2 text-sm"
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
                                    <InputError message={errors.regcode} className="text-[10px] text-red-600" />
                                </div>

                                {/* Province */}
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
                                        className={`text-dark-500 w-full rounded border p-2 text-sm ${!selectedRegion ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        <option value="">-- Select Province --</option>
                                        {selectedRegion &&
                                            Object.keys(locationData[selectedRegion].province_list).map((prov) => (
                                                <option key={prov} value={prov}>
                                                    {prov}
                                                </option>
                                            ))}
                                    </Select>
                                    <InputError message={errors.provcode} className="text-[10px] text-red-600" />
                                </div>

                                {/* City/Municipality */}
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
                                        className={`text-dark-500 w-full rounded border p-2 text-sm ${!selectedProvince ? 'cursor-not-allowed opacity-50' : ''}`}
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
                                    <InputError message={errors.citycode} className="text-[10px] text-red-600" />
                                </div>

                                {/* Barangay */}
                                <div>
                                    <Label htmlFor="bgycode">
                                        Barangay <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Select
                                        id="bgycode"
                                        value={data.bgycode}
                                        onChange={(e) => setData('bgycode', e.target.value)}
                                        className={`text-dark-500 w-full rounded border p-2 text-sm ${!selectedCity ? 'cursor-not-allowed opacity-50' : ''}`}
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
                                    <InputError message={errors.bgycode} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Next Row */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                <div className="space-y-3">
                                    {/* Zip Code */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="zipcode" className="w-40 text-sm font-medium text-gray-700">
                                                Zip Code: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="zipcode"
                                                className="text-dark-500"
                                                value={data.zipcode}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 4) {
                                                        setData('zipcode', value);
                                                    }
                                                }}
                                                placeholder="Zip Code"
                                                maxLength={4}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.zipcode} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="country_code" className="w-40 text-sm font-medium text-gray-700">
                                                Country: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Select
                                                id="country_code"
                                                value={data.country_code}
                                                onChange={(e) => setData('country_code', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                            >
                                                <option value="">-- Select Country --</option>
                                                <option value="PH">Philippines</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.country_code} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {/* Email */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="zipcode" className="w-40 text-sm font-medium text-gray-700">
                                                Email: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                // id="zipcode"
                                                className="text-dark-500"
                                                // value={data.zipcode}
                                                // onChange={(e) => setData('zipcode', e.target.value)}
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Number or Mobile */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="pat_mobile" className="w-40 text-sm font-medium text-gray-700">
                                                Mobile <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_mobile"
                                                className="text-dark-500"
                                                value={data.pat_mobile}
                                                onChange={(e) => setData('pat_mobile', e.target.value)}
                                                placeholder="Mobile"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.pat_mobile} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Landline */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="pat_landline" className="w-40 text-sm font-medium text-gray-700">
                                                Landline <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_landline"
                                                className="text-dark-500"
                                                value={data.pat_landline}
                                                onChange={(e) => setData('pat_landline', e.target.value)}
                                                placeholder="Landline"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.pat_landline} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient's Full Address */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="col-span-4">
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Parent's Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <UserPlus className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md font-semibold">Parents' Information</h2>
                            </div>
                            <hr />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                {/* Mother's Info */}
                                <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>

                                    {/* Mother's First Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_fname" className="w-40 text-sm font-medium text-gray-700">
                                                First Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_fname"
                                                className="text-dark-500"
                                                value={data.mot_fname}
                                                onChange={(e) => setData('mot_fname', e.target.value)}
                                                placeholder="Mother's First Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_fname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Middle Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_mname" className="w-40 text-sm font-medium text-gray-700">
                                                Middle Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_mname"
                                                className="text-dark-500"
                                                value={data.mot_mname}
                                                onChange={(e) => setData('mot_mname', e.target.value)}
                                                placeholder="Mother's Middle Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_mname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Last Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_lname" className="w-40 text-sm font-medium text-gray-700">
                                                Last Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_lname"
                                                className="text-dark-500"
                                                value={data.mot_lname}
                                                onChange={(e) => setData('mot_lname', e.target.value)}
                                                placeholder="Mother's Last Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_lname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Birth Date */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                                Birth Date <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_birthdate"
                                                className="text-dark-500"
                                                type="date"
                                                value={data.mot_birthdate}
                                                onChange={(e) => setData('mot_birthdate', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_birthdate} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Address */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_address" className="w-40 text-sm font-medium text-gray-700">
                                                Address <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_address"
                                                className="text-dark-500"
                                                value={data.mot_address}
                                                onChange={(e) => setData('mot_address', e.target.value)}
                                                placeholder="Mother's Address"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_address} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Contact Number */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_contact" className="w-40 text-sm font-medium text-gray-700">
                                                Contact Number: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="mot_contact"
                                                className="text-dark-500"
                                                value={data.mot_contact}
                                                onChange={(e) => setData('mot_contact', e.target.value)}
                                                placeholder="Mother's Contact Number"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_contact} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Mother's Status */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="mot_deceased_status" className="w-40 text-sm font-medium text-gray-700">
                                                Deceased: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Select
                                                id="mot_deceased_status"
                                                value={data.mot_deceased_status}
                                                onChange={(e) => setData('mot_deceased_status', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                            >
                                                <option value="">-- Select Status --</option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.mot_deceased_status} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>
                                </div>

                                {/* Father's Info */}
                                <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-gray-500">Father's Name</h5>

                                    {/* Father's First Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_fname" className="w-40 text-sm font-medium text-gray-700">
                                                First Name: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_fname"
                                                className="text-dark-500"
                                                value={data.fat_fname}
                                                onChange={(e) => setData('fat_fname', e.target.value)}
                                                placeholder="Father's First Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_fname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Middle Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_mname" className="w-40 text-sm font-medium text-gray-700">
                                                Middle Name: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_mname"
                                                className="text-dark-500"
                                                value={data.fat_mname}
                                                onChange={(e) => setData('fat_mname', e.target.value)}
                                                placeholder="Father's Middle Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_mname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Last Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_lname" className="w-40 text-sm font-medium text-gray-700">
                                                Last Name: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_lname"
                                                className="text-dark-500"
                                                value={data.fat_lname}
                                                onChange={(e) => setData('fat_lname', e.target.value)}
                                                placeholder="Father's Last Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_lname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Birthdate */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                                Birth Date: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_birthdate"
                                                className="text-dark-500"
                                                type="date"
                                                value={data.fat_birthdate}
                                                onChange={(e) => setData('fat_birthdate', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_birthdate} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Address */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_address" className="w-40 text-sm font-medium text-gray-700">
                                                Address: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_address"
                                                className="text-dark-500"
                                                value={data.fat_address}
                                                onChange={(e) => setData('fat_address', e.target.value)}
                                                placeholder="Father's Address"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_address} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Contact Number */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_contact" className="w-40 text-sm font-medium text-gray-700">
                                                Contact Number: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="fat_contact"
                                                className="text-dark-500"
                                                value={data.fat_contact}
                                                onChange={(e) => setData('fat_contact', e.target.value)}
                                                placeholder="Contact Number"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_contact} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Father's Status */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_contact" className="w-40 text-sm font-medium text-gray-700">
                                                Deceased: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Select
                                                id="fat_deceased_status"
                                                value={data.fat_deceased_status}
                                                onChange={(e) => setData('fat_deceased_status', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                            >
                                                <option value="">-- Select Status --</option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.fat_contact} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* End of Code */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardian's Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <UserPlus className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md w-50 font-semibold">Guardian's Information</h2>
                                <small className="text-red-600 italic">Note: Guardian must be alive</small>
                            </div>
                            <hr />

                            {/* Guardian's First Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_fname" className="w-40 text-sm font-medium text-gray-700">
                                        First Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        // id="mot_fname"
                                        className="text-dark-500"
                                        // value={data.mot_fname}
                                        // onChange={(e) => setData('mot_fname', e.target.value)}
                                        placeholder="Guardian's First Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {/* <InputError message={errors.mot_fname} className="text-[10px] text-red-600" /> */}
                                </div>
                            </div>

                            {/* Guardian's Middle Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_fname" className="w-40 text-sm font-medium text-gray-700">
                                        Middle Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        // id="mot_fname"
                                        className="text-dark-500"
                                        // value={data.mot_fname}
                                        // onChange={(e) => setData('mot_fname', e.target.value)}
                                        placeholder="Guardian's Middle Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {/* <InputError message={errors.mot_fname} className="text-[10px] text-red-600" /> */}
                                </div>
                            </div>

                            {/* Guardian's Last Name */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="mot_fname" className="w-40 text-sm font-medium text-gray-700">
                                        Last Name <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        // id="mot_fname"
                                        className="text-dark-500"
                                        // value={data.mot_fname}
                                        // onChange={(e) => setData('mot_fname', e.target.value)}
                                        placeholder="Guardian's Last Name"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    {/* <InputError message={errors.mot_fname} className="text-[10px] text-red-600" /> */}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
                                <div className="col-span-1">
                                    {/* Guardian's Birthdate */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_birthdate" className="w-62 text-sm font-medium text-gray-700">
                                                Birth Date: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                // id="fat_birthdate"
                                                className="text-dark-500"
                                                type="date"
                                                // value={data.fat_birthdate}
                                                // onChange={(e) => setData('fat_birthdate', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            {/* <InputError message={errors.fat_birthdate} className="text-[10px] text-red-600" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    {/* Guardians's Address */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="fat_address" className="w-30 text-sm font-medium text-gray-700">
                                                Address: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                // id="fat_address"
                                                className="text-dark-500"
                                                // value={data.fat_address}
                                                // onChange={(e) => setData('fat_address', e.target.value)}
                                                placeholder="Guardian's Address"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            {/* <InputError message={errors.fat_address} className="text-[10px] text-red-600" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                {/* Relationship to the Patient */}
                                <div>
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="fat_address" className="w-48 text-sm font-medium text-gray-700">
                                            Relationship to the Patient: *
                                        </Label>
                                        <Select
                                            // id="fat_deceased_status"
                                            // value={data.fat_deceased_status}
                                            // onChange={(e) => setData('fat_deceased_status', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                        >
                                            <option value="">-- Select Relationship to the Patient --</option>
                                            <option value="FAT">Father</option>
                                            <option value="MOT">Mother</option>
                                            <option value="BRO">Brother</option>
                                            <option value="SIS">Sister</option>
                                            <option value="GRD">Grandparent</option>
                                            <option value="COU">Cousin</option>
                                            <option value="FRA">Friend</option>
                                            <option value="SPO">Spouse</option>
                                            <option value="CHI">Child</option>
                                            <option value="AUN">Aunt</option>
                                            <option value="UNC">Uncle</option>
                                            <option value="GUA">Guardian</option>
                                            <option value="OTH">Other</option>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-33 text-sm font-medium text-gray-700" />
                                        {/* <InputError message={errors.fat_address} className="text-[10px] text-red-600" /> */}
                                    </div>
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="mot_fname" className="w-35 text-sm font-medium text-gray-700">
                                            Mobile <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <Input
                                            // id="mot_fname"
                                            className="text-dark-500"
                                            // value={data.mot_fname}
                                            // onChange={(e) => setData('mot_fname', e.target.value)}
                                            placeholder="Guardian's Last Name"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-33 text-sm font-medium text-gray-700" />
                                        {/* <InputError message={errors.mot_fname} className="text-[10px] text-red-600" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <Pencil className="h-4 w-4 text-green-600" />
                                <h2 className="text-md font-semibold">OTHER INFO</h2>
                            </div>
                            <hr />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"></div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <Pencil className="h-4 w-4 text-green-600" />
                                <h2 className="text-md font-semibold">PHILHEALTH INFO</h2>
                            </div>
                            <hr />

                            {/* Philhealth Member */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="phic_member" className="w-49 text-sm font-medium text-red-500">
                                        Philhealth Member?:
                                    </Label>

                                    <label className="flex items-center gap-1 text-sm text-red-500">
                                        <input
                                            type="radio"
                                            name="phic_member"
                                            value="N"
                                            checked={data.phic_member === 'N'}
                                            className="accent-black-600"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    phic_member: e.target.value,
                                                    pat_philhealth: '',
                                                    philhealth_status_code: '',
                                                    pDependentType_code: '',
                                                    pMemberLname: '',
                                                    pMemberFname: '',
                                                    pMemberMname: '',
                                                    pMemberSuffix: '',
                                                    pMemberBdate: '',
                                                    pMemberSex: '',
                                                    type_of_membership: '',
                                                });
                                            }}
                                        />
                                        No
                                    </label>
                                    <label className="flex items-center gap-1 text-sm text-red-500">
                                        <input
                                            type="radio"
                                            name="phic_member"
                                            value="Y"
                                            checked={data.phic_member === 'Y'}
                                            className="accent-black-600"
                                            onChange={(e) => setData('phic_member', e.target.value)}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-49 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.phic_member} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Philhealth Number */}
                            <div hidden={!(data.phic_member === 'Y')}>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="pat_philhealth" className="w-70 text-sm font-medium">
                                        Philhealth Number: <span className="text-sm font-medium text-red-500">*</span>
                                    </Label>
                                    <div className={`w-full ${data.phic_member !== 'Y' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                        <Input
                                            id="pat_philhealth"
                                            className="text-dark-500 rounded-md border px-3 py-2 shadow"
                                            value={data.pat_philhealth}
                                            onChange={(e) => setData('pat_philhealth', e.target.value)}
                                            placeholder="PhilHealth Number"
                                            disabled={!(data.phic_member === 'Y')}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-49 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.pat_philhealth} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Philhealth Status Type */}
                            <div hidden={!(data.phic_member === 'Y')}>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="philhealth_status_code" className="text-black-500 w-70 text-sm font-medium">
                                        Philhealth Status Type: <span className="text-sm font-medium text-red-500">*</span>
                                    </Label>
                                    <Select
                                        id="philhealth_status_code"
                                        value={data.philhealth_status_code}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Always update the status code
                                            setData({
                                                ...data,
                                                philhealth_status_code: value,
                                                ...(value === 'M' && {
                                                    pDependentType_code: '',
                                                    pMemberLname: '',
                                                    pMemberFname: '',
                                                    pMemberMname: '',
                                                    pMemberSuffix: '',
                                                    pMemberBdate: '',
                                                    pMemberSex: '',
                                                }),
                                            });
                                        }}
                                        disabled={!(data.phic_member === 'Y')}
                                        className={`text-dark-500 w-full rounded border p-2 text-sm ${data.phic_member !== 'Y' ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        <option value="">-- Select Philhealth Status Type --</option>
                                        <option value="D">DEPENDENT</option>
                                        <option value="M">MEMBER</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-49 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.philhealth_status_code} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Membership Info */}
                            {/* <div className="space-y-3"> */}
                            <div hidden={!(data.philhealth_status_code === 'D')} className="space-y-3">
                                <hr />
                                {/* Relationship to Member */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pDependentType_code" className="text-black-500 w-71 text-sm font-medium">
                                            Relationship to Member: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <Select
                                            id="pDependentType_code"
                                            value={data.pDependentType_code}
                                            onChange={(e) => setData('pDependentType_code', e.target.value)}
                                            disabled={!isEnabled}
                                            className={`text-dark-500 w-full rounded border p-2 text-sm ${!isEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                        >
                                            <option value="">-- Select Relationship to Member --</option>
                                            <option value="C">CHILD</option>
                                            <option value="P">PARENT</option>
                                            <option value="S">SPOUSE</option>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pDependentType_code} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Member's Last Name */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberLname" className="text-black-500 w-70 text-sm font-medium">
                                            Member's Last Name: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Input
                                                id="pMemberLname"
                                                value={data.pMemberLname}
                                                onChange={(e) => setData('pMemberLname', e.target.value)}
                                                placeholder="Member's Last Name"
                                                disabled={!isEnabled}
                                                className="text-dark-500 w-full rounded border p-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberLname} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Member's First Name */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberFname" className="text-black-500 w-70 text-sm font-medium">
                                            Member's First Name: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Input
                                                id="pMemberFname"
                                                value={data.pMemberFname}
                                                onChange={(e) => setData('pMemberFname', e.target.value)}
                                                placeholder="Member's Last Name"
                                                disabled={!isEnabled}
                                                className="text-dark-500 w-full rounded border p-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberFname} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Member's Middle Name */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberMname" className="text-black-500 w-70 text-sm font-medium">
                                            Member's Middle Name: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Input
                                                id="pMemberMname"
                                                value={data.pMemberMname}
                                                onChange={(e) => setData('pMemberMname', e.target.value)}
                                                placeholder="Member's Middle Name"
                                                disabled={!isEnabled}
                                                className="text-dark-500 w-full rounded border p-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberMname} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Member's Suffix */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberSuffix" className="text-black-500 w-70 text-sm font-medium">
                                            Member's Suffix: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Select
                                                id="pMemberSuffix"
                                                value={data.pMemberSuffix}
                                                onChange={(e) => setData('pMemberSuffix', e.target.value)}
                                                disabled={!isEnabled}
                                                className={`text-dark-500 w-full rounded border p-2 text-sm ${!isEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                            >
                                                <option value="">-- Select Suffix --</option>
                                                <option value="I">I</option>
                                                <option value="II">II</option>
                                                <option value="III">III</option>
                                                <option value="IV">IV</option>
                                                <option value="IX">IX</option>
                                                <option value="JR">JR</option>
                                                <option value="JR.">JR.</option>
                                                <option value="JR II">JR II</option>
                                                <option value="JRA">JRA</option>
                                                <option value="SR">SR</option>
                                                <option value="SR.">SR.</option>
                                                <option value="V">V</option>
                                                <option value="VI">VI</option>
                                                <option value="VII">VII</option>
                                                <option value="VIII">VIII</option>
                                                <option value="X">X</option>
                                                <option value="XI">XI</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberSuffix} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Member's Birth Date */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberBdate" className="text-black-500 w-70 text-sm font-medium">
                                            Member's Birth Date: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Input
                                                id="pMemberBdate"
                                                type="date"
                                                value={data.pMemberBdate}
                                                onChange={(e) => setData('pMemberBdate', e.target.value)}
                                                disabled={!isEnabled}
                                                className={`text-dark-500 w-full rounded border p-2 text-sm ${!isEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-49 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberBdate} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* Sex */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="pMemberSex" className="text-black-500 w-70 text-sm font-medium">
                                            Member's Sex: <span className="text-sm font-medium text-red-500">*</span>
                                        </Label>
                                        <div className={`w-full ${data.philhealth_status_code !== 'D' ? 'cursor-not-allowed opacity-100' : ''}`}>
                                            <Select
                                                id="pMemberSex"
                                                value={data.pMemberSex}
                                                onChange={(e) => setData('pMemberSex', e.target.value)}
                                                disabled={!isEnabled}
                                                className={`text-dark-500 w-full rounded border p-2 text-sm ${!isEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                            >
                                                <option value="">-- Select Sex --</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-33 text-sm font-medium text-gray-700" />
                                        <InputError message={errors.pMemberSex} className="text-[10px] text-red-600" />
                                    </div>
                                </div>

                                {/* End of Code */}
                                <hr />
                            </div>

                            {/* Philhealth Category Type */}
                            <div hidden={!(data.phic_member === 'Y')}>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="type_of_membership" className="text-black-500 w-70 text-sm font-medium">
                                        Philhealth Category Type: <span className="text-sm font-medium text-red-500">*</span>
                                    </Label>
                                    <Select
                                        id="type_of_membership"
                                        value={data.type_of_membership}
                                        onChange={(e) => setData('type_of_membership', e.target.value)}
                                        disabled={!(data.phic_member === 'Y')}
                                        className={`text-dark-500 w-full rounded border p-2 text-sm ${data.phic_member !== 'Y' ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        <option value="">-- Select Philhealth Category Type --</option>
                                        <option value="FEEO">FE - ENTERPRISE OWNER</option>
                                        <option value="FEFD">FE - FAMILY DRIVER</option>
                                        <option value="FEGC">FE - GOVT - CASUAL</option>
                                        <option value="FEGCB">FE - GOVT - CONTRACT/PROJECT BASED</option>
                                        <option value="FEGPR">FE - GOVT - PERMANENT REGULAR</option>
                                        <option value="FEHK">FE - HOUSEHOLD HELP/KASAMBAHAY</option>
                                        <option value="FEPC">FE - PRIVATE - CASUAL</option>
                                        <option value="FEPCB">FE - PRIVATE - CONTRACT/PROJECT BASED</option>
                                        <option value="FEPPR">FE - PRIVATE - PERMANENT REGULAR</option>
                                        <option value="IECCP">IE - CITIZEN OF OTHER COUNRIES WORKING/RESIDING/STUDYING IN THE PHILIPPINES</option>
                                        <option value="IEFDC">IE - FILIPINO WITH DUAL CITIZENSHIP</option>
                                        <option value="IEIS">IE - INFORMAL SECTOR</option>
                                        <option value="IEMWLB">IE - MIGRANT WORKER - LAND BASED</option>
                                        <option value="IEMWSB">IE - MIGRANT WORKER - SEA BASED</option>
                                        <option value="IENFC">IE - NATURALIZED FILIPINO CITIZEN</option>
                                        <option value="IEOG">IE - ORGANIZED GROUP</option>
                                        <option value="IESEI">IE - SELF EARNING INDIVIDUAL</option>
                                        <option value="INP">INDIGENT - NHTS-PR</option>
                                        <option value="ICL">INDIRECT CONTRIBUTOR - LISTAHAN</option>
                                        <option value="ICP">INDIRECT CONTRIBUTOR - PERSON WITH DISABILITY</option>
                                        <option value="ICF">INDIRECT CONTRIBUTOR - FINANCIALLY INCAPABLE</option>
                                        <option value="LMR">LIFETIME MEMBER - RETIREE/PENSIONER</option>
                                        <option value="LMW">LIFETIME MEMBER - WITH 120 MONTHS CONTRIBUTION AND HAS REACHED RETIREMENT AGE</option>
                                        <option value="SC">SENIOR CITIZEN</option>
                                        <option value="SLGU">SPONSORED - LGU</option>
                                        <option value="SNGA">SPONSORED - NGA</option>
                                        <option value="SOTH">SPONSORED - OTHERS</option>
                                        <option value="SPOS">SPONSORED - POS - FINANCIALLY INCAPABLE</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-49 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.type_of_membership} className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* eKonsulta Eligible */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="indigenous" className="w-70 text-sm font-medium text-red-500">
                                        EKONSULTA eligible?:
                                    </Label>
                                    <Select
                                        // id="fat_deceased_status"
                                        // value={data.fat_deceased_status}
                                        // onChange={(e) => setData('fat_deceased_status', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select eKonsulta Eligible --</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError className="text-[10px] text-red-600" />
                                </div>
                            </div>

                            {/* Enlistment Date */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="indigenous" className="w-70 text-sm font-medium text-red-500">
                                        Enlistment Date:
                                    </Label>
                                    <Input
                                        // id="pat_birthDate"
                                        type="date"
                                        className="text-dark-500"
                                        // value={data.pat_birthDate}
                                        // onChange={(e) => setData('pat_birthDate', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError className="text-[10px] text-red-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-1">
                    <Button type="submit" disabled={processing}>
                        Save Patient
                    </Button>
                    <Link
                        href="/patients"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Back to Patient List
                    </Link>
                </div>
            </form>

            {/* The SearchPatientModal is controlled by state */}
            <SearchPatientModal open={isModalOpen} onClose={closeModal} />
        </AppLayout>
    );
}
