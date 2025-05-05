import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { User, Clipboard, Heart, Calendar, Stethoscope } from "lucide-react";
import type { BreadcrumbItem } from '@/types';
import { Head, PageProps } from '@inertiajs/react';
import AssessPhyHealth from '../components/AssessPhyHealth';
import ConMNSAssess from '../components/ConMNSAssess';
import ManMNSAssess from '../components/ManMNSAssess';
import DiagMeds from '../components/DiagMeds';
import SchedNxtVisit from '../components/SchedNxtVisit';
import TreatmentPlan from '../components/TreatmentPlan';
import PatientInfoHead from '../Forms/PatientInfoHead';
import Stepper from '../components/Stepper';

interface Props extends PageProps {
  patient: any;
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

  const [physicalHealthData, setPhysicalHealthData] = useState({
    assessment: '',
    management: '',
  });

  const [MNSData, setMNSData] = useState({});
  const [manMNSData, setmanMNSData] = useState({});

  const steps = [
    { label: "Physical Health", icon: User },
    { label: "Conduct Assessment", icon: Clipboard },
    { label: "Manage Assessment", icon: Heart },
    { label: "Diagnosis and Medicine", icon: Stethoscope },
    { label: "Schedule Next Visit", icon: Calendar },
    { label: "Treatment Plan", icon: Stethoscope },
  ];

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
    setSelectedMedicine('');
    setIntake('');
    setFrequency('');
    setDuration('');
  };

  const isFormIncomplete = () => {
    return !selectedDiagnosis || !selectedIcdCode || !selectedMedicine || !intake || !frequency || !duration;
  };

  const handleSubmit = () => {
    if (isFormIncomplete()) {
      alert('Please complete Diagnosis, ICD-10, Medicine, Intake, Frequency, and Duration.');
      return;
    }
    // Submit form logic here
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assessment" />
      <PatientInfoHead patient={patient} />

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-gray-600" />
          <h4 className="text-md font-bold text-gray-600">Assessment Tool</h4>
        </div>

        <div className="flex items-center justify-between mb-8">
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <div className="flex gap-2 ml-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
            <Button variant="outline" onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</Button>
            <Button variant="default" onClick={handleSubmit} disabled={isFormIncomplete()}>Submit</Button>
            <Button variant="destructive" onClick={reset}>Reset</Button>
          </div>
        </div>

        {currentStep === 0 && <AssessPhyHealth data={physicalHealthData} setData={setPhysicalHealthData} />}
        {currentStep === 1 && <ConMNSAssess data={MNSData} setMNSData={setMNSData} />}
        {currentStep === 2 && <ManMNSAssess data={manMNSData} setmanMNSData={setmanMNSData} />}
        {currentStep === 3 && <DiagMeds
          selectedDiagnosis={selectedDiagnosis} setSelectedDiagnosis={setSelectedDiagnosis}
          selectedIcdCode={selectedIcdCode} setSelectedIcdCode={setSelectedIcdCode}
          selectedMedicine={selectedMedicine} setSelectedMedicine={setSelectedMedicine}
          intake={intake} setIntake={setIntake} intakeUnit={intakeUnit} setIntakeUnit={setIntakeUnit}
          frequency={frequency} setFrequency={setFrequency} frequencyUnit={frequencyUnit}
          setFrequencyUnit={setFrequencyUnit} duration={duration} setDuration={setDuration}
          durationUnit={durationUnit} setDurationUnit={setDurationUnit}
        />}
        {currentStep === 4 && <SchedNxtVisit />}
        {currentStep === 5 && <TreatmentPlan />}
        
      </div>
    </AppLayout>
  );
}
