import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';

type PharmaType = {
    phar_id: number;
    phar_date: string;
    phar_med: string;
    phar_intake: string;
    phar_intakeUnit: string;
    phar_freq: string;
    phar_freqUnit: string;
    phar_dur: string;
    phar_durUnit: string;
    phar_quantity: string;
    phar_remarks?: string;
    phar_doc: string;
};


interface RxPrintProps {
    patient: {
        pat_fname: string;
        pat_mname: string;
        pat_lname: string;
        pat_address: string;
        bgycode: string;
        citycode: string;
        provcode: string;
        regcode: string;
        pat_birthDate: string;
    };
    date: string;
    meds: PharmaType[];

}

function getAgeDetail(birthDateString: string) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rx Modal',
        href: '#',
    },
];

const RxPrint: React.FC<RxPrintProps> = ({ patient, date, meds, facilities }) => {
    const facility = facilities && facilities.length > 0 ? facilities[0] : null;
    const phar_doc = meds.length > 0 ? meds[0].phar_doc : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescription Print" />

            <div className="p-4 space-y-4">
                <div className="w-[210mm] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-8 print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
                    <div className="w-full h-full text-black text-sm print:border-none p-4">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-6xl font-bold leading-none">℞</div>
                            <div className="text-center w-full -ml-16">
                                <h1 className="font-bold text-lg uppercase">
                                    {facility ? facility.facility_name : 'Facility Name'}
                                </h1>
                                <h2 className="font-semibold text-md uppercase">
                                    {facility ? facility.facility_location : 'Facility Location'}
                                </h2>
                                <div className="text-xs mt-1">
                                    {facility ? facility.provider_name : 'Provider Name'}
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <AppLogoDOH />
                            </div>
                        </div>

                        {/* Patient Info */}
                        <div className="grid grid-cols-2 text-sm gap-y-2 mb-4">
                            <div>
                                <span className="font-semibold">Patient:</span> {patient.pat_fname} {patient.pat_mname} {patient.pat_lname}
                            </div>
                            <div>
                                <span className="font-semibold">Date:</span>{' '}
                                {date
                                    ? new Date(date).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    })
                                    : ''}
                            </div>
                            <div>
                                <span className="font-semibold">Address:</span> {patient.pat_address} {patient.bgycode} {patient.citycode} {patient.provcode} {patient.regcode}
                            </div>
                            <div>
                                <span className="font-semibold">Age:</span>{' '}
                                {(() => {
                                    const { years, months, days } = getAgeDetail(patient.pat_birthDate);
                                    return `${years} year(s), ${months} month(s), ${days} day(s)`;
                                })()}
                            </div>
                        </div>

                        {/* Prescription Table */}
                        <table className="w-full border border-black text-sm text-center mb-6">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-black px-2 py-1">Medicine</th>
                                    <th className="border border-black px-2 py-1">Quantity</th>
                                    <th className="border border-black px-2 py-1">Frequency</th>
                                    <th className="border border-black px-2 py-1">Dose Regimen</th>
                                    <th className="border border-black px-2 py-1">Medication/Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meds.map((med, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black px-2 py-1 font-semibold">{med.phar_med}</td>
                                        <td className="border border-black px-2 py-1">{med.phar_quantity}</td>
                                        <td className="border border-black px-2 py-1">{`${med.phar_freq} ${med.phar_freqUnit}`}</td>
                                        <td className="border border-black px-2 py-1">{`${med.phar_intake} ${med.phar_intakeUnit} for ${med.phar_dur} ${med.phar_durUnit}`}</td>
                                        <td className="border border-black px-2 py-1">{med.phar_remarks || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Footer */}
                        <div className="text-right text-sm mt-12 leading-tight">
                            <p>
                                <span className="font-semibold">Prescribed By:</span>{' '}
                                <u>{phar_doc}</u>
                            </p>
                            <p>
                                <span className="font-semibold">License No:</span>{' '}
                                <u>4852632</u>
                            </p>
                            <p>
                                <span className="font-semibold">PTR No:</span>{' '}
                                <span className="inline-block min-w-[150px] border-b border-black"></span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default RxPrint;