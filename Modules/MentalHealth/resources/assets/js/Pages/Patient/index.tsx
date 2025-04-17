import * as React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import type { MasterPatient } from '@/types/modules/mental-health';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Patients', href: '/patients' },
];

const PatientIndex: React.FC = () => {
  const { patients, filters } = usePage<PageProps<{ patients: MasterPatient[]; filters: any }>>().props;
  const { data, setData, get } = useForm({
    search: filters.search || '',
    sex: filters.sex || '',
  });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    get('/patients', { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Patients" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <Link
            href="/patients/create"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            + Add Patient
          </Link>
        </div>

        <form onSubmit={handleFilter} className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or facility"
            value={data.search}
            onChange={e => setData('search', e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-1/3"
          />
          <select
            value={data.sex}
            onChange={e => setData('sex', e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-1/4"
          >
            <option value="">All Sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Apply Filter
          </button>
        </form>

        <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Sex</th>
                <th className="px-6 py-3">Birthdate</th>
                <th className="px-6 py-3">Facility</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{patient.pat_lname}, {patient.pat_fname} {patient.pat_mname}</td>
                    <td className="px-6 py-4">{patient.sex_code}</td>
                    <td className="px-6 py-4">{patient.pat_birthDate}</td>
                    <td className="px-6 py-4">{patient.facility_name}</td>
                    <td className="px-6 py-4">{patient.provider_name}</td>
                    <td className="px-6 py-4">{patient.patient_address}</td>
                    <td className="px-6 py-4">{patient.pat_mobile || patient.pat_landline}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientIndex;
