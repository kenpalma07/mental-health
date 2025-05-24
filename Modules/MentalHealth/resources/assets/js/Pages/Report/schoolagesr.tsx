import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';

type Assessment = {
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

type Patient = {
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
  suicideAssessments: Assessment[];
};

const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
};

// Helper: get quarter string from a date string
const getQuarterFromDate = (dateStr: string): string | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) return 'Q1';
  if (month >= 4 && month <= 6) return 'Q2';
  if (month >= 7 && month <= 9) return 'Q3';
  if (month >= 10 && month <= 12) return 'Q4';
  return null;
};

const SchoolAgeSRIndex: React.FC = () => {
  const { props } = usePage();
  const patients = props.patients as Patient[];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedQuarter, setSelectedQuarter] = React.useState<string>('');
  const itemsPerPage = 10;

  // Flatten all suicide assessments from patients into rows with patient info
  const allRows = React.useMemo(() => {
    const rows: { patient: Patient; assessment: Assessment }[] = [];
    patients.forEach((patient) => {
      if (patient.suicideAssessments && patient.suicideAssessments.length > 0) {
        patient.suicideAssessments.forEach((assessment) => {
          rows.push({ patient, assessment });
        });
      }
    });
    return rows;
  }, [patients]);

  // Filter rows by selected quarter (if any)
  const filteredRows = React.useMemo(() => {
    if (!selectedQuarter) return allRows;
    return allRows.filter(({ assessment }) => {
      const quarter = getQuarterFromDate(assessment.consult_date_assess);
      return quarter === selectedQuarter;
    });
  }, [allRows, selectedQuarter]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const paginatedRows = React.useMemo(() => {
    return filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredRows, currentPage]);

  // When quarter changes, reset to page 1
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedQuarter]);

  return (
    <AppLayout breadcrumbs={[{ title: 'Suicide Report (School Age)', href: '/reportschoolagesr' }]}>
      <Head title="Suicide Report (School Age)" />

      <div className="p-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center justify-center gap-x-4 mb-4 w-full">
              <AppLogoDOH className="h-14 w-auto" />

              <div className="text-center">
                <h1 className="text-xl font-semibold uppercase text-gray-800 block">
                  Suicide Incidence Report
                </h1>
                <span className="text-sm text-gray-600 block">(School Age)</span>
              </div>

              <AppLogoBP className="h-14 w-auto" />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-gray-600">Quarter:</p>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Q1">1st Quarter</option>
                <option value="Q2">2nd Quarter</option>
                <option value="Q3">3rd Quarter</option>
                <option value="Q4">4th Quarter</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-black text-xs text-white border-b">
                <tr className="text-center">
                  <th className="border p-2 rounded-tl-lg text-xs">Date of Occurrence</th>
                  <th className="border p-2 text-xs">Patient Code Name</th>
                  <th className="border p-2 text-xs">Age</th>
                  <th className="border p-2 text-xs">Sex</th>
                  <th className="border p-2 text-xs">Address</th>
                  <th className="border p-2 text-xs">Contact No. of Guardian</th>
                  <th className="border p-2 text-xs">Grade/Year</th>
                  <th className="border p-2 text-xs">School</th>
                  <th className="border p-2 text-xs">Place of Incidence</th>
                  <th className="border p-2 text-xs">Means of Suicide</th>
                  <th className="border p-2 text-xs">Existing Mental Health Issue? (Yes/No)</th>
                  <th className="border p-2 text-xs">Validated by (Name & Position)</th>
                  <th className="border p-2 rounded-tr-lg text-xs">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.length > 0 ? (
                  paginatedRows.map(({ patient, assessment }, idx) => (
                    <tr key={`${patient.id}-${idx}`} className="hover:bg-gray-50 text-center">
                      <td className="border p-2 text-xs">{assessment.consult_date_assess ?? 'N/A'}</td>
                      <td className="border p-2 text-xs">{`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`}</td>
                      <td className="border p-2 text-xs">{calculateAge(patient.pat_birthDate)}</td>
                      <td className="border p-2 text-xs">
                        {patient.sex_code === 'M' ? 'Male' : patient.sex_code === 'F' ? 'Female' : 'N/A'}
                      </td>
                      <td className="border p-2 text-xs">{patient.patient_address}</td>
                      <td className="border p-2 text-xs">{patient.pat_mobile}</td>
                      <td className="border p-2 text-xs">{assessment.grade_year ?? ''}</td>
                      <td className="border p-2 text-xs">{assessment.school_name ?? ''}</td>
                      <td className="border p-2 text-xs">{assessment.place_inci ?? ''}</td>
                      <td className="border p-2 text-xs">{assessment.self_sui_means ?? ''}</td>
                      <td className="border p-2 text-xs">{assessment.diagnosis ? `Yes - ${assessment.diagnosis}` : 'No'}</td>
                      <td className="border p-2 text-xs">{assessment.phar_doc ?? ''}</td>
                      <td className="border p-2 text-xs">{assessment.self_sui_remarks ?? ''}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="text-center p-4">
                      No suicide assessments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition">
              Print Report
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SchoolAgeSRIndex;
