<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Illuminate\Http\Request;
use Modules\MentalHealth\Models\Consultation;

class ConsultationController extends Controller
{
    public function index($id)
    {
        $patient = MasterPatient::findOrFail($id);
        $consultations = Consultation::where('consult_temp_id', $patient->id)->get();
    
        return inertia('MentalHealth::Consultation/index', [
            'patient' => $patient,
            'consultations' => $consultations,
        ]);
    }
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'consult_date' => 'required|date',
            'consult_time' => 'required',
            'consult_type_code' => 'required|string',
            'to_consult_code' => 'required|string',
            'type_service' => 'required|string',
            'chief_complaint' => 'required|string',
            'pat_temperature' => 'required|numeric',
            'pat_heart_rate' => 'required|integer',
            'pat_oxygen_sat' => 'required|integer',
            'respiratoryRate' => 'required|integer',
            'pat_height' => 'nullable|numeric',
            'pat_weight' => 'nullable|numeric',
            'pat_BMI' => 'required|string',
            'BMI_cat_code' => 'required|string',
            'pat_systolic_pres' => 'required|integer',
            'pat_diastolic_pres' => 'required|integer',
            'master_patient_perm_id' => 'required|string',
            'consult_temp_id' => 'required|string',
            'pat_age_yr' => 'required|integer',
            'pat_age_mo' => 'required|integer',
            'pat_age_dy' => 'required|integer',
            'patient_address_temp_id' => 'required|string',
        ]);

        $validated['consult_perm_id'] = 'MN-' . str_pad((int) $validated['consult_temp_id'], 8, '0', STR_PAD_LEFT);
        $consultation = Consultation::create($validated);

        return redirect()->route('consultations.index', ['id' => $validated['consult_temp_id']])
                         ->with('success', 'Consultation stored successfully!');
    }
}
