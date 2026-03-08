import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useGrades, useAttendance, useTimetable } from '../services/queries'

export default function AcademicRecords() {
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'timetable'>('grades')
  const { data: grades } = useGrades()
  const { data: attendance } = useAttendance()
  const { data: timetable } = useTimetable()

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Academic Records</h1>
        <div className="card">
          <div className="flex gap-3 mb-6">
            <button className={`btn ${activeTab === 'grades' ? 'btn-primary' : 'bg-gray-200'}`} onClick={() => setActiveTab('grades')}>Grades</button>
            <button className={`btn ${activeTab === 'attendance' ? 'btn-primary' : 'bg-gray-200'}`} onClick={() => setActiveTab('attendance')}>Attendance</button>
            <button className={`btn ${activeTab === 'timetable' ? 'btn-primary' : 'bg-gray-200'}`} onClick={() => setActiveTab('timetable')}>Timetable</button>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'grades' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Term</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grades?.map((g, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.grade}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.marks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'attendance' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(attendance) && attendance.map((r: any, i: number) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{r.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{r.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'timetable' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable?.map((t, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{t.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{t.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{t.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{t.teacher}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{t.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
