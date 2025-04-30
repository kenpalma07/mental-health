import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Select } from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';
import rawLocationData from '../json/philippine_reg_prov_cit_brgy.json';

// 🛠️ DEFINE the type first
type LocationData = {
  [regionCode: string]: {
    region_name: string;
    province_list: {
      [provinceName: string]: {
        municipality_list: Array<{
          [municipalityName: string]: {
            barangay_list: string[];
          };
        }>;
      };
    };
  };
};

const locationData = rawLocationData as unknown as LocationData;

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Patients', href: '/patients' },
  { title: 'Edit Patient', href: '#' },
];

interface PatientProps {
  patient: {
    master_patient_perm_id: string;
    facility_name?: string;
    facility_location?: string;
    provider_name?: string;
    registered_at?: string;
    prefix_code?: string;
    pat_lname?: string;
    pat_fname?: string;
    pat_mname?: string;
    suffix_code?: string;
    sex_code?: string;
    civil_stat_code?: string;
    pat_birthDate?: string;
    regcode?: string;
    provcode?: string;
    citycode?: string;
    bgycode?: string;
    zipcode?: string;
    country_code?: string;
    pat_birthplace?: string;
    religion_code?: string;
    nationality?: string;
    educattainment?: string;
    occupation_code?: string;
    pat_mobile?: string;
    pat_landline?: string;
    is_deceased?: boolean;
    death_date?: string;
    death_reason?: string;
    pat_street?: string;
    pat_houseno?: string;
    patient_address?: string;
    mot_fname?: string;
    mot_mname?: string;
    mot_lname?: string;
    mot_birthdate?: string;
    mot_contact?: string;
    mot_deceased_status?: string;
    mot_address?: string;
    fat_fname?: string;
    fat_mname?: string;
    fat_lname?: string;
    fat_birthdate?: string;
    fat_contact?: string;
    fat_deceased_status?: string;
    fat_address?: string;
    id: string;
  };
}

