import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, FHUD } from '@/types';
import { Select } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AddressSelector } from '../components/AddressSelector';
import CarerInformation from '../components/PatientComponents/CarerInformation';
import OtherInfo from '../components/PatientComponents/OtherInfo';
import { OtherPatientInformation } from '../components/PatientComponents/OtherPatientInformation';
import { ParentsInformation } from '../components/PatientComponents/ParentsInformation';
import { PatientInformation } from '../components/PatientComponents/PatientInformation';
import PhilHealthInfo from '../components/PatientComponents/PhilHealthInfo';
import SearchPatientModal from './SearchPatientModal';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Add Patients', href: '/patients/create' },
];

interface PageProps {
    nextId: string;
    facilities: FHUD[];
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
        maiden_lastname: '',
        maiden_middlename: '',
        suffix_code: '',
        sex_code: '',
        pat_birthplace: '',
        pat_birthDate: '',

        civil_stat_code: '',
        religion_code: '',
        nationality: '',
        educattainment: '',
        occupation_code: '',
        occupation_sp: '',
        monthly_income: '',
        tax_id_num: '',
        IndigenousGroup: 'N',
        ethnic_code: '',
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
        pat_email: '',

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

        carer_fname: '',
        carer_mname: '',
        carer_lname: '',
        carer_birthdate: '',
        carer_address: '',
        carer_contact: '',
        carer_relationship: '',
        carer_sex: '',
        carer_suffix: '',

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
    const isEnabled = data.philhealth_status_code === 'D' && data.phic_member === 'Y';

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

    const [previousEmployment, setPreviousEmployment] = useState({
        occupation_sp: data.occupation_sp,
        monthly_income: data.monthly_income,
        tax_id_num: data.tax_id_num,
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting data:', data);
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
                            onChange={(e) => setData('facility_name', e.target.value.toUpperCase())}
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
                            onChange={(e) => setData('facility_location', e.target.value.toUpperCase())}
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
                            onChange={(e) => setData('provider_name', e.target.value.toUpperCase())}
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
                                    setData({
                                        ...data,
                                        prefix_code: value,
                                        maiden_middlename: value === 'Mrs' ? data.maiden_middlename : '',
                                        maiden_lastname: value === 'Mrs' ? data.maiden_lastname : '',
                                    });
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

                {/* Region */}
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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {/* Other Information */}
                    <OtherInfo />

                    {/* Philhealth Information */}
                    <PhilHealthInfo
                        phicMember={data.phic_member}
                        patPhilhealth={data.pat_philhealth}
                        philhealthStatus={data.philhealth_status_code}
                        pDependentType={data.pDependentType_code}
                        onChange={(field, value) => setData(field, value)}
                        errors={errors}
                    />
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
