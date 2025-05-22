<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;


class MedicalRecordsController extends Controller
{
    public function index()
    {
        return Inertia::render('MentalHealth::MedicalRecords/index');
    }
}