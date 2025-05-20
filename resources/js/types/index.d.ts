import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps as InertiaPageProps } from '@inertiajs/react';

export interface Auth {
    user: User;
}

export type PageProps<T = {}> = InertiaPageProps<T> & SharedData;

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
    fhudcode: string;
    facility_name: string;
    facility_location: string;
    provider_name: string;
    prefix_code: string;
    pat_fname: string;
    pat_mname: string;
    pat_lname: string;
    sex_code: 'M' | 'F';
    pat_birthDate: string;
    pat_mobile: string;
    patient_address: string;
}

export interface FHUD {
    id: number;
    fhudcode: string;
    faccode: string;
    facility_name: string;
    provider_name: string;
    facility_address: string,
    regcode: string;
    provcode: string;
    citycode: string;
    bgycode: string;
    zipcode: string;
    facility_stat: 'A' | 'I';
    date_mod: string;
    accreno: string;
    facility_licno: string;
    // …any other fields you need
}

export interface Employee {
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
