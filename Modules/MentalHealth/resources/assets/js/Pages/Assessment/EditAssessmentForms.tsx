import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, ChevronLeft, ChevronRight, Clipboard, Heart, RefreshCcw, Send, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import PatientInfoHead from '../Forms/PatientInfoHead';
import AssessPhyHealth from './components/AssessPhyHealth';
import ConMNSAssess from './components/ConMNSAssess';
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
    const [selfHarmData, setSelfHarmData] = useState({
        school_name: assessment.school_name || '',
        grade_year: assessment.grade_year || '',
        place_inci: assessment.place_inci || '',
        self_sui_means: assessment.self_sui_means || '',
        self_sui_remarks: assessment.self_sui_remarks || '',
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
    };

    const handleSubmit = () => {
        const newAssessment = {
            assessment_physical_health: physicalHealthData.assessment_physical_health,
            management_physical_health: physicalHealthData.management_physical_health,
        };

        axios
            .put(`/assessments/${assessment.id}`, newAssessment)
            .then((response) => {
                if (response.data?.success && response.data.redirect_url) {
                    window.location.href = response.data.redirect_url;
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setPhysicalErrors(error.response.data.errors);
                }
                console.error(error);
            });
    };

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
            </div>
        </AppLayout>
    );
}
