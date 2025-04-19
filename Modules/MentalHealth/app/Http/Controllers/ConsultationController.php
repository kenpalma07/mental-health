<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve patient id from query string
        $patientId = $request->query('id');

        // Return the consultations page with the patient data
        return inertia('MentalHealth::Consultation/index', [
            'patientId' => $patientId, // Pass the patient id to the page
        ]);
    }

    public function create()
    {
        return inertia('MentalHealth::Consultation/addConsultation');
    }
}
