import * as React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage, Link } from '@inertiajs/react';

import {
  User,
  Hospital,
  Home,
  Venus,
  CalendarDays,
  Cake,
  ArrowRight,
  Edit,
  Trash,
  Stethoscope,
  Send
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Search Patients', href: '/patients/create' },
  { title: 'Consultations', href: '/consultations' },
];

const InfoRow = ({
  icon: Icon,
  label,
  value,
  withArrow = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  withArrow?: boolean;
}) => (
  <div className="flex items-start space-x-2 text-sm">
    {withArrow ? (
      <ArrowRight className="text-blue-500 w-4 h-4 mt-0.5" />
    ) : (
      <Icon className="text-blue-500 w-4 h-4 mt-0.5" />
    )}
    <div>
      <span className="font-medium">{label}</span> {value}
    </div>
  </div>
);


const ConsultationIndex: React.FC = () => {
  const { props } = usePage<{ patient: { 
    id: number;
    pat_birthDate: string; 
    master_patient_perm_id: string; 
    pat_fname: string; 
    pat_mname: string; 
    pat_lname: string; 
    sex_code: string; 
    civil_stat_code: string; 
    patient_address: string; 
    provcode: string; 
    citycode: string; 
    bgycode: string; 
    fat_address: string; 
    mot_fname: string; 
    mot_mname: string; 
    mot_lname: string; 
    fat_fname: string; 
    fat_mname: string; 
    fat_lname: string; 
    ts_created_at: string; 
  } }>();
  const patient = props.patient;
  const [showForm, setShowForm] = React.useState(false);
  type Consultation = {
    consult_date: string;
    consult_time: string;
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
  };
  
  
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [formData, setFormData] = React.useState({
    
    consult_date: '',
    consult_time: '',
    consult_type_code: '',
    type_service: '',
    to_consult_code: '',
    chief_complaint: '',
    pat_temperature: '',
    pat_heart_rate: '',
    pat_oxygen_sat: '',
    respiratoryRate: '',
    pat_height: '',
    pat_weight: '',
    pat_BMI: '',
    BMI_cat_code: '',
    pat_diastolic_pres: '',
    pat_systolic_pres: '',
  });

  const birthDate = new Date(patient.pat_birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    const heightM = parseFloat(formData.pat_height) / 100;
    const weight = parseFloat(formData.pat_weight);

    if (!isNaN(heightM) && !isNaN(weight) && heightM > 0) {
      const bmiValue = weight / (heightM * heightM);
      const roundedBmi = bmiValue.toFixed(1);

      let category = '';
      if (bmiValue < 18.5) category = 'Underweight';
      else if (bmiValue < 24.9) category = 'Normal';
      else if (bmiValue < 29.9) category = 'Overweight';
      else category = 'Obese';

      setFormData((prev) => ({
        ...prev,
        pat_BMI: roundedBmi,
        BMI_cat_code: category,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        pat_BMI: '',
        BMI_cat_code: '',
      }));
    }
  }, [formData.pat_height, formData.pat_weight]);

  const handleSubmit = () => {
    if (!formData.consult_date || !formData.chief_complaint) return;
  
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0]; // HH:mm:ss format
  
    const birthDate = new Date(patient.pat_birthDate);
  
    // Compute years, months, and days
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month
      days += prevMonth.getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    const newConsultation = {
      consult_date: formData.consult_date,
      consult_time: currentTime,
      consult_type_code: formData.consult_type_code,
      to_consult_code: formData.to_consult_code,
      type_service: formData.type_service,
      chief_complaint: formData.chief_complaint,
      pat_temperature: parseFloat(formData.pat_temperature), // Ensure it's a number
      pat_heart_rate: parseInt(formData.pat_heart_rate),   // Ensure it's a number
      pat_oxygen_sat: parseInt(formData.pat_oxygen_sat),   // Ensure it's a number
      respiratoryRate: parseInt(formData.respiratoryRate), // Ensure it's a number
      pat_height: parseFloat(formData.pat_height),         // Ensure it's a number
      pat_weight: parseFloat(formData.pat_weight),         // Ensure it's a number
      pat_BMI: formData.pat_BMI,
      BMI_cat_code: formData.BMI_cat_code,
      pat_systolic_pres: parseInt(formData.pat_systolic_pres), // Ensure it's a number
      pat_diastolic_pres: parseInt(formData.pat_diastolic_pres), // Ensure it's a number
      master_patient_perm_id: patient.master_patient_perm_id,
      consult_temp_id: String(patient.id),
      pat_age_yr: years,
      pat_age_mo: months,
      pat_age_dy: days,
      patient_address_temp_id: `${patient.patient_address}, ${patient.provcode}, ${patient.citycode}, ${patient.bgycode}`,
    };
    
    
  
    router.post('/consultations/store', newConsultation, {
      onSuccess: () => {
        setConsultations((prev) => [...prev, newConsultation as Consultation]);
        setFormData({
          consult_date: '',
          consult_time: '',
          consult_type_code: '',
          to_consult_code: '',
          type_service: '',
          chief_complaint: '',
          pat_temperature: '',
          pat_heart_rate: '',
          pat_oxygen_sat: '',
          respiratoryRate: '',
          pat_height: '',
          pat_weight: '',
          pat_BMI: '',
          BMI_cat_code: '',
          pat_systolic_pres: '',
          pat_diastolic_pres: '',
        });
        setShowForm(false);
      },
      onError: (errors) => {
        console.error(errors);
        console.log(newConsultation);
      },
    });
  };
  

  const handleDelete = (index: number) => {
    setConsultations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const consultation = consultations[index];
    setFormData({
      ...consultation,
      pat_temperature: consultation.pat_temperature.toString(),
      pat_heart_rate: consultation.pat_heart_rate.toString(),
      pat_oxygen_sat: consultation.pat_oxygen_sat.toString(),
      respiratoryRate: consultation.respiratoryRate.toString(),
      pat_height: consultation.pat_height.toString(),
      pat_weight: consultation.pat_weight.toString(),
      pat_systolic_pres: consultation.pat_systolic_pres.toString(),
      pat_diastolic_pres: consultation.pat_diastolic_pres.toString(),
    });
    setConsultations((prev) => prev.filter((_, i) => i !== index));
    setShowForm(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultations" />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 rounded-xl p-4 shadow-sm bg-white text-sm">
        <div className="space-y-2 col-span-1">
            <div className="text-white bg-blue-500 px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">
              Personal Information
            </div>
            <InfoRow icon={Hospital} label="ID:" 
              value={`${patient.id}`} />
            <InfoRow icon={Hospital} label="Patient Health No.:" 
              value={`${patient.master_patient_perm_id}`} />
            <InfoRow icon={User} label="Patient name:" 
              value={`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`} />
            <InfoRow 
              icon={Venus} 
              label="Sex:" 
              value={patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : ''} 
            />
            <InfoRow 
              icon={User} 
              label="Civil Status:" 
              value={
                patient.civil_stat_code === 'sin' ? 'Single' :
                patient.civil_stat_code === 'mar' ? 'Married' :
                patient.civil_stat_code === 'sep' ? 'Separated' :
                patient.civil_stat_code === 'div' ? 'Divorced' :
                patient.civil_stat_code === 'wid' ? 'Widower' :
                patient.civil_stat_code === 'na'  ? 'N/A' :
                ''
              }
            />
            <InfoRow icon={Cake} label="Birthdate:" 
              value={new Date(patient.pat_birthDate).toLocaleDateString()} />
            <InfoRow icon={CalendarDays} label="Age:" 
              value={`${age} yrs`} />
            <InfoRow 
              icon={Home} 
              label="Address:" 
              value={`${patient.patient_address}, ${patient.provcode}, ${patient.citycode}, ${patient.bgycode}`}
            />
          </div>
          <div className="space-y-2 col-span-1">
            <div className="text-white bg-blue-500 px-3 py-1 rounded mb-2 w-fit text-sm font-semibold">
              Relationship Information
            </div>
            <InfoRow icon={Home} label="Parent Address:" value={patient.fat_address}/>
            <InfoRow icon={User} label="Mother's name:" value={`${patient.mot_fname} ${patient.mot_mname} ${patient.mot_lname}`}/>
            <InfoRow icon={User} label="Father's name:" value={`${patient.fat_fname} ${patient.fat_mname} ${patient.fat_lname}`}/>
            <InfoRow icon={CalendarDays} label="Date Registered:" value={`${new Date(patient.ts_created_at).toLocaleDateString()} ${new Date(patient.ts_created_at).toLocaleTimeString()}`}/>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white text-sm space-y-4">
          <div className="text-white bg-blue-500 px-3 py-1 rounded w-fit text-sm font-semibold">
            Patient Consultations
          </div>

          <div className="flex gap-1">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-300 text-green-700 hover:bg-green-400 "
                variant="outline"
              >
                <Stethoscope className="w-4 h-4 mr-2"/>
                Add Consultation
              </Button>

              <Button
                disabled={!consultations.length}
                className={`flex items-center ${
                  consultations.length
                    ? 'bg-green-300 text-green-700 hover:bg-green-400'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                variant="outline"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Assessment List
              </Button>
            </div>


          {showForm && (
            <div className="bg-gray-48 p-4 rounded-lg border mt-2 space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="consult_date">Date</Label>
                  <Input
                    id="consult_date"
                    type="date"
                    name="consult_date"
                    value={formData.consult_date}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="consult_type_code">Consultation Type</Label>
                  <Select
                    value={formData.consult_type_code}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, consult_type_code: value }))
                    }
                    name="consult_type_code"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Consultation Type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="newconsultation">New Consultation</SelectItem>
                    <SelectItem value="followupvisit">Follow-up Visit</SelectItem>
                      <SelectItem value="visited">Visited</SelectItem>
                      <SelectItem value="walkin">Walk-in</SelectItem>
                      <SelectItem value="referred">Referred</SelectItem>
                      <SelectItem value="teleconsultation">Teleconsultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="date">Consultation Case</Label>
                  <Select
                    value={formData.to_consult_code}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, to_consult_code: value }))
                    }
                    name="to_consult_code"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Consultation Case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mentalhealth">Mental Health</SelectItem>
                      <SelectItem value="other">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="date">Type of Services</Label>
                  <Select
                    value={formData.type_service}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, type_service: value }))
                    }
                    name="type_service"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reass">Re-Assessment</SelectItem>
                      <SelectItem value="dismeds">Dispensing Medicaton</SelectItem>
                      <SelectItem value="psychoed">Psychoeducation</SelectItem>
                      <SelectItem value="iniass">Initial Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>


              <Label htmlFor="VitalSign">Vital Sign</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  name="pat_temperature"
                  value={formData.pat_temperature}
                  onChange={handleInputChange}
                  placeholder="Temp (°C)"
                />

                <Input
                  name="pat_heart_rate"
                  value={formData.pat_heart_rate}
                  onChange={handleInputChange}
                  placeholder="Heart Rate (bpm)"
                />

                <Input
                  name="pat_oxygen_sat"
                  value={formData.pat_oxygen_sat}
                  onChange={handleInputChange}
                  placeholder="O₂ Saturation (%)"
                />

                <Input
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleInputChange}
                  placeholder="Respiratory Rate (rpm)"
                />

                <Input
                  name="pat_systolic_pres"
                  value={formData.pat_systolic_pres}
                  onChange={handleInputChange}
                  placeholder="Systolic (e.g. 110)"
                />

                <Input
                  name="pat_diastolic_pres"
                  value={formData.pat_diastolic_pres}
                  onChange={handleInputChange}
                  placeholder="Diastolic (e.g. 80)"
                />
              </div>

              <Label htmlFor="BMI">BMI</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Input
                  name="pat_height"
                  value={formData.pat_height}
                  onChange={handleInputChange}
                  placeholder="Height (cm)"
                />

                <Input
                  name="pat_weight"
                  value={formData.pat_weight}
                  onChange={handleInputChange}
                  placeholder="Weight (kg)"
                />

                <div>
                  <Input
                    readOnly
                    value={formData.pat_BMI}
                    placeholder="BMI"
                    className="bg-gray-100 w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1 italic">
                    {formData.BMI_cat_code}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="chief_complaint">Chief Complaint</Label>
                <Textarea
                  id="chief_complaint"
                  name="chief_complaint"
                  value={formData.chief_complaint}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button
               onClick={handleSubmit}
               className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg shadow"
               >
                <Send className="w-4 h-4" />
                Submit Consultation
              </Button>
            </div>
          )}

          {consultations.length > 0 ? (
                  <ul className="space-y-2 mt-4">
                    {consultations.map((item, index) => (
                      <li key={index} className="relative group border p-3 rounded bg-white shadow-sm hover:shadow-md transition">
                        <div className="font-semibold">{item.consult_date}</div>
                        <div className="text-xs text-gray-700">Notes: {item.chief_complaint}</div>
                        <div className="text-xs text-gray-700">Consultation Type: {item.consult_type_code}</div>
                        <div className="text-xs text-gray-700">Consultation Code: {item.to_consult_code}</div>
                        <div className="text-xs text-gray-700">
                          Vitals: Temp {item.pat_temperature}°C, HR {item.pat_heart_rate} bpm, O₂ {item.pat_oxygen_sat}%, RR {item.respiratoryRate},
                          BP {item.pat_systolic_pres}/{item.pat_diastolic_pres}
                        </div>
                        <div className="text-xs text-gray-700">
                          BMI: {item.pat_BMI} ({item.BMI_cat_code}) – Height: {item.pat_height} cm, Weight: {item.pat_weight} kg
                        </div>

                        <div className="mt-1 flex gap-2 text-xs">
                          <button onClick={() => handleEdit(index)} 
                          className="text-blue-600 hover:underline flex items-center gap-1">
                            <Edit size={16} /> Edit
                          </button>

                          <button onClick={() => handleDelete(index)}
                          className="text-red-600 hover:underline flex items-center gap-1">
                            <Trash size={16} /> Delete
                          </button>
                        </div>

                        <Link
                          href={`/assessment/${patient.id}/addAssessment`}
                          className="absolute top-1 right-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 flex items-center gap-2 rounded-l-lg px-3 py-1 text-sm"
                        >
                          <Stethoscope className="w-3 h-3 text-white-600" />
                          Add Assessment Tool
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-gray-500">No consultations found for this patient.</div>
                )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ConsultationIndex;