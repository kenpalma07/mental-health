<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class FHUDFacility extends Model
{
    protected $table = 'tbl_facility_setup';
    protected $primaryKey = 'id';

    protected $fillable = [
        'fhudcode', 'facility_name', 'facility_location', 'provider_name',
    ];
}