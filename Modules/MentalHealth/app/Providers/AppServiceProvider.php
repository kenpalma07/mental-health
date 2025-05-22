<?php
namespace Modules\MentalHealth\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Inertia::share([
            'redirect_url' => fn () => session('redirect_url'),
        ]);
    }
}
