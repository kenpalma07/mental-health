<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\FHUD;
use Carbon\Carbon;

class FHUDController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = FHUD::query();

        // Apply search if a search term is provided
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('hfhudcode', 'like', "%{$search}%")
                    ->orWhere('hfhudname', 'like', "%{$search}%");
            });
        }

        // Optional filter: facility type (example only, adjust as needed)
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        // Apply pagination
        $facilities = $query->paginate(10)->appends($request->only(['search', 'type']));

        return inertia('References::FHUD/index', [
            'facility' => $facilities->items(),
            'pagination' => $facilities->toArray(),
            'filters' => $request->only(['search', 'type']),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     return view('references::create');
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fhudcode' => 'required|string|max:12',
            'faccode' => 'required|string|max:255',
            'facility_name' => 'required|string|max:255',
            'provider_name' => 'required|string|max:255',
            'facility_address' => 'required|string|max:255',
            'date_mod' => 'required|date',
            'regcode' => 'required|string|max:255',
            'provcode' => 'required|string|max:255',
            'citycode' => 'required|string|max:255',
            'bgycode' => 'required|string|max:255',
            'zipcode' => 'required|string|max:4',
            'facility_stat' => 'required|string|max:255',
            'facility_licno' => 'nullable|string|max:255',
            'accreno' => 'nullable|string|max:255',
        ], [], [
            'fhudcode' => 'Facility Code',
            'faccode' => 'Facility Code',
            'facility_name' => 'Facility Name',
            'provider_name' => 'Name of the Provider',
            'facility_address' => 'Facility Address',
            'date_mod' => 'Date Modified',
            'regcode' => 'Region',
            'provcode' => 'Province',
            'citycode' => 'City',
            'bgycode' => ' Barangay',
            'zipcode' => 'Zipcode',
            'facility_stat' => 'Status',
            'facility_licno' => 'Facility License Nummber',
            'accreno' => 'PhilHealth Accreditation No',
        ]);
        //$timestamp = Carbon::parse($timestamp)->format('Y/m/dH:i:s');

        FHUD::create($validated);

        return redirect()->route('facilityhealth')->with('success', 'Facility added successfully!');
    }

    /**
     * Show the specified resource.
     */
    // public function show($id)
    // {
    //     return view('references::show');
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $facility = FHUD::findOrFail($id); // Fetch the facility by its ID
        return response()->json($facility); // You can return the facility data as JSON for your React component
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'fhudcode' => 'nullable|string|max:12',
            'faccode' => 'required|string|max:255',
        ]);

        $facility = FHUD::findOrFail($id);
        $facility->update($validated);

        return redirect()->route('facilityhealth')->with('success', 'Patient updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy($id) {}
}
