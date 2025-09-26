"use client";

import * as React from "react";
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PDFViewer } from "@react-pdf/renderer";
import { router } from '@inertiajs/react';
import TreatmentCardPDF from "./components/treatmentcard-pdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  BreadcrumbItem, Consultations, MasterPatient,
  MentalAssessmentForm, PageProps, Pharma
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
  { title: 'Treatment Card', href: '/treatmentcard' },
];

interface TreatmentCardPDFModalProps {
  open: boolean;
  onClose: () => void;
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

const TreatmentCardPDFModal: React.FC<TreatmentCardPDFModalProps> = ({ open, onClose, patient, assessments, medicationRecords }) => {
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
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="sr-only"></DialogTitle>
        </DialogHeader>
        <div className="h-[100vh] w-full">
          <PDFViewer width="100%" height="100%">
            <TreatmentCardPDF patient={patient} assessments={assessments} medicationRecords={medicationRecords} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface TreatmentCardProps extends PageProps {
  patient: MasterPatient;
  consultation?: Consultations;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

const TreatmentCardIndex: React.FC<TreatmentCardProps> = ({
  patient,
  assessments,
  medicationRecords = [],
}) => {
  const [showPDF, setShowPDF] = React.useState(true); // Auto-show modal

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Treatment Card" />
      <div className="p-4 space-y-4">
        <TreatmentCardPDFModal
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

export default TreatmentCardIndex;