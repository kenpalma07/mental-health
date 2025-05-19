<?php
namespace Modules\MentalHealth\Http\Controllers;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function mhtracker()
    {
        return Inertia::render('MentalHealth::Report/mhtracker');
    }

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
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

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

    public function schoolagesr()
    {
        return Inertia::render('MentalHealth::Report/schoolagesr');
    }

    public function adultsr()
    {
        return Inertia::render('MentalHealth::Report/adultsr');
    }

} 