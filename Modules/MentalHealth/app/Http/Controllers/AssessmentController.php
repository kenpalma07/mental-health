<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Carbon\Carbon;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index($id)
    {
        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found');
        }

        $consultDates = Consultation::where('consult_temp_id', $patient->id)
            ->get(['consult_date', 'consult_temp_id']);

        $latestConsultation = Consultation::where('consult_temp_id', $patient->id)
            ->orderByDesc('ts_created_at')
            ->first();

        return Inertia::render('MentalHealth::Assessment/index', [
            'patient' => $patient,
            'consultation' => $latestConsultation,
            'consultDates' => $consultDates,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'consultation_id' => 'nullable|string|max:50',
            'consult_date_assess' => 'nullable|date',
            'pat_perm_id' => 'nullable|string|max:255',
            'pat_temp_id' => 'nullable|string|max:50',
            'carer_name_mot' => 'nullable|string|max:100',
            'carer_name_fat' => 'nullable|string|max:100',
            'carer_address' => 'nullable|string|max:250',
            'carer_mobile' => 'nullable|string|max:20',

            // Fields from frontend as arrays
            'psycho_inter' => 'nullable|array',
            'career_fam_choice' => 'nullable|array',
            'link_status' => 'nullable|array',
            'ref_choice' => 'nullable|array',
            'ref_fhud' => 'nullable|array',
            'ref_reason' => 'nullable|array',
            'special_pop' => 'nullable|array',
            'treat_avail' => 'nullable|array',
            'treat_choice' => 'nullable|array',

            'carer_relationship' => 'nullable|string|max:50',
            'assessment_physical_health' => 'nullable|string|max:200',
            'management_physical_health' => 'nullable|string|max:200',
            'child_and_adolescent' => 'nullable|in:Y,N',
            'older_adults' => 'nullable|in:Y,N',
            'preg_or_breastf_wom' => 'nullable|in:Y,N',
            'assess_self_suic' => 'nullable|string',

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
            'is_dispense' => 'nullable|string|max:10',
            'phar_remarks' => 'nullable|string|max:255',

            'date_nxt_visit' => 'nullable|date',
        ]);

        $assessData = $request->only([
            'consultation_id',
            'consult_date_assess',
            'pat_perm_id',
            'pat_temp_id',
            'carer_name_mot',
            'carer_name_fat',
            'carer_address',
            'carer_mobile',
            'carer_relationship',
            'assessment_physical_health',
            'management_physical_health',
            'child_and_adolescent',
            'older_adults',
            'preg_or_breastf_wom',
            'assess_self_suic',
            'icd_10_code',
            'icd_10_descrip',
            'diagnosis',
            'phar_date',
            'phar_med',
            'phar_intake',
            'phar_intakeUnit',
            'phar_freq',
            'phar_freqUnit',
            'phar_dur',
            'phar_durUnit',
            'phar_quantity',
            'phar_doc',
            'is_dispense',
            'phar_remarks',
            'date_nxt_visit',
        ]);

        $fieldsToImplode = [
            'psycho_inter',
            'career_fam_choice',
            'link_status',
            'ref_choice',
            'ref_fhud',
            'ref_reason',
            'special_pop',
            'treat_avail',
            'treat_choice',
        ];

        foreach ($fieldsToImplode as $field) {
            if ($request->has($field) && is_array($request[$field])) {
                $assessData[$field] = implode(', ', $request[$field]);
            } else {
                $assessData[$field] = null;
            }
        }

        // Handle label-item mapping
        $categories = [
            'fam_hist_mns_conditions' => ['item' => 'fam_hist_mns_cond_item', 'label' => 'fam_hist_mns_cond_label'],
            'general_health_history' => ['item' => 'gen_heal_hist_item', 'label' => 'gen_heal_hist_label'],
            'mns_history' => ['item' => 'mns_hist_item', 'label' => 'mns_hist_label'],
            'presenting_complaint' => ['item' => 'pres_comp_item', 'label' => 'pres_comp_label'],
        ];

        foreach ($categories as $key => $field) {
            $section = $request->input($key);
            $sectionData = is_array($section) && isset($section[0]) ? $section[0] : [];

            $assessData[$field['item']] = isset($sectionData[$field['item']])
                ? implode(', ', $sectionData[$field['item']])
                : '';

            $assessData[$field['label']] = $sectionData[$field['label']] ?? '';
        }

        // Special population logic
        if (in_array('Children and Adolescents', $request->special_pop)) {
            $assessData['child_and_adolescent'] = 'Y';
        }

        if (in_array('Older Adults', $request->special_pop)) {
            $assessData['older_adults'] = 'Y';
        }

        if (in_array('Pregnant or Breastfeeding woman', $request->special_pop)) {
            $assessData['preg_or_breastf_wom'] = 'Y';
        }

        // Save to database
        MentalAssessmentForm::create($assessData);

        return redirect()->back()->with('success', 'Assessment form saved successfully.');
    }
}
