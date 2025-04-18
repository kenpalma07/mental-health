<?php
use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\ConsultationController;
use Modules\MentalHealth\Http\Controllers\PatientController;
use Modules\MentalHealth\Http\Controllers\OtherController;
use Modules\MentalHealth\Http\Controllers\PatientConsentController;


//Patient Information
Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/create', [PatientController::class, 'create']);
Route::post('/patients', [PatientController::class, 'store']);
Route::get('/patients/search', [PatientController::class, 'search']);

//Patient Consultation
Route::get('/consultations', [ConsultationController::class, 'index']);

//Patient Consent
Route::get('/patients/{id}/consent', [PatientConsentController::class, 'show'])->name('patients.consent');



Route::get('/others', [OtherController::class, 'index']);



