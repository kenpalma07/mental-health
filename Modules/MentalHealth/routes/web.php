<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\MentalHealthController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('mentalhealth', MentalHealthController::class)->names('mentalhealth');
});
