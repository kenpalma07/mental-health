<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Modules\MentalHealth\Models\Consultation;
use Inertia\Inertia;


class MedicalRecordsController extends Controller
{
    public function index()
    {
        return Inertia::render('MentalHealth::MedicalRecords/index');
    }

    public function show($id)
    {
        $patient = MasterPatient::findOrFail($id);

        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)->get();
        $consultation = Consultation::where('consult_temp_id', $id)->get();

        return Inertia::render('MentalHealth::MedicalRecords/medrecs', [
            'patient' => $patient,
            'assessments' => $assessments,
            'consultation' => $consultation,
        ]);
    }
}
