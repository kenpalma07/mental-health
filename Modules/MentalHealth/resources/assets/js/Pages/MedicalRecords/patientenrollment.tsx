import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogos from '@/components/app-logo-itr';

const breadcrumbs: BreadcrumbItem[] = [
    {

        title: 'Patient Enrollment Form',
        href: '#',
    },
];
const renderCheckbox = (label: string, selectedList: string) => {
    const normalizedSelected =
        selectedList?.split(',').map(item => item.trim().toLowerCase().replace(/[\s-]/g, '')) || [];
    const normalizedLabel = label.toLowerCase().replace(/[\s-]/g, '');

    // Special logic for "Visited"
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

const medabstractindex: React.FC = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollment Form" />
            <div className="p-6 bg-white shadow rounded-md text-sm">

                <div className="flex items-center justify-center gap-4 w-full">
                    {/* Left Logo */}
                    <div className="flex-shrink-0">
                        <AppLogoDOH />
                    </div>

                    {/* Center Text */}
                    <div className="text-center">
                        <span className="text-sm font-normal block">Republic of the Philippines</span>
                        <span className="text-base font-bold block">Department of Health</span>
                        <span className="font-bold text-lg block uppercase">Center for Health Development - Caraga</span>
                    </div>

                    {/* Right Logo */}
                    <div className="flex-shrink-0">
                        <AppLogoBP />
                    </div>
                </div>

                <table className="table-auto w-full border border-black text-left">
                    <tbody>
                        <tr>
                            <th className="border border-black p-1">
                                <div className="flex items-center space-x-2">
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
                                I. Patient Information <span className='text-italic'>(Impormasyon ng Pasyente)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 text-xs">Last Name (Apelyedo)</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">sdsdsds</td>
                            <td className="border border-black p-1 text-xs">Suffix (e.g,Jr.,Sr.,II,III)</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">dsdsdsd</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">First Name (Pangalan)</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">sdsds</td>
                            <td colSpan={3} className="border border-black p-1 text-xs">Please write Maiden Name (for married women)
                                Pangalan sa pagkadalaga (para sa mga babaeng may asawa)
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Middle Name (Gitnang)</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">sdsdsds</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">dsdsdsd</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Sex (Kasarian)</td>
                            <td className="border border-black p-1" colSpan={2}>
                                <div className="flex gap-3 flex-wrap">
                                    {renderCheckbox('Female (Babae)', 'Female')}
                                    {renderCheckbox('Male (Lalaki)', 'Male')}
                                </div>
                            </td>
                            <td className="border border-black p-1 text-xs">Mother`s Full Name</td>
                            <td className="border border-black p-1 font-bold uppercase">dsdsdsd</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">BirthDate</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">01/01/2000</td>
                            <td rowSpan={3} className="border border-black p-1 text-xs">Residential Address</td>
                            <td rowSpan={3} className="border border-black p-1 font-bold uppercase">dsdsdsd</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Birth Place</td>
                            <td className="border border-black p-1 font-bold uppercase">sample Address</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Blood Type</td>
                            <td className="border border-black p-1 font-bold uppercase">sample Address</td>
                        </tr>
                        <tr>
                            <td rowSpan={3} className="border border-black p-1 text-xs">Civil Status</td>
                            <td className="border border-black p-1" rowSpan={3} colSpan={2}>
                                <div className="flex gap-3 flex-wrap">
                                    {renderCheckbox('Single', 'sSingle')}
                                    {renderCheckbox('Widower', 'sWidower')}
                                    {renderCheckbox('Married', 'Married')}
                                    {renderCheckbox('Separated', 'sSeparated')}
                                    {renderCheckbox('Annulled', 'sAnnulled')}
                                    {renderCheckbox('Co-Habitation', 'sCo-Habitation')}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Contact Number</td>
                            <td className="border border-black p-1 font-bold uppercase">09107145822</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">DSWD NHTS?</td>
                            <td className="border border-black p-1">
                                <div className="flex gap-3 flex-wrap">
                                    {renderCheckbox('Yes', 'Yes')}
                                    {renderCheckbox('No', 'sNo')}
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-black text-white">
                            <th colSpan={6} className="p-2 font-semibold text-xs">
                                II. Spouse Information <span className='text-italic'>(Impormasyon ng Asawa if Applicable)</span>
                            </th>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-xs">Spouse`s Full Name</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">sdsdsds</td>
                            <td className="border border-black p-1 text-xs">Facility Household Number</td>
                            <td colSpan={2} className="border border-black p-1 font-bold uppercase">House145522</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default medabstractindex;