const EditPatient: React.FC<PatientProps> = ({ patient }) => {
  const { data, setData, put, processing, errors } = useForm({
    master_patient_perm_id: patient.master_patient_perm_id || '',
    facility_name: patient.facility_name || '',
    facility_location: patient.facility_location || '',
    provider_name: patient.provider_name || '',
    //intake_date: patient.intake_date || '',
    registered_at: formatTimestampForInput(patient.registered_at ?? '') || '',

    prefix_code: patient.prefix_code || '',
    pat_lname: patient.pat_lname || '',
    pat_fname: patient.pat_fname || '',
    pat_mname: patient.pat_mname || '',
    suffix_code: patient.suffix_code || '',
    sex_code: patient.sex_code || '',
    civil_stat_code: patient.civil_stat_code || '',
    pat_birthDate: patient.pat_birthDate || '',

    regcode: patient.regcode || '',
    provcode: patient.provcode || '',
    citycode: patient.citycode || '',
    bgycode: patient.bgycode || '',
    zipcode: patient.zipcode || '',
    country_code: patient.country_code || '',
    pat_birthplace: patient.pat_birthplace || '',
    religion_code: patient.religion_code || '',
    nationality: patient.nationality || '',
    educattainment: patient.educattainment || '',
    occupation_code: patient.occupation_code || '',
    pat_mobile: patient.pat_mobile || '',
    pat_landline: patient.pat_landline || '',
    is_deceased: patient.is_deceased || false,
    death_date: patient.death_date || '',
    death_reason: patient.death_reason || '',

    pat_street: patient.pat_street || '',
    pat_houseno: patient.pat_houseno || '',
    patient_address: patient.patient_address || '',

    mot_fname: patient.mot_fname || '',
    mot_mname: patient.mot_mname || '',
    mot_lname: patient.mot_lname || '',
    mot_birthdate: patient.mot_birthdate || '',
    mot_contact: patient.mot_contact || '',
    mot_deceased_status: patient.mot_deceased_status || '',
    mot_address: patient.mot_address || '',

    fat_fname: patient.fat_fname || '',
    fat_mname: patient.fat_mname || '',
    fat_lname: patient.fat_lname || '',
    fat_birthdate: patient.fat_birthdate || '',
    fat_contact: patient.fat_contact || '',
    fat_deceased_status: patient.fat_deceased_status || '',
    fat_address: patient.fat_address || '',
  });

  
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [age, setAge] = useState({ years: '', months: '', days: '' });

  useEffect(() => {
    if (data.regcode) {
      setSelectedRegion(data.regcode);
    }
    if (data.provcode) {
      setSelectedProvince(data.provcode);
    }
    if (data.citycode) {
      setSelectedCity(data.citycode);
    }
  }, [data.regcode, data.provcode, data.citycode]);

  function getAgeBreakdown(birthDate: string) {
    if (!birthDate) return { years: '', months: '', days: '' };
  
    const birth = new Date(birthDate);
    const today = new Date();
  
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
  
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return {
      years: years.toString(),
      months: months.toString(),
      days: days.toString(),
    };
  }  

  useEffect(() => {
    if (data.pat_birthDate) {
      setAge(getAgeBreakdown(data.pat_birthDate));
    } else {
      setAge({ years: '', months: '', days: '' });
    }
  }, [data.pat_birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/patients/${patient.id}`);
  };

  function formatTimestampForInput(timestamp: string): string {
    if(!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const regionLookup: Record<string, string> = {
    'NCR': 'NATIONAL CAPITAL REGION',
    'CAR': 'CORDILLERA ADMINISTRATIVE REGION',
    'ARMM': 'AUTONOMOUS REGION IN MUSLIM MINDANAO',
    'BARMM': 'BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO',
    'NIR': 'Negros Island Region',
    '13': 'CARAGA',
    '12': 'SOCCSKSARGEN',
    '11': 'DAVAO REGION',
    '10': 'NORTHERN MINDANAO',
    '09': 'ZAMBOANGA PENINSULA',
    '08': 'EASTERN VISAYAS',
    '07': 'CENTRAL VISAYAS',
    '06': 'WESTERN VISAYAS',
    '05': 'BICOL REGION',
    '4B': 'MIMAROPA REGION',
    '4A': 'CALABARZON',
    '03': 'CENTRAL LUZON',
    '02': 'CAGAYAN VALLEY',
    '01': 'ILOCOS REGION',
  };

  interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    id?: string; // Add this if missing
    children?: React.ReactNode;
  }
  
  const Select: React.FC<SelectProps> = ({ id, value, onChange, className, children }) => {
    return (
      <select id={id} value={value} onChange={onChange} className={className}>
        {children}
      </select>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <form onSubmit={handleSubmit} className="w-full px-10 py-8 space-y-8">
        {/* Facility Info */}
        <h2 className="text-lg font-semibold">EDIT PATIENT REGISTRATION FORM</h2>
        <hr></hr>
        <h3 className="text-lg font-semibold">Facility Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label>
              Facility Name <span className="text-red-600 font-bold">*</span> 
            </Label>
            <Input value={data.facility_name} onChange={e => setData('facility_name', e.target.value)} />
            <InputError message={errors.facility_name} />
          </div>
          <div>
            <Label>
              Facility Location <span className="text-red-600 font-bold">*</span> 
            </Label>
            <Input value={data.facility_location} onChange={e => setData('facility_location', e.target.value)} />
            <InputError message={errors.facility_location} />
          </div>
          <div>
            <Label>
              Provider Name <span className="text-red-600 font-bold">*</span> 
            </Label>
            <Input value={data.provider_name} onChange={e => setData('provider_name', e.target.value)} />
            <InputError message={errors.provider_name} />
          </div>
          <div>
            <Label htmlFor="registered_at">
              Date of Registration <span className="text-red-600 font-bold">*</span> 
            </Label>
            <Input
              id="registered_at"
              type="datetime-local"
              value={data.registered_at}
              onChange={(e) => setData('registered_at', e.target.value)}
            />
            <InputError message={errors.registered_at} />
          </div>
        </div>

        {/* -------------------------- Start of Patient Information -------------------------- */}
        <hr></hr>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold"> Patient Information </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* -------------------------- Start of Master Patient Perm ID -------------------------- */}
            <div>
              <Label>
                Patient ID <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input 
                value={patient.master_patient_perm_id}
                className="w-full border rounded p-2 bg-gray-100 text-dark-500"
                readOnly />
              <InputError message={errors.master_patient_perm_id} />
            </div>
            {/* -------------------------- End of Master Patient Perm ID -------------------------- */}
            
            {/* -------------------------- Start of Prefix -------------------------- */}
            <div>
              <Label>
                Prefix <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="prefix_code"
                value={data.prefix_code ?? ''}
                onChange={(e) => setData('prefix_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Prefix</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </Select>
              <InputError message={errors.prefix_code} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label>
                Last Name <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input value={data.pat_lname} onChange={e => setData('pat_lname', e.target.value)} />
              <InputError message={errors.pat_lname} />
            </div>
            <div>
              <Label>
                First Name <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input value={data.pat_fname} onChange={e => setData('pat_fname', e.target.value)} />
              <InputError message={errors.pat_fname} />
            </div>
            <div>
              <Label>
                Middle Name <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input value={data.pat_mname} onChange={e => setData('pat_mname', e.target.value)} />
              <InputError message={errors.pat_mname} />
            </div>
          </div>

          {/* ----------------- Start of Next Row ----------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ----------------- Start of Patient Suffix ----------------- */}
            <div>
              <Label>
                Suffix <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="suffix_code"
                value={data.suffix_code ?? ''}
                onChange={(e) => setData('suffix_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Suffix</option>
                <option value="NA">N/A</option>
                <option value="Jr">Jr</option>
                <option value="Sr">Sr</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </Select>
              <InputError message={errors.suffix_code} />
            </div>
            {/* ----------------- End of Patient Suffix ----------------- */}

            {/* ----------------- Start of Patient Birthdate ----------------- */}
            <div>
              <Label>
                Birthdate <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input
                type="date"
                value={data.pat_birthDate}
                onChange={e => setData('pat_birthDate', e.target.value)}
              />
              <InputError message={errors.pat_birthDate} />
            </div>
            {/* ----------------- End of Patient Birthdate ----------------- */}

            {/* ----------------- Start of Patient Age ----------------- */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Year:</Label>
                <Input
                  type="text"
                  className="w-full border rounded p-2 bg-gray-100 text-dark-500 text-center font-bold"
                  value={age.years}
                  readOnly
                />
              </div>
              <div>
                <Label>Month:</Label>
                <Input
                  type="text"
                  className="w-full border rounded p-2 bg-gray-100 text-dark-500 text-center font-bold"
                  value={age.months}
                  readOnly
                />
              </div>
              <div>
                <Label>Day:</Label>
                <Input
                  type="text"
                  className="w-full border rounded p-2 bg-gray-100 text-dark-500 text-center font-bold"
                  value={age.days}
                  readOnly
                />
              </div>
            </div>
            {/* ----------------- End of Patient Age ----------------- */}

            {/* ----------------- Star of Patient Sex ----------------- */}
            <div>
              <Label htmlFor="sex">
                Sex <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="sex_code"
                value={data.sex_code ?? ''}
                onChange={(e) => setData('sex_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Sex</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
              <InputError message={errors.suffix_code} />
            </div>
            {/* ----------------- End of Patient Sex ----------------- */}
          </div>
          {/* ----------------- End of Next Row ----------------- */}

          {/* ----------------- Start of Next Row ----------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ----------------- Start of Patient Civil Status ----------------- */}
            <div>
              <Label htmlFor="civil_stat_code">
                Civil Status <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="civil_stat_code"
                value={data.civil_stat_code ?? ''}
                onChange={(e) => setData('civil_stat_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Civil Status</option>
                <option value="sin">Single</option>
                <option value="mar">Married</option>
                <option value="div">Divorced</option>
                <option value="sep">Separated</option>
                <option value="wid">Widow/Widower</option>
                <option value="na">N/A</option>
              </Select>
              <InputError message={errors.civil_stat_code} />
            </div>
            {/* ----------------- End of Patient Civil Status ----------------- */}

            {/* ----------------- Start of Birthplace ----------------- */}
            <div>
              <Label htmlFor="pat_birthPlace">
                Birthplace <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input 
                value={data.pat_birthplace} 
                onChange={e => setData('pat_birthplace', e.target.value)}
                />
              <InputError message={errors.pat_birthplace} />
            </div>
            {/* ----------------- End of Birthplace ----------------- */}

            {/* ----------------- Start of Patient Religion ----------------- */}
            <div>
              <Label htmlFor="religion_code">
                Religion <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="religion_code"
                value={data.religion_code ?? ''}
                onChange={(e) => setData('religion_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Religion</option>
                <option value="Chri">Christian</option>
                <option value="Cat">Catholic</option>
                <option value="Prot">Protestant</option>
                <option value="Isla">Islam</option>
                <option value="Bud">Buddhism</option>
                <option value="Hind">Hinduism</option>
                <option value="Other">Other</option>
              </Select>
              <InputError message={errors.religion_code} />  
            </div>
            {/* ----------------- End of Religion ----------------- */}

            {/* ----------------- Start of Nationality ----------------- */}
            <div>
              <Label htmlFor="nationality">
                Nationality <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="nationality"
                value={data.nationality ?? ''}
                onChange={(e) => setData('nationality', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Nationality</option>
                <option value="PH">Filipino</option>
                <option value="US">American</option>
                <option value="Oth">Others</option>
              </Select>
              <InputError message={errors.nationality} />
            </div>
            {/* ----------------- End of Nationality ----------------- */}

            {/* ----------------- Start of Educational Attainment ----------------- */}
            <div>
              <Label htmlFor="educattainment">
                Educational Attainment <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="educattainment"
                value={data.educattainment ?? ''}
                onChange={(e) => setData('educattainment', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select</option>
                <option value="01">No Schooling</option>
                <option value="02">Elementary</option>
                <option value="03">High School</option>
                <option value="04">College</option>
                <option value="05">Graduate</option>
              </Select>
              <InputError message={errors.educattainment} />
            </div>
            {/* ----------------- End of Educational Attainment ----------------- */}

            {/* ----------------- Start of Patient Occupation ----------------- */}
            <div>
              <Label htmlFor="occupation_code">
                Occupation <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                value={data.occupation_code}
                onChange={e => setData('occupation_code', e.target.value)}
              />
              <InputError message={errors.occupation_code} />
            </div>
            {/* ----------------- End of Patient Occupation ----------------- */}

            {/* ----------------- Start of Patient Mobile ----------------- */}
            <div>
              <Label htmlFor="pat_mobile">
                Contact Number <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input value={data.pat_mobile} onChange={e => setData('pat_mobile', e.target.value)} />
              <InputError message={errors.pat_mobile} />
            </div>
            {/* ----------------- End of Patient Mobile ----------------- */}

            {/* ----------------- Start of Patient Landline ----------------- */}
            <div>
              <Label htmlFor="pat_landline">
                Landline <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input value={data.pat_landline} onChange={e => setData('pat_landline', e.target.value)} />
              <InputError message={errors.pat_landline} />
            </div>
            {/* ----------------- End of Patient Landline ----------------- */}
          </div>
          {/* ----------------- End of Next Row ----------------- */}


          <hr></hr>
          {/* ----------------- Start of Demographi Information ----------------- */}
          <h3 className="text-lg font-semibold">Demographic Information</h3>
          {/* ----------------- Start of Next Row ----------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ----------------- Start of Patient Address ----------------- */}
            <div className="col-span-4">
              <Label htmlFor="patient_address">
                House # / Lot # / Street Name / Building / Purok # / Village Name <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input
                id="patient_address"
                className="text-dark-500"
                value={data.patient_address}
                onChange={(e) => setData('patient_address', e.target.value)}
              />
              <InputError message={errors.patient_address} />
            </div>
            {/* ----------------- End of Patient Address ----------------- */}

            {/* ----------------- Start of Region ----------------- */}
            <div>
              <Label htmlFor="regcode">
                Region <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="regcode"
                value={selectedRegion}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedRegion(val);
                  setSelectedProvince('');
                  setSelectedCity('');
                  setData('regcode', val);
                  setData('provcode', '');
                  setData('citycode', '');
                  setData('bgycode', '');
                }}
                className="w-full border rounded p-2 text-dark-500"
              >
              <option value="">Select Region</option>
                {Object.entries(locationData).map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.region_name}
              </option>
              ))}
            </Select>
            </div>
            {/* ----------------- End of Region ----------------- */}

            {/* ----------------- Start of Province ----------------- */}
            <div>
              <Label htmlFor="provcode">
                Province <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="provcode"
                value={selectedProvince}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedProvince(val);
                  setSelectedCity('');
                  setData('provcode', val);
                  setData('citycode', '');
                  setData('bgycode', '');
                }}
                className={`w-full border rounded p-2 text-dark-500 ${!selectedRegion ? 'opacity-50 cursor-not-allowed' : ''}`}
                // Just apply a "disabled" class when `selectedRegion` is falsy
              >
                <option value="">Select Province</option>
                {selectedRegion &&
                  Object.keys(locationData[selectedRegion].province_list).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
              </Select>
            </div>
            {/* ----------------- End of Province ----------------- */}
            
            {/* ----------------- Start of City ----------------- */}
            <div>
              <Label htmlFor="citycode">
                City <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="citycode"
                value={selectedCity}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedCity(val);
                  setData('citycode', val);
                  setData('bgycode', '');
                }}
                className={`w-full border rounded p-2 text-dark-500 ${!selectedProvince ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Select City/Municipality</option>
                  {selectedRegion &&
                    selectedProvince &&
                    locationData[selectedRegion].province_list[selectedProvince].municipality_list.map((muni, i) => {
                      const city = Object.keys(muni)[0];
                      return (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      );
                    })}
              </Select>
            </div>
            {/* ----------------- End of City ----------------- */}

            {/* ----------------- Start of Barangay ----------------- */}
            <div>
              <Label htmlFor="bgycode">
                Barangay <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="bgycode"
                value={data.bgycode}
                onChange={(e) => {
                  const val = e.target.value;
                  setData('bgycode', val);
                  setData('bgycode', val);
                }}
                className={`w-full border rounded p-2 text-dark-500 ${!selectedCity ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Select Barangay</option>
                  {selectedRegion &&
                    selectedProvince &&
                    selectedCity &&
                    locationData[selectedRegion].province_list[selectedProvince].municipality_list
                      .find((m) => Object.keys(m)[0] === selectedCity)?.[selectedCity].barangay_list.map((brgy, i) => (
                        <option key={i} value={brgy}>
                          {brgy}
                        </option>
                      ))}
              </Select>
            </div>
            {/* ----------------- End of Barangay ----------------- */}

            {/* ----------------- Start of Zipcode ----------------- */}
            <div>
              <Label htmlFor="zipcode">
                Zipcode <span className="text-red-600 font-bold">*</span>
              </Label>
              <Input value={data.zipcode} onChange={e => setData('zipcode', e.target.value)} />
              <InputError message={errors.zipcode} />
            </div>
            {/* ----------------- End of Zipcode ----------------- */}

            {/* ----------------- Start of Country ----------------- */}
            <div>
              <Label>
                Country <span className="text-red-600 font-bold">*</span>
              </Label>
              <Select
                id="country_code"
                value={data.country_code ?? ''}
                onChange={(e) => setData('country_code', e.target.value)}
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select Country</option>
                <option value="PH">Philippines</option>
              </Select>
              <InputError message={errors.country_code} />
            </div>
            {/* ----------------- End of Country ----------------- */}
          </div>
          {/* ----------------- End of Next Row ----------------- */}

          {/* ----------------- Start of Next Row ----------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">

            {/* ----------------- Start of Patient Full Address ----------------- */}
            <div >
              <Label htmlFor="fulladdress">
                Full Address <span className="text-red-600 font-bold">*</span> 
              </Label>
              <Input
                id="fulladdress"
                type="text"
                className="w-full border rounded p-2 bg-gray-100 text-dark-500"
                value={
                  [
                    data.patient_address,
                    data.bgycode,
                    selectedCity,
                    selectedProvince,
                    selectedRegion,
                    regionLookup[data.regcode] || '',
                    data.zipcode,
                    data.country_code === 'PH' ? 'Philippines' : '', // Country
                  ]
                    .filter(Boolean)
                    .join(', ')
                }
                readOnly
              />
            </div>
            {/* ----------------- End of Patient Full Address ----------------- */}
          {/* ----------------- End of Demographic Information ----------------- */}
          {/* ----------------- End of Next Row ----------------- */}
          <hr></hr>
          
          {/* -------------------------- Start of Parent's Information -------------------------- */}
          <h3 className="text-lg font-semibold">Parent's Information</h3>

          {/* ----------------- Start of Mother's Information ----------------- */}
          <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="mot_lname">
                Last Name
              </Label>
              <Input value={data.mot_lname} onChange={e => setData('mot_lname', e.target.value)} />
              <InputError message={errors.mot_lname} />
            </div>
            <div>
              <Label htmlFor="mot_fname">
                First Name
              </Label>
              <Input value={data.mot_fname} onChange={e => setData('mot_fname', e.target.value)} />
              <InputError message={errors.mot_fname} />
            </div>
            <div>
              <Label htmlFor="mot_mname">
                Middle Name
              </Label>
              <Input value={data.mot_mname} onChange={e => setData('mot_mname', e.target.value)} />
              <InputError message={errors.mot_mname} />
            </div>
            <div>
              <Label htmlFor="mot_birthDate">Birth Date</Label>
              <Input
                type="date"
                value={data.mot_birthdate}
                onChange={e => setData('mot_birthdate', e.target.value)}
              />
              <InputError message={errors.mot_birthdate} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="mot_address">
                Address
              </Label>
              <Input value={data.mot_address} onChange={e => setData('mot_address', e.target.value)} />
              <InputError message={errors.mot_address} />
            </div>
            <div>
              <Label htmlFor="mot_contact">
                Contact Number
              </Label>
              <Input value={data.mot_contact} onChange={e => setData('mot_contact', e.target.value)} />
              <InputError message={errors.mot_contact} />
            </div>
            <div>
              <Label htmlFor="mot_deceased_status">Deceased</Label>
              <Select
                id="mot_deceased_status"
                value={data.mot_deceased_status ?? ''}
                onChange={(e) => setData('mot_deceased_status', e.target.value)}              
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </Select>
              <InputError message={errors.mot_deceased_status} />
            </div>
          </div>
          {/* ----------------- End of Mother's Information ----------------- */}

          {/* ----------------- Start of Father's Information ----------------- */}
          <h5 className="text-sm font-semibold text-gray-500">Mother's Maiden Name</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="fat_lname">
                Last Name
              </Label>
              <Input value={data.fat_lname} onChange={e => setData('fat_lname', e.target.value)} />
              <InputError message={errors.fat_lname} />
            </div>
            <div>
              <Label htmlFor="fat_fname">
                First Name
              </Label>
              <Input value={data.fat_fname} onChange={e => setData('fat_fname', e.target.value)} />
              <InputError message={errors.fat_fname} />
            </div>
            <div>
              <Label htmlFor="fat_mname">
                Middle Name
              </Label>
              <Input value={data.fat_mname} onChange={e => setData('fat_mname', e.target.value)} />
              <InputError message={errors.fat_mname} />
            </div>
            <div>
              <Label htmlFor="fat_birthdate">Birth Date</Label>
              <Input
                type="date"
                value={data.fat_birthdate}
                onChange={e => setData('fat_birthdate', e.target.value)}
              />
              <InputError message={errors.fat_birthdate} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="fat_address">
                Address
              </Label>
              <Input value={data.fat_address} onChange={e => setData('fat_address', e.target.value)} />
              <InputError message={errors.fat_address} />
            </div>
            <div>
              <Label htmlFor="fat_contact">
                Contact Number
              </Label>
              <Input value={data.fat_contact} onChange={e => setData('fat_contact', e.target.value)} />
              <InputError message={errors.fat_contact} />
            </div>
            <div>
              <Label htmlFor="fat_deceased_status">Deceased</Label>
              <Select
                id="fat_deceased_status"
                value={data.fat_deceased_status ?? ''}
                onChange={(e) => setData('fat_deceased_status', e.target.value)}              
                className="block w-full px-3 py-2 border rounded-md shadow-sm text-dark-500"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </Select>
              <InputError message={errors.fat_deceased_status} />
          </div>
          {/* ----------------- End of Father's Information ----------------- */}
        </div>
        </div>
        </div>

        <div className="pt-6">
          <Button type="submit" disabled={processing}>
            Update Patient
          </Button>
        </div>
      </form>
    </AppLayout>
  );
};

export default EditPatient;
