<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\MentalHealth\Models\MasterPatient;
use Carbon\Carbon;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = MasterPatient::query();

        // Apply search only if there's a search term
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('pat_fname', 'like', "%{$search}%")
                  ->orWhere('pat_lname', 'like', "%{$search}%")
                  ->orWhere('facility_name', 'like', "%{$search}%")
                  ->orWhere('master_patient_perm_id', 'like', "%{$search}%");
            });
        }

        // Apply sex filter if it exists
        if ($request->filled('sex')) {
            $query->where('sex_code', $request->input('sex'));
        }

        // Apply pagination and append the current filters to the URL
        $patients = $query->paginate(10)->appends($request->only(['search', 'sex']));

        return inertia('MentalHealth::Patient/index', [
            'patients' => $patients->items(),
            'pagination' => $patients->toArray(),
            'filters' => $request->only(['search', 'sex']),
        ]);
    }

    public function view($id)
    {
        $patient = MasterPatient::findOrFail($id);
        return inertia('MentalHealth::Patient/viewPatientDetails', [
            'patient' => $patient,
        ]);
    }
    

    public function create()
    {   
        $nextId = $this->generatePatientRecordNumber();

        return inertia('MentalHealth::Patient/addPatient', [
            'nextId' => $nextId,
        ]);
    }

    public function store(Request $request)
    {
        // $validated = $request->validate([]);
        $validated = $request->validate([
            'master_patient_perm_id' => 'nullable|string|max:255', // New field added by Ken
            'facility_name' => 'required|string|max:255',
            'facility_location' => 'required|string|max:255',
            'provider_name' => 'required|string|max:255',
            'prefix_code' => 'required|string|max:5', //Added by Ken
            'pat_lname' => 'required|string|max:255',
            'pat_mname' => 'nullable|string|max:255',
            'pat_fname' => 'required|string|max:255',
            'suffix_code' => 'required|string|max:5', //Added by Ken
            'sex_code' => 'required|in:M,F',
            'civil_stat_code' => 'required|string|max:5',
            'pat_birthplace' => 'nullable|string|max:200',
            'religion_code' => 'nullable|string|max:5',
            'nationality' => 'nullable|string|max:5',
            'pat_birthDate' => 'required|date',
            'educattainment' => 'nullable|string|max:2',
            'occupation_code' => 'nullable|string|max:255',
            'regcode' => 'required|string|max:100',
            'provcode' => 'required|string|max:100',
            'citycode' => 'required|string|max:100',
            'bgycode' => 'required|string|max:100',
            'zipcode' => 'required|string|max:11',
            'country_code' => 'required|string|max:5',
            'patient_address' => 'nullable|string|max:255',
            'pat_mobile' => 'nullable|string|max:20',
            'pat_landline' => 'nullable|string|max:20',
            'mot_fname' => 'nullable|string|max:255',
            'mot_mname' => 'nullable|string|max:255',
            'mot_lname' => 'nullable|string|max:255',
            'mot_birthDate' => 'nullable|date',
            'mot_address' => 'nullable|string|max:255', //Added by Ken
            'mot_contact' => 'nullable|string|max:20', //Added by Ken
            'mot_deceased_status' => 'nullable|string|max:1', //Added by Ken
            'fat_fname' => 'nullable|string|max:255',
            'fat_mname' => 'nullable|string|max:255',
            'fat_lname' => 'nullable|string|max:255',
            'fat_birthDate' => 'nullable|date',
            'fat_address' => 'nullable|string|max:255', //Added by Ken
            'fat_contact' => 'nullable|string|max:20', //Added by Ken
            'fat_deceased_status' => 'nullable|string|max:1', //Added by Ken
            'registered_at' => 'nullable|date',
        ], [], [
            'facility_name' => 'Facility Name',
            'facility_location' => 'Facility Location',
            'provider_name' => 'Name of Provider',

            'prefix_code' => 'Prefix',
            'pat_lname' => 'Last Name',
            'pat_fname' => 'First Name',
            'pat_mname' => 'Middle Name',
            'suffix_code' => 'Suffix',
            'sex_code' => 'Sex',
            'civil_stat_code' =>'Civil Status',
            'pat_birthdate' => 'Birthdate',
            'regcode' => 'Region',
            'provcode' => 'Province',
            'citycode' => 'City',
            'bgycode' => 'Barangay',
            'zipcode' => 'Zipcode',
            'country_code' => 'Country',
        ]);
        $timestamp = $request->input('registered_at');
        $timestamp = Carbon::parse($timestamp)->format('Y/m/dH:i:s');
        $masterPatientPermId = $request->input('master_patient_perm_id');
        
        $finalCombinedId = "{$masterPatientPermId}{$timestamp}";
        //$validated['pat_temp_id'] = $finalCombinedId;

        MasterPatient::create($validated);

        return redirect()->route('patients')->with('success', 'Patient added successfully!');
    }

    private function generatePatientRecordNumber()
    {
        // Fetch the highest master_patient_perm_id
        $latestPatient = MasterPatient::orderBy('master_patient_perm_id', 'desc')->first();

        if ($latestPatient && is_numeric($latestPatient->master_patient_perm_id)) {
            $nextNumber = (int) $latestPatient->master_patient_perm_id + 1;
        } else {
            $nextNumber = 1; // First record
        }

        return str_pad($nextNumber, 10, '0', STR_PAD_LEFT);
    }


    public function search(Request $request)
    {
        $query = MasterPatient::query();

        if ($request->filled('master_patient_perm_id')) {
            $query->where('master_patient_perm_id', 'like', '%' . $request->master_patient_perm_id . '%');
        }
        if ($request->filled('pat_fname')) {
            $query->where('pat_fname', 'like', '%' . $request->pat_fname . '%');
        }

        if ($request->filled('pat_mname')) {
            $query->where('pat_mname', 'like', '%' . $request->pat_mname . '%');
        }

        if ($request->filled('pat_lname')) {
            $query->where('pat_lname', 'like', '%' . $request->pat_lname . '%');
        }

        if ($request->filled('pat_birthDate')) {
            $query->where('pat_birthDate', $request->pat_birthDate);
        }

        if ($request->filled('sex_code')) {
            $query->where('sex_code', $request->sex_code);
        }

        return response()->json($query->limit(10)->get());
    }


    public function edit($id)
    {
        $patient = MasterPatient::findOrFail($id);

        return inertia('MentalHealth::Patient/editPatient', [
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'registered_at' => 'nullable|date',
            'facility_name' => 'required|string|max:255',
            'facility_location' => 'nullable|string|max:255',
            'provider_name' => 'required|string|max:255',

            'prefix_code' => 'required|string|max:5', //Added by Ken
            'pat_lname' => 'required|string|max:255',
            'pat_mname' => 'nullable|string|max:255',
            'pat_fname' => 'required|string|max:255',
            'suffix_code' => 'required|string|max:5', //Added by Ken
            'sex_code' => 'required|in:M,F',
            'civil_stat_code' => 'required|string|max:5',
            'pat_birthplace' => 'nullable|string|max:200',
            'religion_code' => 'required|string|max:5',
            'nationality' => 'required|string|max:5',
            'pat_birthDate' => 'required|date',
            'educattainment' => 'required|string|max:2',
            'occupation_code' => 'required|string|max:255',

            'regcode' => 'required|string|max:100',
            'provcode' => 'required|string|max:100',
            'citycode' => 'required|string|max:100',
            'bgycode' => 'required|string|max:100',
            'zipcode' => 'required|string|max:11',
            'country_code' => 'required|string|max:5',
            'patient_address' => 'nullable|string|max:255',
            'pat_mobile' => 'nullable|string|max:20',
            'pat_landline' => 'nullable|string|max:20',

            'mot_fname' => 'nullable|string|max:255',
            'mot_mname' => 'nullable|string|max:255',
            'mot_lname' => 'nullable|string|max:255',
            'mot_birthDate' => 'nullable|date',
            'mot_address' => 'nullable|string|max:255', //Added by Ken
            'mot_contact' => 'nullable|string|max:20', //Added by Ken
            'mot_deceased_status' => 'nullable|string|max:1', //Added by Ken

            'fat_fname' => 'nullable|string|max:255',
            'fat_mname' => 'nullable|string|max:255',
            'fat_lname' => 'nullable|string|max:255',
            'fat_birthdate' => 'nullable|date',
            'fat_address' => 'nullable|string|max:255', //Added by Ken
            'fat_contact' => 'nullable|string|max:20', //Added by Ken
            'fat_deceased_status' => 'nullable|string|max:1', //Added by Ken
        ]);

        $patient = MasterPatient::findOrFail($id);
        $patient->update($validated);

        return redirect()->route('patients.index')->with('success', 'Patient updated successfully!');
    }


}
