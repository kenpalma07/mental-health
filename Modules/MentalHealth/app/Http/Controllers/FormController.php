<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function index($id, Request $request)
    {
        $consultDate = $request->query('consult_date');
    
        $patient = MasterPatient::findOrFail($id);
    
        $consultation = Consultation::where('consult_temp_id', $patient->id)
            ->when($consultDate, function ($query) use ($consultDate) {
                $query->whereDate('consult_date', $consultDate);
            })
            ->orderByDesc('consult_date')
            ->first();
    
        // Match consult_date_assess with the given consult_date
        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->when($consultDate, function ($query) use ($consultDate) {
                $query->whereDate('consult_date_assess', $consultDate);
            })
            ->orderByDesc('consult_date_assess')
            ->get();
    
        return Inertia::render('MentalHealth::Assessment/ITRiClinicPat', [
            'patient' => $patient,
            'consultation' => $consultation,
            'assessments' => $assessments,
        ]);
    }
    
}