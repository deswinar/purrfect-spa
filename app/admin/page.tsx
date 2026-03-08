"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { CalendarHeart, CheckCircle2, Clock, MoreHorizontal } from "lucide-react"

const mockBookings = [
  {
    id: "BKG-001",
    customer: "Sarah L.",
    catName: "Luna",
    breed: "Persian",
    service: "Full Spa Treatment",
    date: "Today, 10:00 AM",
    status: "In Progress",
  },
  {
    id: "BKG-002",
    customer: "Daniel T.",
    catName: "Oliver",
    breed: "Tabby",
    service: "Basic Grooming",
    date: "Today, 1:00 PM",
    status: "Upcoming",
  },
  {
    id: "BKG-003",
    customer: "Emily R.",
    catName: "Bella",
    breed: "Maine Coon",
    service: "Anti-Flea Treatment",
    date: "Today, 3:30 PM",
    status: "Upcoming",
  },
  {
    id: "BKG-004",
    customer: "Michael B.",
    catName: "Simba",
    breed: "Bengal",
    service: "Full Spa Treatment",
    date: "Tomorrow, 9:00 AM",
    status: "Upcoming",
  },
  {
    id: "BKG-005",
    customer: "Jessica W.",
    catName: "Milo",
    breed: "Ragdoll",
    service: "Kitten First Groom",
    date: "Tomorrow, 11:30 AM",
    status: "Upcoming",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Today&apos;s Bookings</CardTitle>
            <CalendarHeart className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">3</div>
            <p className="text-xs text-slate-500 mt-1">+1 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Upcoming (7 Days)</CardTitle>
            <Clock className="h-4 w-4 text-accent-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">18</div>
            <p className="text-xs text-slate-500 mt-1">4 slots remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Completed (This Month)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">42</div>
            <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Manage your grooming schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Cat</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{booking.id}</td>
                    <td className="px-6 py-4">{booking.customer}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{booking.catName}</div>
                      <div className="text-xs text-slate-500">{booking.breed}</div>
                    </td>
                    <td className="px-6 py-4">{booking.service}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        booking.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-accent-100 text-accent-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
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
