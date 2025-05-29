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
            'consultation' => fn($q) => $q->orderBy('consult_date', 'desc'),
            'assessment' => fn($q) => $q->orderBy('consult_date_assess', 'desc')->limit(1),
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

    public function mhmasterlist()
    {
        $patients = MasterPatient::with([
            'consultation' => fn($q) => $q->orderBy('consult_date', 'desc'),
            'assessment' => fn($q) => $q->orderBy('consult_date_assess', 'desc')->limit(1),
        ])
            ->whereHas('consultation')
            ->orWhereHas('assessment')
            ->get()
            ->map(function ($patient) {
                $patient->assessment = $patient->assessment->first();
                return $patient;
            });

        return Inertia::render('MentalHealth::Report/mhmasterlist', [
            'patients' => $patients,
        ]);
    }

    public function schoolagesr()
    {
        $patients = MasterPatient::with([
            'consultation' => fn($q) => $q->orderBy('consult_date', 'desc'),
            'assessment' => fn($q) => $q->orderBy('consult_date_assess', 'desc'),
        ])
            ->whereHas('consultation')
            ->orWhereHas('assessment')
            ->get()
            ->map(function ($patient) {

                $birthDate = \Carbon\Carbon::parse($patient->pat_birthDate);
                $age = $birthDate->age;

                if ($age > 18) return null;

                $patient->suicideAssessments = $patient->assessment->filter(function ($assess) {
                    return !empty($assess->self_sui_means);
                })->values();

                if ($patient->suicideAssessments->isEmpty()) return null;

                unset($patient->assessment);
                return $patient;
            })
            ->filter() 
            ->values();

        return Inertia::render('MentalHealth::Report/schoolagesr', [
            'patients' => $patients,
        ]);
    }


    public function adultsr()
    {
        $patients = MasterPatient::with([
            'consultation' => fn($q) => $q->orderBy('consult_date', 'desc'),
            'assessment' => fn($q) => $q->orderBy('consult_date_assess', 'desc'),
        ])
            ->whereHas('consultation')
            ->orWhereHas('assessment')
            ->get()
            ->map(function ($patient) {

                $birthDate = \Carbon\Carbon::parse($patient->pat_birthDate);
                $age = $birthDate->age;

                if ($age <= 18) return null;

                $patient->suicideAssessments = $patient->assessment->filter(function ($assess) {
                    return !empty($assess->self_sui_means);
                })->values();

                if ($patient->suicideAssessments->isEmpty()) return null;

                unset($patient->assessment);
                return $patient;
            })
            ->filter() 
            ->values();

        return Inertia::render('MentalHealth::Report/adultsr', [
            'patients' => $patients,
        ]);
    }
}
