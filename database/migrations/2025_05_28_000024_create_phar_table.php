<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{

    public function up()
    {
        Schema::create('tbl_pharma', function (Blueprint $table) {
            $table->id();
            $table->string('patient_assess_phar_id', 50)->nullable();
            $table->date('date_entered')->nullable();
            $table->time('time_entered')->nullable();
            $table->string('phar_med', 100)->nullable();
            $table->decimal('phar_intake', 5, 2)->nullable();
            $table->string('phar_intakeUnit', 100)->nullable();
            $table->decimal('phar_freq', 5, 2)->nullable();
            $table->string('phar_freqUnit', 255)->nullable();
            $table->decimal('phar_dur', 5, 2)->nullable();
            $table->string('phar_durUnit', 255)->nullable();
            $table->decimal('phar_quantity', 5, 2)->nullable();
            $table->string('phar_doc', 255)->nullable();
            $table->string('phar_remarks', 255)->nullable();

            // Timestamp columns
            $table->timestamp('ts_created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->timestamp('registered_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_pharma');
    }
};
