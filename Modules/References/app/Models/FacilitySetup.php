<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;

class FacilitySetup extends Model
{
    protected $table = 'tbl_fhud_facility';

    protected $fillable = [
        'fhudcode', 'facility_name', 'faccode',
    ];
}


?>