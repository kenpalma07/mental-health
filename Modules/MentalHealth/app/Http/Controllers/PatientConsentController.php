<?php
namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Inertia\Inertia;

class PatientConsentController extends Controller
{
    public function show($id)
    {
        $patient = MasterPatient::findOrFail($id);

        return Inertia::render('MentalHealth::Forms/PatientConsent', [
            'patient' => $patient,
        ]);
    }
}

