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
        return inertia('MentalHealth::Forms/itr');
    }

    
    public function medabstract()
    {
        return inertia('MentalHealth::Forms/medabstract');
    }

    
    public function referralform()
    {
        return inertia('MentalHealth::Forms/referralform');
    }

    
    public function treatmentcard()
    {
        return inertia('MentalHealth::Forms/treatmentcard');
    }

    public function medcard()
    {
        return inertia('MentalHealth::Forms/medcard');
    }
}
