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
    });

    useEffect(() => {
        setForm({
            consult_perm_id: editconsultation.consult_perm_id || '',
            consult_temp_id: editconsultation.consult_temp_id || '',
            consult_date: editconsultation.consult_date || '',
        });

        return () => reset();
    }, [editconsultation.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
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

                <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6 text-sm">

                    {/*  */}
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="consult_date" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                Date of Registration:
                                <span className="font-bold text-red-600">*</span>
                            </Label>
                            <Input 
                            id="consult_date" 
                            type="date" 
                            value={form.consult_date}
                            className="text-dark-500 block w-full rounded-md border shadow-sm" />
                        </div>
                        <div>
                            <InputError message={errors.consult_date} className="text-xs" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Consultation Permanent ID</label>
                        <input
                            type="text"
                            value={form.consult_perm_id}
                            onChange={(e) => setForm('consult_perm_id', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                        />
                        {errors.consult_perm_id && <p className="text-xs text-red-600">{errors.consult_perm_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Consultation Temporary ID</label>
                        <input
                            type="text"
                            value={form.consult_temp_id}
                            onChange={(e) => setForm('consult_temp_id', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 p-2 text-sm"
                        />
                        {errors.consult_temp_id && <p className="text-xs text-red-600">{errors.consult_temp_id}</p>}
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
