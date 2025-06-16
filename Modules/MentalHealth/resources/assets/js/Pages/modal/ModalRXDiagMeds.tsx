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
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const pageSize = 5;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    // Filter and sort by latest date
    const filteredMeds = React.useMemo(
        () =>
            meds
                .slice()
                .sort((a, b) => new Date(b.phar_date).getTime() - new Date(a.phar_date).getTime())
                .filter(
                    (med) =>
                        (med.phar_date ? formatDate(med.phar_date).includes(search) : false) ||
                        (med.phar_med && med.phar_med.toLowerCase().includes(search.toLowerCase()))
                ),
        [meds, search]
    );
    const totalPages = Math.ceil(filteredMeds.length / pageSize);
    const paginatedMeds = React.useMemo(
        () =>
            filteredMeds.slice((page - 1) * pageSize, page * pageSize),
        [filteredMeds, page, pageSize]
    );

    React.useEffect(() => {
        setPage(1);
    }, [search]);

    return (
        <div className="printable max-h-[70vh] overflow-auto">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">
                    Prescriptions <span className="ml-2 font-normal text-green-700">(Total: {filteredMeds.length})</span>
                </span>
                <input
                    type="text"
                    placeholder="Search by date or medicine..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="italic rounded border border-gray-300 px-2 py-1 text-xs"
                />
            </div>
            <Table className="mb-4 w-full border-collapse border text-sm">
                <TableHeader className="sticky top-0 z-10 bg-gray-100">
                    <TableRow>
                        <TableHead className="bg-black text-white border p-2 text-left">Start Date</TableHead>
                        <TableHead className="bg-black text-white border p-2 text-left">Medicine</TableHead>
                        <TableHead className="bg-black text-white border p-2 text-left">Instructions</TableHead>
                        <TableHead className="bg-black text-white border p-2 text-left">Quantity</TableHead>
                        <TableHead className="bg-black text-white border p-2 text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedMeds.length > 0 ? (
                        paginatedMeds.map((med, index) => (
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
            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-2">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-xs text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                    className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ModalRXDiagMeds;