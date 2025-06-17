<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Modules\MentalHealth\Models\Pharma;
use Modules\MentalHealth\Models\MasterPatient;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PharmaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_assess_phar_id' => 'required|string',
            'phar_date' => 'required|date',
            'pat_perm_id' => 'required|string',
            'phar_med' => 'required|string',
            'phar_intake' => 'nullable|numeric',
            'phar_intakeUnit' => 'nullable|string',
            'phar_freq' => 'nullable|numeric',
            'phar_freqUnit' => 'nullable|string',
            'phar_dur' => 'nullable|numeric',
            'phar_durUnit' => 'nullable|string',
            'phar_quantity' => 'nullable|numeric',
            'phar_doc' => 'required|string',
            'phar_remarks' => 'nullable|string',
            'registered_at' => 'nullable|date',
        ]);

        $validated['ts_created_at'] = Carbon::now('Asia/Manila');

        Pharma::create($validated);

        return back()->with('success', 'Medicine Successfully Save!');
    }

    public function rxView($id)
    {
        $meds = Pharma::where('pat_perm_id', $id)->get();
        $patient = MasterPatient::where('id', $id)->first();

        return response()->json([
            'meds' => $meds,
            'patient' => $patient,
        ]);
    }

    public function RxPrint($id, Request $request)
    {
        $date = $request->query('date');
        $meds = Pharma::where('pat_perm_id', $id)->where('phar_date', $date)->get();

        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found.');
        }

        return Inertia::render('MentalHealth::MedicalRecords/RxPrint', [
            'patient' => $patient,
            'date' => $date,
            'meds' => $meds,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'patient_assess_phar_id' => 'required|string',
            'phar_date' => 'required|date',
            'pat_perm_id' => 'required|string',
            'phar_med' => 'required|string',
            'phar_intake' => 'nullable|numeric',
            'phar_intakeUnit' => 'nullable|string',
            'phar_freq' => 'nullable|numeric',
            'phar_freqUnit' => 'nullable|string',
            'phar_dur' => 'nullable|numeric',
            'phar_durUnit' => 'nullable|string',
            'phar_quantity' => 'nullable|numeric',
            'phar_doc' => 'required|string',
            'phar_remarks' => 'nullable|string',
            'registered_at' => 'nullable|date',
        ]);

        $pharma = Pharma::findOrFail($id);

        $pharma->update($validated);

        return back()->with('success', 'Medicine Successfully Updated!');
    }
}
