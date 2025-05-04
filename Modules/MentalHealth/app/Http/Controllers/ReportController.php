<?php
namespace Modules\MentalHealth\Http\Controllers;
use Modules\MentalHealth\Models\MasterPatient;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function mhtracker()
    {
        return inertia('MentalHealth::Report/mhtracker');
    }

    public function mhmasterlist()
    {
        return inertia('MentalHealth::Report/mhmasterlist');
    }

    public function schoolagesr()
    {
        return inertia('MentalHealth::Report/schoolagesr');
    }

    public function adultsr()
    {
        return inertia('MentalHealth::Report/adultsr');
    }

}