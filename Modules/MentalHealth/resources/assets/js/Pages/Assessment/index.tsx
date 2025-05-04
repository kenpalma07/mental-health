import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { User, Clipboard, Heart, Calendar, Stethoscope, ArrowRight } from "lucide-react";
import type { BreadcrumbItem } from '@/types';
import { Head, PageProps } from '@inertiajs/react';
import icd10Data from '../json/Mental_Health_icd_10_code.json';
import mentalHealthMeds from '../json/mental_health_meds.json';

interface Patient {
  id: number;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  sex_code: string;
  civil_status: string;
  pat_birthDate: string;
  patient_address: string;
  mot_fname: string;
  mot_mname: string;
  mot_lname: string;
  fat_fname: string;
  fat_mname: string;
  fat_lname: string;
  ts_created_at: string;
}

interface Props extends PageProps {
  patient: Patient;
}

const steps = [
  { label: "Assess Physical Health", icon: User },
  { label: "MNS Assessment", icon: Clipboard },
  { label: "Manage MNS Conditions", icon: Heart },
  { label: "Diagnosis and Medicine", icon: Stethoscope },
  { label: "Schedule Next Visit", icon: Calendar },
];

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

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Patient List', href: '/patients' },
  { title: 'Add Assessment', href: '/#' },
];

function InfoRow({ icon: Icon, label, value, withArrow }: { icon: React.ComponentType<{ className?: string; size?: number }>, label: string, value: string, withArrow?: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="text-gray-500" size={16} />
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-700">{value}</span>
      {withArrow && <ArrowRight className="text-gray-500 ml-2" size={16} />}
    </div>
  );
}

