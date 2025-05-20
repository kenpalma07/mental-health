<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            // Drop foreign key first
            $table->dropForeign('tbl_mental_assessment_form_pat_temp_id_foreign');

            // Then drop unique index
            $table->dropUnique('tbl_mental_assessment_form_pat_temp_id_unique');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            // Re-add unique index
            $table->unique('pat_temp_id');

            // Re-add foreign key (assuming it references pat_temp.id)
            $table->foreign('pat_temp_id')->references('id')->on('pat_temp')->onDelete('cascade');
        });
    }
};
