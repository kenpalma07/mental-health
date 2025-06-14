import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Consultations } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface EditConsultationProps {
    isOpen: boolean;
    onClose: () => void;
    editconsultation: Consultations;
    onSubmit: (data: any) => void;
}

const EditConsultation: React.FC<EditConsultationProps> = ({ isOpen, onClose, editconsultation, onSubmit }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        data: form,
        setData: setForm,
        reset,
        errors,
        processing,
    } = useForm({
        id: editconsultation.consult_temp_id || '',
        consult_perm_id: editconsultation.consult_perm_id || '',
        consult_temp_id: editconsultation.consult_temp_id || '',
        consult_date: editconsultation.consult_date || '',
        consult_time: editconsultation.consult_time || '',
        consult_type_code: editconsultation.consult_type_code || '',
        to_consult_code: editconsultation.to_consult_code || '',
        type_service: editconsultation.type_service || '',
        pat_temperature: editconsultation.pat_temperature || '',
        pat_heart_rate: editconsultation.pat_heart_rate || '',
        pat_oxygen_sat: editconsultation.pat_oxygen_sat || '',
        respiratoryRate: editconsultation.respiratoryRate || '',
        pat_systolic_pres: editconsultation.pat_systolic_pres || '',
        pat_diastolic_pres: editconsultation.pat_diastolic_pres || '',
        pat_height: (editconsultation.pat_height || '').toString().replace(/\.00$/, ''),
        pat_weight: (editconsultation.pat_weight || '').toString().replace(/\.00$/, ''),
        pat_BMI: editconsultation.pat_BMI || '',
        BMI_cat_code: editconsultation.BMI_cat_code || '',
        chief_complaint: editconsultation.chief_complaint || '',
    });

    // Calculate BMI and category on height/weight change
    useEffect(() => {
        const heightM = parseFloat(form.pat_height) / 100;
        const weight = parseFloat(form.pat_weight);

        if (!isNaN(heightM) && !isNaN(weight) && heightM > 0) {
            const bmiValue = weight / (heightM * heightM);
            const roundedBmi = bmiValue.toFixed(1);

            let category = '';
            if (bmiValue < 18.5) category = 'Underweight';
            else if (bmiValue < 24.9) category = 'Normal';
            else if (bmiValue < 29.9) category = 'Overweight';
            else category = 'Obese';

            setForm('pat_BMI', roundedBmi);
            setForm('BMI_cat_code', category);
        } else {
            setForm('pat_BMI', '');
            setForm('BMI_cat_code', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.pat_height, form.pat_weight]);

    useEffect(() => {
        setForm({
            id: editconsultation.consult_temp_id || '',
            consult_perm_id: editconsultation.consult_perm_id || '',
            consult_temp_id: editconsultation.consult_temp_id || '',
            consult_date: editconsultation.consult_date || '',
            consult_time: editconsultation.consult_time || '',
            consult_type_code: editconsultation.consult_type_code || '',
            to_consult_code: editconsultation.to_consult_code || '',
            type_service: editconsultation.type_service || '',
            pat_temperature: editconsultation.pat_temperature || '',
            pat_heart_rate: editconsultation.pat_heart_rate || '',
            pat_oxygen_sat: editconsultation.pat_oxygen_sat || '',
            respiratoryRate: editconsultation.respiratoryRate || '',
            pat_systolic_pres: editconsultation.pat_systolic_pres || '',
            pat_diastolic_pres: editconsultation.pat_diastolic_pres || '',
            pat_height: (editconsultation.pat_height || '').toString().replace(/\.00$/, ''),
            pat_weight: (editconsultation.pat_weight || '').toString().replace(/\.00$/, ''),
            pat_BMI: editconsultation.pat_BMI || '',
            BMI_cat_code: editconsultation.BMI_cat_code || '',
            chief_complaint: editconsultation.chief_complaint || '',
        });

        return () => reset();
    }, [editconsultation.id]);

    // Show success alert for 2 seconds after successful update
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
<<<<<<< HEAD
        setShowSuccess(true);
=======
        router.post
>>>>>>> ec09a1db86b1f6ffa34418eb2f91d37abacc827f
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Modal content */}
            <div className="relative z-10 w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl">
                <button className="absolute top-3 right-3 text-red-500" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <h2 className="mb-4 text-xl font-semibold text-gray-800">Edit Consultation</h2>

                {showSuccess && (
                    <div className="mb-4 rounded bg-green-100 px-4 py-2 text-xs text-green-800 shadow">Consultation updated successfully!</div>
                )}

                <div className="max-h-[80vh] overflow-y-auto pr-2">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="space-y-1 text-xs">
                                <div className="grid grid-cols-4 gap-3">
                                    {/* Date of Consultation */}
                                    <div>
                                        <div>
                                            <Label htmlFor="consult_date" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Date of Consultation:
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="consult_date"
                                                type="date"
                                                value={form.consult_date}
                                                onChange={(e) => setForm('consult_date', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.consult_date} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Time of Consultation */}
                                    <div>
                                        <div>
                                            <Label htmlFor="consult_time" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Time of Consultation:
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="consult_time"
                                                type="time"
                                                value={form.consult_time}
                                                onChange={(e) => setForm('consult_time', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.consult_time} className="text-xs" />
                                        </div>
                                    </div>
                                </div>

                                {/* Next Row */}
                                <div className="grid grid-cols-4 gap-3">
                                    {/* Consultation Type */}
                                    <div>
                                        <div>
                                            <Label htmlFor="consult_type_code" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Consultation Type:
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <select
                                                id="consult_type_code"
                                                name="consult_type_code"
                                                value={form.consult_type_code}
                                                onChange={(e) => setForm('consult_type_code', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-xs shadow-sm"
                                            >
                                                <option value="newconsultation">New Consultation</option>
                                                <option value="followupvisit">Follow-up Visit</option>
                                                <option value="visited">Visited</option>
                                                <option value="walkin">Walk-in</option>
                                                <option value="referral">Referred</option>
                                                <option value="teleconsultation">Teleconsultation</option>
                                            </select>
                                        </div>
                                        <div>
                                            <InputError message={errors.consult_type_code} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Consultation Case */}
                                    <div>
                                        <div>
                                            <Label htmlFor="to_consult_code" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Consultation Case:
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <select
                                                id="to_consult_code"
                                                name="to_consult_code"
                                                value={form.to_consult_code}
                                                onChange={(e) => setForm('to_consult_code', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-xs shadow-sm"
                                            >
                                                <option value="mentalhealth">Mental Health</option>
                                                <option value="other">Others</option>
                                            </select>
                                        </div>
                                        <div>
                                            <InputError message={errors.to_consult_code} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Type of Services */}
                                    <div>
                                        <div>
                                            <Label htmlFor="type_service" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Type of Services:
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <select
                                                id="type_service"
                                                name="type_service"
                                                value={form.type_service}
                                                onChange={(e) => setForm('type_service', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border px-3 py-2 text-xs shadow-sm"
                                            >
                                                <option value="reass">Re-Assessment</option>
                                                <option value="dismeds">Dispensing Medicaton</option>
                                                <option value="psychoed">Psychoeducation</option>
                                                <option value="iniass">Initial Assessment</option>
                                                <option value="referral">Referral</option>
                                            </select>
                                        </div>
                                        <div>
                                            <InputError message={errors.type_service} className="text-xs" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <hr />

                                {/* Next Row */}
                                {/* Vital Sign */}
                                <h5 className="text-xs font-semibold text-gray-500">Vital Sign</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    {/* Temp (°C) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_temperature" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Temp (°C):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_temperature"
                                                name="pat_temperature"
                                                value={form.pat_temperature}
                                                onChange={(e) => setForm('pat_temperature', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_temperature} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Heart Rate (bpm) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_heart_rate" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Heart Rate (bpm):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_heart_rate"
                                                name="pat_heart_rate"
                                                value={form.pat_heart_rate}
                                                onChange={(e) => setForm('pat_heart_rate', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_heart_rate} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* O₂ Saturation (%) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_oxygen_sat" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                O₂ Saturation (%):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_oxygen_sat"
                                                name="pat_oxygen_sat"
                                                value={form.pat_oxygen_sat}
                                                onChange={(e) => setForm('pat_oxygen_sat', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="O₂ Saturation (%)"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_oxygen_sat} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Respiratory Rate (rpm) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="respiratoryRate" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Respiratory Rate (rpm):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="respiratoryRate"
                                                name="respiratoryRate"
                                                value={form.respiratoryRate}
                                                onChange={(e) => setForm('respiratoryRate', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="Respiratory Rate (rpm)"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_oxygen_sat} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Systolic (e.g. 110) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_systolic_pres" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Systolic (e.g. 110):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_systolic_pres"
                                                name="pat_systolic_pres"
                                                value={form.pat_systolic_pres}
                                                onChange={(e) => setForm('pat_systolic_pres', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="Systolic (e.g. 110)"
                                            />
                                        </div>
                                    </div>

                                    {/* Diastolic (e.g. 80) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_diastolic_pres" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Diastolic (e.g. 80):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_diastolic_pres"
                                                name="pat_diastolic_pres"
                                                value={form.pat_diastolic_pres}
                                                onChange={(e) => setForm('pat_diastolic_pres', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="Diastolic (e.g. 80)"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <hr />

                                {/* Next Row */}
                                {/* BMI */}
                                <h5 className="text-xs font-semibold text-gray-500">Body Mass Index</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    {/* Height (cm) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_height" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Height (cm):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_height"
                                                name="pat_height"
                                                value={form.pat_height}
                                                onChange={(e) => setForm('pat_height', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="Height (cm)"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_height} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* Weight (kg) */}
                                    <div>
                                        <div>
                                            <Label htmlFor="pat_weight" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                                Weight (kg):
                                                <span className="font-bold text-red-600">*</span>
                                            </Label>
                                            <Input
                                                id="pat_weight"
                                                name="pat_weight"
                                                value={form.pat_weight}
                                                onChange={(e) => setForm('pat_weight', e.target.value)}
                                                className="text-dark-500 block w-full rounded-md border text-xs shadow-sm"
                                                placeholder="Height (cm)"
                                            />
                                        </div>
                                        <div>
                                            <InputError message={errors.pat_weight} className="text-xs" />
                                        </div>
                                    </div>

                                    {/* BMI (readonly) */}
                                    <div>
                                        <Label htmlFor="pat_BMI" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                            BMI:
                                        </Label>
                                        <Input
                                            id="pat_BMI"
                                            name="pat_BMI"
                                            value={form.pat_BMI}
                                            readOnly
                                            className="w-full bg-gray-100 text-xs"
                                            placeholder="BMI"
                                        />
                                        <div className="mt-1 text-xs text-gray-600 italic">{form.BMI_cat_code}</div>
                                    </div>
                                </div>
                                <br />
                                <hr />

                                {/* Next Row */}
                                {/* BMI */}
                                <h5 className="text-xs font-semibold text-gray-500">Chief Complaint</h5>
                                <div className="grid grid-cols-1 gap-3">
                                    <Textarea
                                        id="chief_complaint"
                                        name="chief_complaint"
                                        value={form.chief_complaint}
                                        onChange={(e) => setForm('chief_complaint', e.target.value)}
                                        className="w-full rounded-md border-gray-300 text-xs shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                                        placeholder="Enter Chief Complaint"
                                    />
                                </div>

                                {/* End of Code */}
                            </div>
                        </div>

                        <div className="col-span-4 mt-4 flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={onClose} className="px-3 py-1.5 text-xs">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="px-3 py-1.5 text-xs">
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditConsultation;
