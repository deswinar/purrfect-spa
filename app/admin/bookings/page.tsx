"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { getBookings, updateBookingStatus, Booking } from "@/lib/data"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const loadBookings = async () => {
    try {
      const data = await getBookings()
      setBookings(data || [])
    } catch (error) {
      console.error("Failed to load bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateBookingStatus(id, newStatus);
      await loadBookings();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  }

  if (loading) return <div className="p-8 text-slate-500">Loading bookings...</div>

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Comprehensive list of all appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Customer (Phone)</th>
                  <th className="px-6 py-4 font-medium">Cat</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Notes</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{booking.ownerName}</div>
                      <div className="text-xs text-slate-500">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{booking.catName}</div>
                      <div className="text-xs text-slate-500">{booking.catBreed}</div>
                    </td>
                    <td className="px-6 py-4">{booking.serviceName}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4 text-xs max-w-[150px] truncate" title={booking.notes}>{booking.notes || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : booking.status === 'Completed' ? 'bg-green-100 text-green-700'
                          : booking.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                            : 'bg-accent-100 text-accent-700'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {booking.status === 'Upcoming' && (
                          <button onClick={() => handleStatusChange(booking.id, 'In Progress')} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-blue-200">Start Session</button>
                        )}
                        {booking.status === 'In Progress' && (
                          <button onClick={() => handleStatusChange(booking.id, 'Completed')} className="text-green-600 hover:text-green-800 hover:bg-green-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-green-200">Complete</button>
                        )}
                        {(booking.status === 'Upcoming' || booking.status === 'In Progress') && (
                          <button onClick={() => handleStatusChange(booking.id, 'Cancelled')} className="text-red-600 hover:text-red-800 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-red-200">Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
