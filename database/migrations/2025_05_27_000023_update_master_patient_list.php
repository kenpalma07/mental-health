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
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->string('guardian_fname')->nullable()->after('pat_landline');
            $table->string('guardian_mname')->nullable()->after('guardian_fname');
            $table->string('guardian_lname')->nullable()->after('guardian_mname');
            $table->string('guardian_address')->nullable()->after('guardian_lname');
            $table->string('guardian_relationship')->nullable()->after('guardian_address');
            $table->string('guardian_contact')->nullable()->after('guardian_relationship');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_facility_setup', function (Blueprint $table) {
            $table->dropColumn('guardian_fname');
            $table->dropColumn('guardian_mname');
            $table->dropColumn('guardian_lname');
            $table->dropColumn('guardian_address');
            $table->dropColumn('guardian_relationship');
            $table->dropColumn('guardian_contact');
        });
    }
};

?>