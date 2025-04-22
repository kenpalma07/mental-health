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
        Schema::create('tbl_treatment_plan', function (Blueprint $table) {
            //id
            $table->id();
            $table->string('consultation_id', 50)->index();
            $table->string('pat_temp_id', 50)->nullable()->unique();
            $table->foreign('pat_temp_id')->references('pat_temp_id')->on('tbl_master_patient')
                  ->onDelete('cascade') // Optional: Deletes the consultation record when the referenced master patient is deleted
                  ->onUpdate('cascade'); // Optional: Updates the foreign key when the referenced master patient's pat_temp_id is updated

            //Presenting problem
            $table->text('brief_summary')->nullable(); //Brief summary of the reason the person is seeking help

            //Written treatment plan
            $table->text('pharmacological_interventions2')->nullable();
            $table->text('psychosocial_interventions2')->nullable();
            $table->text('referrals2')->nullable();
            $table->text('moa_conc_phy_mns_conditions')->nullable(); //Management of any concurrent physical and/or other MNS conditions
            $table->text('crisis_plan')->nullable();
            $table->text('follow_up_plan2')->nullable();
            $table->string('tp_other', 200)->nullable();

            //Timestamp
            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_treatment_plan');
    }
}

?>