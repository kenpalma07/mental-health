<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Employee extends Model
{
    protected $table = 'tbl_employee';

    protected $primaryKey = 'id';

    protected $fillable = [
        'emp_id', 'emp_fname', 'emp_mname', 'emp_lname', 'emp_suffix',
        'emp_position',
        'registered_at',
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

?>