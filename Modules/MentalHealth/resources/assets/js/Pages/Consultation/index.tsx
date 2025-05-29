import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Consultations } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BookCheckIcon, BookOpenText, Edit, Eye, NotebookPen, Send, Stethoscope } from 'lucide-react';
import ConsultPathead from '../components/ConsultPathead';
import EditConsultation from '../Consultation/EditConsultation';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Search Patients', href: '/patients/create' },
    { title: 'Consultations', href: '/consultations' },
];

const ConsultationIndex: React.FC = () => {
    const { props } = usePage<{
        patient: {
            id: number;
            consult_perm_id: string;
            pat_birthDate: string;
            master_patient_perm_id: string;
            pat_fname: string;
            pat_mname: string;
            pat_lname: string;
            sex_code: string;
            civil_stat_code: string;
            patient_address: string;
            provcode: string;
            citycode: string;
            bgycode: string;
            fat_address: string;
            mot_fname: string;
            mot_mname: string;
            mot_lname: string;
            fat_fname: string;
            fat_mname: string;
            fat_lname: string;
            ts_created_at: string;
        };
        consultations: Consultation[];
    }>();
    const patient = props.patient;
    const [showForm, setShowForm] = React.useState(false);
    type Consultation = {
        consult_date: string;
        consult_time: string;
        consult_perm_id: string;
        consult_type_code: string;
        type_service: string;
        to_consult_code: string;
        chief_complaint: string;
        pat_temperature: number;
        pat_heart_rate: number;
        pat_oxygen_sat: number;
        respiratoryRate: number;
        pat_height: number;
        pat_weight: number;
        pat_BMI: string;
        BMI_cat_code: string;
        pat_systolic_pres: number;
        pat_diastolic_pres: number;
        hasAssessment?: boolean;
    };

    const [consultations, setConsultations] = React.useState<Consultation[]>(props.consultations || []);
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

    const handleEdit = (editconsultation: Consultations) => {
        setSelectedConsultation(editconsultation);
        setIsEditModalOpen(true);
    };

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
            pat_temperature: parseFloat(formData.pat_temperature), // Ensure it's a number
            pat_heart_rate: parseInt(formData.pat_heart_rate), // Ensure it's a number
            pat_oxygen_sat: parseInt(formData.pat_oxygen_sat), // Ensure it's a number
            respiratoryRate: parseInt(formData.respiratoryRate), // Ensure it's a number
            pat_height: parseFloat(formData.pat_height), // Ensure it's a number
            pat_weight: parseFloat(formData.pat_weight), // Ensure it's a number
            pat_BMI: formData.pat_BMI,
            BMI_cat_code: formData.BMI_cat_code,
            pat_systolic_pres: parseInt(formData.pat_systolic_pres), // Ensure it's a number
            pat_diastolic_pres: parseInt(formData.pat_diastolic_pres), // Ensure it's a number
            master_patient_perm_id: patient.master_patient_perm_id,
            consult_temp_id: String(patient.id),
            pat_age_yr: years,
            pat_age_mo: months,
            pat_age_dy: days,
            patient_address_temp_id: `${patient.patient_address}, ${patient.provcode}, ${patient.citycode}, ${patient.bgycode}`,
        };

        router.post('/consultations/store', newConsultation, {
            onSuccess: () => {
                setConsultations((prev) => [...prev, newConsultation as Consultation]);
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
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

                    {consultations.length > 0 ? (
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border text-left text-sm text-gray-700">
                                <thead className="text-white-500 bg-green-100 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-2">Health Number</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Notes</th>
                                        <th className="px-4 py-2">Consultation Type</th>
                                        <th className="px-4 py-2">Service Type</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                        <th className="px-4 py-2">Assessment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...consultations]
                                        .sort((a, b) => new Date(b.consult_date).getTime() - new Date(a.consult_date).getTime())
                                        .map((item, index) => (
                                            <tr key={index} className="border-t bg-white text-sm hover:bg-gray-50">
                                                <td className="px-4 py-2 font-semibold">{item.consult_perm_id}</td>
                                                <td className="px-4 py-2">{item.consult_date ? formatDate(item.consult_date) : ''}</td>
                                                <td className="px-4 py-2">{item.chief_complaint}</td>
                                                <td className="px-4 py-2">{CONSULT_TYPE_LABELS[item.consult_type_code] || item.consult_type_code}</td>
                                                <td className="px-4 py-2">{item.type_service}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <div className="inline-flex items-center justify-center gap-2">
                                                        <Button variant="outline" onClick={() => index} className="text-blue-600 hover:bg-blue-500">
                                                            <Eye size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedConsultation({
                                                                    ...item,
                                                                    id: (item as any).id ?? '', // fallback if id is missing
                                                                    consult_temp_id: (item as any).consult_temp_id ?? '',
                                                                });
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="text-green-600 hover:bg-green-500"
                                                        >
                                                            <Edit size={16} />
                                                        </Button>
                                                        {/* <Button variant="outline" onClick={() => index} className="text-red-600 hover:bg-red-500">
                                                            <Trash size={16} />
                                                        </Button> */}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    {/* Conditionally render button based on hasAssessment flag */}
                                                    {item.hasAssessment ? (
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
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="mt-4 text-center text-gray-500">No consultations found for this patient.</div>
                    )}
                </div>
            </div>
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
