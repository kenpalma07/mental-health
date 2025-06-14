<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MentalAssessmentForm;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\Consultation;
use Modules\References\Models\FHUD;
use Modules\References\Models\Employee;

use Carbon\Carbon;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index(Request $request, $id)
    {
        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found');
        }

        $consultDate = $request->query('consult_date');

        $consultDates = Consultation::where('consult_temp_id', $patient->id)
            ->select('consult_date', 'consult_temp_id')
            ->orderByDesc('consult_date')
            ->get();

        $latestConsultation = null;
        if ($consultDate) {
            $latestConsultation = Consultation::where('consult_temp_id', $patient->id)
                ->whereDate('consult_date', $consultDate)
                ->orderByDesc('date_entered')
                ->first();
        }

        $facilities = FHUD::orderBy('facility_name')->get();

        $employees = Employee::whereIn('emp_position', ['PHA', 'DOC'])
            ->orderBy('emp_fname')
            ->orderBy('emp_mname')
            ->orderBy('emp_lname')
            ->get()
            ->map(function ($emp) {
                return [
                    'id' => $emp->id,
                    'name' => trim($emp->emp_fname . ' ' . $emp->emp_mname . ' ' . $emp->emp_lname),
                    'position' => $emp->emp_position,
                ];
            });

        return Inertia::render('MentalHealth::Assessment/index', [
            'patient' => $patient,
            'consultation' => $latestConsultation,
            'consultDates' => $consultDates,
            'facilities' => $facilities,
            'employees' => $employees,
        ]);
    }

    public function show($id)
    {
        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found');
        }

        $assessments = MentalAssessmentForm::where('pat_perm_id', $id)
            ->orderByDesc('consult_date_assess')
            ->get();

        return Inertia::render('MentalHealth::Consultation/Show', [
            'patient' => $patient,
            'assessments' => $assessments,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'consultation_id' => 'nullable|string|max:50',
            'consult_date_assess' => 'nullable|date',
            'pat_perm_id' => 'nullable|string|max:255',
            'pat_temp_id' => 'nullable|string',
            'carer_name_mot' => 'nullable|string|max:100',
            'carer_name_fat' => 'nullable|string|max:100',
            'carer_address' => 'nullable|string|max:250',
            'carer_mobile' => 'nullable|string|max:20',
            'selfharm_sui' => 'nullable|in:Y,N',
            'grade_year' => 'nullable|string|max:100',
            'school_name' => 'nullable|string|max:100',
            'place_inci' => 'nullable|string|max:100',
            'self_sui_remarks' => 'nullable|string|max:100',
            'self_sui_means' => 'nullable|string|max:100',

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

        // Collect main assessment data keys to store
        $assessData = $request->only([
            'consultation_id',
            'consult_date_assess',
            'pat_perm_id',
            'pat_temp_id',
            'carer_name_mot',
            'carer_name_fat',
            'carer_address',
            'carer_mobile',
            'selfharm_sui',
            'grade_year',
            'school_name',
            'place_inci',
            'self_sui_remarks',
            'self_sui_means',
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

        $categories = [
            'fam_hist_mns_conditions' => ['item' => 'fam_hist_mns_cond_item', 'label' => 'fam_hist_mns_cond_label'],
            'general_health_history' => ['item' => 'gen_heal_hist_item', 'label' => 'gen_heal_hist_label'],
            'mns_history' => ['item' => 'mns_hist_item', 'label' => 'mns_hist_label'],
            'presenting_complaint' => ['item' => 'pres_comp_item', 'label' => 'pres_comp_label'],
        ];

        foreach ($categories as $key => $fields) {
            $section = $request->input($key);

            $allItems = [];
            $allLabels = [];

            if (is_array($section)) {
                foreach ($section as $group) {
                    if (isset($group[$fields['item']])) {
                        $allItems = array_merge($allItems, (array) $group[$fields['item']]);
                    }

                    if (!empty($group[$fields['label']])) {
                        $allLabels[] = $group[$fields['label']];
                    }
                }
            }

            $assessData[$fields['item']] = implode(', ', $allItems);
            $assessData[$fields['label']] = implode(', ', $allLabels);

            if ($key === 'presenting_complaint') {
                $assessData['selfharm_sui'] = in_array('Act of self-harm', $allItems) ? 'Y' : 'N';
            }
        }

        $specialPop = $request->input('special_pop', []);

        $assessData['child_and_adolescent'] = in_array('Children and Adolescents', $specialPop) ? 'Y' : 'N';
        $assessData['older_adults'] = in_array('Older Adults', $specialPop) ? 'Y' : 'N';
        $assessData['preg_or_breastf_wom'] = in_array('Pregnant or Breastfeeding woman', $specialPop) ? 'Y' : 'N';

        $assessment = MentalAssessmentForm::create($assessData);

        return response()->json([
            'success' => true,
            'redirect_url' => route('patitrforms.index', $request->pat_temp_id) . '?consult_date_assess=' . $request->consult_date_assess,
        ]);
    }

    public function edit($id)
    {
        $assessment = MentalAssessmentForm::findOrFail($id);
        $patient = MasterPatient::find($assessment->pat_perm_id);

        $assessment->mns_data = $assessment->mns_data ? json_decode($assessment->mns_data, true) : [];

        return Inertia::render('MentalHealth::Assessment/EditAssessmentForms', [
            'assessment' => $assessment,
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, $id)
    {
        $assessment = MentalAssessmentForm::findOrFail($id);

        $validated = $request->validate([
            'assessment_physical_health' => 'nullable|string|max:250',
            'management_physical_health' => 'nullable|string|max:250',
            // ... other fields ...
        ]);

        $assessment->update($validated);

        // Return JSON for AJAX requests
        return response()->json([
            'success' => true,
            'message' => 'Assessment updated successfully.',
            'redirect_url' => route('assessment.show', $assessment->pat_perm_id),
        ]);
    }
}
