<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;

class FhudFacility extends Model
{
    protected $table = 'tbl_fhud_facility';

    protected $fillable = [
        'fhudcode', 'facility_name', 'faccode', 'regcode', 'zipcode',
        'date_mod',
    ];
}


?>