<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Modules\MentalHealth\Models\Consultation;
use Modules\MentalHealth\Models\MentalAssessmentForm;

class MasterPatient extends Model
{
    protected $table = 'tbl_master_patient';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'master_patient_perm_id',
        'pat_temp_id',
        'fhudcode',
        'facility_name',
        'facility_location',
        'provider_name',
        'intake_date',
        'prefix_code',
        'pat_lname',
        'pat_mname',
        'pat_fname',
        'sex_code',
        'suffix_code',
        'civil_stat_code',
        'pat_birthDate',
        'educattainment',
        'occupation_code',
        'regcode',
        'provcode',
        'citycode',
        'bgycode',
        'zipcode',
        'country_code',
        'patient_address',
        'pat_birthplace',
        'religion_code',
        'nationality',
        'pat_mobile',
        'pat_landline',
        'mot_fname',
        'mot_mname',
        'mot_lname',
        'mot_birthdate',
        'fat_fname',
        'fat_mname',
        'fat_lname',
        'fat_birthdate',
        'date_entered',
        'time_entered',
        'ts_created_at',
        'date_updated',
        'time_updated',
        'ts_updated_at',
        'registered_at',
        'mot_address',
        'mot_contact',
        'mot_deceased_status',
        'fat_address',
        'fat_contact',
        'fat_deceased_status',
        'phic_member',
        'pat_philhealth',
        'type_of_membership',
        'philhealth_status_code',
    ];

    public function fhudFacility()
    {
        return $this->belongsTo(FHUDFacility::class, 'fhudcode', 'fhudcode');
    }

    public function consultation()
    {
        return $this->hasMany(Consultation::class, 'consult_temp_id', 'id');
    }

    public function assessment()
    {
        return $this->hasMany(MentalAssessmentForm::class, 'pat_temp_id', 'id');
    }

    

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
