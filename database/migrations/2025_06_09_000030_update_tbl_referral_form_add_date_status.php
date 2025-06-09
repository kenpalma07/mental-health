<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->date('date_ref')->nullable()->after('consultation_id');
            $table->char('status_code', 1)->nullable()->comment('0/1');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->dropColumn('date_ref');
            $table->dropColumn('status_code');
        });
    }
};
