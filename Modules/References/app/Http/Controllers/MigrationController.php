<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class MigrationController extends Controller
{

    public function version()
    {
        $latestMigration = DB::table('migrations')
            ->orderByDesc('id')
            ->first();

        return inertia('References::Migration/index', [
            'latestMigration' => $latestMigration,
        ]);
    }
}
