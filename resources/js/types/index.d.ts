import { PageProps as InertiaPageProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export type PageProps<T = object> = InertiaPageProps<T> & SharedData;

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string;
    full_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    //[key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export interface Permission {
    id: number;
    name: string;
    module: string;
    guard_name: string;
}

export interface MasterPatient {
    id: number;
    master_patient_perm_id: string;
    pat_temp_id: string;
    fhudcode: string;
    facility_name: string;
    facility_location: string;
    provider_name: string;
    intake_date: string;
    prefix_code: string;
    pat_lname: string;
    pat_mname: string;
    pat_fname: string;
    sex_code: 'M' | 'F';
    suffix_code: string;
    civil_stat_code: string;
    pat_birthDate: string;
    educattainment: string;
    occupation_code: string;
    bloodtype_code: string;
    regcode: string;
    provcode: string;
    citycode: string;
    bgycode: string;
    zipcode: string;
    country_code: string;
    patient_address: string;
    pat_birthplace: string;
    religion_code: string;
    nationality: string;
    pat_email: string;
    pat_mobile: string;
    pat_landline: string;
    mot_fname: string;
    mot_mname: string;
    mot_lname: string;
    mot_birthdate: string;
    fat_fname: string;
    fat_mname: string;
    fat_lname: string;
    fat_birthdate: string;
    date_entered: string;
    time_entered: string;
    ts_created_at: string;
    date_updated: string;
    time_updated: string;
    ts_updated_at: string;
    registered_at: string;
    mot_address: string;
    mot_contact: string;
    mot_deceased_status: string;
    fat_address: string;
    fat_contact: string;
    fat_deceased_status: string;

    // Carer related fields
    carer_fname: string;
    carer_mname: string;
    carer_lname: string;
    carer_address: string;
    carer_contact: string;
    carer_relationship: string;
    carer_suffix: string;
    carer_birthdate: string;
    carer_sex: 'M' | 'F';

    // PhilHealth related fields
    phic_member: string;
    pat_philhealth: string;
    type_of_membership: string;
    philhealth_status_code: string;
    pDependentType_code: string;
    pMemberLname: string;
    pMemberFname: string;
    pMemberMname: string;
    pMemberSuffix: string;
    pMemberBdate: string;
    pMemberSex: string;
}

export interface FHUD {
    id: number;
    fhudcode: string;
    faccode: string;
    facility_name: string;
    provider_name: string;
    facility_address: string;
    regcode: string;
    provcode: string;
    citycode: string;
    bgycode: string;
    zipcode: string;
    facility_stat: 'A' | 'I';
    date_mod: string;
    accreno: string;
    facility_licno: string;
}

export interface Employee {
    position: string;
    name: string;
    id: number;
    emp_id: string;
    emp_fname: string;
    emp_mname: string;
    emp_lname: string;
    emp_suffix: string;
    emp_birthdate: string;
    emp_sex: string;
    emp_position: string;
    emp_hiredby: string;
    employment_status: string;
    emp_status: 'A' | 'I';
    emp_prcno: string;
    emp_ptrno: string;
    emp_s2licno: string;
    emp_phicno: string;
    emp_phicaccreditno: string;
    emp_tin: string;
    registered_at: string;
}

export interface Consultations {
    id: number;
    consult_perm_id: string;
    consult_date: string;
    consult_time: string;
    consult_type_code: string;
    to_consult_code: string;
    type_service: string;
    chief_complaint: string;
    pat_temperature: string;
    pat_heart_rate: string;
    pat_oxygen_sat: string;
    respiratoryRate: string;
    pat_height: string;
    pat_weight: string;
    pat_BMI: string;
    BMI_cat_code: string;
    pat_systolic_pres: string;
    pat_diastolic_pres: string;
    master_patient_perm_id: string;
    consult_temp_id: string;
    pat_age_yr: string;
    pat_age_mo: string;
    pat_age_dy: string;
    patient_address_temp_id: string;
}

export interface MentalAssessmentForm {
    id: number;
    consultation_id: string;
    consult_date_assess: string;
    pat_perm_id: string;
    pat_temp_id: string;
    carer_name_mot: string;
    carer_name_fat: string;
    carer_address: string;
    carer_mobile: string;
    selfharm_sui: string;
    grade_year: string;
    school_name: string;
    place_inci: string;
    self_sui_remarks: string;
    self_sui_means: string;

    fam_hist_mns_cond_item: string;
    fam_hist_mns_cond_label: string;
    gen_heal_hist_item: string;
    gen_heal_hist_label: string;
    mns_hist_item: string;
    mns_hist_label: string;
    pres_comp_item: string;
    pres_comp_label: string;

    psycho_inter: string;
    career_fam_choice: string;
    carer_relationship: string;
    assessment_physical_health: string;
    management_physical_health: string;
    child_and_adolescent: string;
    older_adults: string;
    preg_or_breastf_wom: string;
    assess_self_suic: string;

    date_entered: string;
    time_entered: string;
    date_updated: string;
    time_updated: string;
    ts_created_at: string;
    ts_updated_at: string;
    ts_deleted_at: string;
    registered_at: string;

    treat_avail: string;
    treat_choice: string;
    icd_10_code: string;
    icd_10_descrip: string;
    diagnosis: string;

