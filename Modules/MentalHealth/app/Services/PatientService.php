<?php 
namespace Modules\MentalHealth\Services;

use Modules\MentalHealth\Models\MasterPatient;

class PatientService
{
    public function getAllPatients($search = null)
    {
        $query = MasterPatient::query();

        if ($search) {
            $query->where('pat_lname', 'like', "%$search%")
                  ->orWhere('pat_fname', 'like', "%$search%");
        }

        return $query->paginate(10); // Adjust pagination as needed
    }
}
?>