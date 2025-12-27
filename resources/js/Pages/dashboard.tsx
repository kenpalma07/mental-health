import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UsersIcon, Stethoscope, NotebookPen, HeartCrack } from 'lucide-react';
import { JSX } from 'react';

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
  adultSelfHarmCount,
  adultNoSelfHarmCount,
  adolescentSelfHarmCount,
  adolescentNoSelfHarmCount,
  adultSelfHarmPatients,
  adolescentSelfHarmPatients,
  selfHarmTrends,
}: DashboardProps) {
  const data = [
    { name: 'Patients', count: patientCount },
    { name: 'Consultations', count: consultationCount },
    { name: 'Assessments', count: assessmentCount },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* Count Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card icon={<UsersIcon className="h-24 w-24 text-primary" />} value={patientCount} label="Registered Patients" />
          <Card icon={<Stethoscope className="h-24 w-24 text-primary" />} value={consultationCount} label="Total Consultations" />
          <Card icon={<NotebookPen className="h-24 w-24 text-primary" />} value={assessmentCount} label="Total Assessments" />
        </div>

        {/* Bar Chart */}
        <div className="border rounded-xl p-8 bg-white dark:bg-black">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="border rounded-xl p-8 bg-white dark:bg-black">
          <h2 className="text-xl font-semibold mb-4">Self-Harm Trends by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selfHarmTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="adult" name="Adult" stroke="#e11d48" strokeWidth={3} />
              <Line type="monotone" dataKey="adolescent" name="Adolescent" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Self-Harm Summary Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 mt-4">
          <SelfHarmCard title="Adult Self-Harm" count={adultSelfHarmCount} patients={adultSelfHarmPatients} />
          <SelfHarmCard title="Adult No Self-Harm" count={adultNoSelfHarmCount} patients={adultNoSelfHarmCount} />
          <SelfHarmCard title="Adolescent Self-Harm" count={adolescentSelfHarmCount} patients={adolescentSelfHarmPatients} />
          <SelfHarmCard title="Adolescent No Self-Harm" count={adolescentNoSelfHarmCount} patients={adolescentNoSelfHarmCount} />
        </div>
      </div>
    </AppLayout>
  );
}

function Card({ icon, value, label }: { icon: JSX.Element; value: number; label: string }) {
  return (
    <div className="border rounded-xl flex items-center p-8 gap-8 hover:scale-105 transition-transform cursor-pointer">
      {icon}
      <div className="flex flex-col">
        <p className="text-5xl font-bold">{value}</p>
        <p className="text-lg text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function SelfHarmCard({ title, count, patients }: { title: string; count: number; patients: number }) {
  return (
    <div className="border rounded-xl flex flex-col justify-center items-center p-4 hover:scale-105 transition-transform cursor-pointer bg-white dark:bg-black">
      <HeartCrack className="h-12 w-12 text-primary mb-2" />
      <p className="text-lg font-bold text-center">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-xs text-muted-foreground">Assessments | Patients: {patients}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-xs">
        <p className="font-semibold">{label}</p>
        <p className="text-red-500">Adult: {data.adult}</p>
        {data.adultNames?.length > 0 && (
          <ul className="ml-2 list-disc">
            {data.adultNames.map((name: string, index: number) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
        <p className="text-blue-500 mt-2">Adolescent: {data.adolescent}</p>
        {data.adolescentNames?.length > 0 && (
          <ul className="ml-2 list-disc">
            {data.adolescentNames.map((name: string, index: number) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return null;
}
