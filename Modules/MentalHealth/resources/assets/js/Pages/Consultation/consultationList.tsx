import React from 'react';
import { Edit, Trash, Stethoscope } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ConsultationItem {
  consult_temp_id: number;
  consult_date: string;
  chief_complaint: string;
  consult_type_code: string;
  to_consult_code: string;
  pat_temperature: number;
  pat_heart_rate: number;
  pat_oxygen_sat: number;
  respiratoryRate: number;
  pat_systolic_pres: number;
  pat_diastolic_pres: number;
  pat_BMI: string;
  BMI_cat_code: string;
  pat_height: number;
  pat_weight: number;
}

interface Patient {
  id: number;
}

interface Props {
  consultations: ConsultationItem[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  patient: Patient;
}

const ConsultationList: React.FC<Props> = ({ consultations, handleEdit, handleDelete, patient }) => {
  if (consultations.length === 0) {
    return <div className="text-center text-gray-500">No consultations found for this patient.</div>;
  }

  console.log("📄 Consultations received:", consultations);

  return (
    <ul className="space-y-2 mt-4">
      {consultations.map((item, index) => (
        <li
          key={index}
          className="relative group border p-3 rounded bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="font-semibold">{item.consult_date}</div>
          <div className="text-xs text-gray-700">Notes: {item.chief_complaint}</div>
          <div className="text-xs text-gray-700">Consultation Type: {item.consult_type_code}</div>
          <div className="text-xs text-gray-700">Consultation Code: {item.to_consult_code}</div>
          <div className="text-xs text-gray-700">
            Vitals: Temp {item.pat_temperature}°C, HR {item.pat_heart_rate} bpm, O₂ {item.pat_oxygen_sat}%,
            RR {item.respiratoryRate}, BP {item.pat_systolic_pres}/{item.pat_diastolic_pres}
          </div>
          <div className="text-xs text-gray-700">
            BMI: {item.pat_BMI} ({item.BMI_cat_code}) – Height: {item.pat_height} cm, Weight: {item.pat_weight} kg
          </div>

          <div className="mt-1 flex gap-2 text-xs">
            <button
              onClick={() => handleEdit(index)}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <Edit size={16} /> Edit
            </button>

            <button
              onClick={() => handleDelete(index)}
              className="text-red-600 hover:underline flex items-center gap-1"
            >
              <Trash size={16} /> Delete
            </button>
          </div>

          <Link
            href={`/assessment/${patient.id}/addConsultation`}
            className="absolute top-1 right-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 flex items-center gap-2 rounded-l-lg px-3 py-1 text-sm"
          >
            <Stethoscope className="w-3 h-3 text-white-600" />
            Add Assessment Tool
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ConsultationList;
