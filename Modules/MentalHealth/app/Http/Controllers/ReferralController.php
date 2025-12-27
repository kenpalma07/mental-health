<?php

namespace Modules\MentalHealth\Http\Controllers;

use Illuminate\Http\Request;
use Modules\MentalHealth\Models\ReferralForm;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ReferralController extends Controller
{
    public function index()
    {
        $referrals = ReferralForm::orderByDesc('ts_created_at')->get();
        return inertia('MentalHealth::Referral/index', [
            'referrals' => $referrals,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'consultation_id' => 'required|string|max:50',
            'date_ref' => 'required|date',
            'pat_temp_id' => 'nullable|string|max:50',
            'hpersonnel' => 'nullable|string|max:200',
            'hposition' => 'nullable|string|max:200',
            'facility_name' => 'nullable|string|max:200',
            'facility_address' => 'nullable|string|max:250',
            'htel_arrangement' => 'nullable|string|max:1',
            'facility_telephone' => 'nullable|string|max:20',
            'referral_facility_name' => 'nullable|string|max:200',
            'referral_facility_address' => 'nullable|string|max:250',
            'pat_fullname' => 'nullable|string|max:200',
            'identity_number' => 'nullable|string|max:20',
            'pat_age' => 'nullable|string|max:3',
            'pat_sex' => 'nullable|string|max:2',
            'pat_fullAdd' => 'nullable|string|max:200',
            'assess_phy_heal' => 'nullable|string',
            'manage_phy_heal' => 'nullable|string',
            'assessment_findings' => 'nullable|string|max:200',
            'any_treatment_prov' => 'nullable|string|max:200',
            'reason_referral' => 'nullable|string|max:200',
            'doc_accomp_referral' => 'nullable|string|max:200',
            'status_code' => 'nullable|string|max:1',
        ]);
        $validated['track_num'] = 'REF-' . date('YmdHis') . '-' . strtoupper(Str::random(6));
        $referral = ReferralForm::create($validated);

        return redirect()->back()->with('success', 'Referral sent successfully!');
    }
}
