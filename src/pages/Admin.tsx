import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Car, User, Mail, Phone, Trash2, RefreshCw, BarChart2, DollarSign, UserCheck, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getBookings, updateBooking, deleteBooking, saveBooking } from '../services/database'
import { BookingData } from '../types'

const Admin: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  })
  const [showNewBookingForm, setShowNewBookingForm] = useState(false)
  const [newBooking, setNewBooking] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    carType: '',
    specialRequests: '',
    status: 'confirmed'
  })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings()
      setBookings(fetchedBookings)
      calculateStats(fetchedBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const calculateStats = (bookings: BookingData[]) => {
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter(b => b.status === 'pending').length
    const completedBookings = bookings.filter(b => b.status === 'completed').length
    const totalRevenue = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (parseFloat(b.service.split(' ')[0].replace(' ', '')) || 0), 0)

    setStats({
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue
    })
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateBooking(id, { status: newStatus })
      const updatedBookings = bookings.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
      setBookings(updatedBookings)
      calculateStats(updatedBookings)
      
      if (newStatus === 'confirmed') {
        sendConfirmationEmail(bookings.find(b => b.id === id)!)
      }
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const handleDeleteBooking = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await deleteBooking(id)
        const updatedBookings = bookings.filter(booking => booking.id !== id)
        setBookings(updatedBookings)
        calculateStats(updatedBookings)
      } catch (error) {
        console.error('Error deleting booking:', error)
      }
    }
  }

  const sendConfirmationEmail = (booking: BookingData) => {
    console.log(`E-mail de confirmation envoyé à ${booking.email} pour la réservation du ${booking.date} à ${booking.time}`)
  }

  const handleNewBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const savedBookingId = await saveBooking(newBooking)
      setBookings([...bookings, { ...newBooking, id: savedBookingId }])
      setShowNewBookingForm(false)
      setNewBooking({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        carType: '',
        specialRequests: '',
        status: 'confirmed'
      })
      fetchBookings()
    } catch (error) {
      console.error('Error saving new booking:', error)
    }
  }

  const filteredBookings = bookings
    .filter(booking => filterStatus === 'all' || booking.status === filterStatus)
    .filter(booking => !filterDate || booking.date === filterDate)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Rest of the component remains exactly the same */}
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administratif</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Réservations</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">En Attente</p>
              <p className="text-2xl font-bold">{stats.pendingBookings}</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Terminées</p>
              <p className="text-2xl font-bold">{stats.completedBookings}</p>
            </div>
            <UserCheck className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenus Totaux</p>
              <p className="text-2xl font-bold">{stats.totalRevenue} FCFA</p>
            </div>
            <DollarSign className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div>
            <label htmlFor="filterStatus" className="mr-2">Filtrer par statut:</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterDate" className="mr-2">Filtrer par date:</label>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchBookings}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <RefreshCw className="mr-2" size={18} />
            Actualiser
          </button>
          <button
            onClick={() => setShowNewBookingForm(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Nouvelle Réservation
          </button>
          <Link to="/admin/reports" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <BarChart2 className="mr-2" size={18} />
            Rapports
          </Link>
        </div>
      </div>

      {showNewBookingForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Nouvelle Réservation</h3>
              <form onSubmit={handleNewBookingSubmit} className="mt-2 text-left">
                <input
                  type="text"
                  placeholder="Nom"
                  value={newBooking.name}
                  onChange={(e) => setNewBooking({...newBooking, name: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <select
                  value={newBooking.service}
                  onChange={(e) => setNewBooking({...newBooking, service: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="7 500 FCFA - Lavage Basique">Lavage Basique</option>
                  <option value="12 500 FCFA - Lavage Premium">Lavage Premium</option>
                  <option value="25 000 FCFA - Lavage Deluxe">Lavage Deluxe</option>
                </select>
                <input
                  type="text"
                  placeholder="Type de véhicule"
                  value={newBooking.carType}
                  onChange={(e) => setNewBooking({...newBooking, carType: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <textarea
                  placeholder="Demandes spéciales"
                  value={newBooking.specialRequests}
                  onChange={(e) => setNewBooking({...newBooking, specialRequests: e.target.value})}
                  className="mt-2 p-2 w-full border rounded"
                ></textarea>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Créer la réservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Heure</th>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{booking.date}</td>
                <td className="py-2 px-4 border-b">{booking.time}</td>
                <td className="py-2 px-4 border-b">{booking.name}</td>
                <td className="py-2 px-4 border-b">{booking.service}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={booking.status || 'pending'}
                    onChange={(e) => handleStatusChange(booking.id!, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeleteBooking(booking.id!)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin