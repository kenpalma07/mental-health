<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\ConsultationController;
use Modules\MentalHealth\Http\Controllers\PatientController;
use Modules\MentalHealth\Http\Controllers\OtherController;

Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/create', [PatientController::class, 'create']);
Route::post('/patients', [PatientController::class, 'store']);
Route::get('/patients/search', [PatientController::class, 'search']);


Route::get('/consultations', [ConsultationController::class, 'index']);


Route::get('/others', [OtherController::class, 'index']);

