import { useForm } from '@inertiajs/react'
import { CalendarDays, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

export default function SchedNxtVisit() {
  const { data, setData, post, processing, errors } = useForm({
    next_visit_date: '',
  })
  console.log('Scheduled Next Visit:', data.next_visit_date) // Log the next visit date
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/schedule/next-visit')
  }

  // Sample data for the visits table
  const visits = [
    { id: 1, date: '2025-04-20', reason: '1st Visit Depression' },
    { id: 2, date: '2025-03-18', reason: 'Follow-up Depression Visit' },
    { id: 3, date: '2025-02-15', reason: 'Other Diagnosis' },
  ]

  // State for the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Get current month and year
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()
  const currentDay = new Date().getDate()

  // Generate days for the current month
  const daysInMonth = new Date(currentYear, new Date().getMonth() + 1, 0).getDate()

  // Determine the starting day of the month (e.g., Sunday, Monday)
  const startDay = new Date(currentYear, new Date().getMonth(), 1).getDay()


  return (
    <div className="space-y-6">
      {/* Flex/Grid container for the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Card: List of Visits */}
        <Card className="shadow-lg rounded-2xl p-6">
          <CardContent>
            <div className="flex items-center gap-2 text-xl font-semibold mb-4">
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
        <Card className="shadow-lg rounded-2xl p-6">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <CalendarDays className="text-blue-600" />
                <span>Schedule Next Visit</span>
              </div>

              <div>
                <Label htmlFor="next_visit_date" className="text-sm">
                  Choose a date
                </Label>
                <Input
                  type="date"
                  id="next_visit_date"
                  name="next_visit_date"
                  value={data.next_visit_date}
                  onChange={e => setData('next_visit_date', e.target.value)}
                  className="mt-1"
                />
                {errors.next_visit_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.next_visit_date}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full flex items-center gap-2"
                disabled={processing}
              >
                <CheckCircle size={18} />
                Confirm Schedule
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Third Card: Calendar and Time Display */}
      <Card className="shadow-lg rounded-2xl p-6 max-w-sm mx-auto">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold flex items-center gap-2">
              <CalendarDays className="text-blue-600" />
              <span>{currentMonth} {currentYear}</span>
            </div>
            <div className="text-lg font-semibold">{currentTime}</div>
          </div>

          {/* Calendar Layout */}
          <div className="grid grid-cols-7 gap-1">
            {/* Render day labels (Sun, Mon, Tue...) */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-sm py-2 bg-gray-100 rounded"
              >
                {day}
              </div>
            ))}

            {/* Render blank spaces before the start of the month */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={index} className="text-center text-sm py-2"></div>
            ))}

            {/* Render the days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => (
              <div
                key={index}
                className={`text-center text-sm py-2 rounded cursor-pointer ${
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
  )
}
