<?php

namespace Modules\MentalHealth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function index()
    {
        return inertia('MentalHealth::Other/index');
    }

}
