import { Head, PageProps, router } from '@inertiajs/react';
import { Calendar, Clipboard, Heart, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import AssessPhyHealth from '../components/AssessPhyHealth';
import ConMNSAssess from '../components/ConMNSAssess';
import DiagMeds from '../components/DiagMeds';
import ManMNSAssess from '../components/ManMNSAssess';
import SchedNxtVisit from '../components/SchedNxtVisit';
import Stepper from '../components/Stepper';
import PatientInfoHead from '../Forms/PatientInfoHead';
// import TreatmentPlan from '../components/TreatmentPlan';

import type { BreadcrumbItem } from '@/types';

interface Props extends PageProps {
  patient: any;
  consultation?: any;
  facilities: any;
  employees: any;
}

export default function AssessmentIndex({ patient, consultation, facilities, employees }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
    { title: 'Add Assessment', href: '/#' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const [physicalHealthData, setPhysicalHealthData] = useState({
    assessment_physical_health: '',
    management_physical_health: '',
  });

  const [physicalErrors, setPhysicalErrors] = useState({
    assessment_physical_health: '',
    management_physical_health: '',
  });

  const [MNSData, setMNSData] = useState({});
  const [manMNSData, setmanMNSData] = useState({});


  const [selfHarmData, setSelfHarmData] = useState({
    school_name: '',
    grade_year: '',
    place_inci: '',
    self_sui_means: '',
    self_sui_remarks: '',
  });

  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [selectedIcdCode, setSelectedIcdCode] = useState('');
  const [selectedIcdCodeDescrip, setSelectedIcdCodeDescrip] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [intake, setIntake] = useState('');
  const [intakeUnit, setIntakeUnit] = useState('');
  const [frequency, setFrequency] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('day');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('day');
  const [selectedPharDate, setPharDate] = useState('');
  const [selectedQuantity, setQuantity] = useState<number>(0);
  const [selectedDoctor, setDoctor] = useState('');
  const [selectedDispense, setDispense] = useState('');
  const [selectedRemarks, setSelectedRemarks] = useState('');
  const [dateNxtVisit, setDateNxtVisit] = useState('');

  const steps = [
    { label: 'Physical Health', icon: User },
    { label: 'Conduct Assessment', icon: Clipboard },
    { label: 'Manage Assessment', icon: Heart },
    { label: 'Diagnosis and Medicine', icon: Stethoscope },
    { label: 'Schedule Next Visit', icon: Calendar },
  ];

  const nextStep = () => {
    if (currentStep === 0) {
      const errors: any = {};
      if (!physicalHealthData.assessment_physical_health)
        errors.assessment_physical_health = 'Assessment in Physical Health is required.';
      if (!physicalHealthData.management_physical_health)
        errors.management_physical_health = 'Management in Physical Health is required.';
      setPhysicalErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedDiagnosis('');
    setSelectedIcdCode('');
    setSelectedMedicine('');
    setIntake('');
    setIntakeUnit('');
    setFrequency('');
    setFrequencyUnit('day');
    setDuration('');
    setDurationUnit('day');
    setPhysicalHealthData({ assessment_physical_health: '', management_physical_health: '' });
    setPhysicalErrors({ assessment_physical_health: '', management_physical_health: '' });
    setMNSData({});
    setmanMNSData({});
    setSelectedIcdCodeDescrip('');
    setPharDate('');
    setQuantity(0);
    setDoctor('');
    setDispense('');
    setSelectedRemarks('');
    setDateNxtVisit('');
    setSelfHarmData({
      school_name: '',
      grade_year: '',
      place_inci: '',
      self_sui_means: '',
      self_sui_remarks: '',
    });
  };

  const isFormIncomplete = () => {
    return !selectedDiagnosis || !selectedIcdCode || !selectedMedicine || !intake || !frequency || !duration;
  };

  const handleSubmit = () => {
    if (isFormIncomplete()) return;

    const newAssessment = {
      pat_temp_id: String(patient.id),
      consultation_id: consultation?.consult_perm_id || '',
      pat_perm_id: consultation?.consult_temp_id || '',
      consult_date_assess: consultation?.consult_date || '',
      carer_name_mot: `${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`,
      carer_name_fat: `${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`,
      carer_address: patient.fat_address,
      carer_mobile: patient.fat_contact,
      assessment_physical_health: physicalHealthData.assessment_physical_health,
      management_physical_health: physicalHealthData.management_physical_health,
      ...MNSData,
      ...manMNSData,
      diagnosis: selectedDiagnosis,
      icd_10_code: selectedIcdCode,
      icd_10_descrip: selectedIcdCodeDescrip,
      phar_med: selectedMedicine,
      phar_intake: intake,
      phar_intakeUnit: intakeUnit,
      phar_freq: frequency,
      phar_freqUnit: frequencyUnit,
      phar_dur: duration,
      phar_durUnit: durationUnit,
      phar_date: selectedPharDate,
      phar_quantity: selectedQuantity,
      phar_doc: selectedDoctor,
      is_dispense: selectedDispense,
      phar_remarks: selectedRemarks,
      date_nxt_visit: dateNxtVisit,
      // Add self-harm modal data here
      school_name: selfHarmData.school_name,
      grade_year: selfHarmData.grade_year,
      place_inci: selfHarmData.place_inci,
      self_sui_means: selfHarmData.self_sui_means,
      self_sui_remarks: selfHarmData.self_sui_remarks,
    };

    axios.post('/assessment/store', newAssessment)
      .then((response) => {
        if (response.data?.success && response.data.redirect_url) {
          // reset form if needed
          resetForm();

          // Optional: redirect current tab to consultation view
          router.visit(`/consultations/${patient.id}`);

          // Open ITR form in a new tab
          window.open(response.data.redirect_url, '_blank');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assessment" />

      <PatientInfoHead patient={patient} consultation={consultation} />

      <div className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <User className="text-gray-600" />
          <h4 className="text-md font-bold text-gray-600">Assessment Tool</h4>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <div className="ml-8 flex gap-2">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button variant="outline" onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Next
            </Button>
            <Button variant="default" onClick={handleSubmit} disabled={isFormIncomplete()}>
              Submit
            </Button>
            <Button variant="destructive" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </div>

        {currentStep === 0 && (
          <AssessPhyHealth
            data={physicalHealthData}
            setData={setPhysicalHealthData}
            errors={physicalErrors}
          />
        )}
        {currentStep === 1 && (
          <ConMNSAssess
            data={MNSData}
            setMNSData={setMNSData}
            selfHarmData={selfHarmData}
            setSelfHarmData={setSelfHarmData}/>
        )}
        {currentStep === 2 && (
          <ManMNSAssess data={manMNSData} setmanMNSData={setmanMNSData} facilities={facilities} />
        )}
        {currentStep === 3 && (
          <DiagMeds
            employees={employees}
            selectedDiagnosis={selectedDiagnosis}
            setSelectedDiagnosis={setSelectedDiagnosis}
            selectedIcdCodeDescrip={selectedIcdCodeDescrip}
            setSelectedIcdCodeDescrip={setSelectedIcdCodeDescrip}
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
            pharDate={selectedPharDate}
            setPharDate={setPharDate}
            quantity={Number(selectedQuantity)}
            setQuantity={setQuantity}
            doctor={selectedDoctor}
            setDoctor={setDoctor}
            dispense={selectedDispense}
            setDispense={setDispense}
            remarks={selectedRemarks}
            setRemarks={setSelectedRemarks}
          />
        )}
        {currentStep === 4 && (
          <SchedNxtVisit dateNxtVisit={dateNxtVisit} setDateNxtVisit={setDateNxtVisit} />
        )}
      </div>
    </AppLayout>
  );
}