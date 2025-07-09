<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->text('track_num')->nullable()->after('consultation_id');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->dropColumn('track_num');
        });
    }
};
