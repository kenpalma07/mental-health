<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class MasterPatient extends Model
{
    protected $table = 'tbl_master_patient';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'facility_name', 'facility_location', 'provider_name', 'intake_date',
        'pat_lname', 'pat_mname', 'pat_fname', 'sex_code', 'pat_birthDate',
        'regcode', 'provcode', 'citycode', 'bgycode', 'patient_address',
        'pat_mobile', 'pat_landline',
        'mot_fname', 'mot_mname', 'mot_lname', 'mot_birthDate',
        'fat_fname', 'fat_mname', 'fat_lname', 'fat_birthDate',
        'date_entered', 'time_entered', 'ts_created_at',
        'date_updated', 'time_updated', 'ts_updated_at',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $now = Carbon::now();
            $model->date_entered = $now->toDateString();
            $model->time_entered = $now->toTimeString();
            $model->ts_created_at = $now;
        });

        static::updating(function ($model) {
            $now = Carbon::now();
            $model->date_updated = $now->toDateString();
            $model->time_updated = $now->toTimeString();
            $model->ts_updated_at = $now;
        });
    }
}
