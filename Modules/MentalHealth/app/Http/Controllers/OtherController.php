<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function index()
    {
        return inertia('MentalHealth::Other/index');
    }

    
    public function itr()
    {
        return inertia('MentalHealth::Other/itr');
    }

    
    public function medabstract()
    {
        return inertia('MentalHealth::Other/medabstract');
    }

    
    public function referralform()
    {
        return inertia('MentalHealth::Other/referralform');
    }

    
    public function treatmentcard()
    {
        return inertia('MentalHealth::Other/treatmentcard');
    }

    public function medcard()
    {
        return inertia('MentalHealth::Other/medcard');
    }
}
