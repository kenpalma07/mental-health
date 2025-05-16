<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_employee', function (Blueprint $table) {
            $table->id();
            $table->string('emp_id', 50)->nullable()->index();
            $table->string('emp_fname', 200)->nullable();
            $table->string('emp_mname', 200)->nullable();
            $table->string('emp_lname', 200)->nullable();
            $table->string('emp_suffix', 5)->nullable();
            $table->string('emp_position', 5)->nullable();
            $table->string('emp_sex', 10)->nullable();
            $table->date('emp_birthdate')->nullable();
            $table->string('emp_hiredby', 50)->nullable();
            $table->string('employment_status', 50)->nullable();
            $table->string('emp_status', 2)->nullable();
            $table->string('emp_prcno', 100)->nullable();
            $table->string('emp_ptrno', 100)->nullable();
            $table->string('emp_s2licno', 100)->nullable();
            $table->string('emp_phicno', 100)->nullable();
            $table->string('emp_phicaccreditno', 100)->nullable();
            $table->string('emp_tin', 100)->nullable();

            // Registration
            $table->timestamp('ts_created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->timestamp('registered_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_employee');
    }
}

?>