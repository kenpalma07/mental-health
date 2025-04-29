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
    public function up()
    {
        Schema::create('tbl_referral_form', function (Blueprint $table) {
            //id
            $table->id();
            $table->string('consultation_id', 50)->index();
            $table->string('pat_temp_id', 50)->nullable()->unique();
            $table->foreign('pat_temp_id')->references('pat_temp_id')->on('tbl_master_patient')
                  ->onDelete('cascade') // Optional: Deletes the consultation record when the referenced master patient is deleted
                  ->onUpdate('cascade'); // Optional: Updates the foreign key when the referenced master patient's pat_temp_id is updated

            //Name of Facility
            $table->string('hpersonnel', 200)->nullable()->index(); //Name of the employee
            $table->string('hposition', 200)->nullable()->index(); //Position of the employee
            $table->string('facility_name', 200)->nullable()->index(); //Name of the facility
            $table->string('facility_address', 250)->nullable()->index(); //Address of the facility
            $table->char('htel_arrangement', 1)->nullable()->comment('Y/N'); //Yes or No
            $table->string('facility_telephone', 20)->nullable()->index(); //Telephone number of the facility

            //Name of Facility Referred to
            $table->string('referral_facility_name', 200)->nullable()->index(); //Name of the facility referred to
            $table->string('referral_facility_address', 250)->nullable()->index(); //Address of the facility referred to
            $table->string('service_user_name', 200)->nullable()->index(); //Name of the service user
            $table->string('identity_number', 20)->nullable()->index(); //Identity number of the service user
            $table->char('service_user_age', 3)->nullable()->index(); //Age of the service user
            $table->char('service_user_sex', 2)->nullable()->comment('M/F'); //Sex of the service user
            $table->string('service_user_address', 200)->nullable();
            $table->text('mental_physical_health_history')->nullable();
            $table->string('assessment_findings', 200)->nullable();
            $table->string('any_treatment_prov', 200)->nullable();
            $table->string('reason_referral', 200)->nullable();
            $table->string('doc_accomp_referral', 200)->nullable();

            //Timestamp
            $table->timestamp('ts_created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->timestamp('registered_at')->nullable();
        });

        //Update table master patient
        Schema::table('tbl_master_patient', function (Blueprint $table){
            $table->date('intake_date')->nullable()->change();
            $table->string('pat_landline', 15)->nullable()->change();
            $table->string('mot_fname', 50)->nullable()->change();
            $table->string('mot_mname', 50)->nullable()->change();
            $table->string('mot_lname', 50)->nullable()->change();
            $table->date('mot_birthdate')->nullable()->change();
            $table->string('fat_fname', 50)->nullable()->change();
            $table->string('fat_mname', 50)->nullable()->change();
            $table->string('fat_lname', 50)->nullable()->change();
            $table->date('fat_birthdate')->nullable()->change();
            $table->string('mot_address')->nullable()->after('mot_birthdate');
            $table->string('mot_contact')->nullable()->after('mot_address');
            $table->char('mot_deceased_status', 1)->nullable()->comment('Y/N')->after('mot_contact');
            $table->string('fat_address', 250)->nullable()->after('fat_birthdate');
            $table->string('fat_contact', 20)->nullable()->after('fat_address');
            $table->string('fat_deceased_status', 1)->nullable()->comment('Y/N')->after('fat_contact');
            $table->string('pat_house_no')->nullable()->after('patient_address');
            $table->string('pat_street', 100)->nullable()->after('pat_house_no');
            $table->timestamp('registered_at')->nullable()->after('ts_deleted_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_referral_form');

        Schema::table('tbl_master_patient', function (Blueprint $table) {
            // Revert nullable changes
            $table->date('intake_date')->nullable(false)->change();
            $table->string('pat_landline', 15)->nullable(false)->change();
            $table->string('mot_fname', 50)->nullable(false)->change();
            $table->string('mot_mname', 50)->nullable(false)->change();
            $table->string('mot_lname', 50)->nullable(false)->change();
            $table->date('mot_birthdate')->nullable(false)->change();
            $table->string('fat_fname', 50)->nullable(false)->change();
            $table->string('fat_mname', 50)->nullable(false)->change();
            $table->string('fat_lname', 50)->nullable(false)->change();
            $table->date('fat_birthdate')->nullable(false)->change();
    
            // Drop added columns individually for safety
            $table->dropColumn('mot_address');
            $table->dropColumn('mot_contact');
            $table->dropColumn('mot_deceased_status');
            $table->dropColumn('fat_address');
            $table->dropColumn('fat_contact');
            $table->dropColumn('fat_deceased_status');
            $table->dropColumn('pat_house_no');
            $table->dropColumn('pat_street');
            $table->dropColumn('registered_at');
        });
    }
}

?>