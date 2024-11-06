import React, { useState, useEffect } from 'react'
import { getBookings } from '../services/database'
import { BookingData } from '../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Reports: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = () => {
    const fetchedBookings = getBookings()
    setBookings(fetchedBookings)
  }

  const filterBookingsByDate = () => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date)
      return (!dateRange.start || bookingDate >= new Date(dateRange.start)) &&
             (!dateRange.end || bookingDate <= new Date(dateRange.end))
    })
  }

  const calculateRevenueByService = () => {
    const filteredBookings = filterBookingsByDate()
    const revenueByService: { [key: string]: number } = {}
    filteredBookings.forEach(booking => {
      const serviceName = booking.service.split(' - ')[1]
      const price = parseInt(booking.service.split(' ')[0].replace(' ', ''))
      if (revenueByService[serviceName]) {
        revenueByService[serviceName] += price
      } else {
        revenueByService[serviceName] = price
      }
    })
    return Object.entries(revenueByService).map(([name, value]) => ({ name, value }))
  }

  const calculateBookingsByStatus = () => {
    const filteredBookings = filterBookingsByDate()
    const statusCounts: { [key: string]: number } = {
      'En attente': 0,
      'Confirmé': 0,
      'Terminé': 0,
      'Annulé': 0
    }
    filteredBookings.forEach(booking => {
      switch (booking.status) {
        case 'pending':
          statusCounts['En attente']++
          break
        case 'confirmed':
          statusCounts['Confirmé']++
          break
        case 'completed':
          statusCounts['Terminé']++
          break
        case 'cancelled':
          statusCounts['Annulé']++
          break
      }
    })
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rapports</h1>
      
      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
          <input
            type="date"
            id="startDate"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
          <input
            type="date"
            id="endDate"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Revenus par Service</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={calculateRevenueByService()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Revenus (FCFA)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Réservations par Statut</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={calculateBookingsByStatus()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="Nombre de réservations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Reports