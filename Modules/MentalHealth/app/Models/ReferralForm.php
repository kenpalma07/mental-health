<?php
namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ReferralForm extends Model
{
    protected $table = 'tbl_referral_form';

    protected $fillable = [
        'consultation_id',
        'date_ref',
        'pat_temp_id',
        'hpersonnel',
        'hposition',
        'facility_name',
        'facility_address',
        'htel_arrangement',
        'facility_telephone',
        'referral_facility_name',
        'referral_facility_address',
        'pat_fullname',
        'identity_number',
        'pat_age',
        'pat_sex',
        'pat_fullAdd',
        'assess_phy_heal',
        'manage_phy_heal',
        'assessment_findings',
        'any_treatment_prov',
        'reason_referral',
        'doc_accomp_referral',
        'ts_created_at',
        'ts_updated_at',
        'ts_deleted_at',
        'registered_at',
        'status_code',
    ];

    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->ts_created_at = $now;
        });

        static::updating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->ts_updated_at = $now;
        });
    }
}