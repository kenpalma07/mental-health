<?php
namespace Modules\MentalHealth\Http\Controllers;
use Modules\MentalHealth\Models\MasterPatient;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function mhtracker()
    {
        return Inertia::render('MentalHealth::Report/mhtracker');
    }

    public function mhmasterlist()
    {
        return Inertia::render('MentalHealth::Report/mhmasterlist');
    }

    public function schoolagesr()
    {
        return Inertia::render('MentalHealth::Report/schoolagesr');
    }

    public function adultsr()
    {
        return Inertia::render('MentalHealth::Report/adultsr');
    }

}