<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->date('date_entered')->nullable()->after('assess_self_suic');
            $table->time('time_entered')->nullable()->after('date_entered');
            $table->date('date_updated')->nullable()->after('time_entered');
            $table->time('time_updated')->nullable()->after('date_updated');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn('date_entered');
            $table->dropColumn('time_entered');
            $table->dropColumn('date_updated');
            $table->dropColumn('time_updated');
        });
    }
};


?>