import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import rawLocationData from '../json/philippine_reg_prov_cit_brgy.json';
import { AddressSelector } from '../components/AddressSelector';

// 🛠️ DEFINE the type first
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
    { title: 'Patients', href: '/patients' },
    { title: 'Edit Patient', href: '#' },
];

interface PatientProps {
    patient: {
        master_patient_perm_id?: string;
        facility_name?: string;
        facility_location?: string;
        provider_name?: string;
        registered_at?: string;
        prefix_code?: string;
        pat_lname?: string;
        pat_fname?: string;
        pat_mname?: string;
        maiden_middlename?: string;
        maiden_lastname?: string;
        suffix_code?: string;
        sex_code?: string;
        civil_stat_code?: string;
        pat_birthDate?: string;

        regcode?: string;
        provcode?: string;
        citycode?: string;
        bgycode?: string;
        zipcode?: string;
        country_code?: string;
        pat_birthplace?: string;
        religion_code?: string;
        nationality?: string;
        educattainment?: string;
        occupation_code?: string;
        occupation_sp?: string; // Specify Occupation
        bloodtype_code?: string;

        pat_email?: string;
        pat_mobile?: string;
        pat_landline?: string;
        is_deceased?: boolean;
        death_date?: string;
        death_reason?: string;
        pat_street?: string;
        pat_houseno?: string;
        patient_address?: string;

        mot_fname?: string;
        mot_mname?: string;
        mot_lname?: string;
        mot_birthdate?: string;
        mot_contact?: string;
        mot_deceased_status?: string;
        mot_address?: string;
        fat_fname?: string;
        fat_mname?: string;
        fat_lname?: string;
        fat_birthdate?: string;
        fat_contact?: string;
        fat_deceased_status?: string;
        fat_address?: string;
        id: string;

        carer_fname: string;
        carer_mname: string;
        carer_lname: string;
        carer_birthdate: string;
        carer_address: string;
        carer_contact: string;
        carer_relationship: string;
        carer_sex: string;
        carer_suffix: string;

        phic_member?: string;
        pat_philhealth?: string;
        type_of_membership?: string;
        philhealth_status_code?: string;
        pDependentType_code?: string;
        pMemberLname?: string;
        pMemberFname?: string;
        pMemberMname?: string;
        pMemberSuffix?: string;
        pMemberBdate?: string;
        pMemberSex?: string;
    };
}

