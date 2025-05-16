<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Employee extends Model
{
    protected $table = 'tbl_employee';

    protected $primaryKey = 'id';
    
    public $timestamps = false;
    
    protected $fillable = [
        'emp_id',
        'emp_fname',
        'emp_mname',
        'emp_lname',
        'emp_suffix',
        'emp_position',
        'emp_sex',
        'emp_birthdate',
        'emp_hiredby',
        'employment_status',
        'emp_status',
        'emp_prcno',
        'emp_ptrno',
        'emp_s2licno',
        'emp_phicno',
        'emp_phicaccreditno',
        'emp_tin',
        'registered_at',
        'ts_created_at',
        'ts_updated_at',
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
