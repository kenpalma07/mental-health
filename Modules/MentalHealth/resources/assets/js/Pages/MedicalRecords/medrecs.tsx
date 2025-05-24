import React from 'react';
import {
  Cake,
  CalendarDays,
  Phone,
  PhoneCall,
  User,
  Venus,
  BookOpenText,
  SyringeIcon,
  StethoscopeIcon,
  SaveAllIcon,
  Eye,
  Edit
} from 'lucide-react';
import { Head, PageProps, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Forms', href: '#' },
  { title: 'Medical Records', href: '/medrecords' },
];

interface Patient {
  id: number;
  pat_fname: string;
  pat_mname: string;
  pat_lname: string;
  pat_birthDate: string;
  sex_code: string;
  pat_mobile: string;
  pat_landline: string;
}

interface PatMedicalRecordsProps extends PageProps {
  patient: Patient;
  consultation: any[];
  assessments: any[];
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const PatMedicalRecords: React.FC<PatMedicalRecordsProps> = ({ patient, assessments, consultation }) => {
  const age = calculateAge(patient.pat_birthDate);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patient Medical Records" />
      <br />

      <div className="flex flex-col lg:flex-row gap-4 ml-4">
        {/* Patient Info Card */}
        <div className="max-w-md bg-white shadow-xl rounded-xl overflow-hidden w-full lg:w-1/2">
          <div className="flex items-center justify-center bg-blue-500 p-4">
            <h3 className="text-center text-xs uppercase font-semibold text-white">Patient Information</h3>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mt-6 shadow-lg">
              <User className="w-16 h-16 text-gray-500" />
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-x-2">
              <User className="w-6 h-6 text-gray-500" />
              <Label>Full Name:</Label>
              <span>{patient.pat_fname} {patient.pat_mname} {patient.pat_lname}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <CalendarDays className="w-6 h-6 text-gray-500" />
              <Label>Age:</Label>
              <span>{age}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <Venus className="w-6 h-6 text-gray-500" />
              <Label>Sex:</Label>
              <span>{patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'Other'}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <Cake className="w-6 h-6 text-gray-500" />
              <Label>Date of Birth:</Label>
              <span>{patient.pat_birthDate}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <Phone className="w-6 h-6 text-gray-500" />
              <Label>Mobile:</Label>
              <span>{patient.pat_mobile}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <PhoneCall className="w-6 h-6 text-gray-500" />
              <Label>Landline:</Label>
              <span>{patient.pat_landline}</span>
            </div>
          </div>
        </div>

        {/* Assessments Table */}
        <div className="max-w-full bg-white shadow-xl rounded-xl overflow-hidden w-full lg:w-2/3">
          <div className="flex items-left justify-left bg-blue-500 p-4">
            <h3 className="text-left text-xs uppercase font-semibold text-white">Patient Medical Records</h3>
          </div>

          <div className="p-6 space-y-4">

            <div className="flex items-center gap-x-2">
              <Link
                href={`/treatmentcard/${patient.id}?consult_date=${assessments[0]?.consult_date_assess}`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <SyringeIcon className="h-4 w-4" />
                Treatment Card
              </Link>
              <Link
                href={`/medcard/${patient.id}?consult_date=${assessments[0]?.consult_date_assess}`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <StethoscopeIcon className="h-4 w-4" />
                Medication Card
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <SaveAllIcon className="h-4 w-4" />
                Enrollment Form
              </Link>
              <Link
                href="/medabstract"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                <BookOpenText className="h-4 w-4" />
                Medical Abstract
              </Link>
            </div>
            {/* Assessment List */}
            <div className="mb-1 mt-4 text-sm text-gray-700">
              <span>Assessment List</span>
            </div>
            {assessments.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border text-sm text-gray-700">
                  <thead className="bg-green-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-2 py-2 text-left">Tracking #</th>
                      <th className="px-2 py-2 text-left">Date</th>
                      <th className="px-2 py-2 text-left">Treatment Avail</th>
                      <th className="px-2 py-2 text-left">Treatment Choice</th>
                      <th className="px-2 py-2 text-left">Diagnosis</th>
                      <th className="px-2 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-sm">
                    {assessments.map((a, index) => (
                      <tr key={index} className="border-t bg-white hover:bg-gray-50">
                        <td className="px-2 py-2 font-semibold">{a.consultation_id}</td>
                        <td className="px-2 py-2">{a.consult_date_assess}</td>
                        <td className="px-2 py-2 text-center">{a.treat_avail}</td>
                        <td className="px-2 py-2">{a.treat_choice}</td>
                        <td className="px-2 py-2">{a.diagnosis}</td>
                        <td className="px-2 py-2">
                          <div className="inline-flex items-center justify-center gap-2">
                            <Link
                              href={`/patitrforms/${patient.id}?consult_date=${a.consult_date_assess}`}
                              className="inline-flex items-center gap-2 rounded border border-green-600 px-3 py-1 text-green-600 transition hover:bg-green-600 hover:text-white"
                            >
                              <BookOpenText className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No assessments found.</p>
            )}

            {/* Consultation List */}
            <div className="mb-1 mt-6 text-sm text-gray-700">
              <span>Consultation List</span>
            </div>
            {consultation.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border text-sm text-gray-700">
                  <thead className="bg-green-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-2 py-2 text-left">Health #</th>
                      <th className="px-2 py-2 text-left">Consult Date</th>
                      <th className="px-2 py-2 text-left">Consultation Type</th>
                      <th className="px-2 py-2 text-left">Service Type</th>
                      <th className="px-2 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-sm">
                    {consultation.map((c, index) => (
                      <tr key={index} className="border-t bg-white hover:bg-gray-50">
                        <td className="px-2 py-2 font-semibold">{c.consult_perm_id}</td>
                        <td className="px-2 py-2">{c.consult_date}</td>
                        <td className="px-2 py-2">{c.consult_type_code}</td>
                        <td className="px-2 py-2">{c.type_service}</td>
                        <td className="px-2 py-2">
                          <div className="inline-flex items-center justify-center gap-2">
                            <Button variant="outline" onClick={() => index} className="text-blue-600 hover:bg-blue-500">
                              <Eye size={16} />
                            </Button>
                            <Button variant="outline" onClick={() => index} className="text-green-600 hover:bg-green-500">
                              <Edit size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No consultations found.</p>
            )}

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatMedicalRecords;
