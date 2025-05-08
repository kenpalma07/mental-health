import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import type { FHUD } from '@/types';

interface EditFacilityProps {
  isOpen: boolean;
  onClose: () => void;
  facility: FHUD | null;
  onSubmit: (data: Partial<FHUD>) => void;
}

const EditFacility: React.FC<EditFacilityProps> = ({ isOpen, onClose, facility, onSubmit }) => {
  const [form, setForm] = useState<Partial<FHUD>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (facility) {
      setForm(facility);
      setErrors({}); // Clear errors when facility changes
    }
  }, [facility]);

  useEffect(() => {
    if (!isOpen) {
      setForm({}); // Reset form when modal closes
      setErrors({}); // Clear errors on modal close
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    // Basic form validation
    if (!form.fhudcode) newErrors.fhudcode = 'FHUD code is required.';
    if (!form.facility_name) newErrors.facility_name = 'Facility name is required.';
    if (!form.faccode) newErrors.faccode = 'Facility code is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }

    // Submit the form data if validation passes
    onSubmit(form);
  };

  const isFormInvalid = !!errors.fhudcode || !!errors.facility_name || !!errors.faccode;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Facility</DialogTitle>
          <DialogDescription>
            Please update the details of the facility.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              name="fhudcode"
              value={form.fhudcode || ''}
              onChange={handleChange}
              placeholder="FHUD Code"
              type="text" // Explicit type for code fields
            />
            <InputError message={errors.fhudcode} />
          </div>
          <div>
            <Input
              name="facility_name"
              value={form.facility_name || ''}
              onChange={handleChange}
              placeholder="Facility Name"
              type="text" // Explicit type for text fields
            />
            <InputError message={errors.facility_name} />
          </div>
          <div>
            <Input
              name="faccode"
              value={form.faccode || ''}
              onChange={handleChange}
              placeholder="Facility Code"
              type="text" // Explicit type for code fields
            />
            <InputError message={errors.faccode} />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isFormInvalid}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFacility;
