<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\MentalHealth\Models\MasterPatient;

class AssessmentController extends Controller
{
    public function index($id)
    {
        $patient = MasterPatient::find($id);
    
        if (!$patient) {
            abort(404, 'Patient not found');
        }
    
        return inertia('MentalHealth::Assessment/index', [
            'patient' => $patient
        ]);
    }
}
