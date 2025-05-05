<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_facility_setup', function (Blueprint $table) {
            $table->id();
            $table->string('fhudcode', 12)->index();
            $table->string('facility_name', 255);
            $table->string('facility_address', 100)->nullable()->index();
            $table->string('provider_name', 100)->nullable()->index();
            $table->char('facility_stat', 1)->nullable();
            $table->string('faccode', 20)->nullable()->index();
            $table->string('regcode', 100)->nullable()->index();
            $table->string('provcode', 100)->nullable()->index();
            $table->string('citycode', 100)->nullable()->index();
            $table->string('bgycode',100)->nullable()->index();
            $table->string('zipcode', 10)->nullable()->index();
            $table->string('facility_licno', 25)->nullable()->index();
            $table->string('accreno', 45)->nullable()->index();
            $table->timestamp('ts_created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->date('date_mod')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_hfacmas');
    }
}

?>