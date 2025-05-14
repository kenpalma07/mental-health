import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

type SchedNxtVisitProps = {
    dateNxtVisit: string;
    setDateNxtVisit: (value: string) => void;
    errors?: Record<string, string>;
};

export default function SchedNxtVisit({ dateNxtVisit, setDateNxtVisit, errors }: SchedNxtVisitProps) {
    const visits = [
        { id: 1, date: '2025-04-20', reason: '1st Visit Depression' },
        { id: 2, date: '2025-03-18', reason: 'Follow-up Depression Visit' },
        { id: 3, date: '2025-02-15', reason: 'Other Diagnosis' },
    ];

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const daysInMonth = new Date(currentYear, new Date().getMonth() + 1, 0).getDate();
    const startDay = new Date(currentYear, new Date().getMonth(), 1).getDay();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* First Card: Visit History */}
                <Card className="rounded-2xl p-6 shadow-lg">
                    <CardContent>
                        <div className="mb-4 flex items-center gap-2 text-xl font-semibold">
                            <CalendarDays className="text-green-600" />
                            <span>Previous Visits</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visits.map((visit) => (
                                        <tr key={visit.id} className="border-b">
                                            <td className="px-4 py-2 text-sm">{visit.date}</td>
                                            <td className="px-4 py-2 text-sm">{visit.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Second Card: Schedule Next Visit */}
                <Card className="rounded-2xl p-6 shadow-lg">
                    <CardContent>
                        <form className="space-y-4">
                            <div className="flex items-center gap-2 text-xl font-semibold">
                                <CalendarDays className="text-blue-600" />
                                <span>Schedule Next Visit</span>
                            </div>

                            <div>
                                <Label htmlFor="date_nxt_visit" className="text-sm">
                                    Choose a date
                                </Label>
                                <Input
                                    type="date"
                                    id="date_nxt_visit"
                                    name="date_nxt_visit"
                                    value={dateNxtVisit}
                                    onChange={(e) => setDateNxtVisit(e.target.value)}
                                    className="mt-1"
                                />
                                {errors?.date_nxt_visit && <p className="mt-1 text-sm text-red-500">{errors.date_nxt_visit}</p>}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Third Card: Calendar View */}
            <Card className="mx-auto max-w-sm rounded-2xl p-6 shadow-lg">
                <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xl font-semibold">
                            <CalendarDays className="text-blue-600" />
                            <span>
                                {currentMonth} {currentYear}
                            </span>
                        </div>
                        <div className="text-lg font-semibold">{currentTime}</div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="rounded bg-gray-100 py-2 text-center text-sm font-semibold">
                                {day}
                            </div>
                        ))}

                        {Array.from({ length: startDay }).map((_, index) => (
                            <div key={`blank-${index}`} className="py-2 text-center text-sm"></div>
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer rounded py-2 text-center text-sm ${
                                    index + 1 === currentDay ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
                                }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
