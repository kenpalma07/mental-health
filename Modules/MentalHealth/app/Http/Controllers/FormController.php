<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Inertia\Inertia;

class FormController extends Controller
{
        public function index($id)
        {
            $patient = MasterPatient::where('id', $id)->firstOrFail();
        
            $consultation = Consultation::where('consult_temp_id', $patient->id)
            ->orderByDesc('consult_date')
            ->first();
        
            $assessments = MentalAssessmentForm::where('pat_temp_id', $id)->orderByDesc('consult_date_assess')->get();
        
            return Inertia::render('MentalHealth::Assessment/ITRiClinicPat', [
                'patient' => $patient,
                'consultation' => $consultation,
                'assessments' => $assessments,
            ]);
        }
    
}