<?php

namespace Modules\MentalHealth\Http\Controllers;

use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\Consultation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function mhtracker()
    {
        $patients = MasterPatient::with([
            'consultation' => fn ($q) => $q->orderBy('consult_date', 'desc'),
            'assessment' => fn ($q) => $q->orderBy('consult_date_assess', 'desc')->limit(1),
        ])
        ->whereHas('consultation')
        ->orWhereHas('assessment')
        ->get()
        ->map(function ($patient) {
            $patient->assessment = $patient->assessment->first();
            return $patient;
        });

        return Inertia::render('MentalHealth::Report/mhtracker', [
            'patients' => $patients,
        ]);
    }
    

    public function schoolagesr()
    {
        return Inertia::render('MentalHealth::Report/schoolagesr');
    }

    public function adultsr()
    {
        return Inertia::render('MentalHealth::Report/adultsr');
    }
}
