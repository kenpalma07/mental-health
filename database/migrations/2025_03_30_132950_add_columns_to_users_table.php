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
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('user_id')->nullable();
            $table->text('name')->nullable()->change()->default(null);
            $table->text('username')->nullable()->default(null);
            $table->text('first_name')->nullable();
            $table->text('middle_name')->nullable()->default(null);
            $table->text('last_name')->nullable();
            $table->text('name_suffix')->nullable()->default(null);
            $table->text('sex')->nullable();
            $table->text('civil_status')->nullable()->default(null);
            $table->text('birthdate')->nullable()->default(null);
            $table->text('mobile_number')->nullable()->default(null);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_lock')->default(false);
            $table->boolean('is_approve')->default(false);
            $table->datetime('approved_at')->nullable();
            $table->datetime('phone_verified_at')->nullable();
            $table->integer('login_identifier')->default(1);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('user_id');
            $table->dropColumn('username');
            $table->dropColumn('first_name');
            $table->dropColumn('middle_name');
            $table->dropColumn('last_name');
            $table->dropColumn('name_suffix');
            $table->dropColumn('sex');
            $table->dropColumn('civil_status');
            $table->dropColumn('birthdate');
            $table->dropColumn('mobile_number');
            $table->dropColumn('is_active');
            $table->dropColumn('is_lock');
            $table->dropColumn('is_approve');
            $table->dropColumn('approved_at');
            $table->dropColumn('phone_verified_at');
            $table->dropColumn('login_identifier');
        });
    }
};
