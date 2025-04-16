<?php

use Illuminate\Support\Facades\Route;
use Modules\MentalHealth\Http\Controllers\MentalHealthController;

Route::prefix('mentalhealth')
    ->name('mentalhealth.')
    //->middleware(['auth:sanctum']) //, 'verified', 'approved', 'locked'
    ->group(function () {

        Route::get('/', function () {
            return view('mentalhealth::index');
        });
        // Permissions Resource
        Route::resource('permissions', PermissionController::class);
    });