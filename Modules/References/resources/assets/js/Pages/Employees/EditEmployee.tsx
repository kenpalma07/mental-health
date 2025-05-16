import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Employee } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface EditEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee;
    onSubmit: (data: any) => void;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ isOpen, onClose, employee, onSubmit }) => {
    const {
        data: form,
        setData: setForm,
        reset,
        errors,
        setError,
        clearErrors,
        processing,
    } = useForm({
        emp_id: employee.emp_id || '',
        emp_fname: employee.emp_fname || '',
        emp_mname: employee.emp_mname || '',
        emp_lname: employee.emp_lname || '',
        emp_suffix: employee.emp_suffix || '',
        emp_position: employee.emp_position || '',
        emp_sex: employee.emp_sex || '',
        emp_birthdate: employee.emp_birthdate || '',
        emp_hiredby: employee.emp_hiredby || '',
        employment_status: employee.employment_status || '',
        emp_status: employee.emp_status || '',
        emp_prcno: employee.emp_prcno || '',
        emp_ptrno: employee.emp_ptrno || '',
        emp_s2licno: employee.emp_s2licno || '',
        emp_phicno: employee.emp_phicno || '',
        emp_phicaccreditno: employee.emp_phicaccreditno || '',
        emp_tin: employee.emp_tin || '',
        registered_at: employee.registered_at?.slice(0, 10) || '',
    });

    useEffect(() => {
        setForm({
            emp_id: employee.emp_id || '',
            emp_fname: employee.emp_fname || '',
            emp_mname: employee.emp_mname || '',
            emp_lname: employee.emp_lname || '',
            emp_suffix: employee.emp_suffix || '',
            emp_position: employee.emp_position || '',
            emp_sex: employee.emp_sex || '',
            emp_birthdate: employee.emp_birthdate || '',
            emp_hiredby: employee.emp_hiredby || '',
            employment_status: employee.employment_status || '',
            emp_status: employee.emp_status || '',
            emp_prcno: employee.emp_prcno || '',
            emp_ptrno: employee.emp_ptrno || '',
            emp_s2licno: employee.emp_s2licno || '',
            emp_phicno: employee.emp_phicno || '',
            emp_phicaccreditno: employee.emp_phicaccreditno || '',
            emp_tin: employee.emp_tin || '',
            registered_at: employee.registered_at?.slice(0, 10) || '',
        });

        return () => reset();
    }, [employee.id]);

    const isPRCRequired = () => {
        return !['BHW', 'NUT', 'OTH', 'PAT', 'SAE', 'SAI'].includes(form.emp_position);
    };
    const isPTRRequired = () => {
        return !['BHW', 'MET', 'MDW', 'NUR', 'NUT', 'OTH', 'PAT', 'PHA', 'SAE', 'SAI'].includes(form.emp_position);
    };
    const isS2LicNoRequired = () => {
        return !['BHW', 'MET', 'MDW', 'NUR', 'NUT', 'OTH', 'PAT', 'PHA', 'SAE', 'SAI'].includes(form.emp_position);
    };

    useEffect(() => {
        if (!isPRCRequired()) {
            setForm((prev) => ({ ...prev, emp_prcno: '' }));
        }
        if (!isPTRRequired()) {
            setForm((prev) => ({ ...prev, emp_ptrno: '' }));
        }
        if (!isS2LicNoRequired()) {
            setForm((prev) => ({ ...prev, emp_s2licno: '' }));
        }
    }, [form.emp_position]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'emp_tin') {
            // Remove all non-digit characters
            const digitsOnly = value.replace(/\D/g, '');

            // Limit to 12 digits
            const limitedDigits = digitsOnly.slice(0, 12);

            // Format as XXX-XXX-XXX-XXX
            const formatted = limitedDigits.replace(/(\d{3})(?=\d)/g, '$1-').replace(/-$/, '');

            setForm((prev) => ({ ...prev, [name]: formatted }));

            return;
        }

        // Update form normally
        setForm((prev) => ({ ...prev, [name]: value }));

        // Clear error if exists
        if (errors[name as keyof typeof errors]) {
            setError(name as keyof typeof form, '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted: ', form);
        onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-5">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl">
                <button className="absolute top-3 right-3 text-red-500" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <h2 className="mb-6 text-xl font-bold">Edit Employee</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 text-sm">
                    {/* Date Registration */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="registered_at" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Date Registration:
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>
                            <div className="flex-1 space-y-1">
                                <Input
                                    id="registered_at"
                                    type="date"
                                    value={form.registered_at}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                />
                                <InputError message={errors.registered_at} className="text-xs"/>
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="emp_id" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Employee ID:
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_id"
                                    name="emp_id"
                                    value={form.emp_id}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Employee ID"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-span-3 mt-4 flex justify-end gap-2">
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

export default EditEmployee;
