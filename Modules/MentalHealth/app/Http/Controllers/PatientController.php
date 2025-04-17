<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return inertia('MentalHealth::Patient/index');
    }

    public function create()
    {
        return inertia('MentalHealth::Patient/addPatient');
    }
}
