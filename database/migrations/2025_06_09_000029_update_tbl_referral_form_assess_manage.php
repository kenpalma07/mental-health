<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->renameColumn('mental_physical_health_history', 'assess_phy_heal');
            $table->text('manage_phy_heal')->nullable()->after('assess_phy_heal');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->renameColumn('assess_phy_heal', 'mental_physical_health_history');
            $table->dropColumn('manage_phy_heal');
        });
    }
};
