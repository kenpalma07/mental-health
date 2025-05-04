import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'References', href: '/references' },
    { title: 'Setup', href: '/references/setup' },
];


const HelloWorldPage: React.FC<PageProps> = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6 text-lg font-semibold text-gray-800">
                Hello, World! 🎉
            </div>
        </AppLayout>
    );
};

export default HelloWorldPage;
