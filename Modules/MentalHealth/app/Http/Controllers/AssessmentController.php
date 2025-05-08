<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Entities\MentalAssessmentForm;
use Modules\MentalHealth\Models\MasterPatient;

class AssessmentController extends Controller
{
    public function index($id)
    {
        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found');
        }

        return inertia('MentalHealth::Assessment/index', [
            'patient' => $patient
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'consultation_id' => 'required|string|max:50',
            'pat_temp_id' => 'nullable|string|max:50',
            'carer_name' => 'nullable|string|max:200',
            'carer_address' => 'nullable|string|max:250',
            'carer_mobile' => 'nullable|string|max:20',
            'carer_relationship' => 'nullable|string|max:50',
            'assessment_physical_health' => 'nullable|string|max:200',
            'management_physical_health' => 'nullable|string|max:200',
            'presenting_complaint' => 'nullable|string|max:200',
            'general_health_history' => 'nullable|string|max:200',
            'mns_history' => 'nullable|string|max:200',
            'fam_hist_mns_conditions' => 'nullable|string|max:200',
            'psychosocial_interventions1' => 'nullable|string|max:200',
            'carer_family' => 'nullable|string|max:200',
            'child_and_adolescent' => 'nullable|in:Y,N',
            'older_adults' => 'nullable|in:Y,N',
            'preg_or_breastf_wom' => 'nullable|in:Y,N',
            'assess_self_suic' => 'nullable|string',
            'registered_at' => 'nullable|date',
            'treat_avail' => 'nullable|string|max:100',
            'treat_choice' => 'nullable|string|max:100',
            'icd_10_code' => 'nullable|string|max:100',
            'icd_10_descrip' => 'nullable|string|max:255',
            'diagnosis' => 'nullable|string|max:255',
            'phar_date' => 'nullable|date',
            'phar_med' => 'nullable|string|max:100',
            'phar_intake' => 'nullable|numeric',
            'phar_intakeUnit' => 'nullable|string|max:100',
            'phar_freq' => 'nullable|numeric',
            'phar_freqUnit' => 'nullable|string|max:255',
            'phar_dur' => 'nullable|numeric',
            'phar_durUnit' => 'nullable|string|max:255',
            'phar_quantity' => 'nullable|numeric',
            'phar_doc' => 'nullable|string|max:255',
            'phar_remarks' => 'nullable|string|max:255',
            'ref_choice' => 'nullable|string|max:100',
            'ref_fhud' => 'nullable|string|max:255',
            'ref_reason' => 'nullable|string|max:255',
            'link_status' => 'nullable|string|max:255',
            'special_pop' => 'nullable|string|max:255',
            'date_nxt_visit' => 'nullable|date',
        ]);

        $form = MentalAssessmentForm::create($validated);

        return redirect()->back()->with('success', 'Assessment form saved successfully.');
    }
}
