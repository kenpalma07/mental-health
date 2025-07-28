import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, UserPlus } from 'lucide-react';
import React, { useState } from 'react';
import { AddressSelector } from '../components/AddressSelector';
import { ParentsInformation } from '../components/PatientComponents/ParentsInformation';
import { PatientInformation } from '../components/PatientComponents/PatientInformation';
import { OtherPatientInformation } from '../components/PatientComponents/OtherPatientInformation';
import CarerInformation from '../components/PatientComponents/CarerInformation';
import OtherInfo from '../components/PatientComponents/OtherInfo';
import PhilHealthInfo from '../components/PatientComponents/PhilHealthInfo';

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
        monthly_income?: string;
        tax_id_num?: string;
        bloodtype_code?: string;
        ethnic_code?: string;
        IndigenousGroup?: string;

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
        monthly_income: patient.monthly_income || '',
        tax_id_num: patient.tax_id_num || '',
        ethnic_code: patient.ethnic_code || '',
        IndigenousGroup: patient.IndigenousGroup || '',

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
        maiden_middlename: data.maiden_middlename || '',
        maiden_lastname: data.maiden_lastname || '',
    });
    const [originalEmploymentStatus, setOriginalEmploymentStatus] = useState({
        occupation_sp: '',
    });

    const [previousEmployment, setPreviousEmployment] = useState({
            occupation_sp: data.occupation_sp,
            monthly_income: data.monthly_income,
            tax_id_num: data.tax_id_num,
        });

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
                        {/* Patient's Information */}
                        <PatientInformation
                            masterPatientId={data.master_patient_perm_id}
                            prefixCode={data.prefix_code}
                            lastName={data.pat_lname}
                            firstName={data.pat_fname}
                            middleName={data.pat_mname}
                            maidenMiddleName={data.maiden_middlename}
                            maidenLastName={data.maiden_lastname}
                            suffixCode={data.suffix_code}
                            sexCode={data.sex_code}
                            birthDate={data.pat_birthDate}
                            onChange={(field, value) => {
                                if (field === 'prefix_code') {
                                    const prevPrefix = data.prefix_code;
                                    const nextPrefix = value;

                                    if (prevPrefix === 'Mrs' && nextPrefix !== 'Mrs') {
                                        setOriginalMaidenName({
                                            maiden_middlename: data.maiden_middlename,
                                            maiden_lastname: data.maiden_lastname,
                                        });

                                        setData({
                                            ...data,
                                            prefix_code: nextPrefix,
                                            maiden_middlename: '',
                                            maiden_lastname: '',
                                        });
                                    } else if (nextPrefix === 'Mrs' && prevPrefix !== 'Mrs') {
                                        setData({
                                            ...data,
                                            prefix_code: nextPrefix,
                                            maiden_middlename: originalMaidenName.maiden_middlename,
                                            maiden_lastname: originalMaidenName.maiden_lastname,
                                        });
                                    }

                                    // Any other change
                                    else {
                                        setData({
                                            ...data,
                                            prefix_code: nextPrefix,
                                        });
                                    }
                                } else {
                                    setData(field, value);
                                }
                            }}
                            errors={errors}
                        />
                    </div>

                    {/* 2nd Column */}
                    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                        {/* Other Patient Information */}
                        <OtherPatientInformation
                            birthPlace={data.pat_birthplace}
                            civilStatus={data.civil_stat_code}
                            educationalAttainment={data.educattainment}
                            ethnicCode={data.ethnic_code}
                            IndigenousGroup={data.IndigenousGroup}
                            occupationCode={data.occupation_code}
                            occupationSp={data.occupation_sp}
                            monthlyIncome={data.monthly_income}
                            taxIdNum={data.tax_id_num}
                            religionCode={data.religion_code}
                            nationalityCode={data.nationality}
                            bloodType={data.bloodtype_code}
                            onChange={(field, value) => {
                                if (field === 'occupation_code') {
                                    const prev = data.occupation_code;
                                    const next = value;

                                    if (prev === '01' && next !== '01') {
                                        setPreviousEmployment({
                                            occupation_sp: data.occupation_sp,
                                            monthly_income: data.monthly_income || '0',
                                            tax_id_num: data.tax_id_num || '',
                                        });

                                        setData({
                                            ...data,
                                            occupation_code: next,
                                            occupation_sp: '',
                                            monthly_income: '',
                                            tax_id_num: '',
                                        });
                                    } else if (prev !== '01' && next === '01') {
                                        setData({
                                            ...data,
                                            occupation_code: next,
                                            occupation_sp: previousEmployment.occupation_sp,
                                            monthly_income: previousEmployment.monthly_income || '0',
                                            tax_id_num: previousEmployment.tax_id_num || '',
                                        });
                                    } else {
                                        setData(field, value);
                                    }
                                } else {
                                    setData(field, value);
                                }
                            }}
                        />
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
                <ParentsInformation
                    mother_firstname={data.mot_fname}
                    mother_middlename={data.mot_mname}
                    mother_lastname={data.mot_lname}
                    mother_birthdate={data.mot_birthdate}
                    mother_address={data.mot_address}
                    mother_contact={data.mot_contact}
                    mother_status={data.mot_deceased_status}
                    father_firstname={data.fat_fname}
                    father_middlename={data.fat_mname}
                    father_lastname={data.fat_lname}
                    father_birthdate={data.fat_birthdate}
                    father_address={data.fat_address}
                    father_contact={data.fat_contact}
                    father_status={data.fat_deceased_status}
                    onChange={(field, value) => setData(field, value)}
                    errors={errors}
                />

                {/* Carer's Information */}
                <CarerInformation
                    carerFname={data.carer_fname}
                    carerLname={data.carer_lname}
                    carerMname={data.carer_mname}
                    carerSuffix={data.carer_suffix}
                    carerSex={data.carer_sex}
                    carerBirthdate={data.carer_birthdate}
                    carerAddress={data.carer_address}
                    carerRelationship={data.carer_relationship}
                    carerContact={data.carer_contact}
                    onChange={(field, value) => setData(field, value)}
                    errors={errors}
                />

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
