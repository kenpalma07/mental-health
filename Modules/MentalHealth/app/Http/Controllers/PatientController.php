<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\FHUDFacility;
use Modules\MentalHealth\Models\Consultation;

use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

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
        $patients = $query->paginate($perPage)->appends($request->only(['search', 'per_page']));

        return Inertia::render('MentalHealth::Patient/index', [
            'patients' => $patients->items(),
            'pagination' => [
                'current_page' => $patients->currentPage(),
                'last_page' => $patients->lastPage(),
                'per_page' => $perPage,
                'total' => $patients->total(),
            ],
            'filters' => $request->only(['search', 'sex']),
        ]);
    }

    public function view($id)
    {
        $patient = MasterPatient::findOrFail($id);
        return Inertia::render('MentalHealth::Patient/viewPatientDetails', [
            'patient' => $patient,
        ]);
    }


    public function create()
    {
        $nextId = $this->generatePatientRecordNumber();
        $facilities = FHUDFacility::all();

        return Inertia::render('MentalHealth::Patient/addPatient', [
            'nextId' => $nextId,
            'facilities' => $facilities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'master_patient_perm_id' => 'nullable|string|max:255', // New field added by Ken
            'fhudcode' => 'nullable|string|max:12',
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
            'bloodtype_code' => 'nullable|string|max:11',
            'regcode' => 'required|string|max:100',
            'provcode' => 'required|string|max:100',
            'citycode' => 'required|string|max:100',
            'bgycode' => 'required|string|max:100',
            'zipcode' => 'required|string|max:11',
            'country_code' => 'required|string|max:5',
            'patient_address' => 'nullable|string|max:255',
            'pat_mobile' => 'nullable|string|max:20',
            'pat_landline' => 'nullable|string|max:20',

            //Parents Information
            'mot_fname' => 'nullable|string|max:255',
            'mot_mname' => 'nullable|string|max:255',
            'mot_lname' => 'nullable|string|max:255',
            'mot_birthdate' => 'nullable|date',
            'mot_address' => 'nullable|string|max:255',
            'mot_contact' => 'nullable|string|max:20',
            'mot_deceased_status' => 'nullable|string|max:1',
            'fat_fname' => 'nullable|string|max:255', 
            'fat_mname' => 'nullable|string|max:255',
            'fat_lname' => 'nullable|string|max:255',
            'fat_birthdate' => 'nullable|date',
            'fat_address' => 'nullable|string|max:255',
            'fat_contact' => 'nullable|string|max:20',
            'fat_deceased_status' => 'nullable|string|max:1',
            'registered_at' => 'nullable|date',

            'phic_member' => 'nullable|in:Y,N',
            'pat_philhealth' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'type_of_membership' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'philhealth_status_code' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'pDependentType_code' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
            'pMemberLname' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
            'pMemberFname' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
        ], [], [
            'facility_name' => 'Facility Name',
            'facility_location' => 'Facility Location',
            'provider_name' => 'Name of Provider',

            'prefix_code' => 'Prefix',
            'pat_lname' => 'Last Name',
            'pat_fname' => 'First Name',
            'pat_mname' => 'Middle Name',
            'suffix_code' => 'Suffix',
            'pat_birthDate' => 'Birth Date',
            'sex_code' => 'Sex',
            'civil_stat_code' => 'Civil Status',
            'pat_birthdate' => 'Birthdate',
            'regcode' => 'Region',
            'provcode' => 'Province',
            'citycode' => 'City',
            'bgycode' => 'Barangay',
            'zipcode' => 'Zipcode',
            'country_code' => 'Country',

            'pat_philhealth' => 'PhilHealth Number',
            'type_of_membership' => 'PhilHealth Category Type',
            'philhealth_status_code' => 'PhilHealth Status Type',
            'pDependentType_code' => 'Relationship to Member',
            'pMemberLname' => 'Member\'s Last Name',
            'pMemberFname' => 'Member\'s First Name',
        ]);
        // $timestamp = $request->input('registered_at');
        // $timestamp = Carbon::parse($timestamp)->format('Y/m/dH:i:s');
        // $masterPatientPermId = $request->input('master_patient_perm_id');
        // $facility = FHUDFacility::where('facility_name', $request->input('facility_name'))->first();

        // if (!$facility) {
        //     // Handle the error if no facility is found.
        //     return redirect()->back()->with('error', 'Facility not found!');
        // }

        // $fhudcode = $facility->fhudcode;

        // Combine master_patient_perm_id and fhudcode into the pat_temp_id
        // $finalCombinedId = "{$masterPatientPermId}{$fhudcode}";

        // Add the combined ID to the validated data
        // $validated['trackno'] = $finalCombinedId;

        // Save the patient data into the MasterPatient table
        MasterPatient::create($validated);

        return redirect()->route('patients')->with('success', 'Patient added successfully!');
    }

    private function generatePatientRecordNumber()
    {
        $latestPatient = MasterPatient::orderBy('master_patient_perm_id', 'desc')->first();         

        if ($latestPatient && is_numeric($latestPatient->master_patient_perm_id)) {
            $nextNumber = (int) $latestPatient->master_patient_perm_id + 1;
        } else {
            $nextNumber = 1;
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

        return Inertia::render('MentalHealth::Patient/editPatient', [
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
            'bloodtype_code' => 'required|string|max:11',

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
            'mot_birthdate' => 'nullable|date',
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

            'phic_member' => 'nullable|in:Y,N',
            'pat_philhealth' => 'required|string|max:255',
            'pat_philhealth' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'type_of_membership' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'philhealth_status_code' => $request->phic_member === 'Y' ? 'required|string' : 'nullable|string',
            'pDependentType_code' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
            'pMemberLname' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
            // 'pMemberFname' => $request->philhealth_status_code === 'D' ? 'required|string' : 'nullable|string',
        ], [], [
            'facility_name' => 'Facility Name',
            'facility_location' => 'Facility Location',
            'provider_name' => 'Name of Provider',

            'prefix_code' => 'Prefix',
            'pat_lname' => 'Last Name',
            'pat_fname' => 'First Name',
            'pat_mname' => 'Middle Name',
            'suffix_code' => 'Suffix',
            'pat_birthDate' => 'Birth Date',
            'sex_code' => 'Sex',
            'civil_stat_code' => 'Civil Status',
            'pat_birthdate' => 'Birthdate',
            'regcode' => 'Region',
            'provcode' => 'Province',
            'citycode' => 'City',
            'bgycode' => 'Barangay',
            'zipcode' => 'Zipcode',
            'country_code' => 'Country',
            'pat_philhealth' => 'PhilHealth Number',
            'type_of_membership' => 'PhilHealth Category Type',
            'philhealth_status_code' => 'PhilHealth Status Type',
            'pDependentType_code' => 'Relationship to Member',
            'pMemberLname' => 'Member\'s Last Name',
            // 'pMemberFname' => 'Member\'s First Name',
        ]);

        $patient = MasterPatient::findOrFail($id);
        $patient->update($validated);

        return redirect()->route('patients')->with('success', 'Patient updated successfully!');
    }


        public function patenroll($id)
    {
        $patient = MasterPatient::findOrFail($id);
        return Inertia::render('MentalHealth::MedicalRecords/patientenrollment', [
            'patient' => $patient,
        ]);
    }
    
}
