<?php
namespace Modules\MentalHealth\Http\Controllers;
use Modules\MentalHealth\Models\MasterPatient;
use Modules\MentalHealth\Models\MentalAssessmentForm;
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
    $patients = MasterPatient::all(); // You can add `->paginate(10)` if needed for pagination

    return Inertia::render('MentalHealth::Report/mhmasterlist', [
        'patients' => $patients,
    ]);
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