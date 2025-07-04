<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Modules\MentalHealth\Models\Pharma;
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

        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->when($consultDate, function ($query) use ($consultDate) {
                $query->whereDate('consult_date_assess', $consultDate);
            })
            ->orderByDesc('consult_date_assess')
            ->get();

        $pharmaMeds = Pharma::where('pat_perm_id', $patient->id)
            ->when($consultDate, function ($query) use ($consultDate) {
                $query->whereDate('phar_date', $consultDate);
            })
            ->orderByDesc('phar_date')
            ->get();

        return Inertia::render('MentalHealth::Assessment/ITRiClinicPat', [
            'patient' => $patient,
            'consultation' => $consultation,
            'assessments' => $assessments,
            'pharmaMeds' => $pharmaMeds, 
        ]);
    }
}
