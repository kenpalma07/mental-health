<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\ConsultationController;
use Modules\MentalHealth\Http\Controllers\PatientController;
use Modules\MentalHealth\Http\Controllers\OtherController;
use Modules\MentalHealth\Http\Controllers\ReportController;
use Modules\MentalHealth\Http\Controllers\PatientConsentController;
use Modules\MentalHealth\Http\Controllers\AssessmentController; 
use Modules\MentalHealth\Http\Controllers\FormController;
use Modules\MentalHealth\Http\Controllers\MedicalRecordsController;

// Patient Information
Route::get('/patients', [PatientController::class, 'index'])->name('patients');
Route::get('/patients/create', [PatientController::class, 'create'])->name('patients.create');
Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
Route::get('/patients/search', [PatientController::class, 'search']);
Route::get('/patients/{id}/edit', [PatientController::class, 'edit'])->name('patients.edit');
Route::put('/patients/{id}', [PatientController::class, 'update'])->name('patients.update');
Route::get('/patients/{id}/view', [PatientController::class, 'view']);
Route::get('/patients/{patient}/consent-pdf', [PatientConsentController::class, 'streamConsentPDF']);
// Route::get('/patients/{patient}/export-consent-pdf', [PatientConsentController::class, 'exportConsentPDF']);

// Patient Consultation
Route::get('/consultations/{id}', [ConsultationController::class, 'index'])->name('consultations.index');
Route::post('/consultations/store', [ConsultationController::class, 'store'])->name('consultations.store');
Route::get('/consultations/{id}/edit-consultation', [ConsultationController::class, 'edit'])->name('consultation.edit');
Route::put('/consultations/{id}', [ConsultationController::class, 'update'])->name('consultations.update');

// Patient Consent
Route::get('/patients/{id}/consent', [PatientConsentController::class, 'show'])->name('patients.consent');

// Patient ITR/assessment/treatment plan Forms Needed
Route::get('/patitrforms/{id}', [FormController::class, 'index'])->name('patitrforms.index');


//patient medical records
Route::get('/medrecords', [MedicalRecordsController::class, 'index'])->name('patients.index');
Route::get('/medrecords/{id}', [MedicalRecordsController::class, 'show'])->name('medrecords.show');

// Forms
Route::get('/enctr/{id}', [OtherController::class, 'encounter'])->name('enc.encounter');
Route::get('/medabstract', [OtherController::class, 'medabstract']);
Route::get('/treatmentcard/{id}', [OtherController::class, 'treatmentcard'])->name('show.treatmentcard');
Route::get('/medcard/{id}', [OtherController::class, 'medcard'])->name('show.medcard');
Route::get('/referralform/{id}', [OtherController::class, 'referralform'])->name('show.referralform');

//Reports
Route::get('/mhtracker', [ReportController::class, 'mhtracker']);
Route::get('/reportmasterlist', [ReportController::class, 'mhmasterlist']);
Route::get('/reportschoolagesr', [ReportController::class, 'schoolagesr']);
Route::get('/reportadultsr', [ReportController::class, 'adultsr']);

// Patient Assessment
Route::get('/assessment/{id}/addAssessment', [AssessmentController::class, 'index']);
Route::post('/assessment/store', [AssessmentController::class, 'store'])->name('assessment.store');
Route::get('/assessment/{id}/history', [AssessmentController::class, 'show'])->name('assessment.show');


