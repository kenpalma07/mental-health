import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UsersIcon, Stethoscope, NotebookPen } from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type DashboardProps = {
  patientCount: number;
  consultationCount: number;
  assessmentCount: number;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({
  patientCount,
  consultationCount,
  assessmentCount,
}: DashboardProps) {
  // Prepare data for the chart
  const data = [
    { name: 'Patients', count: patientCount },
    { name: 'Consultations', count: consultationCount },
    { name: 'Assessments', count: assessmentCount },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Patient Count Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8">
            <UsersIcon className="h-24 w-24 text-primary" />
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{patientCount}</p>
              <p className="text-lg text-muted-foreground">Registered Patients</p>
            </div>
          </div>

          {/* Consultation Count Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8">
            <Stethoscope className="h-24 w-24 text-primary" />
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{consultationCount}</p>
              <p className="text-lg text-muted-foreground">Total Consultations</p>
            </div>
          </div>

          {/* Assessment Count Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8">
            <NotebookPen className="h-24 w-24 text-primary" />
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{assessmentCount}</p>
              <p className="text-lg text-muted-foreground">Total Assessments</p>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-8 bg-white dark:bg-black">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
