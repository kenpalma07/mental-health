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
        Schema::table('tbl_facility_setup', function (Blueprint $table) {
            $table->string('facility_contact')->nullable()->after('facility_email');
            $table->string('facility_fax')->nullable()->after('facility_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_facility_setup', function (Blueprint $table) {
            $table->dropColumn('facility_contact');
            $table->dropColumn('facility_fax');
        });
    }
};
