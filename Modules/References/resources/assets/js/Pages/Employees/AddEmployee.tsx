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

    function getTodayDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === 'emp_tin') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 12) {
                setForm((prev) => ({ ...prev, [name]: digitsOnly }));
            }
            return;
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) return;

        try {
            await onSubmit(form);
            setErrors({});
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.emp_fname.trim()) {
            newErrors.emp_fname = 'First name is required';
        }
        if (!form.emp_lname.trim()) {
            newErrors.emp_lname = 'Last name is required';
        }
        if (!form.emp_position.trim()) {
            newErrors.emp_position = 'Position is required';
        }
        // Add more validation rules as needed

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
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Date of Registration:
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input id="registered_at" type="date" className="text-dark-500 block w-full rounded-md border shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Employee ID:
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    type="text"
                                    placeholder="Employee ID"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <Label htmlFor="full_name">FULL NAME</Label>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="full_name" className="font-medium text-red-600">
                                    First Name
                                    <span>*</span>
                                </Label>
                                <Input className="text-dark-500 block w-full rounded-md border shadow-sm" placeholder="First Name" />
                            </div>
                            <div>
                                <Label htmlFor="full_name" className="font-medium text-red-600">
                                    Middle Name
                                    <span>*</span>
                                </Label>
                                <Input className="text-dark-500 block w-full rounded-md border shadow-sm" placeholder="Middle Name" />
                            </div>
                            <div>
                                <Label htmlFor="full_name" className="font-medium text-red-600">
                                    Last Name
                                    <span>*</span>
                                </Label>
                                <Input className="text-dark-500 block w-full rounded-md border shadow-sm" placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-red-600">
                                    Suffix
                                    <span>*</span>
                                </Label>
                                <select className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm">
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
                            </div>

                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-red-600">
                                    Sex
                                    <span>*</span>
                                </Label>
                                <select className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm">
                                    <option value="">Select Sex</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="registered_at" className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    Birth Date
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <Input
                                    id="registered_at"
                                    name="registered_at"
                                    type="date"
                                    value={form.registered_at}
                                    onChange={handleChange}
                                    className="text-dark-500 block w-full rounded-md border shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Hired By */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Label */}
                            <div>
                                <Label htmlFor="hired-yes" className="pt-2 text-sm font-medium text-gray-700">
                                    Hired By
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <div className="flex items-center gap-6">
                                    <label htmlFor="hired-yes" className="inline-flex items-center">
                                        <input type="radio" id="doh" name="hired_by" value="doh" className="form-radio text-blue-600" />
                                        <span className="ml-2">DOH-HIRED</span>
                                    </label>

                                    <label htmlFor="hired-no" className="inline-flex items-center">
                                        <input type="radio" id="lgu" name="hired_by" value="lgu" className="form-radio text-red-600" />
                                        <span className="ml-2">LGU-HIRED</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Hired By */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Label */}
                            <div>
                                <Label htmlFor="hired-yes" className="pt-2 text-sm font-medium text-gray-700">
                                    Employment Status
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                                <div className="flex items-center gap-6">
                                    <label htmlFor="hired-yes" className="inline-flex items-center">
                                        <input type="radio" id="doh" name="hired_by" value="doh" className="form-radio text-blue-600" />
                                        <span className="ml-2">Contractual</span>
                                    </label>

                                    <label htmlFor="hired-no" className="inline-flex items-center">
                                        <input type="radio" id="lgu" name="hired_by" value="lgu" className="form-radio text-red-600" />
                                        <span className="ml-2">Permanent</span>
                                    </label>
                                </div>
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
                                <select className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm">
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
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">
                                    PRC License Number
                                    <span className="font-bold text-red-600">*</span>
                                </Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    type="text"
                                    placeholder="PRC License Number"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">PTR Number</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    type="text"
                                    placeholder="PTR Number"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">S2 License Number</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
                                    type="text"
                                    placeholder="S2 License Number"
                                    className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">PHIC Number</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <Input
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
                                <Input type="text" placeholder="TIN" className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm" />
                            </div>
                        </div>
                        <br />
                        <div className="flex items-start gap-1">
                            <div>
                                <Label className="w-50 pt-2 text-sm font-medium text-gray-700">Active in Service?</Label>
                            </div>

                            <div className="flex-1 space-y-1">
                                <select className="text-dark-500 block w-full rounded-md border px-3 py-2 shadow-sm">
                                    <option value="">Select Status</option>
                                    <option value="BHW">Active</option>
                                    <option value="DEN">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
