<?php

use Illuminate\Support\Facades\Route;
// in routes/web.php or a custom routes file

use Modules\MentalHealth\Http\Controllers\PatientController;

Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/create', [PatientController::class, 'create']);
Route::get('/patients/{patient}', [PatientController::class, 'show']);
Route::post('/patients', [PatientController::class, 'store']);
Route::get('/patients/{patient}/edit', [PatientController::class, 'edit']);
Route::put('/patients/{patient}', [PatientController::class, 'update']);
Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);
