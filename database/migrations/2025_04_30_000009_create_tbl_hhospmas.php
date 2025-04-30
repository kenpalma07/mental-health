<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_hhospmas', function (Blueprint $table) {
            $table->string('hfhudcode', 19)->collation('latin1_swedish_ci');
            $table->dateTime('hhosdte');
            $table->string('accno', 20)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('accdte')->nullable();
            $table->string('hhosname', 100)->collation('latin1_swedish_ci');
            $table->string('hhosabbr', 10)->nullable()->collation('latin1_swedish_ci');
            $table->string('htypcode', 1)->collation('latin1_swedish_ci');
            $table->integer('bedcap');
            $table->string('hhosstr', 100)->collation('latin1_swedish_ci');
            $table->string('ctycode', 6)->nullable()->collation('latin1_swedish_ci');
            $table->string('provcode', 4)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhoszip', 10)->nullable()->collation('latin1_swedish_ci');
            $table->string('cntrycode', 5)->collation('latin1_swedish_ci');
            $table->string('hhosstat', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhoslock', 1)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('datemod')->nullable();
            $table->string('updsw', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('bgycode', 9)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhoscatg', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhosmem', 13)->nullable()->collation('latin1_swedish_ci');
            $table->string('newfhudcode', 19)->nullable()->collation('latin1_swedish_ci');
            $table->string('neiss_userid', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('neiss_password', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('edpmpass', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('edpmcoycode', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('ws_id', 20)->nullable()->collation('latin1_swedish_ci');
            $table->string('ws_pw', 20)->nullable()->collation('latin1_swedish_ci');
            $table->string('ws_hospcode', 12)->nullable()->collation('latin1_swedish_ci');
            $table->string('epdmuser', 9)->nullable()->collation('latin1_swedish_ci');
            $table->string('edpmcomp', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('telno', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('emailadd', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('headeraddr', 100)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhosemailadd', 255)->nullable()->collation('latin1_swedish_ci');
            $table->string('eclaims_webpass', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('howner', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('hspecialcode', 20)->nullable()->collation('latin1_swedish_ci');
            $table->char('htraucap', 1)->nullable()->collation('latin1_swedish_ci');
            $table->char('htraurec', 1)->nullable()->collation('latin1_swedish_ci');
            $table->string('hservcap', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('phic_accretype', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('iso_accreno', 25)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('iso_validfr')->nullable();
            $table->dateTime('iso_validto')->nullable();
            $table->string('inter_accreno', 25)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('inter_validfr')->nullable();
            $table->dateTime('inter_validto')->nullable();
            $table->string('pcaho_accreno', 25)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('pcaho_validfr')->nullable();
            $table->dateTime('pcaho_validto')->nullable();
            $table->string('faxno', 20)->nullable()->collation('latin1_swedish_ci');
            $table->string('ohrsrs_username', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('ohrsrs_password', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('ohsrs_username', 10)->nullable()->collation('latin1_swedish_ci');
            $table->string('ohsrs_password', 25)->nullable()->collation('latin1_swedish_ci');
            $table->string('trauma', 25)->nullable()->collation('latin1_swedish_ci');
            $table->dateTime('accdteto')->nullable();
            $table->string('nehehrsv_username', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('nehehrsv_password', 50)->nullable()->collation('latin1_swedish_ci');
            $table->string('specialtyspecify', 255)->nullable()->collation('latin1_swedish_ci');
            $table->string('ownershipspecify', 255)->nullable()->collation('latin1_swedish_ci');
            $table->string('udrs_username', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('udrs_password', 15)->nullable()->collation('latin1_swedish_ci');
            $table->string('fhudcode_bucas', 19)->nullable()->collation('latin1_swedish_ci');
            $table->string('hhosname_bucas', 100)->nullable()->collation('latin1_swedish_ci');
            $table->string('bucas_hasmain', 1)->default('N')->nullable()->collation('latin1_swedish_ci');

            $table->primary(['hfhudcode', 'hhosdte'], 'pk_hhospmas_idx');
            $table->unique(['hfhudcode', 'hhosdte'], 'pk_hhospmas_idx');
            $table->index(['bgycode', 'ctycode', 'provcode'], 'bgycode_ctycode_provcode_idx');
            $table->index('hhosdte', 'hhosdte_idx');
            $table->index('bgycode', 'hhospmas_bgycode_');
            $table->index('ctycode', 'hhospmas_ctycode_idx');
            $table->index('hfhudcode', 'hhospmas_hfhudcode_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_hhospmas');
    }
}

?>