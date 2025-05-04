<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\FHUD;
use Carbon\Carbon;

class ReferencesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('References::FHUD/index');
        //return inertia('references::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     return view('references::create');
    // }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    // public function show($id)
    // {
    //     return view('references::show');
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit($id)
    // {
    //     return view('references::edit');
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy($id) {}
}
