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
    
        // Add search filter
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('pat_fname', 'like', "%$search%")
                  ->orWhere('pat_lname', 'like', "%$search%")
                  ->orWhere('facility_name', 'like', "%$search%");
            });
        }
    
        // Add sex filter
        if ($request->filled('sex')) {
            $query->where('sex_code', $request->input('sex'));
        }
    
        // Pagination, you can adjust per page as needed
        $patients = $query->paginate(10); // Use paginate for paginated results
    
        // Send pagination data along with the patients
        return inertia('MentalHealth::Patient/index', [
            'patients' => $patients->items(),
            'pagination' => $patients->toArray(), // Pagination links
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
    
}
