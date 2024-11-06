import Dexie, { Table } from 'dexie';
import { BookingData } from '../types';

class BookingDatabase extends Dexie {
  bookings!: Table<BookingData>;

  constructor() {
    super('ToubaLavageProDB');
    this.version(1).stores({
      bookings: '++id, name, email, phone, date, time, service, carType, status'
    });
  }
}

const db = new BookingDatabase();

export const saveBooking = async (booking: BookingData): Promise<number> => {
  try {
    const id = await db.bookings.add({
      ...booking,
      status: booking.status || 'pending'
    });
    return id as number;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

export const getBookings = async (): Promise<BookingData[]> => {
  try {
    return await db.bookings.orderBy('date').reverse().toArray();
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const updateBooking = async (id: number, updatedBooking: Partial<BookingData>): Promise<void> => {
  try {
    await db.bookings.update(id, updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (id: number): Promise<void> => {
  try {
    await db.bookings.delete(id);
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};