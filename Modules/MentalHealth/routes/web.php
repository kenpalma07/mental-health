<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\ConsultationController;
use Modules\MentalHealth\Http\Controllers\PatientController;
use Modules\MentalHealth\Http\Controllers\OtherController;

Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/create', [PatientController::class, 'create']);
Route::get('/patients/{patient}', [PatientController::class, 'show']);
Route::post('/patients', [PatientController::class, 'store']);
Route::get('/patients/{patient}/edit', [PatientController::class, 'edit']);
Route::put('/patients/{patient}', [PatientController::class, 'update']);
Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);


Route::get('/patients/consulations', [ConsultationController::class, 'index']);


Route::get('/others', [OtherController::class, 'index']);

