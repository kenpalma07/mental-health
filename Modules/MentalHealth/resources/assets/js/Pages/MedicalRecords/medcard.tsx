import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, MasterPatient, MentalAssessmentForm, Pharma } from '@/types';
import React from 'react';
import { PDFViewer } from "@react-pdf/renderer";
import { MedicationCardPDF } from "./components/medcard-pdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
  { title: 'Medication Card', href: '/medcard' },
];

interface MedicationCardProps {
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

const MedcardIndex: React.FC<MedicationCardProps> = ({
  patient,
  assessments,
  medicationRecords = [],
}) => {
  const [showPDF, setShowPDF] = React.useState(true); // Auto-show modal

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medication Card" />
      <div className="p-4 space-y-4">
        <MedicationCardPDFModal
          open={showPDF}
          onClose={() => setShowPDF(false)}
          patient={patient}
          assessments={assessments}
          medicationRecords={medicationRecords}
        />
      </div>
    </AppLayout>
  );
};

interface MedicationCardPDFModalProps {
  open: boolean;
  onClose: () => void;
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

const MedicationCardPDFModal: React.FC<MedicationCardPDFModalProps> = ({ open, onClose, patient, assessments, medicationRecords }) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const id = patient?.id || "";
      router.visit(`/medrecords/${id}`, {
        onFinish: () => window.location.reload(),
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="sr-only"></DialogTitle>
        </DialogHeader>
        <div className="h-[100vh] w-full">
          <PDFViewer width="100%" height="100%">
            <MedicationCardPDF patient={patient} assessments={assessments} medicationRecords={medicationRecords} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedcardIndex;