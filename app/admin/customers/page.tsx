"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { getBookings, Booking } from "@/lib/data"
import { Mail, Phone } from "lucide-react"

export default function CustomersPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings()
        setBookings(data || [])
      } catch (error) {
        console.error("Failed to load bookings:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [])

  // Derive unique customers from bookings based on phone number
  const uniqueCustomers = useMemo(() => {
    const customerMap = new Map<string, any>()
    bookings.forEach(b => {
      if (!customerMap.has(b.phone)) {
        customerMap.set(b.phone, {
          name: b.ownerName,
          phone: b.phone,
          cats: [b.catName],
          totalBookings: 1,
          lastBookingDate: b.date,
        })
      } else {
        const existing = customerMap.get(b.phone)
        if (!existing.cats.includes(b.catName)) {
          existing.cats.push(b.catName)
        }
        existing.totalBookings += 1
      }
    })
    return Array.from(customerMap.values())
  }, [bookings])

  if (loading) return <div className="p-8 text-slate-500">Loading customers...</div>

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>View your clients and their furry companions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Cats</th>
                  <th className="px-6 py-4 font-medium">Total Visits</th>
                  <th className="px-6 py-4 font-medium">Latest Appointment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {uniqueCustomers.map((cust) => (
                  <tr key={cust.phone} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{cust.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone className="h-3 w-3" /> {cust.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {cust.cats.map((cat: string) => (
                          <span key={cat} className="rounded-full bg-primary-50 px-2 py-0.5 text-xs text-primary-700">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                        {cust.totalBookings}
                      </span>
                    </td>
                    <td className="px-6 py-4">{cust.lastBookingDate}</td>
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
