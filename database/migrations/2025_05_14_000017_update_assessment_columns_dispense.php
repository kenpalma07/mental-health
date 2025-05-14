<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->string('is_dispense', 10)->nullable()->after('phar_doc');
            $table->string('carer_name_mot', 100)->nullable()->after('pat_temp_id');
            $table->string('carer_name_fat', 100)->nullable()->after('carer_name_mot');
            $table->date('consult_date_assess')->nullable()->after('consultation_id');
            $table->string('pat_perm_id', 255)->nullable()->after('consult_date_assess');
        });

        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn([
                'carer_name'
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn('is_dispense');
            $table->dropColumn('carer_name_mot');
            $table->dropColumn('carer_name_fat');
            $table->dropColumn('consult_date_assess');
            $table->dropColumn('pat_perm_id');
        });
    }
};


?>