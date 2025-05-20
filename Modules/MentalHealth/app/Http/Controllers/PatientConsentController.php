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

    public function streamConsentPDF(MasterPatient $patient)
    {
        $patient->load('fhudFacility'); // Eager load the FHUDFacility relationship

        $pdf = Pdf::loadView('mentalhealth::pdfs.patient-consent', [
            'patient' => $patient,
            'fhudFacility' => $patient->fhudFacility,
        ]);

        return $pdf->stream("patient-consent-{$patient->master_patient_perm_id}.pdf");
    }
}
