<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;

class Setup extends Model
{
    protected $table = 'tbl_facility_setup';

    protected $primaryKey = 'id';

    protected $fillable = [
        'fhudcode', 'facility_name', 'faccode',
    ];
    
}


?>