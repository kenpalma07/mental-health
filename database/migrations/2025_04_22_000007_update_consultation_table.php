<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            // — add the new column + index if it doesn't already exist
            if (! Schema::hasColumn('tbl_consultation', 'master_patient_perm_id')) {
                $table
                    ->string('master_patient_perm_id', 50)
                    ->nullable()
                    ->after('consult_temp_id');
            }
            // make sure its index exists
            if (! DB::select("SHOW INDEX FROM `tbl_consultation` WHERE Key_name = 'tbl_consultation_master_patient_perm_id_index'")) {
                $table->index('master_patient_perm_id', 'tbl_consultation_master_patient_perm_id_index');
            }

            // — modify existing columns
            $table->string('fhudcode', 19)->nullable()->change();
            $table->string('to_consult_code', 50)->nullable()->change();
            $table->date('consult_date')->nullable()->change();
            $table->time('consult_time')->nullable()->change();
            $table->integer('pat_age_yr')->nullable()->change();
            $table->integer('pat_age_mo')->nullable()->change();
            $table->integer('pat_age_dy')->nullable()->change();
            $table->string('mode_transac_code', 10)->nullable()->change();
            $table->string('personnel_temp_id', 30)->nullable()->change();
            $table->date('date_entered')->nullable()->change();
            $table->time('time_entered')->nullable()->change();

            // — ensure Patient_Consent_code exists, then change + index only if missing
            if (! Schema::hasColumn('tbl_consultation', 'Patient_Consent_code')) {
                $table->char('Patient_Consent_code', 1)->nullable()->after('chief_complaint');
            }
            $table->char('Patient_Consent_code', 1)->nullable()->change();
            if (! DB::select("SHOW INDEX FROM `tbl_consultation` WHERE Key_name = 'tbl_consultation_patient_consent_code_index'")) {
                $table->index('Patient_Consent_code', 'tbl_consultation_patient_consent_code_index');
            }

            $table->decimal('pat_temperature', 4, 1)
                ->nullable()
                ->after('Patient_Consent_code');
            $table->unsignedTinyInteger('pat_heart_rate')
                ->nullable()
                ->after('pat_temperature');
            $table->unsignedTinyInteger('pat_oxygen_sat')
                ->nullable()
                ->after('pat_heart_rate');
            $table->unsignedSmallInteger('pat_systolic_pres')->nullable()->after('pat_heart_rate');
            $table->unsignedSmallInteger('pat_diastolic_pres')->nullable()->after('pat_systolic_pres');
        });

        // 2) tbl_master_patient: add fhudcode + its index if missing
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            if (! Schema::hasColumn('tbl_master_patient', 'fhudcode')) {
                $table
                    ->string('fhudcode', 19)
                    ->nullable()
                    ->after('master_patient_perm_id');
            }
            if (! DB::select("SHOW INDEX FROM `tbl_master_patient` WHERE Key_name = 'tbl_master_patient_fhudcode_index'")) {
                $table->index('fhudcode', 'tbl_master_patient_fhudcode_index');
            }
        });
    }

    public function down()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            // — drop master_patient_perm_id index + column if they exist
            if (DB::select("SHOW INDEX FROM `tbl_consultation` WHERE Key_name = 'tbl_consultation_master_patient_perm_id_index'")) {
                $table->dropIndex('tbl_consultation_master_patient_perm_id_index');
            }
            if (Schema::hasColumn('tbl_consultation', 'master_patient_perm_id')) {
                $table->dropColumn('master_patient_perm_id');
            }

            // — drop Patient_Consent_code index if it exists
            if (DB::select("SHOW INDEX FROM `tbl_consultation` WHERE Key_name = 'tbl_consultation_patient_consent_code_index'")) {
                $table->dropIndex('tbl_consultation_patient_consent_code_index');
            }

            // — revert the nullable → not nullable changes
            $table->string('fhudcode', 19)->nullable(false)->change();
            $table->string('to_consult_code', 50)->nullable(false)->change();
            $table->date('consult_date')->nullable(false)->change();
            $table->time('consult_time')->nullable(false)->change();
            $table->integer('pat_age_yr')->nullable(false)->change();
            $table->integer('pat_age_mo')->nullable(false)->change();
            $table->integer('pat_age_dy')->nullable(false)->change();
            $table->string('mode_transac_code', 10)->nullable(false)->change();
            $table->string('personnel_temp_id', 30)->nullable(false)->change();
            $table->date('date_entered')->nullable(false)->change();
            $table->time('time_entered')->nullable(false)->change();

            // — you can drop the column itself if needed, but usually up/down should mirror exactly
            $table->dropColumn('pat_temperature');
            $table->dropColumn('pat_heart_rate');
            $table->dropColumn('pat_oxygen_sat');
            $table->dropColumn('pat_systolic_pres');
            $table->dropColumn('pat_diastolic_pres');
        });

        Schema::table('tbl_master_patient', function (Blueprint $table) {
            // — drop fhudcode index + column if they exist
            if (DB::select("SHOW INDEX FROM `tbl_master_patient` WHERE Key_name = 'tbl_master_patient_fhudcode_index'")) {
                $table->dropIndex('tbl_master_patient_fhudcode_index');
            }
            if (Schema::hasColumn('tbl_master_patient', 'fhudcode')) {
                $table->dropColumn('fhudcode');
            }
        });
    }
};