const EditPatient: React.FC<PatientProps> = ({ patient }) => {
    const { data, setData, put, processing, errors } = useForm({
        master_patient_perm_id: patient.master_patient_perm_id || '',
        facility_name: patient.facility_name || '',
        facility_location: patient.facility_location || '',
        provider_name: patient.provider_name || '',
        //intake_date: patient.intake_date || '',
        registered_at: formatTimestampForInput(patient.registered_at ?? '') || '',

        prefix_code: patient.prefix_code || '',
        pat_lname: patient.pat_lname || '',
        pat_fname: patient.pat_fname || '',
        pat_mname: patient.pat_mname || '',
        maiden_middlename: patient.maiden_middlename || '',
        maiden_lastname: patient.maiden_lastname || '',
        suffix_code: patient.suffix_code || '',
        sex_code: patient.sex_code || '',
        civil_stat_code: patient.civil_stat_code || '',
        pat_birthDate: patient.pat_birthDate || '',

        regcode: patient.regcode || '',
        provcode: patient.provcode || '',
        citycode: patient.citycode || '',
        bgycode: patient.bgycode || '',
        zipcode: patient.zipcode || '',
        country_code: patient.country_code || '',
        pat_birthplace: patient.pat_birthplace || '',
        religion_code: patient.religion_code || '',
        nationality: patient.nationality || '',
        educattainment: patient.educattainment || '',
        occupation_code: patient.occupation_code || '',
        occupation_sp: patient.occupation_sp || '', // Specify Occupation
        bloodtype_code: patient.bloodtype_code || '',
        pat_email: patient.pat_email || '',
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
        mot_birthdate: patient.mot_birthdate || '',
        mot_contact: patient.mot_contact || '',
        mot_deceased_status: patient.mot_deceased_status || '',
        mot_address: patient.mot_address || '',

        fat_fname: patient.fat_fname || '',
        fat_mname: patient.fat_mname || '',
        fat_lname: patient.fat_lname || '',
        fat_birthdate: patient.fat_birthdate || '',
        fat_contact: patient.fat_contact || '',
        fat_deceased_status: patient.fat_deceased_status || '',
        fat_address: patient.fat_address || '',

        carer_fname: patient.carer_fname || '',
        carer_mname: patient.carer_mname || '',
        carer_lname: patient.carer_lname || '',
        carer_birthdate: patient.carer_birthdate || '',
        carer_address: patient.carer_address || '',
        carer_contact: patient.carer_contact || '',
        carer_relationship: patient.carer_relationship || '',
        carer_suffix: patient.carer_suffix || '',
        carer_sex: patient.carer_sex || '',

        phic_member: patient.phic_member || '',
        pat_philhealth: patient.pat_philhealth || '',
        type_of_membership: patient.type_of_membership || '',
        philhealth_status_code: patient.philhealth_status_code || '',
        pDependentType_code: patient.pDependentType_code || '',
        pMemberLname: patient.pMemberLname || '',
        pMemberFname: patient.pMemberFname || '',
        pMemberMname: patient.pMemberMname || '',
        pMemberSuffix: patient.pMemberSuffix || '',
        pMemberBdate: patient.pMemberBdate || '',
        pMemberSex: patient.pMemberSex || '',
    });

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [age, setAge] = useState({ years: '', months: '', days: '' });
    const isEnabled = data.philhealth_status_code === 'D' && data.phic_member === 'Y';
    const [originalPhilhealth, setOriginalPhilhealth] = useState({
        pat_philhealth: data.pat_philhealth,
        philhealth_status_code: data.philhealth_status_code,
        pDependentType_code: data.pDependentType_code,
        pMemberLname: data.pMemberLname,
        pMemberFname: data.pMemberFname,
        pMemberMname: data.pMemberMname,
        pMemberSuffix: data.pMemberSuffix,
        pMemberBdate: data.pMemberBdate,
        pMemberSex: data.pMemberSex,
        type_of_membership: data.type_of_membership,
    });
    const [originalDependentData, setOriginalDependentData] = useState({
        pDependentType_code: data.pDependentType_code,
        pMemberLname: data.pMemberLname,
        pMemberFname: data.pMemberFname,
        pMemberMname: data.pMemberMname,
        pMemberSuffix: data.pMemberSuffix,
        pMemberBdate: data.pMemberBdate,
        pMemberSex: data.pMemberSex,
    });
    const [originalMaidenName, setOriginalMaidenName] = useState({
        maiden_middlename: '',
        maiden_lastname: '',
    });
    const [originalEmploymentStatus, setOriginalEmploymentStatus] = useState({
        occupation_sp: '',
    });

    useEffect(() => {
        if (data.regcode) {
            setSelectedRegion(data.regcode);
        }
        if (data.provcode) {
            setSelectedProvince(data.provcode);
        }
        if (data.citycode) {
            setSelectedCity(data.citycode);
        }
    }, [data.regcode, data.provcode, data.citycode]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/patients/${patient.id}`);
    };

    function formatTimestampForInput(timestamp: string): string {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

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

    interface SelectProps {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        className?: string;
        id?: string; // Add this if missing
        children?: React.ReactNode;
        disabled?: boolean;
    }

    const Select: React.FC<SelectProps> = ({ id, value, onChange, className, children, disabled }) => {
        return (
            <select id={id} value={value} onChange={onChange} className={className} disabled={disabled}>
                {children}
            </select>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Patient" />
            <form onSubmit={handleSubmit} className="w-full space-y-8 px-10 py-8">
                {/* Facility Info */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 pb-4 md:flex-row">
                    <h2 className="text-xl font-bold tracking-tight text-gray-800">EDIT PATIENT REGISTRATION FORM</h2>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Update Patient
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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <Label>
                            Facility Name <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            value={data.facility_name}
                            onChange={(e) => setData('facility_name', e.target.value)}
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            readOnly
                        />
                        <InputError message={errors.facility_name} />
                    </div>
                    <div>
                        <Label>
                            Facility Location <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            value={data.facility_location}
                            onChange={(e) => setData('facility_location', e.target.value)}
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                            readOnly
                        />
                        <InputError message={errors.facility_location} />
                    </div>
                    <div>
                        <Label>
                            Provider Name <span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                            value={data.provider_name}
                            onChange={(e) => setData('provider_name', e.target.value)}
                            className="text-dark-500 w-full rounded border bg-gray-100 p-2"
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
                            value={data.registered_at}
                            onChange={(e) => setData('registered_at', e.target.value)}
                        />
                        <InputError message={errors.registered_at} />
                    </div>
                </div>

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

                            {/* Patient Record Number */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">Patient Record No. :</label>
                                    <Input
                                        value={patient.master_patient_perm_id}
                                        className="text-dark-500 w-full rounded border bg-gray-100 p-2"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Prefix */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <label className="w-40 text-sm font-medium text-gray-700">
                                        Prefix: <span className="font-bold text-red-600">*</span>
                                    </label>
                                    <select
                                        id="prefix_code"
                                        value={data.prefix_code ?? ''}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;

                                            // Switching FROM Mrs/Dr TO something else
                                            if (!['Mrs'].includes(selectedValue) && ['Mrs'].includes(data.prefix_code)) {
                                                // Save current maiden names
                                                setOriginalMaidenName({
                                                    maiden_middlename: data.maiden_middlename,
                                                    maiden_lastname: data.maiden_lastname,
                                                });

                                                // Then clear them
                                                setData({
                                                    ...data,
                                                    prefix_code: selectedValue,
                                                    maiden_middlename: '',
                                                    maiden_lastname: '',
                                                });
                                            }
                                            // Switching TO Mrs/Dr
                                            else if (['Mrs'].includes(selectedValue)) {
                                                setData({
                                                    ...data,
                                                    prefix_code: selectedValue,
                                                    maiden_middlename: originalMaidenName.maiden_middlename,
                                                    maiden_lastname: originalMaidenName.maiden_lastname,
                                                });
                                            }
                                            // Switching between non-Mrs/Dr options (Mr, Ms, NA)
                                            else {
                                                setData({
                                                    ...data,
                                                    prefix_code: selectedValue,
                                                });
                                            }
                                        }}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                    >
                                        <option value="">-- Select Prefix --</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                        <option value="NA">Not Applicable</option>
                                    </select>
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
                                        value={data.pat_lname}
                                        className="text-dark-500"
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
                                    <Label className="w-40 text-sm font-medium text-gray-700">
                                        Maiden Middle Name: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="maiden_middlename"
                                        className="text-dark-500"
                                        value={data.maiden_middlename}
                                        onChange={(e) => setData('maiden_middlename', e.target.value)}
                                        placeholder="Maiden Middle Name"
                                        disabled={!(data.prefix_code === 'Mrs')}
                                    />
                                </div>
                            </div>

                            {/* Maiden Last Name */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label className="w-40 text-sm font-medium text-gray-700">
                                        Maiden Last Name: <span className="font-bold text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="maiden_lastname"
                                        className="text-dark-500"
                                        value={data.maiden_lastname}
                                        onChange={(e) => setData('maiden_lastname', e.target.value)}
                                        placeholder="Maiden Middle Name"
                                        disabled={!(data.prefix_code === 'Mrs')}
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
                                        value={data.suffix_code ?? ''}
                                        onChange={(e) => setData('suffix_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        value={data.sex_code ?? ''}
                                        onChange={(e) => setData('sex_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        Birth Date:<span className="font-bold text-red-600">*</span>
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
                                        value={data.civil_stat_code ?? ''}
                                        onChange={(e) => setData('civil_stat_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        value={data.educattainment ?? ''}
                                        onChange={(e) => setData('educattainment', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                            {/* Educational Attainment */}

                            {/* Employment Status */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="occupation_code" className="w-40 text-sm font-medium text-gray-700">
                                        Employment Status:
                                    </Label>
                                    <select
                                        id="occupation_code"
                                        value={data.occupation_code ?? ''}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;

                                            if (data.occupation_code === '01' && selectedValue !== '01') {
                                                setOriginalEmploymentStatus({
                                                    occupation_sp: data.occupation_sp,
                                                });

                                                setData({
                                                    ...data,
                                                    occupation_code: selectedValue,
                                                    occupation_sp: '',
                                                });
                                            } else if (data.occupation_code !== '01' && selectedValue === '01') {
                                                setData({
                                                    ...data,
                                                    occupation_code: selectedValue,
                                                    occupation_sp: originalEmploymentStatus.occupation_sp,
                                                });
                                            } else {
                                                setData({
                                                    ...data,
                                                    occupation_code: selectedValue,
                                                    occupation_sp: '',
                                                });
                                            }
                                        }}
                                        className="text-black-500 block w-full rounded-md border px-3 py-2 shadow-sm disabled:bg-gray-100"
                                    >
                                        <option value="">-- Select Employment --</option>
                                        <option value="01">Employed</option>
                                        <option value="02">None/Unemployed</option>
                                        <option value="03">Retired</option>
                                        <option value="04">Student</option>
                                        <option value="05">Unknown</option>
                                    </select>
                                </div>
                            </div>

                            {/* Specify Occupation - animated show/hide */}
                            <div hidden={data.occupation_code !== '01'}>
                                <div className="mt-2 flex items-center gap-2">
                                    <Label htmlFor="occupation_sp" className="w-40 text-sm font-medium text-gray-700">
                                        Specify Occupation:
                                    </Label>
                                    <Input
                                        id="occupation_sp"
                                        className="text-dark-500 text-sm"
                                        value={data.occupation_sp}
                                        onChange={(e) => setData('occupation_sp', e.target.value)}
                                        placeholder="Occupation"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError message={errors.occupation_sp} className="text-[10px] text-red-600" />
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
                                        value={data.religion_code ?? ''}
                                        onChange={(e) => setData('religion_code', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        value={data.nationality ?? ''}
                                        onChange={(e) => setData('nationality', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                    <select
                                        // id="nationality"
                                        // value={data.nationality}
                                        // onChange={(e) => setData('nationality', e.target.value)}
                                        disabled
                                        className="block w-full rounded-md border px-3 py-2 text-gray-500 shadow-sm disabled:bg-gray-100"
                                    >
                                        <option value="">-- Select Ethnic Group --</option>
                                        <option value="">No Data</option>
                                    </select>
                                </div>
                            </div>

                            {/* Blood Type */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="bloodtype_code" className="w-40 text-sm font-medium text-gray-700">
                                        Blood Type:
                                    </Label>
                                    <select
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
                                    </select>
                                </div>
                            </div>

                            {/* End of Code */}
                        </div>
                    </div>
                </div>

                <AddressSelector
                    region={data.regcode}
                    province={data.provcode}
                    city={data.citycode}
                    barangay={data.bgycode}
                    patientAddress={data.patient_address}
                    zipCode={data.zipcode}
                    country={data.country_code}
                    email={data.pat_email}
                    mobile={data.pat_mobile}
                    landline={data.pat_landline}
                    onChange={(field, value) => setData(field, value)}
                    errors={errors}
                />

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
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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

                {/* Carer's Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                <UserPlus className="h-4 w-4 text-gray-600" />
                                <h2 className="text-md w-50 font-semibold">Carer's Information</h2>
                                <small className="text-red-600 italic">Note: Carer must be alive</small>
                            </div>
                            <hr />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                <div className="col-span-1 space-y-3">
                                    {/* Carer's First Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_fname" className="w-40 text-sm font-medium text-gray-700">
                                                First Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="carer_fname"
                                                className="text-dark-500"
                                                value={data.carer_fname}
                                                onChange={(e) => setData('carer_fname', e.target.value)}
                                                placeholder="Carer's First Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_fname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Carer's Middle Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_mname" className="w-40 text-sm font-medium text-gray-700">
                                                Middle Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="carer_mname"
                                                className="text-dark-500"
                                                value={data.carer_mname}
                                                onChange={(e) => setData('carer_mname', e.target.value)}
                                                placeholder="Carer's Middle Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_mname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Carer's Last Name */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_lname" className="w-40 text-sm font-medium text-gray-700">
                                                Last Name <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="carer_lname"
                                                className="text-dark-500"
                                                value={data.carer_lname}
                                                onChange={(e) => setData('carer_lname', e.target.value)}
                                                placeholder="Carer's Last Name"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_lname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Carer's Suffix */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_suffix" className="w-40 text-sm font-medium text-gray-700">
                                                Suffix <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Select
                                                id="carer_suffix"
                                                value={data.carer_suffix}
                                                onChange={(e) => setData('carer_suffix', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                            >
                                                <option value="">-- Select Suffix --</option>
                                                <option value="NA">Not Applicable</option>
                                                <option value="JR">Jr</option>
                                                <option value="SR">Sr</option>
                                                <option value="I">I</option>
                                                <option value="II">II</option>
                                                <option value="III">III</option>
                                                <option value="IV">IV</option>
                                                <option value="V">V</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_lname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Carer's Birthdate */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_birthdate" className="w-40 text-sm font-medium text-gray-700">
                                                Birth Date: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="carer_birthdate"
                                                className="text-dark-500"
                                                type="date"
                                                value={data.carer_birthdate}
                                                onChange={(e) => setData('carer_birthdate', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_birthdate} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 space-y-3">
                                    {/* Carer's Sex */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_sex" className="w-40 text-sm font-medium text-gray-700">
                                                Suffix <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Select
                                                id="carer_sex"
                                                value={data.carer_sex}
                                                onChange={(e) => setData('carer_sex', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                            >
                                                <option value="">-- Select Sex --</option>
                                                <option value="M">MALE</option>
                                                <option value="F">FEMALE</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_lname} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Carer's Address */}
                                    <div>
                                        <div className="">
                                            <Label htmlFor="carer_address" className="w-40 text-sm font-medium text-gray-700">
                                                Address: <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <textarea
                                                id="carer_address"
                                                value={data.carer_address}
                                                onChange={(e) => setData('carer_address', e.target.value)}
                                                className="text-dark-500 w-full rounded-md border p-2"
                                                placeholder="Carer's Address"
                                                rows={2}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_address} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Relationship to the Patient */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_relationship" className="w-40 text-sm font-medium text-gray-700">
                                                Relationship to the Patient: *
                                            </Label>
                                            <Select
                                                id="carer_relationship"
                                                value={data.carer_relationship}
                                                onChange={(e) => setData('carer_relationship', e.target.value)}
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
                                            <InputError message={errors.carer_relationship} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="carer_contact" className="w-40 text-sm font-medium text-gray-700">
                                                Mobile <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="carer_contact"
                                                className="text-dark-500"
                                                value={data.carer_contact}
                                                onChange={(e) => setData('carer_contact', e.target.value)}
                                                placeholder="Carer's Contact Number"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-33 text-sm font-medium text-gray-700" />
                                            <InputError message={errors.carer_contact} className="text-[10px] text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {/* Other Information */}
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

                    {/* PhilHealth Info */}
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
                                                setOriginalPhilhealth({
                                                    pat_philhealth: data.pat_philhealth,
                                                    philhealth_status_code: data.philhealth_status_code,
                                                    pDependentType_code: data.pDependentType_code,
                                                    pMemberLname: data.pMemberLname,
                                                    pMemberFname: data.pMemberFname,
                                                    pMemberMname: data.pMemberMname,
                                                    pMemberSuffix: data.pMemberSuffix,
                                                    pMemberBdate: data.pMemberBdate,
                                                    pMemberSex: data.pMemberSex,
                                                    type_of_membership: data.type_of_membership,
                                                });
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
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    phic_member: e.target.value,
                                                    ...originalPhilhealth,
                                                });
                                            }}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-33 text-sm font-medium text-gray-700" />
                                    <InputError className="text-[10px] text-red-600" />
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

                                            if (value === 'M') {
                                                // Save before clearing
                                                setOriginalDependentData({
                                                    pDependentType_code: data.pDependentType_code,
                                                    pMemberLname: data.pMemberLname,
                                                    pMemberFname: data.pMemberFname,
                                                    pMemberMname: data.pMemberMname,
                                                    pMemberSuffix: data.pMemberSuffix,
                                                    pMemberBdate: data.pMemberBdate,
                                                    pMemberSex: data.pMemberSex,
                                                });

                                                // Clear all dependent fields
                                                setData({
                                                    ...data,
                                                    philhealth_status_code: value,
                                                    pDependentType_code: '',
                                                    pMemberLname: '',
                                                    pMemberFname: '',
                                                    pMemberMname: '',
                                                    pMemberSuffix: '',
                                                    pMemberBdate: '',
                                                    pMemberSex: '',
                                                });
                                            } else if (value === 'D') {
                                                // Restore the fields
                                                setData({
                                                    ...data,
                                                    philhealth_status_code: value,
                                                    ...originalDependentData, // restore snapshot
                                                });
                                            } else {
                                                setData('philhealth_status_code', value);
                                            }
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
                                        <Label htmlFor="pDependentType_code" className="text-black-500 w-70 text-sm font-medium">
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
                                                disabled={!(data.philhealth_status_code === 'D')}
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
                                                placeholder="Member's First Name"
                                                disabled={!(data.philhealth_status_code === 'D')}
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
                                                disabled={!(data.philhealth_status_code === 'D')}
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
                                        <InputError message={errors.pDependentType_code} className="text-[10px] text-red-600" />
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
                                    <select
                                        // id="fat_deceased_status"
                                        // value={data.fat_deceased_status}
                                        // onChange={(e) => setData('fat_deceased_status', e.target.value)}
                                        className="text-dark-500 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                                    >
                                        <option value="">-- Select eKonsulta Eligible --</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
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

                <div className="flex items-center gap-4 pt-6">
                    <Button type="submit" disabled={processing}>
                        Update Patient
                    </Button>
                    <Link
                        href="/patients"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Back to Patient List
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
};

export default EditPatient;
