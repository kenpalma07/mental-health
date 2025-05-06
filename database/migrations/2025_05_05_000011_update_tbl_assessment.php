<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->string('treat_avail', 100)->nullable()->after('treatment_plan');
            $table->string('treat_choice', 100)->nullable()->after('treat_avail');
            $table->string('icd_10_code', 100)->nullable()->after('pharmacological_interventions1');
            $table->string('icd_10_descrip', 255)->nullable()->after('icd_10_code');
            $table->string('diagnosis', 255)->nullable()->after('icd_10_descrip');
            $table->date('phar_date')->nullable()->after('diagnosis');
            $table->string('phar_med', 100)->nullable()->after('phar_date');
            $table->decimal('phar_intake', 5, 2)->nullable()->after('phar_med');
            $table->string('phar_intakeUnit', 100)->nullable()->after('phar_intake');
            $table->decimal('phar_freq', 5, 2)->nullable()->after('phar_intakeUnit');
            $table->string('phar_freqUnit', 255)->nullable()->after('phar_freq');
            $table->decimal('phar_dur', 5, 2)->nullable()->after('phar_freqUnit');
            $table->string('phar_durUnit', 255)->nullable()->after('phar_dur');
            $table->decimal('phar_quantity', 5, 2)->nullable()->after('phar_durUnit');
            $table->string('phar_doc', 255)->nullable()->after('phar_quantity');
            $table->string('phar_remarks', 255)->nullable()->after('phar_doc');
            $table->string('ref_choice', 100)->nullable()->after('referrals1');
            $table->string('ref_fhud', 255)->nullable()->after('ref_choice');
            $table->string('ref_reason', 255)->nullable()->after('ref_fhud');
            $table->string('link_status', 255)->nullable()->after('ref_reason');
            $table->string('special_pop', 255)->nullable()->after('link_status');
            $table->date('date_nxt_visit')->nullable()->after('follow_up_plan1');
        });

        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn([
                'treatment_plan',
                'pharmacological_interventions1',
                'referrals1',
                'follow_up_plan1',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->string('treatment_plan', 200)->nullable();
            $table->string('pharmacological_interventions1', 200)->nullable();
            $table->string('referrals1', 200)->nullable();
            $table->string('follow_up_plan1', 200)->nullable();

            $table->dropColumn([
                'treat_avail',
                'treat_choice',
                'icd_10_code',
                'icd_10_descrip',
                'diagnosis',
                'phar_date',
                'phar_med',
                'phar_intake',
                'phar_intakeUnit',
                'phar_freq',
                'phar_freqUnit',
                'phar_dur',
                'phar_durUnit',
                'phar_quantity',
                'phar_doc',
                'phar_remarks',
                'ref_choice',
                'ref_fhud',
                'ref_reason',
                'link_status',
                'special_pop',
                'date_nxt_visit',
            ]);
        });
    }
};
