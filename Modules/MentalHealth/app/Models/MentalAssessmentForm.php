<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class MentalAssessmentForm extends Model
{
    use SoftDeletes;

    protected $table = 'tbl_mental_assessment_form';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'consultation_id',//MN-00000001
        'pat_temp_id',//NULL
        'carer_name',
        'carer_address',
        'carer_mobile',
        'carer_relationship',
        'assessment_physical_health',//
        'management_physical_health',//
        'presenting_complaint',//
        'general_health_history',//
        'mns_history',//
        'fam_hist_mns_conditions',//
        'psychosocial_interventions1',//
        'carer_family',//
        'child_and_adolescent',
        'older_adults',//special pop
        'preg_or_breastf_wom',//special pop
        'assess_self_suic',//special pop
        'registered_at',
        'treat_avail',//
        'treat_choice',//
        'icd_10_code',//
        'icd_10_descrip',//
        'diagnosis',//
        'phar_date',//
        'phar_med',//
        'phar_intake',//
        'phar_intakeUnit',//
        'phar_freq',//
        'phar_freqUnit',//
        'phar_dur',//
        'phar_durUnit',//
        'phar_quantity',//
        'phar_doc',//
        'phar_remarks',//
        'ref_choice',//
        'ref_fhud',//
        'ref_reason',//
        'link_status',//
        'special_pop',//
        'date_nxt_visit',//
    ];


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
