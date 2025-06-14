import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Consultations } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface EditConsultationProps {
    isOpen: boolean;
    onClose: () => void;
    editconsultation: Consultations;
    onSubmit: (data: any) => void;
}

const EditConsultation: React.FC<EditConsultationProps> = ({ isOpen, onClose, editconsultation, onSubmit }) => {
    const {
        data: form,
        setData: setForm,
        reset,
        errors,
        processing,
    } = useForm({
        consult_perm_id: editconsultation.consult_perm_id || '',
        consult_temp_id: editconsultation.consult_temp_id || '',
        consult_date: editconsultation.consult_date || '',
        consult_time: editconsultation.consult_time || '',
        consult_type_code: editconsultation.consult_type_code || '',
        to_consult_code: editconsultation.to_consult_code || '',
        type_service: editconsultation.type_service || '',
        pat_temperature: editconsultation.pat_temperature || '',
        pat_heart_rate: editconsultation.pat_heart_rate || '',
    });

    useEffect(() => {
        setForm({
            consult_perm_id: editconsultation.consult_perm_id || '',
            consult_temp_id: editconsultation.consult_temp_id || '',
            consult_date: editconsultation.consult_date || '',
            consult_time: editconsultation.consult_time || '',
            consult_type_code: editconsultation.consult_type_code || '',
            to_consult_code: editconsultation.to_consult_code || '',
            type_service: editconsultation.type_service || '',
            pat_temperature: editconsultation.pat_temperature || '',
            pat_heart_rate: editconsultation.pat_heart_rate || '',
        });

        return () => reset();
    }, [editconsultation.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
        router.post
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

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-4 gap-3">
                                {/* Date of Consultation */}
                                <div>
                                    <div>
                                        <Label htmlFor="consult_date" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Date of Consultation:
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <Input
                                            id="consult_date"
                                            type="date"
                                            value={form.consult_date}
                                            onChange={(e) => setForm('consult_date', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <InputError message={errors.consult_date} className="text-xs" />
                                    </div>
                                </div>

                                {/* Time of Consultation */}
                                <div>
                                    <div>
                                        <Label htmlFor="consult_time" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Time of Consultation:
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <Input
                                            id="consult_time"
                                            type="time"
                                            value={form.consult_time}
                                            onChange={(e) => setForm('consult_time', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border shadow-sm"
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
                                        <Label htmlFor="consult_type_code" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Consultation Type:
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <select
                                            id="consult_type_code"
                                            name="consult_type_code"
                                            value={form.consult_type_code}
                                            onChange={(e) => setForm('consult_type_code', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        <Label htmlFor="to_consult_code" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Consultation Case:
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <select
                                            id="to_consult_code"
                                            name="to_consult_code"
                                            value={form.to_consult_code}
                                            onChange={(e) => setForm('to_consult_code', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                                        <Label htmlFor="type_service" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Type of Services:
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <select
                                            id="type_service"
                                            name="type_service"
                                            value={form.type_service}
                                            onChange={(e) => setForm('type_service', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
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
                            <h5 className="text-sm font-semibold text-gray-500">Vital Sign</h5>
                            <div className="grid grid-cols-4 gap-3">
                                {/* Temp (°C) */}
                                <div>
                                    <div>
                                        <Label htmlFor="pat_temperature" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Temp (°C):
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <Input
                                            id="pat_temperature"
                                            name="pat_temperature"
                                            value={form.pat_temperature}
                                            onChange={(e) => setForm('pat_temperature', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <InputError message={errors.pat_temperature} className="text-xs" />
                                    </div>
                                </div>

                                {/* Heart Rate (bpm) */}
                                <div>
                                    <div>
                                        <Label htmlFor="pat_heart_rate" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                            Heart Rate (bpm):
                                            <span className="font-bold text-red-600">*</span>
                                        </Label>
                                        <Input
                                            id="pat_heart_rate"
                                            name="pat_heart_rate"
                                            value={form.pat_heart_rate}
                                            onChange={(e) => setForm('pat_heart_rate', e.target.value)}
                                            className="text-dark-500 block w-full rounded-md border shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <InputError message={errors.pat_heart_rate} className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* End of Code */}
                        </div>
                    </div>

                    <div className="col-span-4 mt-4 flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditConsultation;
