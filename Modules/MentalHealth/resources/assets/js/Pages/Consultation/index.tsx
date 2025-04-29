import * as React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

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
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    id: string;
    date: string;
    chief_complaint: string;
    pat_consent: string;
    temp: string;
    heartRate: string;
    oxygenSaturation: string;
    respiratoryRate: string;
    height: string;
    weight: string;
    bmi: string;
    bmiCategory: string;
    bloodPressure: string;
    notes: string;
  };
  
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [formData, setFormData] = React.useState({
    
    id: '',
    date: '',
    chief_complaint: '',
    pat_consent: '',
    temp: '',
    heartRate: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    height: '',
    weight: '',
    bmi: '',
    bmiCategory: '',
    bloodPressure: '',
    notes: '',
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
    const heightM = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);

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
        bmi: roundedBmi,
        bmiCategory: category,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        bmi: '',
        bmiCategory: '',
      }));
    }
  }, [formData.height, formData.weight]);

  const handleSubmit = () => {
    if (!formData.date || !formData.chief_complaint) return;

    setConsultations((prev) => [...prev, formData]);
    setFormData({
          id: '',
          date: '',
          chief_complaint: '',
          pat_consent: '',
          notes: '',
          temp: '',
          heartRate: '',
          oxygenSaturation: '',
          respiratoryRate: '',
          height: '',
          weight: '',
          bmi: '',
          bmiCategory: '',
          bloodPressure: '',
        });
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    setConsultations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const consultation = consultations[index];
    setFormData(consultation);
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
            <InfoRow icon={CalendarDays} label="Date entered:" value={`${new Date(patient.ts_created_at).toLocaleDateString()} ${new Date(patient.ts_created_at).toLocaleTimeString()}`}/>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white text-sm space-y-4">
          <div className="text-white bg-blue-500 px-3 py-1 rounded w-fit text-sm font-semibold">
            Patient Consultations
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-green-100 text-green-700 hover:bg-green-200"
              variant="outline"
            >
              ➕ Add Consultation
            </Button>

            <Button
              disabled={!consultations.length}
              className={`${
                consultations.length
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              variant="outline"
            >
              📋 Assessment List
            </Button>
          </div>

          {showForm && (
            <div className="bg-gray-50 p-4 rounded-lg border mt-2 space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <Label htmlFor="VitalSign">Vital Sign</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Input
                  name="temp"
                  value={formData.temp}
                  onChange={handleInputChange}
                  placeholder="Temp (°C)"
                />

                <Input
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  placeholder="Heart Rate (bpm)"
                />

                <Input
                  name="oxygenSaturation"
                  value={formData.oxygenSaturation}
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
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  placeholder="Blood Pressure (e.g. 110/80)"
                />
              </div>

              <Label htmlFor="BMI">BMI</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Input
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Height (cm)"
                />

                <Input
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight (kg)"
                />

                <div>
                  <Input
                    readOnly
                    value={formData.bmi}
                    placeholder="BMI"
                    className="bg-gray-100 w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1 italic">
                    {formData.bmiCategory}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    id="pat_consent"
                    name="pat_consent"
                    value="yes"
                    checked={formData.pat_consent === 'yes'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="pat_consent">
                    Patient Consent (
                    <a
                      href={`/patients/${patient.id}/consentconsult`}
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                    >
                      Click Here
                    </a>
                    )
                  </Label>
                </div>



              <div>
                <Label htmlFor="chief_complaint">Chief Complaint</Label>
                <Input
                  id="chief_complaint"
                  name="chief_complaint"
                  value={formData.chief_complaint}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button onClick={handleSubmit}>Submit Consultation</Button>
            </div>
          )}

          {consultations.length > 0 && (
            <ul className="space-y-2 mt-4">
              {consultations.map((item, index) => (
                <li key={index} className="relative group border p-3 rounded bg-white shadow-sm hover:shadow-md transition">
                  <div className="font-semibold">{item.date}</div>
                  <div className="text-xs text-gray-700">Notes: {item.notes}</div>
                  <div className="text-xs text-gray-700">
                    Vitals: Temp {item.temp}°C, HR {item.heartRate} bpm, O₂ {item.oxygenSaturation}%, RR {item.respiratoryRate}, BP {item.bloodPressure}
                  </div>
                  <div className="text-xs text-gray-700">
                    BMI: {item.bmi} ({item.bmiCategory}) – Height: {item.height} cm, Weight: {item.weight} kg
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
                  <Button className="absolute top-1 right-2 group-hover:block text-xs" variant="outline">
                    ➕ Add Assessment Tool
                  </Button>
                  <Button className="absolute top-1 right-2 group-hover:block text-xs" variant="outline">
                    ➕ Print Patient ITR
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ConsultationIndex;
