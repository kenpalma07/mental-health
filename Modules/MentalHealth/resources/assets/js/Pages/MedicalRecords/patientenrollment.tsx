import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, MasterPatient } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogos from '@/components/app-logo-itr';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patient Enrollment Form',
        href: '#',
    },
];

interface PatEnrollmentProps {
    patient: MasterPatient;
}

const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

const renderCheckbox = (label: string, selectedList: string) => {
    const normalizedSelected =
        selectedList?.split(',').map(item => item.trim().toLowerCase().replace(/[\s-]/g, '')) || [];
    const normalizedLabel = label.toLowerCase().replace(/[\s-]/g, '');

    const isVisited = normalizedLabel === 'visited' &&
        (normalizedSelected.includes('followupvisit') ||
            normalizedSelected.includes('newadmission') ||
            normalizedSelected.includes('newconsultation'));

    const isChecked = normalizedSelected.includes(normalizedLabel) || isVisited;

    return (
        <label key={label} className="flex items-center gap-1">
            <input type="checkbox" checked={isChecked} readOnly />
            <span className="font-bold">{label}</span>
        </label>
    );
};

const medabstractindex: React.FC<PatEnrollmentProps> = ({ patient }: { patient: MasterPatient }) => {
    const age = calculateAge(patient.pat_birthDate);
    console.log('Patient Data:', patient);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollment Form" />
            <div className="p-6 bg-white shadow rounded-md text-sm">
                <div className="p-6 bg-white shadow rounded-md text-sm">

                    <div className="flex items-center justify-center gap-4 w-full">

                        <div className="flex-shrink-0">
                            <AppLogoDOH />
                        </div>

                        <div className="text-center">
                            <span className="text-sm font-normal block">Republic of the Philippines</span>
                            <span className="text-base font-bold block">Department of Health</span>
                            <span className="font-bold text-lg block uppercase">Center for Health Development - Caraga</span>
                        </div>

                        <div className="flex-shrink-0">
                            <AppLogoBP />
                        </div>
                    </div>

                    <table className="table-auto w-full border border-black text-left">
                        <tbody>
                            <tr>
                                <th className="border border-black p-1">
                                    <div className="flex items-center space-x-6">
                                        <AppLogos />
                                        <div>
                                            <span className="text-xs font-normal block">Republic of the Philippines</span>
                                            <span className="text-base font-bold block">Department of Health</span>
                                            <span className="text-xs font-normal block">Kagawaran ng Kalusugan</span>
                                        </div>
                                    </div>
                                </th>


                                <th className="border border-black p-1 text-xs font-normal align-top">Family Serial Number</th>
                                <th className="border border-black p-1 text-xs font-normal align-top">Facility Code</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className="p-1 text-center font-bold text-xl" colSpan={6}>
                                    PATIENT ENROLLMENT RECORD
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    {/* I. PATIENT INFORMATION */}
                    <table className="table-auto w-full border border-black text-left">
                        <thead>
                            <tr className="bg-black text-white">
                                <th colSpan={6} className="p-2 font-semibold text-xs">
                                    I. Patient Information <span className='text-italic'><small className='italic'>(Impormasyon ng Pasyente)</small></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black p-1 text-xs">Last Name <br></br><small className='italic'>(Apelyedo)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_lname}</td>
                                <td className="border border-black p-1 text-xs">Suffix <br></br><small className='italic'>(e.g,Jr.,Sr.,II,III)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.suffix_code}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">First Name <br></br><small className='italic'>(Pangalan)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_fname}</td>
                                <td colSpan={3} className="border border-black p-1 text-xs "><small className='italic'>Please write Maiden Name (for married women)
                                    Pangalan sa pagkadalaga (para sa mga babaeng may asawa)</small>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Middle Name <br></br><small className='italic'>(Gitnang)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_mname}</td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">Data from Maiden Name</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Sex <br></br><small className='italic'>(Kasarian)</small></td>
                                <td className="border border-black p-1" colSpan={2}>
                                    <div className="flex gap-3 flex-wrap text-xs">
                                        {renderCheckbox('Female', patient.sex_code === 'F' ? 'Female' : '')}
                                        {renderCheckbox('Male', patient.sex_code === 'M' ? 'Male' : '')}
                                    </div>
                                </td>

                                <td className="border border-black p-1 text-xs">Mother`s Full Name <br></br><small className='italic'>(Kumpletong Pangalan ng Ina)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs">{patient.mot_fname} {patient.mot_mname} {patient.mot_lname}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">BirthDate <br></br><small className='italic'>(Petsa ng Kapanganakan/Edad)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{age}</td>
                                <td rowSpan={3} className="border border-black p-1 text-xs">Residential Address <br></br><small className='italic'>(Tirahan o Lokasyon)</small></td>
                                <td rowSpan={3} className="border border-black p-1 font-bold uppercase text-xs">{patient.patient_address}
                                    {patient.bgycode} {patient.citycode} {patient.provcode} {patient.regcode}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Birth Place <br></br> <small className='italic'>(Lugar ng Kapanganakan)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_birthplace}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Blood Type <br></br> <small className='italic'>(Uri ng Dugo)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs">{patient.bloodtype_code}</td>
                            </tr>
                            <tr>
                                <td rowSpan={3} className="border border-black p-1 text-xs">
                                    Civil Status <br />
                                    <small className="italic">(Katayuang Sibil)</small>
                                </td>
                                <td className="border border-black p-1" rowSpan={3} colSpan={2}>
                                    <div className="text-xs">
                                        <div className="flex gap-3 flex-wrap mb-1">
                                            {renderCheckbox('Single', patient.civil_stat_code === 'sin' ? 'Single' : '')}
                                            {renderCheckbox('Widower', patient.civil_stat_code === 'wid' ? 'Widower' : '')}
                                            {renderCheckbox('Married', patient.civil_stat_code === 'mar' ? 'Married' : '')}
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('Separated', patient.civil_stat_code === 'sep' ? 'Separated' : '')}
                                            {renderCheckbox('Annulled', patient.civil_stat_code === 'ann' ? 'Annulled' : '')}
                                            {renderCheckbox('Co-Habitation', patient.civil_stat_code === 'coh' ? 'Co-Habitation' : '')}
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-black p-1 text-xs">Contact Number <br></br> <small className='italic'>(Numero)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_mobile}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">DSWD NHTS?</td>
                                <td className="border border-black p-1">
                                    <div className="flex gap-3 flex-wrap text-xs">
                                        {renderCheckbox('Yes', 'Yes')}
                                        {renderCheckbox('No', 'sNo')}
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-black text-white">
                                <th colSpan={6} className="p-2 font-semibold text-xs">
                                    II. Spouse Information <small className='italic'>(Impormasyon ng Asawa if Applicable)</small>
                                </th>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Spouse`s Full Name <br></br> <small className='italic'>(Kumpletong Pangalan ng Asawa)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs"></td>
                                <td className="border border-black p-1 text-xs">Facility Household Number <br></br> <small className='italic'>(Numero ng Sambahayan ng Pasilidad)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs"></td>
                            </tr>
                            <tr className="bg-black text-white">
                                <th colSpan={6} className="p-2 font-semibold text-xs">
                                    III. Other Patient Information <small className='italic'>(Ibang Impormasyon)</small>
                                </th>
                            </tr>
                            <tr>
                                <td rowSpan={4} className="border border-black p-1 text-xs">Educational Attainment <br></br> <small className='italic'>(Pagkamit ng Edukasyon)</small></td>
                                <td className="border border-black p-1" rowSpan={4} colSpan={2}>
                                    <div className="text-xs">
                                        <div className="flex gap-3 flex-wrap mb-1">
                                            {renderCheckbox('No Formal Education', 'sSingle')}
                                            {renderCheckbox('Elementary', 'sWidower')}
                                            {renderCheckbox('High School', 'High School')}
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('Vocational', 'sSeparated')}
                                            {renderCheckbox('College', 'dcollege')}
                                            {renderCheckbox('Post Graduate', 'sCo-Habitation')}
                                        </div>
                                    </div>
                                </td>

                                <td className="border border-black p-1 text-xs">4Ps Member?</td>
                                <td className="border border-black p-1">
                                    <div className="flex gap-3 flex-wrap text-xs">
                                        {renderCheckbox('Yes', patient.type_of_membership === 'INP' ? 'Yes' : '')}
                                        {renderCheckbox('No', patient.type_of_membership === '' ? 'No' : '')}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Household No.: <br></br> <small className='italic'>(Numero ng Pasilidad)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs"></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Philhealth Member.: <br></br> <small className='italic'>(Miyembro ba ng Philhealth)</small></td>
                                <td className="border border-black p-1">
                                    <div className="flex gap-3 flex-wrap text-xs">
                                        {renderCheckbox('Yes', patient.phic_member === 'Y' ? 'Yes' : '')}
                                        {renderCheckbox('No', patient.phic_member === 'N' ? 'No' : '')}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Status Type <br></br> <small className='italic'>(Uri ng Pagkabilang)</small></td>
                                <td className="border border-black p-1">
                                    <div className="flex gap-3 flex-wrap text-xs">
                                        {renderCheckbox('Member', patient.philhealth_status_code === 'M' ? 'Member' : '')}
                                        {renderCheckbox('Dependent', patient.philhealth_status_code === 'D' ? 'Dependent' : '')}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={5} className="border border-black p-1 text-xs">Employment Status <br></br> <small className='italic'>(Katayuan ng Trabaho)</small></td>
                                <td className="border border-black p-1" rowSpan={5} colSpan={2}>
                                    <div className="text-xs">
                                        <div className="flex gap-3 flex-wrap mb-1">
                                            {renderCheckbox('Student', patient.occupation_code === 'Student' ? 'Student' : '')}
                                            {renderCheckbox('Unkown', patient.occupation_code === 'Unkown' ? 'Unkown' : '')}
                                            {renderCheckbox('Employed', patient.occupation_code === 'Employed' ? 'Employed' : '')}
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('None/Unemployed', patient.occupation_code === 'Unemployed' ? 'Unemployed' : '')}
                                            {renderCheckbox('Retired', patient.occupation_code === 'Retired' ? 'Retired' : '')}
                                        </div>
                                    </div>
                                </td>

                                <td className="border border-black p-1 text-xs">Philhealth No.: <br></br> <small className='italic'>(Numero ng Pagkabilang)</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs">{patient.pat_philhealth}</td>
                            </tr>
                            <tr>
                                <td rowSpan={4} className="border border-black p-1 text-xs">If Member, <br></br> <small className='italic'>please indicate category</small></td>
                                <td className="border border-black p-1 font-bold uppercase text-xs"><span>FE-Private:</span></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 font-bold uppercase text-xs"><span>FE-Government:</span></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1  uppercase text-xs"><span>IE:</span> <span className='font-bold text-xs'>{[patient.type_of_membership === 'INP' ? 'INDIGENT' : '']}</span></td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 font-bold uppercase text-xs"><span>Others:</span></td>
                            </tr>
                            <tr className="bg-black text-white">
                                <th colSpan={6} className="p-2 font-semibold text-xs">
                                    IV. FAMILY MEMBER <small className='italic'>(Impormasyon ng Pamilya)</small>
                                </th>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Father`s Full Name <br></br> <small className='italic'>(Kumpletong Pangalan Ng Ama)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.fat_fname} {patient.fat_mname} {patient.fat_lname}</td>
                                <td className="border border-black p-1 text-xs">Mother`s Full Name <br></br> <small className='italic'>(Kumpletong Pangalan Ng Ina)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.mot_fname} {patient.mot_mname} {patient.mot_lname}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Contact No.:<br></br> <small className='italic'>(Numero Ng Ama)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.fat_contact}</td>
                                <td className="border border-black p-1 text-xs">Contact No.:<br></br> <small className='italic'>(Numero Ng Ina)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.mot_contact}</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Adress: <br></br><small className='italic'>(Lokasyon Ng Ama)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.fat_address}</td>
                                <td className="border border-black p-1 text-xs">Address: <br></br><small className='italic'>(Lokasyon Ng Ina)</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs">{patient.mot_address}</td>
                            </tr>
                            <tr>
                                <td rowSpan={2} className="border border-black p-1 text-xs">Relationship to the Patient <br></br> <small className='italic'>(Kaugnayan sa Pasiyente)</small></td>
                                <td className="border border-black p-1" rowSpan={2} colSpan={2}>
                                    <div className="text-xs">
                                        <div className="flex gap-3 flex-wrap mb-1">
                                            {renderCheckbox('Father', '')}
                                            {renderCheckbox('Mother', '')}
                                            {renderCheckbox('Son', '')}
                                            {renderCheckbox('Daughter', '')}
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            {renderCheckbox('Son', '')}
                                            {renderCheckbox('Daughter', '')}
                                            {renderCheckbox('Guardian', '')}
                                        </div>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td className="border border-black p-1 text-xs">Primary Care Benefit <br></br> <small className='italic'>(PCB Member)?:</small></td>
                                <td colSpan={2} className="border border-black p-1 font-bold uppercase text-xs"></td>
                            </tr>

                            <tr className="bg-black text-white">
                                <th colSpan={6} className="p-2 font-semibold text-xs">
                                    V. PATIENT CONSENT <small className='italic'>(Pahintulot ng Pasyente)</small>
                                </th>
                            </tr>
                            <tr>
                                {/* English Consent */}
                                <td colSpan={3} className="border border-black p-1 text-xs align-top">
                                    <span className="block font-semibold">IN ENGLISH:</span>

                                    <p className="block text-center mt-1">
                                        I have read and understood the Patient’s Information. I have been made aware of its contents. During
                                        an informational communication, I was informed in a very comprehensible way about the essence and
                                        importance of the Integrated Clinic Information System (iClinicSys) by the CHO/RHU representative.
                                        All my questions during the conversation were answered sufficiently, and I had been given enough
                                        time to decide on this.
                                    </p>

                                    <p className="block text-center mt-2">
                                        Furthermore, I permit the CHO/RHU to encode the information concerning my person and the collected data
                                        regarding disease symptoms and consultation for the said information system.
                                    </p>
                                    <br></br>
                                    <p className="block text-center mt-2">
                                        I wish to be informed about the medical results concerning me personally or my direct descendants.
                                        Also, I can cancel my consent at the CHO/RHU anytime without giving reasons and without any disadvantage
                                        for my medical treatment.
                                    </p>
                                    <br></br><br></br>
                                    <div className="mt-4 flex justify-center items-end gap-4">
                                        <div>
                                            <p className="w-80 border-b font-bold text-center  uppercase border-black px-1 py-0.5 text-sm">
                                                {patient.pat_fname} {patient.pat_mname} {patient.pat_lname} - {new Date().toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-center text-xs ">SIGNATURE OF PATIENT / DATE</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Filipino Consent */}
                                <td colSpan={3} className="border border-black p-1 text-xs align-top">
                                    <span className="block font-semibold">SA PILIPINO:</span>

                                    <p className="block text-center mt-1">
                                        Nabasa at naunawaan ko ang Impormasyon ng Pasyente. Naipabatid sa akin ang nilalaman nito. Sa isang
                                        impormatibong pag-uusap, ipinaliwanag sa akin sa malinaw at madaling maintindihang paraan ng kinatawan
                                        mula sa CHO/RHU ang kahalagahan at layunin ng Integrated Clinic Information System (iClinicSys).
                                        Nasagot ang lahat ng aking mga katanungan at binigyan ako ng sapat na oras upang magpasya ukol dito.
                                    </p>
                                    <br></br>
                                    <p className="block text-center mt-2">
                                        Dagdag pa rito, pinahihintulutan ko ang CHO/RHU na i-encode ang impormasyon tungkol sa aking sarili at ang
                                        mga nakalap na datos kaugnay ng mga sintomas ng sakit at konsultasyon para sa nasabing sistema ng impormasyon.
                                    </p>
                                    
                                    <p className="block text-center mt-2">
                                        Nais kong maipabatid sa akin ang mga resulta ng medikal na pagsusuri na may kinalaman sa akin o sa aking mga
                                        direktang anak. Maaari ko ring bawiin ang aking pahintulot sa CHO/RHU anumang oras, nang hindi kinakailangang
                                        magbigay ng dahilan at nang walang magiging epekto o kapinsalaan sa aking gamutan.
                                    </p>
                                    <br></br><br></br>
                                    <div className="mt-4 flex justify-center items-end gap-4">
                                        <div>
                                            <p className="w-100 border-b font-bold text-center uppercase border-black px-1 py-0.5 text-sm">
                                                {patient.provider_name} - {new Date().toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-center font-bold text-xs">NAME OF CHO/RHU REPRESENTATIVE / DATE</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={6} className="border border-black p-1 text-xs text-right italic">iClinicSys Information System/Form 1</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default medabstractindex;
