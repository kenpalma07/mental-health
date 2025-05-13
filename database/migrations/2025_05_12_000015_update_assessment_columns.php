<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->string('fam_hist_mns_cond_item', 100)->nullable()->after('carer_mobile');
            $table->string('fam_hist_mns_cond_label', 255)->nullable()->after('fam_hist_mns_cond_item');
            $table->string('gen_heal_hist_item', 100)->nullable()->after('fam_hist_mns_cond_label');
            $table->string('gen_heal_hist_label', 255)->nullable()->after('gen_heal_hist_item');
            $table->string('mns_hist_item', 100)->nullable()->after('gen_heal_hist_label');
            $table->string('mns_hist_label', 255)->nullable()->after('mns_hist_item');
            $table->string('pres_comp_item', 100)->nullable()->after('mns_hist_label');
            $table->string('pres_comp_label', 255)->nullable()->after('pres_comp_item');
            $table->string('psycho_inter', 100)->nullable()->after('pres_comp_label');
            $table->string('career_fam_choice', 255)->nullable()->after('psycho_inter');
        });

        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn([
                'fam_hist_mns_conditions',
                'general_health_history',
                'mns_history',
                'presenting_complaint',
                'psychosocial_interventions1',
                'carer_family',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('tbl_mental_assessment_form', function (Blueprint $table) {
            $table->dropColumn('fam_hist_mns_cond_item');
            $table->dropColumn('fam_hist_mns_cond_label');
            $table->dropColumn('gen_heal_hist_item');
            $table->dropColumn('gen_heal_hist_label');
            $table->dropColumn('mns_hist_item');
            $table->dropColumn('mns_hist_label');
            $table->dropColumn('pres_comp_item');
            $table->dropColumn('pres_comp_label');
            $table->dropColumn('psycho_inter');
            $table->dropColumn('career_fam_choice');
        });
    }
};


?>