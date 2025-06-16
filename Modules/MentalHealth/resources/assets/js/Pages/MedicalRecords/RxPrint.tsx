import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, MasterPatient, PharmaType } from '@/types';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface RxPrintProps {
    patient: MasterPatient
    date: string;
    meds: PharmaType[];
}

function formatValue(val: string | number) {
    const num = typeof val === 'number' ? val : parseFloat(val);
    if (Number.isNaN(num)) return val;
    return num % 1 === 0 ? num.toString() : num.toString();
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
        title: 'Prescription Form',
        href: '#',
    },
];

const RxPrint: React.FC<RxPrintProps> = ({ patient, date, meds }) => {
    const phar_doc = meds.length > 0 ? meds[0].phar_doc : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescription Print" />

            <div className="p-4 space-y-4">
                <div className="w-[210mm] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-8 print:scale-100 print:shadow-none print:rounded-none print:p-0 print:m-0">
                    <div className="w-full h-full text-black text-sm print:border-none p-4">

                        <div className="flex justify-between items-start mb-4">
                            <div className="text-6xl font-bold leading-none">℞</div>
                            <div className="text-center w-full -ml-16">
                                <div className="font-bold text-lg uppercase">
                                    {patient.provider_name || 'Provider Name'}
                                </div>
                                <h1 className="font-semibold text-md uppercase">
                                    {patient.facility_name || 'Facility Name'}
                                </h1>
                                <h2 className="text-md uppercase">
                                    {patient.facility_location || 'Facility Location'}
                                </h2>
                            </div>

                            <div className="flex-shrink-0">
                                <AppLogoDOH />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-sm gap-y-2 mb-4">
                            <div>
                                <span className="font-semibold text-xs">Patient:</span>
                                <span className='text-xs'>{patient.pat_fname} {patient.pat_mname} {patient.pat_lname}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-xs">Date:</span>{' '}
                                <span className='text-xs'> {date
                                    ? new Date(date).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    })
                                    : ''}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-xs">Address:</span>
                                <span className='text-xs'>{patient.patient_address} {patient.bgycode} {patient.citycode} {patient.provcode} {patient.regcode}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-xs">Age:</span>{' '}
                                <span className='text-xs'> {(() => {
                                    const { years, months, days } = getAgeDetail(patient.pat_birthDate);
                                    return `${years} year(s), ${months} month(s), ${days} day(s)`;
                                })()}</span>
                            </div>
                        </div>

                        <Table className="w-full border border-black text-sm text-center mb-6">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border bg-black text-white px-2 py-1">Medicine</TableHead>
                                    <TableHead className="border bg-black text-white px-2 py-1">Quantity</TableHead>
                                    <TableHead className="border bg-black text-white px-2 py-1">Duration</TableHead>
                                    <TableHead className="border bg-black text-white px-2 py-1">Dose Regimen (Intake|Frequency)</TableHead>
                                    <TableHead className="border bg-black text-white px-2 py-1">Medication/Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {meds.map((med, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell className="border border-black px-2 py-1 font-semibold text-xs">{med.phar_med}</TableCell>
                                        <TableCell className="border border-black px-2 py-1 text-xs">{formatValue(med.phar_quantity)}</TableCell>
                                        <TableCell className="border border-black px-2 py-1 text-xs">{`${formatValue(med.phar_dur)} ${med.phar_durUnit}`}</TableCell>
                                        <TableCell className="border border-black px-2 py-1 text-xs">{`${formatValue(med.phar_intake)} ${med.phar_intakeUnit} in every ${formatValue(med.phar_freq)} ${med.phar_freqUnit}`}</TableCell>
                                        <TableCell className="border border-black px-2 py-1 text-xs">{med.phar_remarks || ''}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="text-right text-sm mt-12 leading-tight">
                            <p>
                                <span className="font-semibold text text-xs">Prescribed By:</span>{' '}
                                <u>{phar_doc}</u>
                            </p>
                            <p>
                                <span className="font-semibold text-xs">License No:</span>{' '}
                                <u>4852632</u>
                            </p>
                            <p>
                                <span className="font-semibold text-xs">PTR No:</span>{' '}
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