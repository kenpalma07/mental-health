<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; // ✅ this is correct
use Modules\References\Http\Controllers\ReferencesController;
use Modules\References\Http\Controllers\FHUDController;
use Modules\References\Http\Controllers\SetupController;
use Modules\References\Http\Controllers\EmployeeController;
use Modules\References\Models\FhudFacility;
use Modules\References\Http\Controllers\MigrationController;


Route::get('/references', [ReferencesController::class, 'index']);

Route::get('/references/fhud', [FHUDController::class, 'index'])->name('facilityhealth');
Route::get('/references/fhud/create', [FHUDController::class, 'create'])->name('fhud.create');
Route::get('/references/fhud/{id}/edit', [FHUDController::class, 'edit'])->name('fhud.edit');
Route::put('/references/fhud/{id}', [FHUDController::class, 'update'])->name('fhud.update');
Route::post('/references/fhud', [FHUDController::class, 'store'])->name('fhud.store');

// Form Facility Setup
Route::get('/references/setup', [SetupController::class, 'index'])->name('facilitysetup');
Route::post('/references/setup', [SetupController::class, 'store']);
Route::get('/references/setup/{id}/edit', [SetupController::class, 'edit'])->name('facilitysetup.edit');
Route::put('/references/setup/{id}', [SetupController::class, 'update'])->name('facilitysetup.update');

Route::get('/api/fhud-codes', function (Request $request) {
    $search = $request->get('search');

    return FhudFacility::when(
        $search,
        fn($q) =>
        $q->where('fhudcode', 'like', "%{$search}%")
            ->orWhere('facility_name', 'like', "%{$search}%")
    )
        ->limit(10)
        ->get(['id', 'fhudcode', 'facility_name', 'faccode', 'provider_name', 'facility_address', 'facility_stat', 'regcode', 'provcode', 'citycode', 'bgycode', 'zipcode', 'facility_licno', 'accreno']);
});

Route::get('/api/facilities', function (Request $request) {
    $search = $request->get('search');

    return FhudFacility::when(
        $search,
        fn($q) =>
        $q->where('fhudcode', 'like', "%{$search}%")
            ->orWhere('facility_name', 'like', "%{$search}%")
    )
        ->limit(10)
        ->get(['id', 'fhudcode', 'facility_name', 'faccode', 'provider_name', 'facility_address', 'facility_stat', 'regcode', 'provcode', 'citycode', 'bgycode', 'zipcode', 'facility_licno', 'accreno']);
});

// Employee
Route::get('/references/employees', [EmployeeController::class, 'index'])->name('employees');
Route::get('/references/employees/create', [EmployeeController::class, 'create'])->name('employee.create');
Route::get('/references/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('employee.edit');
Route::put('/references/employees/{id}', [EmployeeController::class, 'update'])->name('employee.update');
Route::post('/references/employees', [EmployeeController::class, 'store'])->name('employee.store');
Route::get('/references/employees/{employee}/consent-pdf', [EmployeeController::class, 'exportConsentPDF']);
Route::get('/references/employees/{employee}/consent-pdf', [EmployeeController::class, 'streamConsentPDF']);


//Migration Version
Route::get('/migration/version', [MigrationController::class, 'version']);
