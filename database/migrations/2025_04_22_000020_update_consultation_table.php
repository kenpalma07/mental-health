<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            // Update data types to DECIMAL(5,2)
            $table->decimal('pat_height', 5, 2)->nullable()->change();
            $table->decimal('pat_weight', 5, 2)->nullable()->change();
            $table->decimal('pat_BMI', 5, 2)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            // Revert back to VARCHAR(10)
            $table->string('pat_height', 10)->nullable()->change();
            $table->string('pat_weight', 10)->nullable()->change();
            $table->string('pat_BMI', 10)->nullable()->change();
        });
    }
};
