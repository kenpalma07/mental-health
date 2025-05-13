<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OtherController extends Controller
{
    public function index()
    {
        return Inertia::render('MentalHealth::Other/index');
    }

    
    public function itr()
    {
        return Inertia::render('MentalHealth::Forms/itr');
    }

    
    public function medabstract()
    {
        return Inertia::render('MentalHealth::Forms/medabstract');
    }

    
    public function referralform()
    {
        return Inertia::render('MentalHealth::Forms/referralform');
    }

    
    public function treatmentcard()
    {
        return Inertia::render('MentalHealth::Forms/treatmentcard');
    }

    public function medcard()
    {
        return Inertia::render('MentalHealth::Forms/medcard');
    }
}
