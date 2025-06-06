import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem, Referral } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Referral List',
    href: '#',
  },
];


interface ReferralPageProps {
  referrals?: Referral[];
  [key: string]: unknown;
}

const ReferralIndex: React.FC = () => {
  const { referrals = [] } = usePage<ReferralPageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Incomming Referrals" />
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Referral List</h1>
        <div className="bg-white rounded shadow p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Referred To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.length > 0 ? (
                referrals.map(ref => (
                  <TableRow key={ref.id}>
                    <TableCell>{ref.id}</TableCell>
                    <TableCell>{ref.patient_name}</TableCell>
                    <TableCell>{ref.referred_to}</TableCell>
                    <TableCell>{ref.referral_date}</TableCell>
                    <TableCell>{ref.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No referrals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReferralIndex;