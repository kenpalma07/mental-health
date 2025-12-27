import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { AssessmentData, BreadcrumbItem, Consultations, Employee, FHUD, MasterPatient, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, ChevronLeft, ChevronRight, Clipboard, Heart, RefreshCcw, Send, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import AssessPhyHealth from '../components/AssessPhyHealth';
import ConMNSAssess from '../components/ConMNSAssess';
import DiagMeds from '../components/DiagMeds';
import ManMNSAssess from '../components/ManMNSAssess';
import SchedNxtVisit from '../components/SchedNxtVisit';
import Stepper from '../components/Stepper';
import PatientInfoHead from '../Forms/PatientInfoHead';

interface Props extends PageProps {
    patient: MasterPatient;
    consultation?: Consultations;
    facilities: FHUD;
    employees: Employee[];
    assessment?: AssessmentData;
}

export default function AssessmentDisMedsIndex({ patient, consultation, facilities, employees, assessment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Mental Health', href: '/patients' },
        { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
        { title: 'Dispense Medicine', href: '/#' },
    ];

    const [currentStep, setCurrentStep] = useState(3);

    const [physicalHealthData, setPhysicalHealthData] = useState({
        assessment_physical_health: assessment?.assessment_physical_health || '',
        management_physical_health: assessment?.management_physical_health || '',
    });

    const [physicalErrors, setPhysicalErrors] = useState({
        assessment_physical_health: '',
        management_physical_health: '',
    });

    const [MNSData, setMNSData] = useState(assessment?.mns_data || {});
    const [manMNSData, setmanMNSData] = useState(assessment?.man_mns_data || {});

    const [selfHarmData, setSelfHarmData] = useState({
        school_name: assessment?.school_name || '',
        grade_year: assessment?.grade_year || '',
        place_inci: assessment?.place_inci || '',
        self_sui_means: assessment?.self_sui_means || '',
        self_sui_remarks: assessment?.self_sui_remarks || '',
    });

    // Only diagnosis and ICD fields are prefilled, all medicine fields are BLANK
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(assessment?.diagnosis || '');
    const [selectedIcdCode, setSelectedIcdCode] = useState(assessment?.icd_10_code || '');
    const [selectedIcdCodeDescrip, setSelectedIcdCodeDescrip] = useState(assessment?.icd_10_descrip || '');

    // Medicine-related fields: always blank
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
    const [dateNxtVisit, setDateNxtVisit] = useState(assessment?.date_nxt_visit || '');

    const previousVisits = assessment?.previous_visits || [];

    const steps = [
        { label: 'Physical Health', icon: User },
        { label: 'Conduct Assessment', icon: Clipboard },
        { label: 'Manage Assessment', icon: Heart },
        { label: 'Diagnosis and Medicine', icon: Stethoscope },
        { label: 'Schedule Next Visit', icon: Calendar },
    ];

    const nextStep = () => {
        if (currentStep === 0) {
            const errors = {
                assessment_physical_health: physicalHealthData.assessment_physical_health ? '' : 'Assessment in Physical Health is required.',
                management_physical_health: physicalHealthData.management_physical_health ? '' : 'Management in Physical Health is required.',
            };
            setPhysicalErrors(errors);
            if (errors.assessment_physical_health || errors.management_physical_health) return;
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
        setPhysicalHealthData({
            assessment_physical_health: '',
            management_physical_health: '',
        });
        setPhysicalErrors({
            assessment_physical_health: '',
            management_physical_health: '',
        });
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
            school_name: selfHarmData.school_name,
            grade_year: selfHarmData.grade_year,
            place_inci: selfHarmData.place_inci,
            self_sui_means: selfHarmData.self_sui_means,
            self_sui_remarks: selfHarmData.self_sui_remarks,
        };

        axios
            .post('/assessment/store', newAssessment)
            .then((response) => {
                if (response.data?.success && response.data.redirect_url) {
                    resetForm();

                    router.visit(`/consultations/${patient.id}`);

                    window.open(response.data.redirect_url, '_blank');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dispense Meds" />

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
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Previous
                        </Button>

                        <Button variant="outline" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                            Next
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>

                        <Button variant="default" onClick={handleSubmit} disabled={isFormIncomplete()}>
                            <Send className="mr-1 h-4 w-4" />
                            Submit
                        </Button>

                        <Button variant="destructive" onClick={resetForm}>
                            <RefreshCcw className="mr-1 h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </div>

                {currentStep === 0 && <AssessPhyHealth data={physicalHealthData} setData={setPhysicalHealthData} errors={physicalErrors} />}

                {currentStep === 1 && (
                    <ConMNSAssess data={MNSData} setMNSData={setMNSData} selfHarmData={selfHarmData} setSelfHarmData={setSelfHarmData} />
                )}

                {currentStep === 2 && (
                    <ManMNSAssess
                        data={manMNSData}
                        setmanMNSData={setmanMNSData}
                        facilities={Array.isArray(facilities) ? facilities : [facilities]}
                    />
                )}

                {currentStep === 3 && (
                    <DiagMeds
                        employees={employees}
                        consultation={consultation ?? ({} as Consultations)}
                        patient={patient}
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
                    <SchedNxtVisit
                        dateNxtVisit={dateNxtVisit}
                        setDateNxtVisit={setDateNxtVisit}
                        patientId={patient.id}
                        consultDate={consultation?.consult_date ?? ''}
                        previousVisits={previousVisits}
                    />
                )}
            </div>
        </AppLayout>
    );
}