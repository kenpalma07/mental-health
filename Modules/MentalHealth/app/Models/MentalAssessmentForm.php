<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class MentalAssessmentForm extends Model
{
    // use SoftDeletes;

    protected $table = 'tbl_mental_assessment_form';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'consultation_id',
        'consult_date_assess',
        'pat_perm_id',
        'pat_temp_id',
        'carer_name_mot',
        'carer_name_fat',
        'carer_address',
        'carer_mobile',
        'selfharm_sui',
        'grade_year',
        'school_name',
        'place_inci',
        'self_sui_remarks',
        'self_sui_means',

        'fam_hist_mns_cond_item',
        'fam_hist_mns_cond_label',
        'gen_heal_hist_item',
        'gen_heal_hist_label',
        'mns_hist_item',
        'mns_hist_label',
        'pres_comp_item',
        'pres_comp_label',

        'psycho_inter',
        'career_fam_choice',
        'carer_relationship',
        'assessment_physical_health',
        'management_physical_health',
        'child_and_adolescent',
        'older_adults',
        'preg_or_breastf_wom',
        'assess_self_suic',

        'date_entered',
        'time_entered',
        'date_updated',
        'time_updated',
        'ts_created_at',
        'ts_updated_at',
        'ts_deleted_at',
        'registered_at',

        'treat_avail',
        'treat_choice',
        'icd_10_code',
        'icd_10_descrip',
        'diagnosis',

        'phar_date',
        'phar_med',
        'phar_intake',
        'phar_intakeUnit',
        'phar_freq',
        'phar_freqUnit',
        'phar_dur',
        'phar_durUnit',
        'phar_quantity',
        'phar_doc',
        'is_dispense',
        'phar_remarks',

        'ref_choice',
        'ref_fhud',
        'ref_reason',
        'link_status',
        'special_pop',
        'date_nxt_visit',
    ];



    protected $attributes = [
        'fam_hist_mns_cond_item' => '',
        'gen_heal_hist_item' => '',
        'mns_hist_item' => '',
        'pres_comp_item' => '',
        'fam_hist_mns_cond_label' => '',
        'gen_heal_hist_label' => '',
        'mns_hist_label' => '',
        'pres_comp_label' => '',
    ];


    public function patient()
    {
        return $this->belongsTo(MasterPatient::class, 'pat_temp_id', 'id');
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->date_entered = $now->toDateString();
            $model->time_entered = $now->toTimeString();
            $model->ts_created_at = $now;
            $model->registered_at = $now;
        });

        static::updating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->date_updated = $now->toDateString();
            $model->time_updated = $now->toTimeString();
            $model->ts_updated_at = $now;
        });
    }
}
