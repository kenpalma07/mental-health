<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            
            $table->dropForeign('tbl_referral_form_pat_temp_id_foreign');

            $table->dropUnique('tbl_referral_form_pat_temp_id_unique');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->string('pat_temp_id', 50)->nullable()->unique()->change();
        });

        Schema::table('tbl_referral_form', function (Blueprint $table) {
            $table->foreign('pat_temp_id')->references('pat_temp_id')->on('tbl_master_patient')
                  ->onDelete('cascade') // Optional: Deletes the consultation record when the referenced master patient is deleted
                  ->onUpdate('cascade'); // Optional: Updates the foreign key when the referenced master patient's pat_temp_id is updated
        });
    }
};
