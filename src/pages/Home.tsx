import React from 'react'
import { Link } from 'react-router-dom'
import { Car, Clock, ThumbsUp, Shield } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Bienvenue chez Auto Lavage Pro</h1>
        
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Car Wash" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Le meilleur service de lavage pour votre véhicule</h2>
            <p className="mb-6">Chez Auto Lavage Pro, nous prenons soin de votre voiture comme si c'était la nôtre. Nos services de lavage professionnels garantissent un résultat impeccable à chaque fois.</p>
            <Link to="/booking" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-center">Réserver maintenant</Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Pourquoi choisir Auto Lavage Pro ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Service rapide</h3>
              <p className="text-gray-600 text-center">Nous respectons votre temps. Notre équipe efficace assure un service rapide sans compromettre la qualité.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ThumbsUp className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Satisfaction garantie</h3>
              <p className="text-gray-600 text-center">Votre satisfaction est notre priorité. Nous ne sommes satisfaits que lorsque vous l'êtes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">Produits écologiques</h3>
              <p className="text-gray-600 text-center">Nous utilisons des produits respectueux de l'environnement pour prendre soin de votre voiture et de la planète.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 italic">"J'ai été impressionné par la qualité du service. Ma voiture n'a jamais été aussi propre !"</p>
              <p className="font-semibold">- Marie D.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 italic">"Le personnel est très professionnel et attentionné. Je recommande vivement !"</p>
              <p className="font-semibold">- Thomas L.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à redonner de l'éclat à votre véhicule ?</h2>
          <p className="mb-6">Réservez dès maintenant et bénéficiez de notre service de qualité.</p>
          <Link to="/booking" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-xl font-semibold">Réserver un lavage</Link>
        </div>
      </div>
    </div>
  )
}

export default Home