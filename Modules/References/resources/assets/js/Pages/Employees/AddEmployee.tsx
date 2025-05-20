import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
};

const AddEmployee: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        emp_id: '',
        emp_fname: '',
        emp_mname: '',
        emp_lname: '',
        emp_suffix: '',
        emp_position: '',
        emp_sex: '',
        emp_birthdate: '',
        emp_hiredby: '',
        employment_status: '',
        emp_status: '',
        emp_prcno: '',
        emp_ptrno: '',
        emp_s2licno: '',
        emp_phicno: '',
        emp_phicaccreditno: '',
        emp_tin: '',
        registered_at: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
        if (isOpen) {
            setForm({
                emp_id: '',
                emp_fname: '',
                emp_mname: '',
                emp_lname: '',
                emp_suffix: '',
                emp_position: '',
                emp_sex: '',
                emp_birthdate: '',
                emp_hiredby: '',
                employment_status: '',
                emp_status: '',
                emp_prcno: '',
                emp_ptrno: '',
                emp_s2licno: '',
                emp_phicno: '',
                emp_phicaccreditno: '',
                emp_tin: '',
                registered_at: getTodayDate(),
            });
            setErrors({});
        }
    }, [isOpen]);

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

    function getTodayDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getTodayDateTime(): string {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60 * 1000); // convert to local time

        return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for TIN
    if (name === 'emp_tin') {
        const digitsOnly = value.replace(/\D/g, '');
        const limitedDigits = digitsOnly.slice(0, 12);
        const formatted = limitedDigits.replace(/(\d{3})(?=\d)/g, '$1-').replace(/-$/, '');

        setForm((prev) => ({ ...prev, [name]: formatted }));
        return;
    }

    // Convert value to uppercase for all other fields
    const uppercaseValue = value.toUpperCase();

    setForm((prev) => ({ ...prev, [name]: uppercaseValue }));

    // Clear error if exists
    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }
};


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Step 1: Validate form fields
        const formErrors = validateForm();
        setErrors(formErrors);

        // Step 2: Append current time to `registered_at`
        const now = new Date();
        const registeredAtWithTime = `${form.registered_at} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        // Step 3: Prepare form data with full `registered_at`
        const formData = { ...form, registered_at: registeredAtWithTime };

        // Step 4: If there are validation errors, stop form submission
        if (Object.keys(formErrors).length > 0) return;

        // Step 5: Submit form data to the `onSubmit` callback
        try {
            console.log('Form data to be submitted:', formData); // Use formData for logging
            await onSubmit(formData); // Call the onSubmit function with the complete form data
            setErrors({}); // Clear errors on successful submit
        } catch (error: any) {
            // Step 6: Handle submission errors (show them in the UI)
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.emp_id.trim()) {
            newErrors.emp_id = 'Employee ID is required.';
        }
        if (!form.emp_fname.trim()) {
            newErrors.emp_fname = 'First name is required';
        }
        if (!form.emp_mname.trim()) {
            newErrors.emp_mname = 'Middle name is required';
        }
        if (!form.emp_lname.trim()) {
            newErrors.emp_lname = 'Last name is required';
        }
        if (!form.emp_suffix.trim()) {
            newErrors.emp_suffix = 'Suffix is required';
        }
        if (!form.emp_sex.trim()) {
            newErrors.emp_sex = 'Sex is required';
        }
        if (!form.emp_birthdate.trim()) {
            newErrors.emp_birthdate = 'Birth Date is required';
        }
        if (!form.emp_position.trim()) {
            newErrors.emp_position = 'Position is required';
        }
        if (!form.emp_hiredby.trim()) {
            newErrors.emp_hiredby = 'Hired by is required';
        }
        if (!form.employment_status.trim()) {
            newErrors.employment_status = 'Employment Status is required';
        }
        if (isPRCRequired() && !form.emp_prcno.trim()) {
            newErrors.emp_prcno = 'PRC License Number is required';
        }

        if (isPTRRequired() && !form.emp_ptrno.trim()) {
            newErrors.emp_ptrno = 'PTR Number is required';
        }

        if (isS2LicNoRequired() && !form.emp_s2licno.trim()) {
            newErrors.emp_s2licno = 'S2 License Number is required';
        }
        if (!form.emp_status.trim()) {
            newErrors.emp_status = 'Status is required';
        }

        return newErrors;
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

                <h2 className="mb-6 text-xl font-bold">Add Employee</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 text-sm">
                    {/* Left column */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="registered_at" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Date of Registration:
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="registered_at"
                                    name="registered_at"
                                    type="date"
                                    value={form.registered_at}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                />
                                <InputError message={errors.registered_at} className="text-xs" />
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
                                <InputError message={errors.emp_id} className="text-xs" />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <Label htmlFor="full_name">FULL NAME</Label>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="emp_fname" className="font-medium text-red-600">
                                    First Name
                                    <span>*</span>
                                </Label>
                                <Input
                                    id="emp_fname"
                                    name="emp_fname"
                                    value={form.emp_fname}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                    placeholder="First Name"
                                />
                                <InputError message={errors.emp_fname} className="text-xs" />
                            </div>
                            <div>
                                <Label htmlFor="emp_mname" className="font-medium text-red-600">
                                    Middle Name
                                    <span>*</span>
                                </Label>
                                <Input
                                    id="emp_mname"
                                    name="emp_mname"
                                    value={form.emp_mname}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                    placeholder="Middle Name"
                                />
                                <InputError message={errors.emp_mname} className="text-xs" />
                            </div>
                            <div>
                                <Label htmlFor="emp_lname" className="font-medium text-red-600">
                                    Last Name
                                    <span>*</span>
                                </Label>
                                <Input
                                    id="emp_lname"
                                    name="emp_lname"
                                    value={form.emp_lname}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                    placeholder="Last Name"
                                />
                                <InputError message={errors.emp_lname} className="text-xs" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="emp_suffix" className="w-50 pt-2 text-sm font-medium text-red-600">
                                    Suffix
                                    <span>*</span>
                                </Label>
                                <select
                                    id="emp_suffix"
                                    name="emp_suffix"
                                    value={form.emp_suffix}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select Suffix</option>
                                    <option value="NA">N/A</option>
                                    <option value="Jr">Jr</option>
                                    <option value="Sr">Sr</option>
                                    <option value="I">I</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                    <option value="V">V</option>
                                </select>
                                <InputError message={errors.emp_suffix} className="text-xs" />
                            </div>

                            <div>
                                <Label htmlFor="emp_sex" className="w-50 pt-2 text-sm font-medium text-red-600">
                                    Sex
                                    <span>*</span>
                                </Label>
                                <select
                                    id="emp_sex"
                                    name="emp_sex"
                                    value={form.emp_sex}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select Sex</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                <InputError message={errors.emp_sex} className="text-xs" />
                            </div>

                            <div>
                                <Label htmlFor="emp_birthdate" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Birth Date
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <Input
                                    id="emp_birthdate"
                                    name="emp_birthdate"
                                    type="date"
                                    value={form.emp_birthdate}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                />
                                <InputError message={errors.emp_birthdate} className="text-xs" />
                            </div>
                        </div>
                        <br />
                        <br />
                        {/* Hired By */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="emp_hiredby" className="pt-2 text-sm font-medium text-gray-700">
                                    Hired By
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <select
                                    id="emp_hiredby"
                                    name="emp_hiredby"
                                    value={form.emp_hiredby}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="DOH">DOH</option>
                                    <option value="LGU">LGU</option>
                                </select>
                                <InputError message={errors.emp_hiredby} className="text-xs" />
                            </div>
                            <div>
                                <Label htmlFor="employment_status" className="pt-2 text-sm font-medium text-gray-700">
                                    Employment Status
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <select
                                    id="employment_status"
                                    name="employment_status"
                                    value={form.employment_status}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="CONTR">Contractual</option>
                                    <option value="PERMA">Permanent</option>
                                </select>
                                <InputError message={errors.employment_status} className="text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-2">
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-bold text-red-600">
                                    Position
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <select
                                    name="emp_position"
                                    value={form.emp_position}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select Position</option>
                                    <option value="BHW">BARANGAY HEALTH WORKER</option>
                                    <option value="DEN">DENTIST</option>
                                    <option value="MET">MEDICAL TECHNOLOGIST</option>
                                    <option value="MDW">MIDWIFE</option>
                                    <option value="NUR">NURSE</option>
                                    <option value="NUT">NUTRIONIST</option>
                                    <option value="PAT">PATHOLOGIST</option>
                                    <option value="PHA">PHARMACIST</option>
                                    <option value="DOC">PHYSICIAN/DOCTOR</option>
                                    <option value="SAE">SANITARY ENGINEER</option>
                                    <option value="SAI">SANITARY INSPECTOR</option>
                                    <option value="OTH">OTHERS</option>
                                </select>
                                <InputError message={errors.emp_position} className="text-xs" />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="emp_prcno" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    PRC License Number
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_prcno"
                                    name="emp_prcno"
                                    type="text"
                                    placeholder="PRC License Number"
                                    value={form.emp_prcno}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                    disabled={!isPRCRequired()}
                                />
                                <InputError message={errors.emp_prcno} className="text-xs" />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="emp_ptrno" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    PTR Number
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_ptrno"
                                    name="emp_ptrno"
                                    type="text"
                                    value={form.emp_ptrno}
                                    onChange={handleChange}
                                    placeholder="PTR Number"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                    disabled={!isPTRRequired()}
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="emp_s2licno" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    S2 License Number
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_s2licno"
                                    name="emp_s2licno"
                                    type="text"
                                    placeholder="S2 License Number"
                                    value={form.emp_s2licno}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                    disabled={!isS2LicNoRequired()}
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label htmlFor="emp_phicno" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    PHIC Number
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_phicno"
                                    name="emp_phicno"
                                    value={form.emp_phicno}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="PHIC Number"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">PHIC Accreditation Code</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_phicaccreditno"
                                    name="emp_phicaccreditno"
                                    value={form.emp_phicaccreditno}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="PHIC Accreditation Code"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">TIN</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    id="emp_tin"
                                    name="emp_tin"
                                    value={form.emp_tin}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="TIN"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                    maxLength={15}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">Active in Service?</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <select
                                    id="emp_status"
                                    name="emp_status"
                                    value={form.emp_status}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                >
                                    <option value="">Select Status</option>
                                    <option value="A">Active</option>
                                    <option value="I">Inactive</option>
                                </select>
                                <InputError message={errors.emp_status} className="text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-span-3 mt-4 flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
