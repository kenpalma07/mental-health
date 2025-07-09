import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UsersIcon, Stethoscope, NotebookPen, HeartCrack } from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';

type DashboardProps = {
  patientCount: number;
  consultationCount: number;
  assessmentCount: number;
  adultSelfHarmCount: number;
  adultAttemptCount: number;
  adolescentSelfHarmCount: number;
  adolescentAttemptCount: number;
  selfHarmTrends: { date: string; adult: number; adolescent: number }[];
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
  // adultSelfHarmCount,
  // adultAttemptCount,
  // adolescentSelfHarmCount,
  // adolescentAttemptCount,
  selfHarmTrends,
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
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <UsersIcon className="h-24 w-24 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{patientCount}</p>
              <p className="text-lg text-muted-foreground">Registered Patients</p>
            </div>
          </div>

          {/* Consultation Count Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <Stethoscope className="h-24 w-24 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{consultationCount}</p>
              <p className="text-lg text-muted-foreground">Total Consultations</p>
            </div>
          </div>

          {/* Assessment Count Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <NotebookPen className="h-24 w-24 text-primary transition-transform duration-200 group-hover:scale-110" />
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

        {/* Self-Harm Line Graph */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[350px] flex-1 overflow-hidden rounded-xl border p-8 bg-white dark:bg-black">
          <h2 className="text-xl font-semibold mb-4">Self-Harm Trends by Date</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selfHarmTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="adult" name="Adult" stroke="#e11d48" strokeWidth={3} dot />
              <Line type="monotone" dataKey="adolescent" name="Adolescent" stroke="#2563eb" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Self-Harm Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 mt-4">
          {/* Adult Self-Harm Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <HeartCrack className="h-15 w-15 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-4xl font-bold">12</p>
              <p className="text-xs font-bold text-muted-foreground">Total Adult Self-Harm</p>
            </div>
          </div>
          {/* Adult Attempt Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <HeartCrack className="h-15 w-15 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-4xl font-bold">15</p>
              <p className="text-xs font-bold text-muted-foreground">Total Adult Attempt</p>
            </div>
          </div>
          {/* Adolescent Self-Harm Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <HeartCrack className="h-15 w-15 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-4xl font-bold">11</p>
              <p className="text-xs font-bold text-muted-foreground">Total Adolescent Self-Harm</p>
            </div>
          </div>
          {/* Adolescent Attempt Card */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center p-8 gap-8 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <HeartCrack className="h-15 w-15 text-primary transition-transform duration-200 group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-4xl font-bold">12</p>
              <p className="text-xs font-bold text-muted-foreground">Total Adolescent Attempt</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}