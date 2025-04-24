<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->string('fsNumber', 100)->nullable()->change();
            $table->char('phic_member', 1)->nullable()->change();
            $table->char('PCB_nhts', 1)->nullable()->change();
        });

        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->string('fhudcode', 19)->nullable()->change();
            $table->char('consult_type_code', 5)->nullable()->change();
            $table->string('to_consult_code', 50)->nullable()->change();
            $table->date('consult_date')->nullable()->change();
            $table->time('consult_time')->nullable()->change();
            $table->integer('pat_age_yr')->nullable()->change();
            $table->integer('pat_age_mo')->nullable()->change();
            $table->integer('pat_age_dy')->nullable()->change();
            $table->string('mode_transac_code', 10)->nullable()->change();
            $table->string('personnel_temp_id', 30)->nullable()->change();
            $table->char('Patient_Consent_code', 1)->nullable()->change();
            $table->date('date_entered')->nullable()->change();
            $table->time('time_entered')->nullable()->change();
            $table->timestamp('ts_created_at')->nullable()->change();
            $table->char('uploaded', 1)->nullable()->change();
            $table->char('patient_status', 1)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            //$table->string('fsNumber', 100)->nullable(false)->change();
            //$table->char('phic_member', 1)->nullable(false)->change();
            //$table->char('PCB_nhts', 1)->nullable(false)->change();
        });

        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->string('fhudcode', 19)->nullable(false)->change();
            $table->char('consult_type_code', 5)->nullable(false)->change();
            $table->string('to_consult_code', 50)->nullable(false)->change();
            $table->date('consult_date')->nullable(false)->change();
            $table->time('consult_time')->nullable(false)->change();
            $table->integer('pat_age_yr')->nullable(false)->change();
            $table->integer('pat_age_mo')->nullable(false)->change();
            $table->integer('pat_age_dy')->nullable(false)->change();
            $table->string('mode_transac_code', 10)->nullable(false)->change();
            $table->string('personnel_temp_id', 30)->nullable(false)->change();
            $table->char('Patient_Consent_code', 1)->nullable(false)->change();
            $table->date('date_entered')->nullable(false)->change();
            $table->time('time_entered')->nullable(false)->change();
            $table->timestamp('ts_created_at')->nullable(false)->change();
            $table->char('uploaded', 1)->nullable(false)->change();
            $table->char('patient_status', 1)->nullable(false)->change();
        });
    }
};

?>