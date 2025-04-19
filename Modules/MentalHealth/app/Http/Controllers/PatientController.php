<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\MentalHealth\Models\MasterPatient;

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
                  ->orWhere('facility_name', 'like', "%{$search}%");
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

    public function create()
    {
        return inertia('MentalHealth::Patient/addPatient');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_name' => 'required|string|max:255',
            'facility_location' => 'nullable|string|max:255',
            'provider_name' => 'nullable|string|max:255',
            'intake_date' => 'nullable|date',
            'pat_lname' => 'required|string|max:255',
            'pat_mname' => 'nullable|string|max:255',
            'pat_fname' => 'required|string|max:255',
            'sex_code' => 'required|in:M,F',
            'pat_birthDate' => 'required|date',
            'regcode' => 'nullable|string|max:10',
            'provcode' => 'nullable|string|max:10',
            'citycode' => 'nullable|string|max:10',
            'bgycode' => 'nullable|string|max:10',
            'patient_address' => 'nullable|string|max:255',
            'pat_mobile' => 'nullable|string|max:20',
            'pat_landline' => 'nullable|string|max:20',
            'mot_fname' => 'nullable|string|max:255',
            'mot_mname' => 'nullable|string|max:255',
            'mot_lname' => 'nullable|string|max:255',
            'mot_birthDate' => 'nullable|date',
            'fat_fname' => 'nullable|string|max:255',
            'fat_mname' => 'nullable|string|max:255',
            'fat_lname' => 'nullable|string|max:255',
            'fat_birthDate' => 'nullable|date',
        ]);

        MasterPatient::create($validated);

        return inertia('MentalHealth::Patient/index')->with([
            'success' => 'Patient added successfully!',
        ]);
    }

    public function search(Request $request)
    {
        $query = MasterPatient::query();

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
        $patient = MasterPatient::findOrFail($id);

        $validated = $request->validate([
            'facility_name' => 'required|string|max:255',
            'pat_fname' => 'required|string|max:255',
            'pat_lname' => 'required|string|max:255',
            'sex_code' => 'required|in:M,F',
            'pat_birthDate' => 'required|date',
            // add other fields & validation as needed
        ]);

        $patient->update($validated);

        return redirect()->route('patients')->with('success', 'Patient updated successfully!');
    }


}
