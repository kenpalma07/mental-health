import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Consultations } from '@/types';
import React from 'react';

interface ViewConsultationProps {
    isOpen: boolean;
    onClose: () => void;
    consultation: Consultations;
}

const ViewConsultation: React.FC<ViewConsultationProps> = ({ isOpen, onClose, consultation }) => {
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

                <h2 className="mb-4 text-xl font-semibold text-gray-800">View Consultation</h2>
                <div className="max-h-[80vh] overflow-y-auto pr-2">
                    <div className="space-y-1 text-xs">
                        {/* First Row: Date, Time, Consultation Type, Consultation Case */}
                        <div className="inline">
                            {/* Date of Consultation */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="consult_date" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Date of Consultation:
                                </Label>
                                <Input
                                    id="consult_date"
                                    type="date"
                                    value={consultation.consult_date || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-40 border border-white bg-white/50 text-xs"
                                />
                            </div>
                            {/* Time of Consultation */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="consult_time" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Time of Consultation:
                                </Label>
                                <Input
                                    id="consult_time"
                                    type="time"
                                    value={consultation.consult_time || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-40 border border-white bg-white/50 text-xs"
                                />
                            </div>
                            {/* Consultation Type */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="consult_type_code" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Consultation Type:
                                </Label>
                                <Input
                                    id="consult_type_code"
                                    value={
                                        consultation.consult_type_code === 'newconsultation' ? 'New Consultation':
                                        consultation.consult_type_code === 'followupvisit' ? 'Follow-up Visit':
                                        consultation.consult_type_code === 'walkin' ? 'Walk-in':
                                        consultation.consult_type_code === 'referral' ? 'Referral' : consultation.consult_type_code || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-40 border border-white bg-white/50 text-xs"
                                />
                            </div>
                            {/* Consultation Case */}
                            <div className="mb-2 inline-flex items-center">
                                <Label htmlFor="to_consult_code" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Consultation Case:
                                </Label>
                                <Input
                                    id="to_consult_code"
                                    value={consultation.to_consult_code || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-40 border border-white bg-white/50 text-xs"
                                />
                            </div>
                        </div>

                        {/* Second Row: Type of Services */}
                        <div className="inline">
                            <div className="mb-2 inline-flex items-center">
                                <Label htmlFor="type_service" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Type of Services:
                                </Label>
                                <Input
                                    id="type_service"
                                    value={consultation.type_service || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-40 border border-white bg-white/50 text-xs"
                                />
                            </div>
                        </div>
                        <br />
                        <hr />

                        {/* Vital Sign */}
                        <h5 className="text-xs font-semibold text-gray-500">Vital Sign</h5>
                        <div className="inline">
                            {/* Temp (°C) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_temperature" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Temp (°C):
                                </Label>
                                <Input
                                    id="pat_temperature"
                                    value={consultation.pat_temperature || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                />
                            </div>
                            {/* Heart Rate (bpm) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_heart_rate" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Heart Rate (bpm):
                                </Label>
                                <Input
                                    id="pat_heart_rate"
                                    value={consultation.pat_heart_rate || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                />
                            </div>
                            {/* O₂ Saturation (%) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_oxygen_sat" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    O₂ Saturation (%):
                                </Label>
                                <Input
                                    id="pat_oxygen_sat"
                                    value={consultation.pat_oxygen_sat || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="O₂ Saturation (%)"
                                />
                            </div>
                            {/* Respiratory Rate (rpm) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="respiratoryRate" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Respiratory Rate (rpm):
                                </Label>
                                <Input
                                    id="respiratoryRate"
                                    value={consultation.respiratoryRate || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="Respiratory Rate (rpm)"
                                />
                            </div>
                            {/* Systolic (e.g. 110) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_systolic_pres" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Systolic (e.g. 110):
                                </Label>
                                <Input
                                    id="pat_systolic_pres"
                                    value={consultation.pat_systolic_pres || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="Systolic (e.g. 110)"
                                />
                            </div>
                            {/* Diastolic (e.g. 80) */}
                            <div className="mb-2 inline-flex items-center">
                                <Label htmlFor="pat_diastolic_pres" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Diastolic (e.g. 80):
                                </Label>
                                <Input
                                    id="pat_diastolic_pres"
                                    value={consultation.pat_diastolic_pres || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="Diastolic (e.g. 80)"
                                />
                            </div>
                        </div>
                        <br />
                        <hr />

                        {/* BMI */}
                        <h5 className="text-xs font-semibold text-gray-500">Body Mass Index</h5>
                        <div className="inline">
                            {/* Height (cm) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_height" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Height (cm):
                                </Label>
                                <Input
                                    id="pat_height"
                                    value={consultation.pat_height || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="Height (cm)"
                                />
                            </div>
                            {/* Weight (kg) */}
                            <div className="mr-6 mb-2 inline-flex items-center">
                                <Label htmlFor="pat_weight" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    Weight (kg):
                                </Label>
                                <Input
                                    id="pat_weight"
                                    value={consultation.pat_weight || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="Weight (kg)"
                                />
                            </div>
                            {/* BMI (readonly) */}
                            <div className="mb-2 inline-flex items-center">
                                <Label htmlFor="pat_BMI" className="w-50 pt-2 text-xs font-medium text-gray-700">
                                    BMI:
                                </Label>
                                <Input
                                    id="pat_BMI"
                                    value={consultation.pat_BMI || ''}
                                    readOnly
                                    className="text-dark-500 ml-2 w-28 rounded-md border border-white bg-white/50 text-xs"
                                    placeholder="BMI"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-56"></label>
                            <div className="text-xs text-gray-600 italic">{consultation.BMI_cat_code}</div>
                        </div>
                        <br />
                        <hr />

                        {/* Chief Complaint */}
                        <h5 className="text-xs font-semibold text-gray-500">Chief Complaint</h5>
                        <div className="inline">
                            <div className="inline-flex w-full items-center">
                                <Textarea
                                    id="chief_complaint"
                                    value={consultation.chief_complaint || ''}
                                    readOnly
                                    className="w-full rounded-md border-gray-300 bg-gray-100 text-xs shadow-sm"
                                    placeholder="Enter Chief Complaint"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 mt-4 flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={onClose} className="px-3 py-1.5 text-xs">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewConsultation;
