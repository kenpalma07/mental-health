<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->string('master_patient_perm_id', 50)->nullable()->index()->after('consult_temp_id');
            $table->string('fhudcode', 19)->nullable()->change();
            $table->string('to_consult_code', 50)->nullable()->change();
        });

        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->string('fhudcode', 19)->nullable()->index()->after('master_patient_perm_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Drop master_patient_perm_id first
        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->dropColumn('master_patient_perm_id');
        });

        Schema::table('tbl_consultation', function (Blueprint $table) {
            // Revert fhudcode back to NOT NULL
            $table->string('fhudcode', 19)->nullable(false)->change();

            // Revert to_consult_code back to NOT NULL
            $table->string('to_consult_code', 50)->nullable(false)->change();
        });

        // Drop fhudcode from tbl_master_patient
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->dropColumn('fhudcode');
        });
    }
};

?>