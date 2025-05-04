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

<<<<<<< HEAD
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
=======
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
        
>>>>>>> f29d314262856412b55a823310db27ed2093de14
      </div>
    </AppLayout>
  );
}
