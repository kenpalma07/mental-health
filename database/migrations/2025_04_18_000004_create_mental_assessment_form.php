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
        Schema::create('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->id();
            $table->string('consultation_id', 50)->index();
            $table->string('pat_temp_id', 50)->nullable()->unique();
            $table->string('carer_name', 200)->nullable()->index();
            $table->string('carer_address', 250)->nullable()->index();
            $table->string('carer_mobile', 20)->nullable()->index();
            $table->string('carer_relationship', 50)->nullable()->index();

            //Assess physical health (refer to mhGAP-IG version 2.0 p.8)
            $table->string('assessment_physical_health', 200)->nullable()->index();
            $table->string('management_physical_health', 200)->nullable()->index();

            //Conduct an MNS assessment (refer to mhGAP-IG version 2.0 p.9)
            $table->string('presenting_complaint', 200)->nullable()->index();
            $table->string('general_health_history', 200)->nullable()->index();
            $table->string('mns_history', 200)->nullable()->index();
            $table->string('fam_hist_mns_conditions', 200)->nullable()->index();

            //Manage MNS conditions (refer to mhGAP-IG version 2.0 p.11)
            $table->string('treatment_plan', 200)->nullable()->index();
            $table->string('psychosocial_interventions1', 200)->nullable()->index();
            $table->string('pharmacological_interventions1', 200)->nullable()->index();
            $table->string('referrals1', 200)->nullable()->index();
            $table->string('follow_up_plan1', 200)->nullable()->index();
            $table->string('carer_family', 200)->nullable()->index();
            //Special Conditions
            $table->char('child_and_adolescent', 1)->nullable()->comment('Y/N'); //Yes or No
            $table->char('older_adults', 1)->nullable()->comment('Y/N'); //Yes or No
            $table->char('preg_or_breastf_wom', 1)->nullable()->comment('Y/N'); //Yes or No

            //Assess for self-harm or suicide and substance use disorders
            $table->text('assess_self_suic')->nullable();

            //Timestamp
            $table->timestamp('ts_created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->timestamp('registered_at')->nullable();
        });

        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->foreign('pat_temp_id')->references('pat_temp_id')->on('tbl_master_patient')
                  ->onDelete('cascade') // Optional: Deletes the consultation record when the referenced master patient is deleted
                  ->onUpdate('cascade'); // Optional: Updates the foreign key when the referenced master patient's pat_temp_id is updated
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_mental_assessment_form');
    }
}

?>