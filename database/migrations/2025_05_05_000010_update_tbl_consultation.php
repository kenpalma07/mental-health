<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tbl_consultation', function (Blueprint $table)
        {
            $table->dropUnique('tbl_consultation_consult_temp_id_unique');
        });

        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->string('consult_temp_id', 5, 2)->nullable()->change();
            $table->string('consult_type_code', 100)->nullable()->change();
            $table->string('patient_address_temp_id', 255)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->string('consult_temp_id', 5)->nullable(false)->change();

            $table->unique('consult_temp_id');

            $table->string('consult_type_code', 100)->nullable(false)->change();
            $table->string('patient_address_temp_id', 255)->nullable(false)->change();
        });
    }

}

?>