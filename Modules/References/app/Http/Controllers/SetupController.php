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
            'provider_name' => 'required|string|max:255',
            'regcode' => 'required|string|max:50',
            'provcode' => 'required|string|max:255',
            'citycode' => 'required|string|max:255',
            'bgycode' => 'required|string|max:255',
            'zipcode' => 'required|string|max:255',
            'facility_licno' => 'nullable|string|max:255',
            'accreno' => 'nullable|string|max:255',
            'facility_email' => 'nullable|string|max:255',
            'facility_contact' => 'nullable|string|max:255',
            'facility_fax' => 'nullable|string|max:255',
        ]);

        FacilitySetup::create($data);

        return redirect()->route('facilitysetup')->with('success', 'Facility setup successfully!');
    }

    // public function edit($id)
    // {
    //     $facilitySetup = FacilitySetup::findOrFail($id);

    //     return inertia('References::Setup/edit', [
    //         'facilitySetup' => $facilitySetup,
    //     ]);
    // }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'facility_name' => 'nullable|string|max:255|unique:tbl_facility_setup,facility_name,' . $id,
            'fhudcode' => 'nullable|string|max:50|unique:tbl_facility_setup,fhudcode,' . $id,
            'faccode' => 'nullable|string|max:50|unique:tbl_facility_setup,faccode,' . $id,
            'provider_name' => 'nullable|string|max:255',
            'facility_address' => 'nullable|string|max:255',
            'regcode' => 'nullable|string|max:50',
            'provcode' => 'nullable|string|max:255',
            'citycode' => 'nullable|string|max:255',
            'bgycode' => 'nullable|string|max:255',
            'zipcode' => 'nullable|string|max:4',
            'facility_licno' => 'nullable|string|max:255',
            'accreno' => 'nullable|string|max:255',
            'facility_email' => 'nullable|string|max:255',
            'facility_contact' => 'nullable|string|max:255',
            'facility_fax' => 'nullable|string|max:255',
        ]);

        $facilitySetup = FacilitySetup::findOrFail($id);
        $facilitySetup->update($data);

        return redirect()->route('facilitysetup')->with('success', 'Facility setup updated successfully!');
    }
}
