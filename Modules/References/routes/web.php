<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; // ✅ this is correct
use Modules\References\Http\Controllers\ReferencesController;
use Modules\References\Http\Controllers\FHUDController;
use Modules\References\Http\Controllers\SetupController;
use Modules\References\Models\FhudFacility;

Route::get('/references', [ReferencesController::class, 'index']);

Route::get('/references/fhud', [FHUDController::class, 'index'])->name('facilityhealth');
Route::get('/references/fhud/create', [FHUDController::class, 'create'])->name('fhud.create');
Route::post('/references/fhud', [FHUDController::class, 'store'])->name('fhud.store');

Route::get('/references/setup', [SetupController::class, 'index'])->name('facilitysetup');

Route::get('/api/fhud-codes', function (Request $request) {
    $search = $request->get('search');

    return FhudFacility::when($search, fn($q) =>
        $q->where('fhudcode', 'like', "%{$search}%")
          ->orWhere('facility_name', 'like', "%{$search}%")
    )
    ->limit(10)
    ->get(['id', 'fhudcode', 'facility_name', 'faccode',]);
});

?>