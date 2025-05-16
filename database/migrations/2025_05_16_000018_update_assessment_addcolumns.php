<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->string('selfharm_sui', 100)->nullable()->after('carer_mobile');
            $table->string('grade_year', 100)->nullable()->after('selfharm_sui');
            $table->string('school_name', 100)->nullable()->after('grade_year');
            $table->string('place_inci', 100)->nullable()->after('school_name');
            $table->string('self_sui_remarks', 100)->nullable()->after('place_inci');
            $table->string('self_adult_sui_means', 100)->nullable()->after('self_sui_remarks');

        });

    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn('selfharm_sui');
            $table->dropColumn('grade_year');
            $table->dropColumn('school_name');
            $table->dropColumn('place_inci');
            $table->dropColumn('self_sui_remarks');
            $table->dropColumn('self_adult_sui_means');
        });
    }
};


?>