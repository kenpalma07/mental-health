    <?php

    use Modules\MentalHealth\Models\MasterPatient;
    use Modules\MentalHealth\Models\Consultation;
    use Modules\MentalHealth\Models\MentalAssessmentForm;

    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            $patientCount = MasterPatient::count();
            $consultationCount = Consultation::count();
            $assessmentCount = MentalAssessmentForm::count();

            return Inertia::render('dashboard', [
                'patientCount' => $patientCount,
                'consultationCount' => $consultationCount,
                'assessmentCount' => $assessmentCount,
            ]);
        })->name('dashboard');
    });
