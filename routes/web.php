<?php

use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Modules\MentalHealth\Models\MentalAssessmentForm;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $patientCount = MasterPatient::count();
        $consultationCount = Consultation::count();
        $assessmentCount = MentalAssessmentForm::count();

        $assessments = MentalAssessmentForm::with('patient')
            ->whereNotNull('consult_date_assess')
            ->get();

        $year = now()->year;

        $adultSelfHarmCount = 0;
        $adolescentSelfHarmCount = 0;

        $uniqueAdultSelfHarm = collect();
        $uniqueAdolSelfHarm = collect();
        $allAdolescent = collect();
        $allAdult = collect();

        $trendMap = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthKey = Carbon::create($year, $month, 1)->format('M Y');
            $trendMap[$monthKey] = [
                'date' => $monthKey,
                'adult' => 0,
                'adolescent' => 0,
            ];
        }

        foreach ($assessments as $assessment) {
            $patient = $assessment->patient;

            if (!$patient || !$patient->pat_birthDate) {
                continue;
            }

            $consultDate = Carbon::parse($assessment->consult_date_assess);
            if ($consultDate->year !== $year) continue;

            $birthDate = Carbon::parse($patient->pat_birthDate);
            $age = $birthDate->diffInYears($consultDate);
            $isAdolescent = $age <= 18;
            $dateKey = $consultDate->format('M Y');
            $patientId = $patient->id;

            // Track all patients per group
            if ($isAdolescent) {
                $allAdolescent->push($patientId);
            } else {
                $allAdult->push($patientId);
            }

            if ($assessment->selfharm_sui === 'Y') {
                if ($isAdolescent) {
                    $adolescentSelfHarmCount++;
                    $uniqueAdolSelfHarm->push($patientId);
                    $trendMap[$dateKey]['adolescent']++;
                } else {
                    $adultSelfHarmCount++;
                    $uniqueAdultSelfHarm->push($patientId);
                    $trendMap[$dateKey]['adult']++;
                }
            }
        }

        // Final counts
        $adultSelfHarmPatients = $uniqueAdultSelfHarm->unique()->count();
        $adolescentSelfHarmPatients = $uniqueAdolSelfHarm->unique()->count();

        $adultNoSelfHarmCount = $allAdult->unique()->diff($uniqueAdultSelfHarm->unique())->count();
        $adolescentNoSelfHarmCount = $allAdolescent->unique()->diff($uniqueAdolSelfHarm->unique())->count();

        uksort($trendMap, fn($a, $b) => Carbon::parse("01 $a")->timestamp <=> Carbon::parse("01 $b")->timestamp);

        return Inertia::render('dashboard', [
            'patientCount' => $patientCount,
            'consultationCount' => $consultationCount,
            'assessmentCount' => $assessmentCount,

            'adultSelfHarmCount' => $adultSelfHarmCount,
            'adolescentSelfHarmCount' => $adolescentSelfHarmCount,

            'adultSelfHarmPatients' => $adultSelfHarmPatients,
            'adolescentSelfHarmPatients' => $adolescentSelfHarmPatients,

            'adultNoSelfHarmCount' => $adultNoSelfHarmCount,
            'adolescentNoSelfHarmCount' => $adolescentNoSelfHarmCount,

            'selfHarmTrends' => array_values($trendMap),
        ]);
    })->name('dashboard');
});
