import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, OutGoReferral } from '@/types';
import { XCircle, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Outgoing Referral',
    href: '#',
  },
];

interface OutRefProps {
  referrals: OutGoReferral[];
}

const ITEMS_PER_PAGE = 10;

const OutRefIndex: React.FC<OutRefProps> = ({ referrals }) => {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(referrals.length / ITEMS_PER_PAGE);
  const paginatedReferrals = referrals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Outgoing Referral" />
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Display Outgoing Referral</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Consultation ID</th>
                <th className="border px-2 py-1">Patient Name</th>
                <th className="border px-2 py-1">Referred From</th>
                <th className="border px-2 py-1">Referred To</th>
                <th className="border px-2 py-1">Date Send</th>
                <th className="border px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReferrals.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-2">No referrals found.</td>
                </tr>
              )}
              {paginatedReferrals.map((ref) => (
                <tr key={ref.id}>
                  <td className="border px-2 py-1">{ref.consultation_id}</td>
                  <td className="border px-2 py-1">{ref.pat_fullname}</td>
                  <td className="border px-2 py-1">{ref.facility_name}</td>
                  <td className="border px-2 py-1">{ref.referral_facility_name}</td>
                  <td className="border px-2 py-1">{ref.date_ref}</td>
                  <td className="border px-2 py-1 text-center">
                    {ref.status_code === '0' || ref.status_code === 0 ? (
                      <span className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-4 h-4" /> Not Received
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" /> Received
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OutRefIndex;