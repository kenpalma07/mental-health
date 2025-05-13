import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, PageProps, router } from '@inertiajs/react';
import { Calendar, Clipboard, Heart, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import AssessPhyHealth from '../components/AssessPhyHealth';
import ConMNSAssess from '../components/ConMNSAssess';
import DiagMeds from '../components/DiagMeds';
import ManMNSAssess from '../components/ManMNSAssess';
import SchedNxtVisit from '../components/SchedNxtVisit';
import Stepper from '../components/Stepper';
// import TreatmentPlan from '../components/TreatmentPlan';
import PatientInfoHead from '../Forms/PatientInfoHead';



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
    const [physicalErrors, setPhysicalErrors] = useState({
        assessment: '',
        management: '',
    });

    const [MNSData, setMNSData] = useState({});
    const [manMNSData, setmanMNSData] = useState({});

    const steps = [
        { label: 'Physical Health', icon: User },
        { label: 'Conduct Assessment', icon: Clipboard },
        { label: 'Manage Assessment', icon: Heart },
        { label: 'Diagnosis and Medicine', icon: Stethoscope },
        { label: 'Schedule Next Visit', icon: Calendar },
        // { label: 'Treatment Plan', icon: Stethoscope },
    ];

    const nextStep = () => {
        if (currentStep === 0) {
            const errors: any = {};
            if (!physicalHealthData.assessment) errors.assessment = 'Assessment is Physical Health required.';
            if (!physicalHealthData.management) errors.management = 'Management is Physical Health required.';
            setPhysicalErrors(errors);
            if (Object.keys(errors).length > 0) return;
        }
        if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    const reset = () => {
        setCurrentStep(0);
        setSelectedDiagnosis('');
        setSelectedIcdCode('');
        setSelectedMedicine('');
        setIntake('');
        setFrequency('');
        setDuration('');
        setPhysicalHealthData({ assessment: '', management: '' });
        setPhysicalErrors({ assessment: '', management: '' });
    };

    const isFormIncomplete = () => {
        return !selectedDiagnosis || !selectedIcdCode || !selectedMedicine || !intake || !frequency || !duration;
    };

    const handleSubmit = () => {
        if (isFormIncomplete()) return;
    
        const newConsultation = {
            consultation_id: null,
            pat_temp_id: null,
    
            assessment_physical_health: physicalHealthData.assessment,
            management_physical_health: physicalHealthData.management,
    
            ...MNSData,
    
            ...manMNSData,
    
            diagnosis: selectedDiagnosis,
            icd_10_code: selectedIcdCode,
            icd_10_descrip: '',
            phar_med: selectedMedicine,
            phar_intake: intake,
            phar_intakeUnit: intakeUnit,
            phar_freq: frequency,
            phar_freqUnit: frequencyUnit,
            phar_dur: duration,
            phar_durUnit: durationUnit,
        };
    
        router.post('/assessment/store', newConsultation, {
            onSuccess: () => {
                reset();
                router.visit(`/consultations/${patient.id}`);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assessment" />

            <PatientInfoHead patient={patient} />

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
                        <Button variant="destructive" onClick={reset}>
                            Reset
                        </Button>
                    </div>
                </div>

                {currentStep === 0 && <AssessPhyHealth data={physicalHealthData} setData={setPhysicalHealthData} errors={physicalErrors} />}
                {currentStep === 1 && <ConMNSAssess data={MNSData} setMNSData={setMNSData} />}
                {currentStep === 2 && <ManMNSAssess data={manMNSData} setmanMNSData={setmanMNSData} />}
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
                {currentStep === 4 && <SchedNxtVisit />}
                {/* {currentStep === 5 && <TreatmentPlan />} */}
            </div>
        </AppLayout>
    );
}
