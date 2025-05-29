import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import type { PageProps } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/button';

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

    const handleUpdateClick = () => {
        alert('Migration Executed Successfully');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Migration Version" />
            <div className="p-4 space-y-4">
                <div className="w-fit rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white">System Migration</div>
                {latestMigration ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-sm">
                            <thead className="bg-green-300 text-xs uppercase text-black">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Migration Version</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center gap-20">
                                            <span className='font-bold text-xl'>{latestMigration.batch}</span>
                                            <Button
                                                onClick={handleUpdateClick}
                                                className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 text-sm"
                                            >
                                                <UploadCloud size={16} />
                                                Update Version
                                            </Button>
                                        </div>
                                    </td>
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
