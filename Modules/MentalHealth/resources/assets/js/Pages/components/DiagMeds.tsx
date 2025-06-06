import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { MasterPatient, Consultations, Employee } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { NotebookPen, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import icd10Data from '../json/Mental_Health_icd_10_code.json';
import mentalHealthMeds from '../json/mental_health_meds.json';
import ModalDiagMedsEnc from '../modal/ModalDiagMedsEnc';
import ModalRXDiagMeds from '../modal/ModalRXDiagMeds';
import { router } from '@inertiajs/react';
import axios from 'axios';

const DiagMeds = ({
    employees,
    consultation,
    patient,
    selectedDiagnosis,
    setSelectedDiagnosis,
    selectedIcdCode,
    setSelectedIcdCode,
    selectedIcdCodeDescrip,
    setSelectedIcdCodeDescrip,
    selectedMedicine,
    setSelectedMedicine,
    intake,
    setIntake,
    intakeUnit,
    setIntakeUnit,
    frequency,
    setFrequency,
    frequencyUnit,
    setFrequencyUnit,
    duration,
    setDuration,
    durationUnit,
    setDurationUnit,
    pharDate,
    setPharDate,
    quantity,
    setQuantity,
    doctor,
    setDoctor,
    setDispense,
    remarks,
    setRemarks,
}: {
    employees: Employee[];
    consultation: Consultations;
    patient: MasterPatient;
    selectedDiagnosis: string;
    setSelectedDiagnosis: React.Dispatch<React.SetStateAction<string>>;
    selectedIcdCode: string;
    setSelectedIcdCode: React.Dispatch<React.SetStateAction<string>>;
    selectedMedicine: string;
    selectedIcdCodeDescrip: string;
    setSelectedIcdCodeDescrip: React.Dispatch<React.SetStateAction<string>>;
    setSelectedMedicine: React.Dispatch<React.SetStateAction<string>>;
    intake: string;
    setIntake: React.Dispatch<React.SetStateAction<string>>;
    intakeUnit: string;
    setIntakeUnit: React.Dispatch<React.SetStateAction<string>>;
    frequency: string;
    setFrequency: React.Dispatch<React.SetStateAction<string>>;
    frequencyUnit: string;
    setFrequencyUnit: React.Dispatch<React.SetStateAction<string>>;
    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
    durationUnit: string;
    setDurationUnit: React.Dispatch<React.SetStateAction<string>>;
    pharDate: string;
    setPharDate: React.Dispatch<React.SetStateAction<string>>;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    doctor: string;
    setDoctor: React.Dispatch<React.SetStateAction<string>>;
    dispense: string;
    setDispense: React.Dispatch<React.SetStateAction<string>>;
    remarks: string;
    setRemarks: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const diagnoses = [
        { label: 'Depression', icdKey: 'depression' },
        { label: 'Psychoses', icdKey: 'psychoses' },
        { label: 'Epilepsy', icdKey: 'epilepsy' },
        { label: 'Behavioural Disorders', icdKey: 'behavioral_disorder' },
        { label: 'Developmental Disorders', icdKey: 'developmental_disorder' },
        { label: 'Dementia', icdKey: 'dementia' },
        { label: 'Alcohol Use Disorder', icdKey: 'alcohol_use_disorder' },
        { label: 'Drug Use Disorder', icdKey: 'drug_use_disorder' },
        { label: 'Self-Harm/Suicide', icdKey: 'self_harm_suicide' },
    ];


    const employeeOptions = employees.map(emp => ({
        ...emp,
        name: emp.name,
        position: emp.position,
    }));

    const medicines = selectedDiagnosis ? mentalHealthMeds[selectedDiagnosis as keyof typeof mentalHealthMeds] || [] : [];

    useEffect(() => {
        const description = icd10Data[selectedDiagnosis as keyof typeof icd10Data]?.find((item) => item.code === selectedIcdCode)?.description || '';
        setSelectedIcdCodeDescrip(description);
    }, [selectedDiagnosis, selectedIcdCode, setSelectedIcdCodeDescrip]);

    const dispenses = [
        { id: 'Y', name: 'Yes' },
        { id: 'N', name: 'No' },
    ];

    // Function to convert any unit to hours
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

    const calculateTotalQuantity = React.useCallback(() => {
        const intakeNum = parseFloat(intake);
        const frequencyNum = parseFloat(frequency);
        const durationNum = parseFloat(duration);

        if (isNaN(intakeNum) || isNaN(frequencyNum) || isNaN(durationNum)) return 0;

        const frequencyInHours = convertToHours(frequencyNum, frequencyUnit);
        const durationInHours = convertToHours(durationNum, durationUnit);

        if (frequencyInHours === 0) return 0;

        const numDoses = Math.floor(durationInHours / frequencyInHours);
        return numDoses * intakeNum;
    }, [intake, frequency, duration, frequencyUnit, durationUnit]);

    useEffect(() => {
        const totalQuantity = calculateTotalQuantity();
        setQuantity(totalQuantity);
    }, [intake, frequency, duration, frequencyUnit, durationUnit, calculateTotalQuantity, setQuantity]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isrxModalOpen, setRxIsModalOpen] = useState(false);
    const [rxList, setRxList] = useState();

    const fetchRxList = async () => {
        try {
            const response = await axios.get(`/pharma/rxView/${patient.id}`);
            const meds = response.data.meds;
            setRxList(meds);
            setRxIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching RX data:", error);
        }
    };

    const handleSaveMedicine = () => {
        const payload = {
            patient_assess_phar_id: consultation?.consult_perm_id ?? '',
            phar_date: pharDate,
            pat_perm_id: String(patient.id),
            phar_med: selectedMedicine,
            phar_intake: intake,
            phar_intakeUnit: intakeUnit,
            phar_freq: frequency,
            phar_freqUnit: frequencyUnit,
            phar_dur: duration,
            phar_durUnit: durationUnit,
            phar_quantity: quantity,
            phar_doc: doctor,
            phar_remarks: remarks,
            registered_at: pharDate,
        };

        router.post('/pharma/store', payload, {
            onSuccess: () => {
                alert('Medicine Successfully Save!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Error saving medicine');
            },
        });
    };

    return (
        <div className="bg-gray-48 mt-2 space-y-3 rounded-lg border p-4">
            <div className="flex w-full items-center rounded-t-lg bg-blue-500 px-4 py-3">
                <h6 className="w-full text-lg font-semibold text-white">
                    III. Continuation of Manage MNS Assessment
                    <span className="text-sm text-white italic"> (refer to mhGAP-IG version 2.0 p.11)</span>
                </h6>
            </div>
            {/* Diagnosis Section */}
            <div className="mt-2 space-y-3 rounded-lg border p-4">
                <h4 className="text-xl font-semibold text-gray-700">Diagnosis</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Diagnosis Field */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">Diagnosis</Label>
                        <Select value={selectedDiagnosis} onValueChange={(value) => setSelectedDiagnosis(value)} name="diagnosis_code">
                            <SelectTrigger className="w-full rounded-md border p-2">
                                <SelectValue placeholder="-- Select Diagnosis --">{selectedDiagnosis}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {diagnoses.map((d) => (
                                    <SelectItem key={d.icdKey} value={d.icdKey}>
                                        {d.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ICD-10 Code Field */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">ICD-10 Code</Label>
                        <Select value={selectedIcdCode} onValueChange={(value) => setSelectedIcdCode(value)} name="icd_code">
                            <SelectTrigger className="w-full rounded-md border p-2">
                                <SelectValue placeholder="-- Select ICD-10 Code --" defaultValue={selectedIcdCode} aria-label={selectedIcdCode}>
                                    {selectedIcdCode}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                {(icd10Data[selectedDiagnosis as keyof typeof icd10Data] || [])
                                    .filter(item => item.code)
                                    .map((item) => (
                                        <SelectItem key={item.code} value={item.code}>
                                            {item.code} - {item.description}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description Field */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">Description</Label>
                        <Textarea className="mt-1 w-full rounded-md border p-2 text-sm" rows={6} readOnly value={selectedIcdCodeDescrip} />
                    </div>
                </div>
            </div>

            {/* Medicine Section */}
            <div className="mt-2 space-y-3 rounded-lg border p-4">
                <h4 className="text-xl font-semibold text-gray-700">Medicine</h4>
                <div className="flex items-end gap-4">
                    {/* Date Issued */}
                    <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-700">Date Issued</h5>
                        <Input
                            type="date"
                            className="w-full rounded-md border p-2"
                            value={pharDate}
                            onChange={(e) => setPharDate(e.target.value)}
                        />
                    </div>

                    <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-700">Recommended Medicine</Label>
                        <Select value={selectedMedicine} onValueChange={setSelectedMedicine} name="recommended_medicine">
                            <SelectTrigger className="w-full rounded-md border p-2">
                                <SelectValue placeholder="-- Select Medicine --" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicines.map((med, idx) =>
                                    med.name ? (
                                        <SelectItem key={idx} value={med.name}>
                                            {med.name}
                                        </SelectItem>
                                    ) : null
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-80">
                        <Label className="text-sm font-medium text-gray-700">Rx Prescription List</Label>
                        <Button
                            onClick={fetchRxList}
                            className="flex w-full items-center gap-2 rounded-md bg-green-600 p-2 text-sm text-white hover:bg-green-700"
                        >
                            <NotebookPen size={16} className="text-white" />
                            Rx List
                        </Button>
                    </div>

                    <div className="w-80">
                        <Label className="text-sm font-medium text-gray-700">Medication Dispense History</Label>
                        <Button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="flex w-full items-center gap-2 rounded-md bg-green-600 p-2 text-sm text-white hover:bg-green-700"
                        >
                            <NotebookPen size={16} className="text-white" />
                            Dispense List
                        </Button>
                    </div>
                </div>

                {/* Intake, Frequency, Duration Inputs */}
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={intake}
                                    onChange={(e) => setIntake(e.target.value)}
                                    className="w-40 rounded-md border p-2"
                                    placeholder="e.g. 1,2,3"
                                />
                                <Select value={intakeUnit} onValueChange={setIntakeUnit}>
                                    <SelectTrigger className="w-full rounded-md border p-2">
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

                        <div className="flex-1">
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-40 rounded-md border p-2"
                                    placeholder="e.g. 1,2,3"
                                />
                                <Select value={frequencyUnit} onValueChange={setFrequencyUnit}>
                                    <SelectTrigger className="w-full rounded-md border p-2">
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

                        <div className="flex-1">
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-40 rounded-md border p-2"
                                    placeholder="e.g. 1,2,3"
                                />
                                <Select value={durationUnit} onValueChange={setDurationUnit}>
                                    <SelectTrigger className="w-full rounded-md border p-2">
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
                    </div>
                </div>

                <div className="mt-4 flex gap-4">
                    {/* Total Quantity */}
                    <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-700">Total Quantity</h5>
                        <Input className="w-full rounded-md border p-2" name="phar_quantity" value={quantity} readOnly />
                    </div>

                    {/* Employee (Doctor/PHA) */}
                    <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-700">Issued By</h5>
                        <Select value={doctor} onValueChange={setDoctor}>
                            <SelectTrigger className="w-full rounded-md border p-2">
                                <SelectValue placeholder="Select Employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeOptions
                                    .filter(emp => emp.name)
                                    .map((emp) => (
                                        <SelectItem key={emp.id} value={emp.name}>
                                            {emp.name} ({emp.position})
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* if dispense */}
                    <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-700">Is Dispense?</h5>
                        <Select onValueChange={setDispense}>
                            <SelectTrigger className="w-full rounded-md border p-2">
                                <SelectValue placeholder="Select Choices" />
                            </SelectTrigger>
                            <SelectContent>
                                {dispenses
                                    .filter(dis => dis.name)
                                    .map((dis) => (
                                        <SelectItem key={dis.id} value={dis.name}>
                                            {dis.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Remarks */}
                    <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-700">Remarks</h5>
                        <Textarea
                            rows={3}
                            className="w-full rounded-md border p-2"
                            name="phar_remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={handleSaveMedicine}>
                    <Send size={16} className="mr-2" />
                    Save Meds
                </Button>
            </div>

            {isrxModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Rx Prescription List</h2>
                            <Button size="icon" variant="ghost" onClick={() => setRxIsModalOpen(false)}>
                                ✕
                            </Button>
                        </div>
                        <ModalRXDiagMeds meds={rxList} patientId={patient.id} />
                    </div>
                </div>
            )}

            {/* Medication List Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <ModalDiagMedsEnc setIsModalOpen={setIsModalOpen} />
                </div>
            )}
        </div>
    );
};

export default DiagMeds;