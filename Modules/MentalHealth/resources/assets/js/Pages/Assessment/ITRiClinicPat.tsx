import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type {
  BreadcrumbItem,
  PageProps,
  MasterPatient,
  Consultations,
  MentalAssessmentForm,
  Pharma,
} from '@/types';
import { Head } from '@inertiajs/react';
import { PDFViewer } from '@react-pdf/renderer';
import ITRiClinicPatPDF from './components/ITRiClinicPatPDF';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props extends PageProps {
  patient: MasterPatient;
  consultation?: Consultations;
  assessments: MentalAssessmentForm[];
  pharmaMeds: Pharma[];
}

export default function ITRiClinicPat({
  patient,
  consultation,
  assessments,
  pharmaMeds,
}: Props) {
  const [showPDF, setShowPDF] = React.useState(true);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mental Health', href: '/patients' },
    { title: 'Search Patients', href: '/patients/create' },
    { title: 'Patient Consultation', href: `/consultations/${patient.id}` },
    { title: 'ITR & Assessment Forms & Treatment Plan', href: '#' },
  ];

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const id = patient?.id || '';
      window.location.href = `/consultations/${id}`;
      setShowPDF(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="ITR & Assessment Forms" />
      <div className="p-6 bg-white shadow rounded text-xs space-y-4">
        <Dialog open={showPDF} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden p-0">
            <DialogHeader className="p-4">
              <DialogTitle className="sr-only">ITR Preview</DialogTitle>
            </DialogHeader>
            <div className="h-[100vh] w-full">
              <PDFViewer width="100%" height="100%">
                <ITRiClinicPatPDF
                  patient={patient}
                  consultation={consultation}
                  pharmaMeds={pharmaMeds}
                  assessments={assessments}
                />
              </PDFViewer>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
