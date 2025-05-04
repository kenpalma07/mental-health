<?php

use Illuminate\Support\Facades\Route;
use Modules\References\Http\Controllers\ReferencesController;
use Modules\References\Http\Controllers\FHUDController;
use Modules\References\Http\Controllers\SetupController;

Route::get('/references', [ReferencesController::class, 'index']);

Route::get('/references/fhud', [FHUDController::class, 'index'])->name('facilityhealth');
Route::get('/references/fhud/create', [FHUDController::class, 'create'])->name('fhud.create');
Route::post('/references/fhud', [FHUDController::class, 'store'])->name('fhud.store');

Route::get('/references/setup', [SetupController::class, 'index'])->name('facilitysetup');

?>