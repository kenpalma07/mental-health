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
    

<<<<<<< HEAD
  public function mhmasterlist()
{
    // Step 1: Get patients + assessment form data + consultation data
    $patients = DB::table('tbl_master_patient as mp')
        ->join('tbl_mental_assessment_form as maf', 'mp.id', '=', 'maf.pat_perm_id')
        ->join('tbl_consultation as tblcon', 'mp.id', '=', 'tblcon.consult_temp_id')
        ->select(
            'mp.*',
            'maf.date_entered',
            'maf.phar_doc',
            'maf.diagnosis',
            'maf.phar_med as medications',
            'maf.phar_remarks',
            'tblcon.type_service',
            'tblcon.consult_date',
            'tblcon.consult_temp_id'
        )
        ->get();

    // Step 2: Group consultations by patient and month
    $groupedFollowups = [];

    foreach ($patients as $consult) {
        $month = strtoupper(Carbon::parse($consult->consult_date)->format('F')); // e.g. 'JANUARY'
        $permId = $consult->consult_temp_id;

        if (!isset($groupedFollowups[$permId])) {
            $groupedFollowups[$permId] = [];
        }

        if (!isset($groupedFollowups[$permId][$month])) {
            $groupedFollowups[$permId][$month] = [];
        }

        $groupedFollowups[$permId][$month][] = [
            'date' => $consult->consult_date,
            'service' => $consult->type_service,
        ];
    }

    // Step 3: Ensure each patient has followups for all months
    $months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    $patients = $patients->map(function ($patient) use ($groupedFollowups, $months) {
        $permId = $patient->consult_temp_id;

        $followups = $groupedFollowups[$permId] ?? [];

        // Ensure all months are present
        foreach ($months as $month) {
            if (!isset($followups[$month])) {
                $followups[$month] = [];
=======
    public function mhmasterlist()
    {
        // Step 1: Get patients + assessment form data
        $patients = DB::table('tbl_master_patient as mp')
            ->join('tbl_mental_assessment_form as maf', 'mp.id', '=', 'maf.pat_perm_id')
            ->select(
                'mp.*',
                'mp.id', // permanent ID
                'maf.date_entered',
                'maf.phar_doc',
                'maf.diagnosis',
                'maf.phar_med as medications',
                'maf.phar_remarks'
            )
            ->get();

        // Step 2: Get all consultations
        $consultations = DB::table('tbl_consultation')
            ->select('consult_temp_id', 'consult_date', 'type_service')
            ->get();

        // Step 3: Group consultations by patient and month
        $groupedFollowups = [];

        foreach ($consultations as $consult) {
            $month = strtoupper(Carbon::parse($consult->consult_date)->format('F')); // e.g. 'JANUARY'
            $permId = $consult->consult_temp_id;

            if (!isset($groupedFollowups[$permId])) {
                $groupedFollowups[$permId] = [];
>>>>>>> 83f45adc8647a92d799a1bf8af0042828371f3f0
            }

            if (!isset($groupedFollowups[$permId][$month])) {
                $groupedFollowups[$permId][$month] = [];
            }

            $groupedFollowups[$permId][$month][] = [
                'date' => $consult->consult_date,
                'service' => $consult->type_service,
            ];
        }

        // Step 4: Attach followups with all months to each patient
        $months = [
            'JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER'
        ];

<<<<<<< HEAD
    // Step 4: Pass to Inertia
    return Inertia::render('MentalHealth::Report/mhmasterlist', [
        'patients' => $patients,
    ]);
}
=======
        $patients = $patients->map(function ($patient) use ($groupedFollowups, $months) {
            $permId = $patient->id;
            $followups = $groupedFollowups[$permId] ?? [];

            // Ensure every month key exists (even empty)
            foreach ($months as $month) {
                if (!isset($followups[$month])) {
                    $followups[$month] = [];
                }
            }

            $patient->follow_ups = $followups;
            return $patient;
        });

        // Step 5: Pass to Inertia
        return Inertia::render('MentalHealth::Report/mhmasterlist', [
            'patients' => $patients,
        ]);
    }
>>>>>>> 83f45adc8647a92d799a1bf8af0042828371f3f0

    public function schoolagesr()
    {
        return Inertia::render('MentalHealth::Report/schoolagesr');
    }

    public function adultsr()
    {
        return Inertia::render('MentalHealth::Report/adultsr');
    }
}
