<?php

use Illuminate\Support\Facades\Route;
use Modules\References\Http\Controllers\ReferencesController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('references', ReferencesController::class)->names('references');
});
