import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { User, Clipboard, Heart, Calendar, Stethoscope, ArrowRight } from "lucide-react";
import type { BreadcrumbItem } from '@/types';
import { Head, PageProps } from '@inertiajs/react';
import AssessPhyHealth from '../components/AssessPhyHealth';
import ConMNSAssess from '../components/ConMNSAssess';
import ManMNSAssess from '../components/ManMNSAssess';
import DiagMeds from '../components/DiagMeds';
import SchedNxtVisit from '../components/SchedNxtVisit';

interface Patient {
  id: number;
  master_patient_perm_id: string;
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
  { label: "Conduct MNS Assessment", icon: Clipboard },
  { label: "Manage MNS Assessment", icon: Heart },
  { label: "Diagnosis and Medicine", icon: Stethoscope },
  { label: "Schedule Next Visit", icon: Calendar },
];

function InfoRow({
  icon: Icon, label, value, withArrow
}: { 
  icon: React.ComponentType<{ className?: string; size?: number }>, 
  label: string, 
  value: string, 
  withArrow?: boolean 
}) {
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
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
    { title: 'Add Assessment', href: '/#' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>('');
  const [selectedIcdCode, setSelectedIcdCode] = useState<string>('');
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');
  const [intake, setIntake] = useState<string>('');
  const [intakeUnit, setIntakeUnit] = useState<string>('mg');
  const [frequency, setFrequency] = useState<string>('');
  const [frequencyUnit, setFrequencyUnit] = useState<string>('day');
  const [duration, setDuration] = useState<string>('');
  const [durationUnit, setDurationUnit] = useState<string>('day');

  const age = new Date().getFullYear() - new Date(patient.pat_birthDate).getFullYear();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const [physicalHealthData, setPhysicalHealthData] = useState({
    assessment: '',
    management: '',
  });

  const [manMNSData, setmanMNSData] = useState({
    'Treatment Plan': [],
    'Physical Intervention': [],
    'Referrals': [],
    'Career and Family': [],
    'Link Status': [],
    'Special Population': [],
  });

  const [MNSData, setMNSData] = useState({
    'Presenting complaint': [],
    'General Health History': [],
    'MNS History': [],
    'Family History of MNS condition': [],
  });

  const data = {
    diagnosis: selectedDiagnosis,
    icdCode: selectedIcdCode,
    medicine: selectedMedicine,
    intake,
    intakeUnit,
    frequency,
    frequencyUnit,
    duration,
    durationUnit,
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

  // Move the isFormIncomplete function outside of handleSubmit
  const isFormIncomplete = () => {
    return !selectedDiagnosis || !selectedIcdCode || !selectedMedicine || !intake || !frequency || !duration;
  };

  const handleSubmit = () => {
    if (isFormIncomplete()) {
      alert('Please complete Diagnosis, ICD-10, Medicine, Intake, Frequency, and Duration.');
      return;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assessment" />

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-xl p-4 shadow-sm bg-white text-sm mb-1">
        <div className="space-y-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">Personal Information</div>
          <InfoRow icon={User} label="Patient name:" value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
          <InfoRow icon={User} label="Patient Number:" value={patient.master_patient_perm_id} />
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
            <Button variant="default" onClick={handleSubmit} disabled={isFormIncomplete()}>Submit</Button>
            <Button variant="destructive" onClick={reset}>Reset</Button>
          </div>
        </div>


        {currentStep === 0 && (
          <AssessPhyHealth
            data={physicalHealthData}
            setData={setPhysicalHealthData}
          />
        )}


        {currentStep === 1 && (
          <ConMNSAssess data={MNSData} setMNSData={setMNSData} />
        )}


        {currentStep === 2 && (
          <ManMNSAssess data={manMNSData} setmanMNSData={setmanMNSData} />
        )}

        {currentStep === 3 && (
        <DiagMeds
          selectedDiagnosis={selectedDiagnosis}
          setSelectedDiagnosis={setSelectedDiagnosis}
          selectedIcdCode={selectedIcdCode}
          setSelectedIcdCode={setSelectedIcdCode}
          selectedMedicine={selectedMedicine}
          setSelectedMedicine={setSelectedMedicine}
          intake={intake}
          setIntake={setIntake}
          intakeUnit={intakeUnit}
          setIntakeUnit={setIntakeUnit}
          frequency={frequency}
          setFrequency={setFrequency}
          frequencyUnit={frequencyUnit}
          setFrequencyUnit={setFrequencyUnit}
          duration={duration}
          setDuration={setDuration}
          durationUnit={durationUnit}
          setDurationUnit={setDurationUnit}
        />
        )}


        {currentStep === 4 && (
          <SchedNxtVisit data={manMNSData} setmanMNSData={setmanMNSData} />
        )}


      </div>

    </AppLayout>
  );
}
