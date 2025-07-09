<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Modules\MentalHealth\Models\Pharma;
use Inertia\Inertia;

class OtherController extends Controller
{
    public function index()
    {
        return Inertia::render('MentalHealth::Other/index');
    }


    public function encounter($id)
    {
        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->select('id', 'pat_temp_id', 'consult_date_assess', 'ref_choice', 'ref_fhud', 'ref_reason')
            ->get();

        return Inertia::render('MentalHealth::MedicalRecords/encounter', [
            'assessments' => $assessments,
        ]);
    }



    public function medabstract()
    {
        return Inertia::render('MentalHealth::MedicalRecords/medabstract');
    }


    public function referralform($id, Request $request)
    {
        $patient = MasterPatient::findOrFail($id);

        $consultDate = $request->query('consult_date');

        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->whereDate('consult_date_assess', $consultDate)
            ->get();

        $medicationRecords = MentalAssessmentForm::where('pat_temp_id', $id)
            ->whereNotNull('phar_med')
            ->where('phar_intakeUnit', 'like', '%ampule%')
            ->select([
                'phar_date',
                'phar_med',
                'phar_intake',
                'phar_intakeUnit',
                'phar_dur',
                'phar_durUnit',
                'phar_freq',
                'phar_freqUnit',
                'phar_quantity',
                'date_nxt_visit as appointment'
            ])
            ->orderBy('phar_date', 'asc')
            ->get();

        return Inertia::render('MentalHealth::MedicalRecords/referralform', [
            'patient' => $patient,
            'assessments' => $assessments,
            'medicationRecords' => $medicationRecords,
        ]);
    }



    public function treatmentcard($id, Request $request)
    {
        $patient = MasterPatient::findOrFail($id);

        $consultDate = $request->query('consult_date');

        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->whereDate('consult_date_assess', $consultDate)
            ->get();

        $medicationRecords = Pharma::where('pat_perm_id', $id)
            ->where('phar_intakeUnit', 'like', '%ampule%')
            ->select([
                'phar_date',
                'phar_med',
                'phar_intake',
                'phar_intakeUnit',
                'phar_dur',
                'phar_durUnit',
                'phar_freq',
                'phar_freqUnit',
                'phar_quantity',
                'registered_at as appointment',
            ])
            ->orderBy('phar_date', 'asc')
            ->get();

        return Inertia::render('MentalHealth::MedicalRecords/treatmentcard', [
            'patient' => $patient,
            'assessments' => $assessments,
            'medicationRecords' => $medicationRecords,
        ]);
    }

    public function medcard($id, Request $request)
    {
        $patient = MasterPatient::findOrFail($id);

        $consultDate = $request->query('consult_date');

        $assessments = MentalAssessmentForm::where('pat_temp_id', $id)
            ->whereDate('consult_date_assess', $consultDate)
            ->get();

        $medicationRecords = Pharma::where('pat_perm_id', $id)
            ->where('phar_intakeUnit', 'like', '%tablet%')
            ->orderBy('phar_date', 'asc')
            ->get();

        return Inertia::render('MentalHealth::MedicalRecords/medcard', [
            'patient' => $patient,
            'assessments' => $assessments,
            'medicationRecords' => $medicationRecords,
        ]);
    }
}