export default function AssessmentIndex({ patient }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [selectedIcdCode, setSelectedIcdCode] = useState('');
  const [icdDescription, setIcdDescription] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [intake, setIntake] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');

  const age = new Date().getFullYear() - new Date(patient.pat_birthDate).getFullYear();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedDiagnosis('');
    setSelectedIcdCode('');
    setIcdDescription('');
    setSelectedMedicine('');
    setIntake('');
    setFrequency('');
    setDuration('');
  };

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const diagnosis = e.target.value;
    setSelectedDiagnosis(diagnosis);
    setSelectedIcdCode('');
    setIcdDescription('');
    setSelectedMedicine('');
    setIntake('');
    setFrequency('');
    setDuration('');
  };

  const handleIcdCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedIcdCode(code);

    const diagnosisData = icd10Data[selectedDiagnosis as keyof typeof icd10Data];
    const selected = diagnosisData?.find((item: { code: string }) => item.code === code);
    setIcdDescription(selected?.description || '');
  };

  const handleMedicineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMedicine(e.target.value);
    setIntake('');
    setFrequency('');
    setDuration('');
  };

  const handleSubmit = () => {
    if (!selectedDiagnosis || !selectedIcdCode || !selectedMedicine || !intake || !frequency || !duration) {
      alert('Please complete Diagnosis, ICD-10, Medicine, Intake, Frequency, and Duration.');
      return;
    }
    alert(`✅ Submitted:\nDiagnosis: ${selectedDiagnosis}\nICD-10: ${selectedIcdCode}\nDescription: ${icdDescription}\nMedicine: ${selectedMedicine}\nIntake: ${intake}\nFrequency: ${frequency}\nDuration: ${duration}`);
  };

  const medicines = selectedDiagnosis
    ? mentalHealthMeds[selectedDiagnosis as keyof typeof mentalHealthMeds] || []
    : [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assessment" />

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-xl p-4 shadow-sm bg-white text-sm mb-1">
        <div className="space-y-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">Personal Information</div>
          <InfoRow icon={User} label="Patient name:" value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
          <InfoRow icon={User} label="Patient Number:" value={`2025-${String(patient.id).padStart(6, '0')}`} />
          <InfoRow icon={User} label="Sex:" value={patient.sex_code} />
          <InfoRow icon={User} label="Civil status:" value={patient.civil_status} />
          <InfoRow icon={User} label="Birthdate:" value={new Date(patient.pat_birthDate).toLocaleDateString()} />
          <InfoRow icon={User} label="Age:" value={`${age} yrs`} />
        </div>
        <div className="space-y-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">Relationship Information</div>
          <InfoRow icon={ArrowRight} label="Patient Address:" value={patient.patient_address} />
          <InfoRow icon={ArrowRight} label="Mother's name:" value={`${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`} />
          <InfoRow icon={ArrowRight} label="Father's name:" value={`${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`} />
          <InfoRow icon={ArrowRight} label="Date entered:" value={`${new Date(patient.ts_created_at).toLocaleString()}`} />
        </div>
      </div>

      {/* Stepper */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-gray-600" />
          <h4 className="text-md font-bold text-gray-600">Assessment Tool</h4>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center relative w-full">
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-gray-300 z-0" />
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full border-4",
                    currentStep >= index ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-300",
                    "z-10"
                  )}
                >
                  <step.icon size={24} />
                </Button>
                <span className={cn("mt-1 text-xs", currentStep >= index ? "text-black font-semibold" : "text-gray-400")}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 ml-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
            <Button variant="outline" onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</Button>
            <Button variant="default" onClick={handleSubmit}>Submit</Button>
            <Button variant="destructive" onClick={reset}>Reset</Button>
          </div>
        </div>

        {/* Diagnosis & Medicine Step */}
        {currentStep === 3 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Diagnosis & Medicine</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Diagnosis</label>
                <select value={selectedDiagnosis} onChange={handleDiagnosisChange} className="w-full p-2 border rounded-md">
                  <option value="">-- Select Diagnosis --</option>
                  {diagnoses.map((d) => (
                    <option key={d.icdKey} value={d.icdKey}>{d.label}</option>
                  ))}
                </select>
              </div>

              {selectedDiagnosis && (
                <div>
                  <label className="text-sm font-medium text-gray-700">ICD-10 Code</label>
                  <select value={selectedIcdCode} onChange={handleIcdCodeChange} className="w-full p-2 border rounded-md">
                    <option value="">-- Select ICD-10 Code --</option>
                    {icd10Data[selectedDiagnosis as keyof typeof icd10Data]?.map((item) => (
                      <option key={item.code} value={item.code}>{item.code} - {item.description}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {selectedDiagnosis && (
              <div>
                <label className="text-sm font-medium text-gray-700">Recommended Medicine</label>
                <select value={selectedMedicine} onChange={handleMedicineChange} className="w-full p-2 border rounded-md">
                  <option value="">-- Select Medicine --</option>
                  {medicines.map((med, idx) => (
                    <option key={idx} value={med.name}>{med.name} ({med.brand})</option>
                  ))}
                </select>
              </div>
            )}

            {/* {selectedMedicine && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Intake</label>
                  <input type="number" value={intake} onChange={(e) => setIntake(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Frequency</label>
                  <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
              </div>
            )} */}

          {/* Intake, Frequency, Duration Fields */}
            {selectedMedicine && (
              <div className="space-y-4">
                  <div className="flex space-x-4">
                  {/* Intake Field */}
                  <div className="flex-1">
                      <label htmlFor="intake" className="text-sm font-medium text-gray-700">Intake</label>
                      <div className="flex space-x-2">
                      <input
                          type="number"
                          id="intake"
                          value={intake}
                          onChange={(e) => setIntake(e.target.value)}
                          className="w-40 p-2 border rounded-md"
                          placeholder="e.g., 1, 2, 3"
                      />
                      <select
                          id="intake-unit"
                          className="w-full p-2 border rounded-md"
                         onChange={(e) => setIntakeUnit(e.target.value)}
                      >
                          <option value="" disabled>Select Intake</option>
                          <option value="tablet">Tablet</option>
                          <option value="vial">Vial</option>
                      </select>
                      </div>
                  </div>
  
                  {/* Frequency Field */}
                  <div className="flex-1">
                      <label htmlFor="frequency" className="text-sm font-medium text-gray-700">Frequency</label>
                      <div className="flex space-x-2">
                      <input
                          type="number"
                          id="frequency"
                          value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                          className="w-40 p-2 border rounded-md"
                          placeholder="e.g., 1, 2, 3"
                      />
                      <select
                          id="frequency-unit"
                          className="w-full p-2 border rounded-md"
                         onChange={(e) => setFrequencyUnit(e.target.value)}
                      >
                          <option value="" disabled>Select Frequency</option>
                          <option value="hour">Hour(s)</option>
                          <option value="day">Day(s)</option>
                          <option value="week">Week(s)</option>
                          <option value="month">Month(s)</option>
                      </select>
                      </div>
                  </div>
  
                  {/* Duration Field */}
                  <div className="flex-1">
                      <label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration</label>
                      <div className="flex space-x-2">
                      <input
                          type="number"
                          id="duration"
                          value={duration}
                         // onChange={(e) => setDuration(e.target.value)}
                          className="w-40 p-2 border rounded-md"
                          placeholder="e.g., 1, 2, 3"
                      />
                      <select
                          id="duration-unit"
                          className="w-full p-2 border rounded-md"
                        //  onChange={(e) => setDurationUnit(e.target.value)}
                      >
                          <option value="" disabled>Select Duration</option>
                          <option value="hour">Hour(s)</option>
                          <option value="day">Day(s)</option>
                          <option value="week">Week(s)</option>
                          <option value="month">Month(s)</option>
                      </select>
                      </div>
                  </div>
                  </div>
  
                  {/* Total Quantity Calculation */}
                  {
                  intake && frequency && duration && frequency && duration && 
                  intake !== "" && frequency !== "" && duration !== "" && frequency !== "" && duration !== "" 
                  && (
                      <div className="mt-4">
                      <label className="text-sm font-medium text-gray-700">Total Quantity</label>
                      <div className="p-2 border rounded-md">
                          {
                          // Calculate total based on intake, frequency, and duration
                          frequency === "hour" && duration === "day"
                              ? `${parseFloat(intake) * parseFloat(frequency) * parseFloat(duration)} total`
                              : parseFloat(intake) * parseFloat(frequency) * parseFloat(duration)
                          }
                      </div>
                      </div>
                  )
                  }
              </div>
              )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}


