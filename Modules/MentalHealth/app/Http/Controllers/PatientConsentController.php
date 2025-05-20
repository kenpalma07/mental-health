<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\FHUDFacility;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PatientConsentController extends Controller
{
    public function show($id)
    {
        $patient = MasterPatient::findOrFail($id);

        return Inertia::render('MentalHealth::Forms/PatientConsent', [
            'patient' => $patient,
        ]);
    }

    public function exportConsentPDF(MasterPatient $patient)
    {
        $pdf = Pdf::loadView('mentalhealth::pdfs.patient-consent', ['patient' => $patient]);
        return $pdf->stream("patient-consent-{$patient->master_patient_perm_id}.pdf");
    }

    public function streamConsentPDF($id)
    {
        $patient = MasterPatient::findOrFail($id);
        $facility = FHUDFacility::where('fhudcode', $patient->fhudcode)->firstOrFail();

        $pdf = Pdf::loadView('mentalhealth::pdfs.patient-consent', [
            'patient' => $patient,
            'facility' => $facility,
        ]);

        return $pdf->stream("patient-consent-{$patient->master_patient_perm_id}.pdf");
    }
}
