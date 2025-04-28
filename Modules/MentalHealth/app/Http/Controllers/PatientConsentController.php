<?php
namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MasterPatient;

class PatientConsentController extends Controller
{
    public function show($id)
    {
        $patient = MasterPatient::findOrFail($id);

        return inertia('MentalHealth::Forms/PatientConsent', [
            'patient' => $patient,
        ]);
    }
}

