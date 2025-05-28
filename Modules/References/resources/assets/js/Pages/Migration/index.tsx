import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import type { PageProps } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'System Migration Version',
        href: '#',
    },
];

interface MigrationPageProps extends PageProps {
    latestMigration: {
        id: number;
        migration: string;
        batch: number;
    } | null;
}

const IndexMigration: React.FC = () => {
    const { latestMigration } = usePage<MigrationPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Migration Version" />
            <div className="p-4 space-y-4">
                <small className="text-2xl font-semibold">System Version</small>
                {latestMigration ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    {/* <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Migration</th> */}
                                    <th className="border px-4 py-2 text-left">Migration Version</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td className="border px-4 py-2">{latestMigration.id}</td>
                                    <td className="border px-4 py-2">{latestMigration.migration}</td> */}
                                    <td className="border px-4 py-2">{latestMigration.batch}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-red-500">No migration data found.</p>
                )}
            </div>
        </AppLayout>
    );
};

export default IndexMigration;
