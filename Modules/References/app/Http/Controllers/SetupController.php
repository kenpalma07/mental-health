<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\Setup;
use Carbon\Carbon;
use Modules\References\Models\FacilitySetup;

class SetupController extends Controller
{
    public function index()
    {
        return inertia('References::Setup/index');
        // $setup = FacilitySetup::with('fhudFacility')->first();

        // return Inertia::render('Setup/index', [
        //     'existingSetup' => $setup
        // ]);
    }
}

?>