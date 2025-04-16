<?php

use Illuminate\Support\Facades\Route;
use Modules\IAM\Http\Controllers\IAMController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('iam', IAMController::class)->names('iam');
});
