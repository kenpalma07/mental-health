import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { User, Edit, Calendar, ArrowRight } from 'lucide-react'; // Import only the necessary icons
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Mental Health', href: '/patients' },
  { title: 'Patient Details', href: '#' },
];

const ViewPatientDetails = ({ patient }) => {
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const age = calculateAge(patient.pat_birthDate);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patient Details" />
      <div className="container mx-auto p-6">
        {/* Patient Information Section */}
        <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Patient Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center bg-blue-500 p-4">
              <h3 className="text-xl font-semibold text-white">Patient Information</h3>
            </div>
            {/* User Icon in a Circle */}
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
              <User className="w-16 h-16 text-gray-500" /> {/* User icon inside a circle */}
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p className="text-xl font-semibold">
                    <strong>Full Name:</strong> {patient.pat_fname} {patient.pat_mname} {patient.pat_lname}
                  </p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Age:</strong> {age}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Sex:</strong> {patient.sex_code}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Date of Birth:</strong> {patient.pat_birthDate}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Contact Number:</strong> {patient.contact_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demographic Information Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center bg-blue-500 p-4">
              <h3 className="text-xl font-semibold text-white">Demographic Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Address:</strong> {patient.patient_address}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>City:</strong> {patient.city}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Province:</strong> {patient.province}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Region:</strong> {patient.region}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-center bg-blue-500 p-4">
              <h3 className="text-xl font-semibold text-white">Parent Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Parent Name:</strong> {patient.parent_name}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Parent Contact:</strong> {patient.parent_contact}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Parent Address:</strong> {patient.parent_address}</p>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-gray-500" />
                  <p><strong>Is Parent Deceased?</strong> {patient.parent_deceased ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button  className="bg-gray-500 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <User className="mr-2" />Back to Patients
          </Button>

          <Button className="bg-gray-500 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <Edit className="mr-2" />Update Details
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ViewPatientDetails;
