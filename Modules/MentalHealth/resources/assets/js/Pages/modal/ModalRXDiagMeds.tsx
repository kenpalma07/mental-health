import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PharmaType } from '@/types';
import axios from 'axios';
import { Pencil, Printer, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface ModalRXDiagMedsProps {
    meds?: PharmaType[];
    patientId: number;
    onUpdate?: (updated: PharmaType) => void; // callback for updating
}

const formatNumber = (value: string | number) => {
    const num = parseFloat(value as string);
    if (isNaN(num)) return '';
    return num.toString();
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
};

const convertToHours = (value: number, unit: string) => {
    switch (unit) {
        case 'hour':
            return value;
        case 'day':
            return value * 24;
        case 'week':
            return value * 7 * 24;
        case 'month':
            return value * 30 * 24;
        default:
            return 0;
    }
};

const ModalRXDiagMedsEdit: React.FC<ModalRXDiagMedsProps> = ({ meds = [], patientId, onUpdate }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [editMed, setEditMed] = useState<PharmaType | null>(null);
    const [editFields, setEditFields] = useState<Partial<PharmaType>>({});
    const pageSize = 5;

    const [editQuantity, setEditQuantity] = useState<number>(0);
    const [localMeds, setLocalMeds] = useState<PharmaType[]>(meds);

    React.useEffect(() => {
        const intakeNum = parseFloat(editFields.phar_intake as string);
        const freqNum = parseFloat(editFields.phar_freq as string);
        const durNum = parseFloat(editFields.phar_dur as string);
        const freqUnit = editFields.phar_freqUnit || '';
        const durUnit = editFields.phar_durUnit || '';
        if (!isNaN(intakeNum) && !isNaN(freqNum) && !isNaN(durNum) && freqUnit && durUnit) {
            const freqInHours = convertToHours(freqNum, freqUnit);
            const durInHours = convertToHours(durNum, durUnit);
            if (freqInHours > 0) {
                const numDoses = Math.floor(durInHours / freqInHours);
                setEditQuantity(numDoses * intakeNum);
                setEditFields((prev) => ({
                    ...prev,
                    phar_quantity: String(numDoses * intakeNum), // <-- convert to string
                }));
            }
        }
    }, [editFields.phar_intake, editFields.phar_freq, editFields.phar_dur, editFields.phar_freqUnit, editFields.phar_durUnit]);

    // Filter and sort by latest date
    const filteredMeds = React.useMemo(
        () =>
            localMeds
                .slice()
                .sort((a, b) => new Date(b.phar_date).getTime() - new Date(a.phar_date).getTime())
                .filter(
                    (med) =>
                        (med.phar_date ? formatDate(med.phar_date).includes(search) : false) ||
                        (med.phar_med && med.phar_med.toLowerCase().includes(search.toLowerCase())),
                ),
        [localMeds, search],
    );
    const totalPages = Math.ceil(filteredMeds.length / pageSize);
    const paginatedMeds = React.useMemo(() => filteredMeds.slice((page - 1) * pageSize, page * pageSize), [filteredMeds, page, pageSize]);

    React.useEffect(() => {
        setPage(1);
    }, [search]);

    // Handle edit button click
    const handleEdit = (med: PharmaType) => {
        setEditMed(med);
        setEditFields({ ...med });
    };

    // Handle field change in modal
    const handleFieldChange = (field: keyof PharmaType, value: string) => {
        setEditFields((prev) => ({ ...prev, [field]: value }));
    };

    // Fetch updated medicines
    const fetchMeds = async () => {
        try {
            const response = await axios.get(`/pharma/rxView/${patientId}`);
            if (response.data && response.data.meds) {
                setLocalMeds(response.data.meds);
            }
        } catch (error) {
            alert('Failed to fetch updated medicines.');
        }
    };

    // Handle save/update
    const handleSave = async () => {
        if (editMed && editMed.id) {
            try {
                console.log('Sending to backend:', editFields);
                await axios.put(`/pharma/${editMed.id}`, editFields);
                alert('Medicine updated successfully!');
                await fetchMeds();
                if (onUpdate) onUpdate({ ...editMed, ...editFields });
            } catch (error: any) {
                alert('Failed to update medicine.');
                if (error.response) {
                    console.error(error.response.data);
                }
            }
        }
        setEditMed(null);
        setEditFields({});
    };

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
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs italic"
                />
            </div>
            <Table className="mb-4 w-full border-collapse border text-sm">
                <TableHeader className="sticky top-0 z-10 bg-gray-100">
                    <TableRow>
                        <TableHead className="border bg-black p-2 text-left text-white">Start Date</TableHead>
                        <TableHead className="border bg-black p-2 text-left text-white">Medicine</TableHead>
                        <TableHead className="border bg-black p-2 text-left text-white">Instructions</TableHead>
                        <TableHead className="border bg-black p-2 text-left text-white">Quantity</TableHead>
                        <TableHead className="border bg-black p-2 text-left text-white">Actions</TableHead>
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
                                    <Button variant="ghost" size="icon" className="text-yellow-600" title="Edit" onClick={() => handleEdit(med)}>
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
            <div className="mt-2 flex items-center justify-end gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-xs text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                    className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Edit Modal */}
            {editMed && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setEditMed(null)}>
                            <X size={20} />
                        </button>
                        <h2 className="mb-4 text-lg font-bold text-gray-700">Edit Prescription</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="mb-1 block text-xs font-semibold">Start Date</label>
                                <Input
                                    type="date"
                                    className="w-full rounded border bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                    value={editFields.phar_date || ''}
                                    onChange={(e) => handleFieldChange('phar_date', e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold">Medicine</label>
                                <Input
                                    type="text"
                                    className="w-full rounded border bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                    value={editFields.phar_med || ''}
                                    onChange={(e) => handleFieldChange('phar_med', e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Intake</label>
                                    <Input
                                        type="number"
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={formatNumber(editFields.phar_intake || '')}
                                        onChange={(e) => handleFieldChange('phar_intake', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Intake Unit</label>
                                    <Select value={editFields.phar_intakeUnit || ''} onValueChange={(v) => handleFieldChange('phar_intakeUnit', v)}>
                                        <SelectTrigger className="w-full rounded-md border p-2 text-xs">
                                            <SelectValue placeholder="Select Intake" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tablet">Tablet(s)</SelectItem>
                                            <SelectItem value="ampule">Ampule(s)</SelectItem>
                                            <SelectItem value="vial">Vial(s)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Frequency</label>
                                    <Input
                                        type="number"
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={formatNumber(editFields.phar_freq || '')}
                                        onChange={(e) => handleFieldChange('phar_freq', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Frequency Unit</label>
                                    <Select value={editFields.phar_freqUnit || ''} onValueChange={(v) => handleFieldChange('phar_freqUnit', v)}>
                                        <SelectTrigger className="w-full rounded-md border p-2 text-xs">
                                            <SelectValue placeholder="Select Frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hour">Hour(s)</SelectItem>
                                            <SelectItem value="day">Day(s)</SelectItem>
                                            <SelectItem value="week">Week(s)</SelectItem>
                                            <SelectItem value="month">Month(s)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Duration</label>
                                    <Input
                                        type="number"
                                        className="w-full rounded border px-2 py-1 text-xs"
                                        value={formatNumber(editFields.phar_dur || '')}
                                        onChange={(e) => handleFieldChange('phar_dur', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs font-semibold">Duration Unit</label>
                                    <Select value={editFields.phar_durUnit || ''} onValueChange={(v) => handleFieldChange('phar_durUnit', v)}>
                                        <SelectTrigger className="w-full rounded-md border p-2 text-xs">
                                            <SelectValue placeholder="Select Duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hour">Hour(s)</SelectItem>
                                            <SelectItem value="day">Day(s)</SelectItem>
                                            <SelectItem value="week">Week(s)</SelectItem>
                                            <SelectItem value="month">Month(s)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold">Quantity</label>
                                <Input
                                    type="number"
                                    className="w-full rounded border px-2 py-1 text-xs"
                                    value={editFields.phar_quantity ?? editQuantity}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditMed(null)}>
                                Cancel
                            </Button>
                            <Button variant="default" onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalRXDiagMedsEdit;
