<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        return Inertia('MentalHealth::Assessment/index');
    }
}
