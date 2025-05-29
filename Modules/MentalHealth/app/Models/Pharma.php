<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Pharma extends Model
{

    protected $table = 'tbl_pharma';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'patient_assess_phar_id',
        'phar_date',
        'pat_perm_id',
        'date_entered',
        'time_entered',
        'phar_med',
        'phar_intake',
        'phar_intakeUnit',
        'phar_freq',
        'phar_freqUnit',
        'phar_dur',
        'phar_durUnit',
        'phar_quantity',
        'phar_doc',
        'phar_remarks',
        'ts_created_at',
        'ts_updated_at',
        'ts_deleted_at',
        'registered_at',
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
