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
            }
        }

        $patient->follow_ups = $followups;
        return $patient;
    });

    // Step 4: Pass to Inertia
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