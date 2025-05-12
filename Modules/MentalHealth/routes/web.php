<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\ConsultationController;
use Modules\MentalHealth\Http\Controllers\PatientController;
use Modules\MentalHealth\Http\Controllers\OtherController;
use Modules\MentalHealth\Http\Controllers\ReportController;
use Modules\MentalHealth\Http\Controllers\PatientConsentController;
use Modules\MentalHealth\Http\Controllers\AssessmentController; 

// Patient Information
Route::get('/patients', [PatientController::class, 'index'])->name('patients');
Route::get('/patients/create', [PatientController::class, 'create'])->name('patients.create');
Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
Route::get('/patients/search', [PatientController::class, 'search']);
Route::get('/patients/{id}/edit', [PatientController::class, 'edit']);
Route::put('/patients/{id}', [PatientController::class, 'update'])->name('patients.update');
Route::get('/patients/{id}/view', [PatientController::class, 'view']);

// Patient Consultation
Route::get('/consultations/{id}', [ConsultationController::class, 'index'])->name('consultations.index');
Route::post('/consultations/store', [ConsultationController::class, 'store'])->name('consultations.store');

// Patient Consent
Route::get('/patients/{id}/consent', [PatientConsentController::class, 'show'])->name('patients.consent');

// Forms
Route::get('/itr', [OtherController::class, 'itr']);
Route::get('/medabstract', [OtherController::class, 'medabstract']);
Route::get('/treatmentcard', [OtherController::class, 'treatmentcard']);
Route::get('/medcard', [OtherController::class, 'medcard']);
Route::get('/referralform', [OtherController::class, 'referralform']);

//Reports
Route::get('/mhtracker', [ReportController::class, 'mhtracker']);
Route::get('/mhmasterlist', [ReportController::class, 'mhmasterlist']);
Route::get('/schoolagesr', [ReportController::class, 'schoolagesr']);
Route::get('/adultsr', [ReportController::class, 'adultsr']);

// Patient Assessment
Route::get('/assessment/{id}/addAssessment', [AssessmentController::class, 'index']); // <-- Add this!
