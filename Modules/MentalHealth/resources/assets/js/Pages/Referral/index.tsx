import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { OutGoReferral } from '@/types';
import { PlusCircle, RotateCcw, QrCode, Download, ListCheckIcon, Upload, XCircle, CheckCircle } from 'lucide-react';

const breadcrumbs = [
  { title: 'Referral', href: '#' },
];

const ITEMS_PER_PAGE = 10;

interface OutRefProps {
  referrals: OutGoReferral[];
}

const columns = {
  incoming: [
    'Reference no',
    'Date',
    'Patient Name',
    'Destination',
    'Action',
  ],
  outgoing: [
    'Reference no',
    'Date',
    'Patient Name',
    'Destination',
    'Status',
  ],
  received: [
    'Reference no',
    'Date',
    'Patient Name',
    'Source',
    'Status',
  ],
};

const ReferralPage: React.FC<OutRefProps> = ({ referrals }) => {
  const [activeTab, setActiveTab] = React.useState<'incoming' | 'outgoing' | 'received'>('incoming');
  const [page, setPage] = React.useState(1);

  // Filter received referrals where status_code is 1, sorted by date (oldest to latest)
  const receivedReferrals = referrals
    .filter(ref => ref.status_code === 1 || ref.status_code === '1')
    .sort((a, b) => new Date(a.date_ref).getTime() - new Date(b.date_ref).getTime());

  // Outgoing: Exclude received, sort by date (oldest to latest)
  const outgoingReferrals = referrals
    .filter(ref => ref.status_code !== 1 && ref.status_code !== '1')
    .sort((a, b) => new Date(a.date_ref).getTime() - new Date(b.date_ref).getTime());

  const totalPages = Math.ceil(outgoingReferrals.length / ITEMS_PER_PAGE) || 1;
  const paginatedReferrals = outgoingReferrals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={
        activeTab === 'incoming'
          ? 'Incoming Referral'
          : activeTab === 'outgoing'
            ? 'Outgoing Referral'
            : 'Received Referral'
      } />
      <div className="flex min-h-screen bg-white">
        {/* Sidebar: Minimized */}
        <aside className="w-44 bg-white flex-shrink-0">
          <div className="mt-4">
            <div className="flex items-center gap-2 text-xs text-black-600 px-2 mb-1 font-semibold uppercase tracking-wider">
              <ListCheckIcon className="w-5 h-5" />
              Transaction/s
            </div>
            <div className="mb-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('incoming')}
                    className={`group flex items-center px-2 py-2 rounded-l-lg font-semibold w-full text-left ${activeTab === 'incoming'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-black hover:text-white'
                    }`}
                  >
                    <span className="mr-2 group-hover:text-white">➔</span> Incoming
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('outgoing')}
                    className={`group flex items-center px-2 py-2 rounded-l-lg font-semibold w-full text-left ${activeTab === 'outgoing'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-black hover:text-white'
                    }`}
                  >
                    <span className="mr-2 group-hover:text-white">➔</span> Outgoing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('received')}
                    className={`group flex items-center px-2 py-2 rounded-l-lg font-semibold w-full text-left ${activeTab === 'received'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-black hover:text-white'
                    }`}
                  >
                    <span className="mr-2 group-hover:text-white">➔</span> Received
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content: Expanded */}
        <main className="flex-1 p-8 ml-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-black-600 text-xl font-semibold">
              <span className="inline-block">
                {activeTab === 'outgoing' ? (
                  <Upload className="w-6 h-6" />
                ) : (
                  <Download className="w-6 h-6" />
                )}
              </span>
              {activeTab === 'incoming'
                ? 'Incoming'
                : activeTab === 'outgoing'
                ? 'Outgoing'
                : 'Received'}
            </div>
            {(activeTab === 'incoming' || activeTab === 'outgoing') && (
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold">
                  <PlusCircle className="w-5 h-5" /> Add
                </button>
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold">
                  <RotateCcw className="w-5 h-5" /> Reload
                </button>
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold">
                  <QrCode className="w-5 h-5" /> Scan/Verify
                </button>
              </div>
            )}
          </div>

          {/* Table Controls */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="text-sm">Show</label>
              <select className="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search:"
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded bg-white overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b bg-black text-xs text-white">
                <tr>
                  {columns[activeTab].map((col) => (
                    <th key={col} className="border px-1 py-1 text-xs font-semibold text-left">
                      {col} <span className="text-gray-400 cursor-pointer">↕</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Incoming Tab */}
                {activeTab === 'incoming' && (
                  <tr>
                    <td colSpan={columns.incoming.length} className="text-center py-4 text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}

                {/* Outgoing Tab */}
                {activeTab === 'outgoing' && (
                  paginatedReferrals.length === 0 ? (
                    <tr>
                      <td colSpan={columns.outgoing.length} className="text-center py-4 text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    paginatedReferrals.map((ref) => (
                      <tr key={ref.id} className="text-xs">
                        <td className="border px-2 py-1">{ref.track_num}</td>
                        <td className="border px-2 py-1">{ref.date_ref}</td>
                        <td className="border px-2 py-1">{ref.pat_fullname}</td>
                        {/* <td className="border px-2 py-1">{ref.referral_facility_name}</td> */}
                        <td className="border px-2 py-1">{ref.facility_name}</td>
                        <td className="border px-2 py-1 text-center">
                          {ref.status_code === 0 || ref.status_code === '0' ? (
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
                    ))
                  )
                )}

                {/* Received Tab */}
                {activeTab === 'received' && (
                  receivedReferrals.length === 0 ? (
                    <tr>
                      <td colSpan={columns.received.length} className="text-center py-4 text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    receivedReferrals.map((ref) => (
                      <tr key={ref.id} className="text-xs">
                        <td className="border px-2 py-1">{ref.track_num}</td>
                        <td className="border px-2 py-1">{ref.date_ref}</td>
                        <td className="border px-2 py-1">{ref.pat_fullname}</td>
                        {/* <td className="border px-2 py-1">{ref.referral_facility_name}</td> */}
                        <td className="border px-2 py-1">{ref.facility_name}</td>
                        <td className="border px-2 py-1 text-center">
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" /> Received
                          </span>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-2 text-sm">
            <div>
              {activeTab === 'outgoing'
                ? `Showing ${paginatedReferrals.length === 0
                  ? 0
                  : (page - 1) * ITEMS_PER_PAGE + 1
                } to ${(page - 1) * ITEMS_PER_PAGE + paginatedReferrals.length
                } of ${outgoingReferrals.length} entries`
                : 'Showing 0 to 0 of 0 entries'}
            </div>
            <div className="flex gap-2">
              <button
                className="border rounded px-3 py-1 text-gray-600 bg-gray-50"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <button
                className="border rounded px-3 py-1 text-gray-600 bg-gray-50"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default ReferralPage;