<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tbl_pharma', function (Blueprint $table) {
            $table->string('pat_perm_id', 255)->nullable()->after('phar_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_pharma', function (Blueprint $table) {
            $table->dropColumn('pat_perm_id');
        });
    }
};