    phar_date: string;
    phar_med: string;
    phar_intake: string;
    phar_intakeUnit: string;
    phar_freq: string;
    phar_freqUnit: string;
    phar_dur: string;
    phar_durUnit: string;
    phar_quantity: string;
    phar_doc: string;
    is_dispense: string;
    phar_remarks: string;

    ref_choice: string;
    ref_fhud: string;
    ref_reason: string;
    link_status: string;
    special_pop: string;
    date_nxt_visit: string;
    crisis_plan: string;
    other: string;
}

export interface MedicationRecord {
    phar_med: string;
    phar_date: string;
    phar_intake: string;
    phar_intakeUnit: string;
    phar_dur: string;
    phar_durUnit: string;
    phar_freq: string;
    phar_freqUnit: string;
    phar_quantity: string;
    given: string;
    personnel: string;
}

export interface TreatMedicationRecord {
    phar_med?: string;
    phar_intake?: string;
    phar_intakeUnit?: string;
    phar_dur?: string;
    phar_durUnit?: string;
    phar_freq?: string;
    phar_freqUnit?: string;
    phar_date?: string;
    appointment?: string;
    phar_quantity?: string;
}

export type PharmaType = {
    id: number;
    phar_id: number;
    phar_date: string;
    phar_med: string;
    phar_intake: string;
    phar_intakeUnit: string;
    phar_freq: string;
    phar_freqUnit: string;
    phar_dur: string;
    phar_durUnit: string;
    phar_quantity: string;
    phar_remarks?: string;
    phar_doc: string;
};

export type Referral = {
    id: number;
    patient_name: string;
    referred_to: string;
    referral_date: string;
    status: string;
};

export type ReportPatient = {
    id: number;
    date_entered: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    patient_address: string;
    pat_birthDate: string;
    sex_code: string;
    occupation_code: string;
    pat_mobile: string;
    others: string;
    suicideAssessments: MentalAssessmentForm[];
};

export type MHMasterConsultation = {
    consult_perm_id: string;
    consult_date: string;
    type_service: string;
    chief_complaint: string;
};

export type MHMasterPatient = {
    id: number;
    date_entered: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    patient_address: string;
    pat_birthDate: string;
    sex_code: string;
    occupation_code: string;
    pat_mobile: string;
    others: string;
    medications?: string;

    consultation?: MHMasterConsultation[];
    assessment?: {
        diagnosis: string;
        phar_med: string;
        phar_intakeUnit: string;
        phar_freqUnit: string;
        phar_doc: string;
        phar_remarks: string;
    };
};

export type MHTrackConsultation = {
    consult_perm_id: string;
    consult_date: string;
    phar_intakeUnit?: string;
};

export type MHTrackPatient = {
    id: number;
    date_entered: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    phil_health?: string;
    phil_member?: string;
    patient_address: string;
    pat_birthDate: string;
    sex_code: string;
    pat_philhealth: string;
    philhealth_status_code: string;
    phar_intakeUnit: string;
    consultation?: MHTrackConsultation[];
};

export type SchoolMentalAssessmentForm = {
    diagnosis: string;
    phar_med: string;
    phar_intakeUnit: string;
    phar_freqUnit: string;
    phar_doc: string;
    phar_remarks: string;
    consult_date_assess: string;
    grade_year: string;
    school_name: string;
    place_inci: string;
    self_sui_means: string;
    self_sui_remarks: string;
};

export type SchoolMasterPatient = {
    id: number;
    date_entered: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    patient_address: string;
    pat_birthDate: string;
    sex_code: string;
    occupation_code: string;
    pat_mobile: string;
    others: string;
    suicideAssessments: SchoolMentalAssessmentForm[];
};

export interface ReferralData {
    [key: string]: string | undefined;
    consultation_id?: string;
    date_ref: date;
    pat_temp_id: string;
    hpersonnel?: string;
    hposition: string;
    facility_name: string;
    facility_address: string;
    htel_arrangement: string;
    facility_telephone?: string;
    referral_facility_name?: string;
    referral_facility_address: string;
    pat_fullname: string;
    identity_number?: string;
    pat_age: string;
    pat_sex: string;
    pat_fullAdd: string;
    assess_phy_heal: string;
    manage_phy_heal: string;
    assessment_findings: string;
    any_treatment_prov?: string;
    reason_referral?: string;
    doc_accomp_referral: string;
    status_code: string;
}

export interface OutGoReferral {
    id: number;
    track_num: string;
    consultation_id: string;
    pat_fullname: string;
    facility_name: string;
    referral_facility_name: string;
    date_ref: string;
    status_code?: number;
    ref_reason: string;
}

export type IndexConsultation = {
    consult_date: string;
    consult_time: string;
    consult_perm_id: string;
    consult_type_code: string;
    type_service: string;
    to_consult_code: string;
    chief_complaint: string;
    pat_temperature: number;
    pat_heart_rate: number;
    pat_oxygen_sat: number;
    respiratoryRate: number;
    pat_height: number;
    pat_weight: number;
    pat_BMI: string;
    BMI_cat_code: string;
    pat_systolic_pres: number;
    pat_diastolic_pres: number;
    hasAssessment?: boolean;
    hasDispense?: boolean;
};

export interface Pharma {
    id: number;
    pat_perm_id: string;
    phar_med: string;
    phar_intake: string;
    phar_intakeUnit: string;
    phar_freq: string;
    phar_freqUnit: string;
    phar_dur: string;
    phar_durUnit: string;
    phar_quantity: string;
    phar_doc: string;
    phar_date: string;
}