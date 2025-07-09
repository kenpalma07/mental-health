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
            $table->renameColumn('guardian_fname', 'carer_fname');
            $table->renameColumn('guardian_mname', 'carer_mname');
            $table->renameColumn('guardian_lname', 'carer_lname');
            $table->renameColumn('guardian_address', 'carer_address');
            $table->renameColumn('guardian_relationship', 'carer_relationship');
            $table->renameColumn('guardian_contact', 'carer_contact');
            $table->string('carer_suffix', 10)->nullable()->after('carer_lname');
            $table->char('carer_sex', 1)->nullable()->after('carer_suffix');
            $table->date('carer_birthdate')->nullable()->after('carer_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_master_patient', function (Blueprint $table) {
            $table->renameColumn('carer_fname', 'guardian_fname');
            $table->renameColumn('carer_mname', 'guardian_mname');
            $table->renameColumn('carer_lname', 'guardian_lname');
            $table->renameColumn('carer_address', 'guardian_address');
            $table->renameColumn('carer_relationship', 'guardian_relationship');
            $table->renameColumn('carer_contact', 'guardian_contact');
            $table->dropColumn('carer_suffix');
            $table->dropColumn('carer_sex');
            $table->dropColumn('carer_birthdate');
        });
    }
};