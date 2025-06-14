import { Button } from '@/components/ui/button';
import { PharmaType } from '@/types';
import { Pencil, Printer, Trash2 } from 'lucide-react';
import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface ModalRXDiagMedsProps {
    meds?: PharmaType[];
    patientId: number;
}

const formatNumber = (value: string | number) => {
    const num = parseFloat(value as string);
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const ModalRXDiagMeds: React.FC<ModalRXDiagMedsProps> = ({ meds = [], patientId }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };
    return (
        <div className="printable max-h-[70vh] overflow-auto">
            <Table className="mb-4 w-full border-collapse border text-sm">
                <TableHeader className="sticky top-0 z-10 bg-gray-100">
                    <TableRow>
                        <TableHead className="border p-2 text-left">Start Date</TableHead>
                        <TableHead className="border p-2 text-left">Medicine</TableHead>
                        <TableHead className="border p-2 text-left">Instructions</TableHead>
                        <TableHead className="border p-2 text-left">Quantity</TableHead>
                        <TableHead className="border p-2 text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meds.length > 0 ? (
                        meds.map((med, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                                <TableCell className="border p-2 text-xs">{med.phar_date ? formatDate(med.phar_date) : ''}</TableCell>
                                <TableCell className="border p-2 text-xs">{med.phar_med}</TableCell>
                                <TableCell className="border p-2 text-xs">
                                    {`${formatNumber(med.phar_intake)} ${med.phar_intakeUnit} every ${formatNumber(med.phar_freq)} ${med.phar_freqUnit}, for ${formatNumber(med.phar_dur)} ${med.phar_durUnit}`}
                                </TableCell>
                                <TableCell className="border p-2 text-xs">{formatNumber(med.phar_quantity)}</TableCell>
                                <TableCell className="space-x-2 border p-2">
                                    <Button asChild variant="ghost" size="icon" className="text-blue-600" title="Print">
                                        <a
                                            href={`/RxPrint/${patientId}?date=${encodeURIComponent(med.phar_date)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Printer size={20} />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-yellow-600" title="Edit">
                                        <Pencil size={20} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600" title="Delete">
                                        <Trash2 size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="p-4 text-center text-gray-500">
                                No prescriptions available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ModalRXDiagMeds;