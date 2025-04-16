<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\MentalHealthController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('mentalhealth', MentalHealthController::class)->names('mentalhealth');
});
