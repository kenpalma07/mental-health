<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->string('ethnic_code', 5)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->integer('ethnic_code')->nullable()->change();
        });
    }
};