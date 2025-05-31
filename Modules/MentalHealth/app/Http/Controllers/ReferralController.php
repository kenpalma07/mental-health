<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Modules\MentalHealth\Models\Pharma;
use Modules\MentalHealth\Models\MasterPatient;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReferralController extends Controller
{
    public function index()
    {
        return inertia::render('MentalHealth::Referral/index');
    }

    public function outref()
    {
        return inertia::render('MentalHealth::Referral/outRef');
    }
}
