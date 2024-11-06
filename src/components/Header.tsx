import React from 'react'
import { Link } from 'react-router-dom'
import { Car, LogOut } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Car size={32} />
          <span className="text-xl font-bold">Touba Lavage Pro</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-blue-200">Accueil</Link></li>
            <li><Link to="/services" className="hover:text-blue-200">Services</Link></li>
            <li><Link to="/booking" className="hover:text-blue-200">Réservation</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/admin" className="hover:text-blue-200">Admin</Link></li>
                <li>
                  <button onClick={onLogout} className="flex items-center hover:text-blue-200">
                    <LogOut size={18} className="mr-1" />
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="hover:text-blue-200">Connexion</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header