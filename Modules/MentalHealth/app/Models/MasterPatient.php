<?php

namespace Modules\MentalHealth\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPatient extends Model
{
    protected $table = 'tbl_master_patient';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'pat_lname', 'pat_fname', 'pat_mname', 'pat_birthDate', // Add other needed fields
    ];
}


?>