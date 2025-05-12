<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->integer('respiratoryRate')->nullable()->after('pat_oxygen_sat');
        });
    }

    public function down(): void
    {
        Schema::table('tbl_consultation', function (Blueprint $table) {
            $table->dropColumn('respiratoryRate');
        });
    }
};


?>