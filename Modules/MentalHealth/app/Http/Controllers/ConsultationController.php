<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function index()
    {
        return inertia('MentalHealth::Consultation/index');
    }
    

    public function create()
    {
        return inertia('MentalHealth::Consultation/addConsultation');
    }
}
