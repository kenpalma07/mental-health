<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Consultation extends Model
{
    use HasFactory;

    protected $table = 'tbl_consultation';
    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'consult_perm_id',
        'consult_date',
        'consult_time',
        'consult_type_code',
        'to_consult_code',
        'type_service',
        'chief_complaint',
        'pat_temperature',
        'pat_heart_rate',
        'pat_oxygen_sat',
        'pat_height',
        'pat_weight',
        'pat_BMI',
        'BMI_cat_code',
        'pat_systolic_pres',
        'pat_diastolic_pres',
        'master_patient_perm_id',
        'consult_temp_id',
        'pat_age_yr',
        'pat_age_mo',
        'pat_age_dy',
        'patient_address_temp_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->date_entered = $now->toDateString();
            $model->time_entered = $now->toTimeString();
            $model->ts_created_at = $now;
        });

        static::updating(function ($model) {
            $now = Carbon::now('Asia/Manila');
            $model->date_updated = $now->toDateString();
            $model->time_updated = $now->toTimeString();
            $model->ts_updated_at = $now;
        });
    }
}
