<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('tbl_master_patient', function (Blueprint $table) {
            $table->id();                                                                                  
            $table->string('master_patient_perm_id', 50)->nullable()->index();                
            $table->string('pat_temp_id', 50)->nullable()->unique();      
            $table->string('pat_image', 250)->nullable();                            
            $table->string('prefix_code', 5);                                          
            $table->string('pat_lname', 200)->index();                               
            $table->string('pat_fname', 200)->index();                               
            $table->string('pat_mname', 200)->index();                               
            $table->string('suffix_code', 5);                                          
            $table->char('sex_code', 10)->index();                                   
            $table->date('pat_birthDate')->index();                                     
            $table->string('pat_birthplace', 200)->nullable();                     
            $table->char('civil_stat_code', 5)->nullable();                       
            $table->string('maiden_lastname', 100)->nullable();                  
            $table->string('maiden_middlename', 100)->nullable();                
            $table->string('educattainment', 2)->nullable();                   
            $table->string('occupation_code', 255)->nullable();                   
            $table->string('date_of_effectivity', 50)->nullable();               
            $table->string('occupation_sp', 250)->nullable();                    
            $table->string('phic_employer_no', 50)->nullable();                    
            $table->string('phic_employer_name', 250)->nullable();              
            $table->string('monthly_income', 100)->nullable();                
            $table->string('nationality', 5)->nullable();                         
            $table->string('tax_id_num', 20)->nullable();                            
            $table->string('religion_code', 5)->nullable();                           
            $table->char('IndigenousGroup', 1)->nullable();                        
            $table->integer('ethnic_code')->nullable();                          
            $table->string('bloodtype_code', 11)->nullable();                        
            $table->string('mot_fname', 50)->nullable();                          
            $table->string('mot_mname', 50)->nullable();                               
            $table->string('mot_lname', 50)->nullable();                               
            $table->date('mot_birthdate')->nullable();                                
            $table->string('fat_fname', 50)->nullable();                           
            $table->string('fat_mname', 50)->nullable();                               
            $table->string('fat_lname', 50)->nullable();                               
            $table->date('fat_birthdate')->nullable();                                
            $table->string('country_code', 5)->nullable();                         
            $table->string('pat_str', 100)->nullable();                             
            $table->string('regcode', 2)->index();                                       
            $table->string('provcode', 4)->index();                                     
            $table->string('citycode', 6)->index();                                     
            $table->string('bgycode')->index();                                         
            $table->integer('zipcode')->nullable();                                      
            $table->text('patient_address')->nullable();                                 
            $table->string('pat_email', 50)->nullable();                         
            $table->string('pat_mobile', 23)->nullable();                              
            $table->string('pat_landline', 15)->nullable();                           
            $table->string('family_member_code', 20)->nullable();                   
            $table->string('family_member_sp', 250)->nullable();              
            $table->string('fhNumber', 100)->nullable()->index();               
            $table->char('nhts', 1)->nullable();                                        
            $table->string('hhnumber', 100)->nullable();                                    
            $table->char('cct_nhts', 1)->nullable();                                    
            $table->string('fsNumber', 100)->index();                                   
            $table->char('phic_member', 1)->index();                                    
            $table->string('pat_philhealth', 50)->index()->nullable();              
            $table->string('pat_philhealth_dep', 50)->nullable();                 
            $table->char('philhealth_status_code', 1)->nullable()->index();   
            $table->char('pDependentType_code', 1)->nullable();           
            $table->string('pMemberLname', 255)->nullable();                 
            $table->string('pMemberFname', 255)->nullable();                        
            $table->string('pMemberMname', 255)->nullable();                        
            $table->date('pMemberBdate')->nullable();                               
            $table->string('pMemberSuffix', 5)->nullable();                         
            $table->char('pMemberSex', 1)->nullable();                             
            $table->string('type_of_membership', 50)->nullable();                     
            $table->string('phil_sub_code', 50)->nullable();                          
            $table->char('PCB_nhts', 1);                                           
            $table->date('enlist_date')->nullable();                                    
            $table->string('Patient_Type', 100)->nullable();
            $table->date('date_entered');
            $table->time('time_entered');
            $table->date('date_updated')->nullable();
            $table->time('time_updated')->nullable();
            $table->timestamp('ts_created_at');
            $table->timestamp('ts_updated_at')->nullable();
            $table->timestamp('ts_deleted_at')->nullable();
            $table->char('uploaded', 1);
            $table->date('date_uploaded')->nullable();
            $table->date('PHIEsubmitted_date')->nullable();
            $table->string('validated', 1)->nullable();
            $table->char('phic_stat', 1)->nullable();
            $table->char('PHIESYNC', 1)->nullable();
            $table->integer('userid')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_master_patient');
    }
};

?>