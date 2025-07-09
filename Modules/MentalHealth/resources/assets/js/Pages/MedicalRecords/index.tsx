import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

import SearchPatientModalMedRecs from '../Patient/SearchPatientModal_MedRecs';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Medical Records',
    href: '/medrecords',
  },
];

const ItrIndex: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  React.useEffect(() => {
    openModal();
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medical Records" />

        <div className="p-4 space-y-4">
            <SearchPatientModalMedRecs 
            open={isModalOpen} 
            onClose={closeModal}
            />
        </div>
        
    </AppLayout>
  );
};

export default ItrIndex;
