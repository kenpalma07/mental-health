import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, ChevronLeft, ChevronRight, Clipboard, Heart, RefreshCcw, Send, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import ManMNSAssess from '../components/ManMNSAssess';
import PatientInfoHead from '../Forms/PatientInfoHead';
import AssessPhyHealth from './components/AssessPhyHealth';
import ConMNSAssess from './components/ConMNSAssess';
import DiagMeds from './components/DiagMeds';
import Stepper from './components/Stepper';

interface Props extends PageProps {
    patient: any;
    assessment: any;
    consultation?: any;
    facilities?: any;
    employees?: any;
}

type GroupedItems = {
    pres_comp_label: string;
    pres_comp_item: string[];
    gen_heal_hist_label: string;
    gen_heal_hist_item: string[];
    mns_hist_label: string;
    mns_hist_item: string[];
    fam_hist_mns_cond_label: string;
    fam_hist_mns_cond_item: string[];
    [key: string]: string | string[];
};

export default function AssessmentIndex({ patient, consultation, assessment, facilities, employees }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Mental Health', href: '/patients' },
        { title: 'Search Patients', href: '/patients/create' },
        { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
        { title: 'Assessments', href: `/assessment/${patient.id}/history` },
        { title: 'Edit Assessment Forms', href: '#' },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const [physicalHealthData, setPhysicalHealthData] = useState({
        assessment_physical_health: assessment.assessment_physical_health || '',
        management_physical_health: assessment.management_physical_health || '',
    });

    const [physicalErrors, setPhysicalErrors] = useState({
        assessment_physical_health: '',
        management_physical_health: '',
    });

    const [mnsData, setMNSData] = useState<Record<string, GroupedItems[]>>(assessment.mns_data || {});
    const [manMNSData, setmanMNSData] = useState<Record<string, string[]>>(assessment.man_mns_data || {});
    const [selfHarmData, setSelfHarmData] = useState({
        school_name: assessment.school_name || '',
        grade_year: assessment.grade_year || '',
        place_inci: assessment.place_inci || '',
        self_sui_means: assessment.self_sui_means || '',
        self_sui_remarks: assessment.self_sui_remarks || '',
    });

    // --- NEW: Med Data State ---
    const [medData, setMedData] = useState({
        diagnosis: assessment.diagnosis,
        icdCode: assessment.icd_10_code,
        icdCodeDescrip: assessment.icd_10_descrip,
        pharDate: assessment.phar_date,
        medicine: assessment.phar_med,
        intake: assessment.phar_intake,
        intakeUnit: assessment.phar_intakeUnit,
        frequency: assessment.phar_freq,
        frequencyUnit: assessment.phar_freqUnit,
        duration: assessment.phar_dur,
        durationUnit: assessment.phar_durUnit,
        quantity: assessment.phar_quantity,
        doctor: assessment.phar_doc,
        dispense: assessment.is_dispense,
        remarks: assessment.phar_remarks,
    });

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
        setPhysicalHealthData({
            assessment_physical_health: '',
            management_physical_health: '',
        });
        setPhysicalErrors({
            assessment_physical_health: '',
            management_physical_health: '',
        });
        setmanMNSData({});
        setMNSData({});
        setSelfHarmData({
            school_name: '',
            grade_year: '',
            place_inci: '',
            self_sui_means: '',
            self_sui_remarks: '',
        });
        setMedData({
            diagnosis: '',
            icdCode: '',
            icdCodeDescrip: '',
            pharDate: '',
            medicine: '',
            intake: '',
            intakeUnit: '',
            frequency: '',
            frequencyUnit: '',
            duration: '',
            durationUnit: '',
            quantity: '',
            doctor: '',
            dispense: '',
            remarks: '',
        });
    };

    // --- CLEAN HANDLE SUBMIT ---
    const handleSubmit = async () => {
        // Compose all step data into one object
        const payload = {
            ...physicalHealthData,
            ...selfHarmData,
            ...flattenMNSData(mnsData),
            ...flattenManMNSData(manMNSData),
            // --- Include medData fields ---
            diagnosis: medData.diagnosis,
            icd_10_code: medData.icdCode,
            icd_10_descrip: medData.icdCodeDescrip,
            phar_date: medData.pharDate,
            phar_med: medData.medicine,
            phar_intake: medData.intake,
            phar_intakeUnit: medData.intakeUnit,
            phar_freq: medData.frequency,
            phar_freqUnit: medData.frequencyUnit,
            phar_dur: medData.duration,
            phar_durUnit: medData.durationUnit,
            phar_quantity: medData.quantity,
            phar_doc: medData.doctor,
            is_dispense: medData.dispense,
            phar_remarks: medData.remarks,
            id: assessment.id,
        };

        try {
            const response = await axios.put(`/assessments/${assessment.id}`, payload);
            if (response.data?.success && response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setPhysicalErrors(error.response.data.errors);
            }
            console.error(error);
        }
    };

    // Helper to flatten grouped MNS data for backend
    function flattenMNSData(data: Record<string, GroupedItems[]>) {
        const result: Record<string, any> = {};
        Object.entries(data).forEach(([key, groups]) => {
            result[key] = groups.map((g) => ({
                ...g,
            }));
        });
        return result;
    }

    // Helper to flatten management MNS data for backend
    function flattenManMNSData(data: Record<string, string[]>) {
        return { ...data };
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assessment List" />
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
                        <Button variant="default" onClick={handleSubmit}>
                            <Send className="mr-1 h-4 w-4" />
                            Update
                        </Button>
                        <Button variant="destructive" onClick={resetForm}>
                            <RefreshCcw className="mr-1 h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </div>

                {currentStep === 0 && <AssessPhyHealth data={physicalHealthData} setData={setPhysicalHealthData} errors={physicalErrors} />}

                {currentStep === 1 && (
                    <ConMNSAssess data={mnsData} setMNSData={setMNSData} selfHarmData={selfHarmData} setSelfHarmData={setSelfHarmData} />
                )}

                {currentStep === 2 && <ManMNSAssess data={manMNSData} setmanMNSData={setmanMNSData} facilities={facilities || []} />}

                {currentStep === 3 && (
                    <DiagMeds
                        employees={employees}
                        consultation={consultation}
                        patient={patient}
                        isEdit={true}
                        initialData={medData}
                        onSaved={setMedData} // always sync data
                        onStepDone={() => setCurrentStep(currentStep + 1)} // only advance step on save
                    />
                )}
            </div>
        </AppLayout>
    );
}
