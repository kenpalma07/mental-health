<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->renameColumn('service_user_name', 'pat_fullname');
            $table->renameColumn('service_user_age', 'pat_age');
            $table->renameColumn('service_user_sex', 'pat_sex');
            $table->renameColumn('service_user_address', 'pat_fullAdd');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->renameColumn('pat_fullname', 'service_user_name');
            $table->renameColumn('pat_age', 'service_user_age');
            $table->renameColumn('pat_sex', 'service_user_sex');
            $table->renameColumn('pat_fullAdd', 'service_user_address');
        });
    }
};
