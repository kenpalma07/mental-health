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
        ]);

        // If validation fails, Laravel will return a 422 error
        // If validation passes, continue saving the data
        FacilitySetup::create($data);

        return redirect()->route('facilitysetup')->with('success', 'Facility setup successfully!');
    }
}
