<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\Setup;
use Carbon\Carbon;

class SetupController extends Controller
{
    public function index()
    {
        return inertia('References::Setup/index');
    }
}

?>