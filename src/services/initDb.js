import Database from 'better-sqlite3';

const db = new Database('bookings.db');

// Créer la table des réservations
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    service TEXT NOT NULL,
    carType TEXT NOT NULL,
    specialRequests TEXT,
    status TEXT DEFAULT 'pending'
  )
`);

console.log('Base de données initialisée avec succès !');