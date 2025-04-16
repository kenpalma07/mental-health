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
        Schema::create('tbl_consultation', function (Blueprint $table) {
            $table->id();
            $table->string('consult_perm_id', 50)->nullable();
            $table->string('consult_temp_id', 50)->nullable()->unique();
            $table->string('fhudcode', 19)->index();
            $table->string('pat_temp_id', 50)->nullable()->index();
            $table->char('consult_type_code', 5)->index();                          // Nature of visit: New Admission
            $table->string('to_consult_code', 50)->index();                         // Type of Consultation: Mental Health
            $table->date('consult_date')->index();                                  // Consultation Date
            $table->time('consult_time');                                           // Consultation Time
            $table->integer('pat_age_yr')->index();                                 // Patient Age base in consult date and birthdate
            $table->integer('pat_age_mo');                                          // Patient Age base in consult date and birthdate
            $table->integer('pat_age_dy');                                          // Patient Age base in consult date and birthdate
            $table->string('mode_transac_code', 10);                                // Mode of Transaction
            $table->string('pat_height', 10)->nullable();                           // Patient Height
            $table->string('pat_weight', 10)->nullable();                           // Patient Weight
            $table->string('pat_waist_circum', 10)->nullable();                     // Patient Waist Circumference
            $table->string('pat_BMI', 10)->nullable();                              // Patient BMI
            $table->string('BMI_cat_code', 10)->nullable();                         // BMI Category
            $table->string('height_age_code', 10)->nullable();                      // Height Age Category
            $table->string('weight_age_code', 10)->nullable();                      // Weight Age Category
            $table->string('personnel_temp_id', 30)->index();                       // Personnel ID
            $table->longText('chief_complaint')->nullable();                        // Chief Complaint
            $table->char('Patient_Consent_code', 1);                                // Patient Consent
            $table->string('patient_address_temp_id', 50)->nullable();
            $table->string('parent_consult_temp_id', 255)->nullable();
            $table->char('PHIC_status', 1)->nullable();
            $table->char('PCB1', 1)->nullable();
            $table->date('date_entered');
            $table->time('time_entered');
            $table->date('date_updated')->nullable();
            $table->time('time_updated')->nullable();
            $table->timestamp('ts_created_at');
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->char('uploaded', 1);
            $table->date('date_uploaded')->nullable();
            $table->date('PHIEsubmitted_date')->nullable();
            $table->string('validated', 1)->nullable();
            $table->char('PHIESYNC', 1)->nullable();
            $table->integer('userid')->nullable();
            $table->text('json_DataInfo')->nullable();
            $table->string('PHIC_TRACKING_NUMBER', 255)->nullable();
        });

        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->char('patient_status', 1)->after('PHIESYNC');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_consultation');
    }
};

?>