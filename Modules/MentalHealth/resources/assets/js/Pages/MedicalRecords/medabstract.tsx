import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Medical Abstract',
    href: '/medabstract',
  },
];

const medabstractindex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medical Abstract" />
      <div className="p-4 space-y-4">
        <marquee behavior="scroll" direction="left" scrollamount="20">
          <h1 className="text-sm font-semibold">Ongoing Development for this page</h1>
        </marquee>

        {/* Add more content here later */}
      </div>
    </AppLayout>
  );
};

export default medabstractindex;
