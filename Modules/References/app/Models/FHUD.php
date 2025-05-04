<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class FHUD extends Model
{
    protected $table = 'tbl_fhud_facility';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'fhudcode', 'faccode', 'facility_name', 'provider_name', 'facility_address', 'date_mod',
        'regcode', 'provcode', 'citycode', 'bgycode', 'zipcode',
        'facility_stat', 'facility_licno', 'accreno',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $now = Carbon::now();
            $model->ts_created_at = $now;
            // Set the date_mod field (if you want to handle it in the model directly)
        });

        static::updating(function ($model) {
            $now = Carbon::now();
            $model->ts_updated_at = $now;
        });
    }
}


?>