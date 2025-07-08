<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Relations\HasOne;
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
        'maiden_middlename',
        'maiden_lastname',
        'sex_code',
        'suffix_code',
        'civil_stat_code',
        'pat_birthDate',
        'educattainment',
        'occupation_code',
        'occupation_sp',
        'monthly_income',
        'ethnic_code',
        'tax_id_num',
        'bloodtype_code',
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

        // Guardian/Carer Information
        'carer_fname', //Carer's First Name
        'carer_mname', //Carer's Middle Name
        'carer_lname', //Carer's Last Name
        'carer_suffix', //Carer's Suffix
        'carer_sex', //Carer's Sex
        'carer_address', //Carer's Address
        'carer_relationship', //Carer's Relationship to Patient
        'carer_contact', //Carer's Contact Number
        'carer_birthdate', //Carer's Birth Date

        // PhilHealth
        'phic_member', //PhilHealth Member - Yes or No
        'pat_philhealth', //PhilHealth Number
        'type_of_membership', //PhilHealth Category Type
        'philhealth_status_code', //PhilHealth Status Type
        'pDependentType_code', //Relationship to Member
        'pMemberLname', //Member's Last Name
        'pMemberFname', //Member's First Name
        'pMemberMname', //Member's Middle Name
        'pMemberSuffix', //Member's Suffix
        'pMemberBdate', //Member's Birth Date
        'pMemberSex', //Member's Sex
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
