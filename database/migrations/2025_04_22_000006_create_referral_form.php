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
        Schema::create('tbl_referral_form', function (Blueprint $table) {
            //id
            $table->id();
            $table->string('consultation_id', 50)->index();
            $table->string('pat_temp_id', 50)->nullable()->unique();
            $table->foreign('pat_temp_id')->references('pat_temp_id')->on('tbl_master_patient')
                  ->onDelete('cascade') // Optional: Deletes the consultation record when the referenced master patient is deleted
                  ->onUpdate('cascade'); // Optional: Updates the foreign key when the referenced master patient's pat_temp_id is updated

            //Name of Facility
            $table->string('referred_by', 200)->nullable()->index(); //Name of the employee
            

            //Timestamp
            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_referral_form');
    }
}

?>