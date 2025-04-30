<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_fhud_hospital', function (Blueprint $table) {
            $table->string('hfhudcode', 19)->collation('latin1_swedish_ci')->primary();
            $table->string('hfhudname', 255)->collation('latin1_swedish_ci');
            $table->dateTime('hfhuddate')->nullable();
            $table->string('hfstat', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('hflock', 1)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('datemod')->nullable();
            $table->string('updsw', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('regcode', 2)->nullable()->collation('latin1_swedish_ci');
            $table->string('provcode', 4)->nullable()->collation('latin1_swedish_ci');
            $table->string('ctycode', 6)->nullable()->collation('latin1_swedish_ci');
            $table->string('brgy', 9)->nullable()->collation('latin1_swedish_ci');
            $table->string('nso_code', 9)->nullable()->collation('latin1_swedish_ci');
            $table->string('faccode', 20)->nullable()->collation('latin1_swedish_ci');
            $table->string('address', 255)->nullable()->collation('latin1_swedish_ci');
            $table->string('faclicno', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('accreno', 45)->nullable()->collation('latin1_swedish_ci');
            $table->string('newfhudcode', 19)->nullable()->collation('latin1_swedish_ci');

            $table->unique('hfhudcode', 'pk_fhud_hospital_idx');
            $table->index('brgy', 'fhud_hospital_brgy_idx');
            $table->index('ctycode', 'fhud_hospital_citycode');
            $table->index('provcode', 'fhud_hospital_provcode');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_fhud_hospital');
    }
}

?>