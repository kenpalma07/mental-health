<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\MentalHealth\Models\MasterPatient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->query('id');

        $patient = MasterPatient::find($id);

        if (!$patient) {
            abort(404, 'Patient not found');
        }

        return Inertia::render('MentalHealth::Consultation/index', [
            'patient' => $patient
        ]);
    }

    public function create()
    {
        return Inertia::render('MentalHealth::Consultation/addConsultation');
    }
}
