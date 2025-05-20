import React from 'react';

interface PatientConsentModalProps {
    open: boolean;
    onClose: () => void;
    patientId: number;
}

const PatientConsentModal: React.FC<PatientConsentModalProps> = ({ open, onClose, patientId }) => {
    const pdfUrl = `/patients/${patientId}/consent-pdf`;

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-5">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Patient Consent Form</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* PDF Iframe */}
                <div className="flex-grow p-4 overflow-hidden">
                    <iframe
                        src={pdfUrl}
                        title="Employee Consent PDF"
                        className="w-full h-full border rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientConsentModal;
