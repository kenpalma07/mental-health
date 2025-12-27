import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Consultations, IndexConsultation, MasterPatient } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import * as React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BookCheckIcon, BookOpenText, Edit, Eye, NotebookPen, Send, Stethoscope } from 'lucide-react';
import ConsultPathead from '../components/ConsultPathead';
import EditConsultation from '../Consultation/EditConsultation';
import ViewConsultation from '../Consultation/ViewConsultation';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Search Patients', href: '/patients/create' },
    { title: 'Consultations', href: '/consultations' },
];

const ConsultationIndex: React.FC = () => {
    const { props } = usePage<{
        patient: MasterPatient;
        consultations: IndexConsultation[];
    }>();
    const patient = props.patient;
    const [showForm, setShowForm] = React.useState(false);
    const [consultations, setConsultations] = React.useState<IndexConsultation[]>(props.consultations || []);
    const [formData, setFormData] = React.useState({
        consult_date: '',
        consult_time: '',
        consult_type_code: '',
        consult_perm_id: '',
        type_service: '',
        to_consult_code: '',
        chief_complaint: '',
        pat_temperature: '',
        pat_heart_rate: '',
        pat_oxygen_sat: '',
        respiratoryRate: '',
        pat_height: '',
        pat_weight: '',
        pat_BMI: '',
        BMI_cat_code: '',
        pat_diastolic_pres: '',
        pat_systolic_pres: '',
    });

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [selectedConsultation, setSelectedConsultation] = React.useState<Consultations | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [viewConsultation, setViewConsultation] = React.useState<Consultations | null>(null);

    const [consultSearch, setConsultSearch] = React.useState('');
    const [consultPage, setConsultPage] = React.useState(1);
    const consultPageSize = 5;


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const filteredConsultations = React.useMemo(
        () =>
            consultations
                .slice()
                .sort((a, b) => new Date(b.consult_date).getTime() - new Date(a.consult_date).getTime())
                .filter((c) => {
                    const formatted = c.consult_date ? formatDate(c.consult_date) : '';
                    return formatted.includes(consultSearch);
                }),
        [consultations, consultSearch]
    );

    const consultTotalPages = Math.ceil(filteredConsultations.length / consultPageSize);
    const paginatedConsultations = React.useMemo(
        () =>
            filteredConsultations.slice(
                (consultPage - 1) * consultPageSize,
                consultPage * consultPageSize
            ),
        [filteredConsultations, consultPage, consultPageSize]
    );
    React.useEffect(() => {
        setConsultPage(1);
    }, [consultSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    React.useEffect(() => {
        const heightM = parseFloat(formData.pat_height) / 100;
        const weight = parseFloat(formData.pat_weight);

        if (!isNaN(heightM) && !isNaN(weight) && heightM > 0) {
            const bmiValue = weight / (heightM * heightM);
            const roundedBmi = bmiValue.toFixed(1);

            let category = '';
            if (bmiValue < 18.5) category = 'Underweight';
            else if (bmiValue < 24.9) category = 'Normal';
            else if (bmiValue < 29.9) category = 'Overweight';
            else category = 'Obese';

            setFormData((prev) => ({
                ...prev,
                pat_BMI: roundedBmi,
                BMI_cat_code: category,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                pat_BMI: '',
                BMI_cat_code: '',
            }));
        }
    }, [formData.pat_height, formData.pat_weight]);

    const handleSubmit = () => {
        if (!formData.consult_date || !formData.chief_complaint) return;

        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0]; // HH:mm:ss format

        const birthDate = new Date(patient.pat_birthDate);

        // Compute years, months, and days
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const newConsultation = {
            consult_date: formData.consult_date,
            consult_time: currentTime,
            consult_type_code: formData.consult_type_code,
            consult_perm_id: formData.consult_perm_id,
            to_consult_code: formData.to_consult_code,
            type_service: formData.type_service,
            chief_complaint: formData.chief_complaint,
            pat_temperature: parseFloat(formData.pat_temperature),
            pat_heart_rate: parseInt(formData.pat_heart_rate),
            pat_oxygen_sat: parseInt(formData.pat_oxygen_sat),
            respiratoryRate: parseInt(formData.respiratoryRate),
            pat_height: parseFloat(formData.pat_height),
            pat_weight: parseFloat(formData.pat_weight),
            pat_BMI: formData.pat_BMI,
            BMI_cat_code: formData.BMI_cat_code,
            pat_systolic_pres: parseInt(formData.pat_systolic_pres),
            pat_diastolic_pres: parseInt(formData.pat_diastolic_pres),
            master_patient_perm_id: patient.master_patient_perm_id,
            consult_temp_id: String(patient.id),
            pat_age_yr: years,
            pat_age_mo: months,
            pat_age_dy: days,
            patient_address_temp_id: `${patient.patient_address}, ${patient.provcode}, ${patient.citycode}, ${patient.bgycode}`,
        };

        router.post('/consultations/store', newConsultation, {
            onSuccess: () => {
                setConsultations((prev) => [...prev, newConsultation as IndexConsultation]);
                setFormData({
                    consult_date: '',
                    consult_time: '',
                    consult_type_code: '',
                    consult_perm_id: '',
                    to_consult_code: '',
                    type_service: '',
                    chief_complaint: '',
                    pat_temperature: '',
                    pat_heart_rate: '',
                    pat_oxygen_sat: '',
                    respiratoryRate: '',
                    pat_height: '',
                    pat_weight: '',
                    pat_BMI: '',
                    BMI_cat_code: '',
                    pat_systolic_pres: '',
                    pat_diastolic_pres: '',
                });
                setShowForm(false);
            },
            onError: (errors) => {
                console.error(errors);
                console.log(newConsultation);
            },
        });
    };

    const CONSULT_TYPE_LABELS: Record<string, string> = {
        followupvisit: 'Follow-up Visit',
        newconsultation: 'New Consultation',
        visited: 'Visited',
        walkin: 'Walk-in',
        referral: 'Referral',
        teleconsultation: 'Teleconsultation',
    };

    const SERVICE_TYPE_LABELS: Record<string, string> = {
        reass: 'Re-Assessment',
        dismeds: 'Dispensing Medicaton',
        psychoed: 'Psychoeducation',
        iniass: 'Initial Assessment',
        referral: 'Referral',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultations" />

            <ConsultPathead patient={patient} />

            <div className="space-y-4 p-4">
                <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-4 text-sm shadow-sm">
                    <div className="w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">Patient Consultations</div>

                    <div className="flex gap-1">
                        <Button onClick={() => setShowForm(!showForm)} className="bg-green-300 text-green-700 hover:bg-green-400" variant="outline">
                            <Stethoscope className="mr-2 h-4 w-4" /> {showForm ? 'Hide Assessment Form' : 'Add Consultation Form'}
                        </Button>

                        <Link
                            href={`/assessment/${patient.id}/history`}
                            className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition ${
                                consultations.length ? 'bg-green-300 text-green-700 hover:bg-green-400' : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                            <BookCheckIcon className="mr-2 h-4 w-4" />
                            Assessment List
                        </Link>
                    </div>

                    {/* Consultation List Search and Table */}
                    <div className="mb-2 flex items-center justify-between">
                        <span className="mb-1 mt-4 text-xs text-gray-700 font-bold">
                            Consultation List
                            <span className="ml-2 text-green-700 font-normal">
                                (Total: {filteredConsultations.length})
                            </span>
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 italic">Search by consultation date</span>
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={consultSearch}
                                onChange={e => setConsultSearch(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                    </div>

                    {showForm && (
                        <div className="bg-gray-48 mt-2 space-y-3 rounded-lg border p-4">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                                <div className="col-span-2 md:col-span-1">
                                    <Label htmlFor="consult_date">Date</Label>
                                    <Input
                                        id="consult_date"
                                        type="date"
                                        name="consult_date"
                                        value={formData.consult_date}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                                <div className="col-span-2 md:col-span-1">
                                    <Label htmlFor="consult_type_code">Consultation Type</Label>
                                    <Select
                                        value={formData.consult_type_code}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, consult_type_code: value }))}
                                        name="consult_type_code"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Consultation Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newconsultation">New Consultation</SelectItem>
                                            <SelectItem value="followupvisit">Follow-up Visit</SelectItem>
                                            <SelectItem value="visited">Visited</SelectItem>
                                            <SelectItem value="walkin">Walk-in</SelectItem>
                                            <SelectItem value="referral">Referred</SelectItem>
                                            <SelectItem value="teleconsultation">Teleconsultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <Label htmlFor="date">Consultation Case</Label>
                                    <Select
                                        value={formData.to_consult_code}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, to_consult_code: value }))}
                                        name="to_consult_code"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Consultation Case" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mentalhealth">Mental Health</SelectItem>
                                            <SelectItem value="other">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <Label htmlFor="date">Type of Services</Label>
                                    <Select
                                        value={formData.type_service}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, type_service: value }))}
                                        name="type_service"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Service Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="reass">Re-Assessment</SelectItem>
                                            <SelectItem value="dismeds">Dispensing Medicaton</SelectItem>
                                            <SelectItem value="psychoed">Psychoeducation</SelectItem>
                                            <SelectItem value="iniass">Initial Assessment</SelectItem>
                                            <SelectItem value="referral">Referral</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Label htmlFor="VitalSign">Vital Sign</Label>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Input name="pat_temperature" value={formData.pat_temperature} onChange={handleInputChange} placeholder="Temp (°C)" />

                                <Input
                                    name="pat_heart_rate"
                                    value={formData.pat_heart_rate}
                                    onChange={handleInputChange}
                                    placeholder="Heart Rate (bpm)"
                                />

                                <Input
                                    name="pat_oxygen_sat"
                                    value={formData.pat_oxygen_sat}
                                    onChange={handleInputChange}
                                    placeholder="O₂ Saturation (%)"
                                />

                                <Input
                                    name="respiratoryRate"
                                    value={formData.respiratoryRate}
                                    onChange={handleInputChange}
                                    placeholder="Respiratory Rate (rpm)"
                                />

                                <Input
                                    name="pat_systolic_pres"
                                    value={formData.pat_systolic_pres}
                                    onChange={handleInputChange}
                                    placeholder="Systolic (e.g. 110)"
                                />

                                <Input
                                    name="pat_diastolic_pres"
                                    value={formData.pat_diastolic_pres}
                                    onChange={handleInputChange}
                                    placeholder="Diastolic (e.g. 80)"
                                />
                            </div>

                            <Label htmlFor="BMI">BMI</Label>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <Input name="pat_height" value={formData.pat_height} onChange={handleInputChange} placeholder="Height (cm)" />

                                <Input name="pat_weight" value={formData.pat_weight} onChange={handleInputChange} placeholder="Weight (kg)" />

                                <div>
                                    <Input readOnly value={formData.pat_BMI} placeholder="BMI" className="w-full bg-gray-100" />
                                    <div className="mt-1 text-sm text-gray-600 italic">{formData.BMI_cat_code}</div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="chief_complaint">Chief Complaint</Label>
                                <Textarea
                                    id="chief_complaint"
                                    name="chief_complaint"
                                    value={formData.chief_complaint}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <Button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
                            >
                                <Send className="h-4 w-4" />
                                Submit Consultation
                            </Button>
                        </div>
                    )}

                    {filteredConsultations.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow">
                            <Table className="min-w-full border text-sm text-gray-700">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Health Number</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Date</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Notes</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Consultation Type</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Service Type</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2 text-center">Actions</TableHead>
                                        <TableHead className="text-xs uppercase bg-green-100 text-white-500 px-4 py-2">Assessment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedConsultations
                                        .sort((a, b) => new Date(b.consult_date).getTime() - new Date(a.consult_date).getTime())
                                        .map((item, index) => (
                                            <TableRow key={index} className="border-t bg-white text-sm hover:bg-gray-50">
                                                <TableCell className="px-4 py-2 font-semibold">{item.consult_perm_id}</TableCell>
                                                <TableCell className="px-4 py-2">{item.consult_date ? formatDate(item.consult_date) : ''}</TableCell>
                                                <TableCell className="px-4 py-2">{item.chief_complaint}</TableCell>
                                                <TableCell className="px-4 py-2">{CONSULT_TYPE_LABELS[item.consult_type_code] || item.consult_type_code}</TableCell>
                                                <TableCell className="px-4 py-2">{SERVICE_TYPE_LABELS[item.type_service]}</TableCell>
                                                <TableCell className="px-4 py-2 text-center">
                                                    <div className="inline-flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setViewConsultation({
                                                                    ...item,
                                                                    pat_temperature: String(item.pat_temperature ?? ''),
                                                                    pat_heart_rate: String(item.pat_heart_rate ?? ''),
                                                                    pat_oxygen_sat: String(item.pat_oxygen_sat ?? ''),
                                                                    respiratoryRate: String(item.respiratoryRate ?? ''),
                                                                    pat_height: String(item.pat_height ?? ''),
                                                                    pat_weight: String(item.pat_weight ?? ''),
                                                                    pat_systolic_pres: String(item.pat_systolic_pres ?? ''),
                                                                    pat_diastolic_pres: String(item.pat_diastolic_pres ?? ''),
                                                                } as unknown as Consultations);
                                                                setIsViewModalOpen(true);
                                                            }}
                                                            className="text-blue-600 hover:bg-blue-500"
                                                        >
                                                            <Eye size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedConsultation({
                                                                    ...item,
                                                                    pat_temperature: String(item.pat_temperature ?? ''),
                                                                    pat_heart_rate: String(item.pat_heart_rate ?? ''),
                                                                    pat_oxygen_sat: String(item.pat_oxygen_sat ?? ''),
                                                                    respiratoryRate: String(item.respiratoryRate ?? ''),
                                                                    pat_height: String(item.pat_height ?? ''),
                                                                    pat_weight: String(item.pat_weight ?? ''),
                                                                    pat_systolic_pres: String(item.pat_systolic_pres ?? ''),
                                                                    pat_diastolic_pres: String(item.pat_diastolic_pres ?? ''),
                                                                } as unknown as Consultations);
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="text-green-600 hover:bg-green-500"
                                                        >
                                                            <Edit size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-2">
                                                    {item.consult_type_code === 'followupvisit' ? (
                                                        item.hasDispense ? (
                                                            <Link
                                                                href={`/patitrforms/${patient.id}?consult_date=${item.consult_date}`}
                                                                className="inline-flex items-center gap-2 rounded border border-green-600 px-3 py-1 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                            >
                                                                <BookOpenText className="h-4 w-4" />
                                                                Done | View Form
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={`/assessment/${patient.id}/followupAssessment?consult_date=${item.consult_date}`}
                                                                className="inline-flex items-center gap-2 rounded border border-green-600 px-3 py-1 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                            >
                                                                <NotebookPen className="h-4 w-4" />
                                                                Dispense Medicine
                                                            </Link>
                                                        )
                                                    ) : item.hasAssessment ? (
                                                        <Link
                                                            href={`/patitrforms/${patient.id}?consult_date=${item.consult_date}`}
                                                            className="inline-flex items-center gap-2 rounded border border-green-600 px-3 py-1 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                        >
                                                            <BookOpenText className="h-4 w-4" />
                                                            Done | View Form
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={`/assessment/${patient.id}/addAssessment?consult_date=${item.consult_date}`}
                                                            className="inline-flex items-center gap-2 rounded border border-green-600 px-3 py-1 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                        >
                                                            <NotebookPen className="h-4 w-4" />
                                                            Fill Assessment Tool
                                                        </Link>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {/* Pagination */}
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setConsultPage((p) => Math.max(p - 1, 1))}
                                        disabled={consultPage === 1}
                                        className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-xs text-gray-600">
                                        Page {consultPage} of {consultTotalPages}
                                    </span>
                                    <button
                                        onClick={() => setConsultPage((p) => Math.min(p + 1, consultTotalPages))}
                                        disabled={consultPage === consultTotalPages}
                                        className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 text-center text-gray-500">No consultations found for this patient.</div>
                    )}
                </div>
            </div>
            {/* ...existing modals... */}
            {viewConsultation && (
                <ViewConsultation
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setViewConsultation(null);
                    }}
                    consultation={viewConsultation}
                />
            )}
            {selectedConsultation && (
                <EditConsultation
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedConsultation(null);
                    }}
                    editconsultation={selectedConsultation}
                    onSubmit={(data) =>
                        router.put(`/consultations/${selectedConsultation.id}`, data, {
                            onSuccess: () => {
                                setIsEditModalOpen(false);
                                setSelectedConsultation(null);
                                router.visit(window.location.href, { replace: true });
                            },
                        })
                    }
                />
            )}
        </AppLayout>
    );
};

export default ConsultationIndex;
