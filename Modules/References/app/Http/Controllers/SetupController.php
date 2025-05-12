<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\Setup;
use Carbon\Carbon;
use Modules\References\Models\FacilitySetup;

class SetupController extends Controller
{
    public function index()
    {
        // $hasSetup = FacilitySetup::exists(); // true or false
        $facilitySetups = FacilitySetup::all();

        return inertia('References::Setup/index', [
            'facilitySetups' => $facilitySetups,
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'facility_name' => 'required|string|max:255',
            'fhudcode' => 'required|string|max:50',
            'faccode' => 'required|string|max:50',
            'facility_address' => 'required|string|max:255',
        ]);

        // If validation fails, Laravel will return a 422 error
        // If validation passes, continue saving the data
        FacilitySetup::create($data);

        return redirect()->route('facilitysetup')->with('success', 'Facility setup successfully!');
    }

    public function edit($id)
    {
        $facilitySetup = FacilitySetup::findOrFail($id);

        return inertia('References::Setup/edit', [
            'facilitySetup' => $facilitySetup,
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'facility_name' => 'nullable|string|max:255|unique:tbl_facility_setup,facility_name,' . $id,
            'fhudcode' => 'nullable|string|max:50|unique:tbl_facility_setup,fhudcode,' . $id,
            'faccode' => 'nullable|string|max:50|unique:tbl_facility_setup,faccode,' . $id,
            'provider_name' => 'nullable|string|max:255',
            'facility_address' => 'nullable|string|max:255',
        ]);

        $facilitySetup = FacilitySetup::findOrFail($id);
        $facilitySetup->update($data);

        return redirect()->route('facilitysetup')->with('success', 'Facility setup updated successfully!');
    }
}
